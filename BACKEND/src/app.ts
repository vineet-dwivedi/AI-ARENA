import cors from "cors";
import express from "express";
import envConfig from "./config/config.js";
import useGraph from "./services/graph.ai.service.js";

const app = express();
const allowedOrigins = envConfig.FRONTEND_ORIGIN
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins?.length ? allowedOrigins : true
}));
app.use(express.json({ limit: "1mb" }));

type RouteErrorShape = {
    body?: string;
    message?: string;
    rawResponse?: {
        url?: string;
    };
    statusCode?: number;
};

function getProviderName(url: string | undefined): string {
    if (!url) {
        return "upstream provider";
    }

    if (url.includes("mistral.ai")) {
        return "Mistral";
    }

    if (url.includes("cohere.com")) {
        return "Cohere";
    }

    if (url.includes("googleapis.com") || url.includes("generativelanguage")) {
        return "Google";
    }

    return "upstream provider";
}

function formatRouteError(error: unknown): { error: string; status: number } {
    const routeError = error as RouteErrorShape;
    const providerUrl = routeError?.rawResponse?.url;
    const providerName = getProviderName(providerUrl);

    if (routeError?.statusCode === 401) {
        return {
            status: 502,
            error: `${providerName} API authentication failed. Check the related API key in BACKEND/.env.`,
        };
    }

    if (routeError?.statusCode === 429) {
        return {
            status: 502,
            error: `${providerName} rate limit reached. Please wait a moment and try again.`,
        };
    }

    if (routeError?.statusCode) {
        return {
            status: 502,
            error: `${providerName} request failed with status ${routeError.statusCode}.`,
        };
    }

    if (error instanceof Error) {
        return {
            status: 500,
            error: error.message || "Failed to process request",
        };
    }

    return {
        status: 500,
        error: "Failed to process request",
    };
}

app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Server is running"
    })
})

app.post("/use-graph", async (req, res) => {
    try {
        const prompt = typeof req.body?.prompt === "string"
            ? req.body.prompt.trim()
            : "";

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const result = await useGraph(prompt);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("/use-graph error:", error);
        const formattedError = formatRouteError(error);

        return res.status(formattedError.status).json({
            success: false,
            error: formattedError.error,
        });
    }
});

export default app;
