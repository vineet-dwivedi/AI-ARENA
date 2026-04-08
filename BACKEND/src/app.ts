import express from "express";
import useGraph from "./services/graph.ai.service.js";

const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"Server is running"
    })
})

app.post("/use-graph", async (req, res) => {
    try {
        const prompt = req.body.prompt || "write an factorial function in javascript";
        const result = await useGraph(prompt);

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("/use-graph error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to process request",
        });
    }
});

export default app;