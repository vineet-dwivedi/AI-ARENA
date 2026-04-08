import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import {
  StateGraph,
  START,
  END,
  Annotation,
} from "@langchain/langgraph";

import { gemini,mistral,cohere } from "./model.service.js";
import { createAgent, providerStrategy } from "langchain";
import { z } from "zod";

// ✅ State Definition (stable version - no MessagesAnnotation bug)
const State = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    default: () => [],
    reducer: (_, next) => next,
  }),

  solution_1: Annotation<string>({
    default: () => "",
    reducer: (_, next) => next,
  }),

  solution_2: Annotation<string>({
    default: () => "",
    reducer: (_, next) => next,
  }),

  judge_recommendation: Annotation<{
    solution_1_score: number;
    solution_2_score: number;
  }>({
    default: () => ({
      solution_1_score: 0,
      solution_2_score: 0,
    }),
    reducer: (_, next) => next,
  }),
});

// ✅ Node 1: Generate solutions
const solutionNode = async (state: typeof State.State) => {
  const userQuery = state.messages[0]?.content as string;

  const [mistralRes, cohereRes] = await Promise.all([
    mistral.invoke(userQuery),
    cohere.invoke(userQuery),
  ]);

  return {
    solution_1: mistralRes.content as string,
    solution_2: cohereRes.content as string,
  };
};

// ✅ Node 2: Judge
const judgeNode = async (state: typeof State.State) => {
  const judge = createAgent({
    model: gemini,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
      })
    ),
  });

  const response = await judge.invoke({
    messages: [
      new HumanMessage(`
Problem: ${state.messages[0]?.content}

Solution 1: ${state.solution_1}
Solution 2: ${state.solution_2}

Score both solutions from 0 to 10 and return JSON only.
`),
    ],
  });

  return {
    judge_recommendation: response.structuredResponse,
  };
};

// ✅ Graph
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

// ✅ Runner
export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  return result;
}