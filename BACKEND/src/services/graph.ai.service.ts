import { StateGraph, MessagesAnnotation, START, END} from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";

// 1. Define State (prebuilt messages state)
const State = MessagesAnnotation;

// 2. Define node (logic)
const solutionNode = async (state: typeof State.State) => {
  // Just returning same messages (echo behavior)
  return {
    messages: state.messages,
  };
};

// 3. Build graph
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addEdge(START, "solution") // correct way
  .addEdge("solution", END)   // always end the graph
  .compile();

// 4. Export function
export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  return result.messages;
}