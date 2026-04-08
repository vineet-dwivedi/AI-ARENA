import { ChatGoogle } from "@langchain/google";
import envConfig from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";

export const gemini = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: envConfig.GOOGLE_API_KEY
})

export const mistral = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: envConfig.MISTRAL_API_KEY
})

export const cohere = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: envConfig.COHERE_API_KEY
})