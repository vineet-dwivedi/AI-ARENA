/**
 * Static UI data keeps the first build easy to reason about while we focus on
 * layout quality and component composition.
 */
export const arenaBattleMock = {
  prompt: 'hii',
  responses: [
    {
      id: 'gemini',
      model: 'Gemini',
      variant: 'creative',
      latency: '535ms',
      tokens: '191 tokens',
      isWinner: false,
      blocks: [
        {
          type: 'paragraph',
          text: `Based on your question "hii", I'll provide a comprehensive analysis. The key factors to consider are context, relevance, and practical application.`,
        },
        {
          type: 'paragraph',
          text: `First, it's important to understand the underlying principles. This approach ensures we're building on a solid foundation of knowledge.`,
        },
        {
          type: 'paragraph',
          text: `Secondly, we should examine real-world applications and how they relate to your specific situation. This helps bridge the gap between theory and practice.`,
        },
        {
          type: 'paragraph',
          text: `Finally, I'd recommend exploring additional resources and staying curious about edge cases that might provide deeper insights.`,
        },
      ],
    },
    {
      id: 'mistral',
      model: 'Mistral',
      variant: 'fast',
      latency: '689ms',
      tokens: '165 tokens',
      isWinner: true,
      blocks: [
        {
          type: 'paragraph',
          text: `Great question about "hii"! Let me break this down into clear, actionable points.`,
        },
        {
          type: 'paragraph',
          text: `The most important aspect is understanding the core concept from first principles. This gives you flexibility in applying the knowledge.`,
        },
        {
          type: 'list',
          items: [
            'Focus on fundamentals before diving into complexity',
            'Test your understanding with practical examples',
            'Build incrementally and validate each step',
          ],
        },
        {
          type: 'paragraph',
          text: `This approach has proven effective across various domains and should serve you well here too.`,
        },
      ],
    },
  ],
  verdict: {
    title: "Judge's Verdict",
    revealLabel: 'Winner',
    summary: 'Model B wins',
    winnerModel: 'Mistral',
    winnerNote: 'Clearer structure, faster takeaways, stronger usability.',
    confidence: '86% confidence',
    reasoningLabel: 'View Reasoning',
    reasoning:
      `Model B (Mistral) delivers a more concise and actionable response. The bullet-point format makes key information immediately accessible, and the first-principles approach is clearly articulated. While Model A provides good detail, Model B's clarity and practical focus make it more useful for immediate application. The response strikes an excellent balance between depth and brevity.`,
  },
}
