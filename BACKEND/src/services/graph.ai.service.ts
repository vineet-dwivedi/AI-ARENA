import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import {
  StateGraph,
  START,
  END,
  Annotation,
} from "@langchain/langgraph";

import { gemini, mistral, cohere } from "./model.service.js";
import { createAgent, providerStrategy } from "langchain";
import { z } from "zod";

// ✅ State
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

// 🔥 Timeout helper (VERY IMPORTANT)
const withTimeout = (promise: Promise<any>, ms = 20000) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);

// ✅ Node 1
const solutionNode = async (state: typeof State.State) => {
  try {
    console.log("🚀 Running solutionNode");

    const userQuery = state.messages[0]?.content as string;

    const safeCall = async (fn: Promise<any>) => {
      try {
        return await withTimeout(fn, 40000);
      } catch {
        return { content: "Model failed" };
      }
    };

    const [mistralRes, cohereRes] = await Promise.all([
      safeCall(mistral.invoke(userQuery)),
      safeCall(cohere.invoke(userQuery)),
    ]);

    console.log("✅ Solutions generated");

    return {
      solution_1: String(mistralRes.content),
      solution_2: String(cohereRes.content),
    };
  } catch (err) {
    console.error("❌ Error in solutionNode:", err);
    throw err;
  }
};
// ✅ Node 2
const judgeNode = async (state: typeof State.State) => {
  try {
    console.log("⚖️ Running judgeNode");

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

    const response = await withTimeout(
      judge.invoke({
        messages: [
          new HumanMessage(`
Problem: ${state.messages[0]?.content}

Solution 1: ${state.solution_1}
Solution 2: ${state.solution_2}

Return ONLY JSON:
{ "solution_1_score": number, "solution_2_score": number }
`),
        ],
      }),
      20000
    );

    console.log("✅ Judge completed");

    return {
      judge_recommendation: response.structuredResponse,
    };
  } catch (err) {
    console.error("❌ Judge failed:", err);

    // 🔥 fallback (never break flow)
    return {
      judge_recommendation: {
        solution_1_score: 5,
        solution_2_score: 5,
      },
    };
  }
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
  try {
    console.log("🔥 Invoking graph");

    const result = await graph.invoke({
      messages: [new HumanMessage(userMessage)],
    });

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error("❌ Graph failed:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}