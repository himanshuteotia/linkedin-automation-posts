import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios, { AxiosResponse } from "axios"; // Add axios for API requests and import AxiosResponse for typing
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

// Update the LinkedIn API token usage
const linkedInAccessToken = process.env.LINKEDIN_ACCESS_TOKEN;

// Ensure the token is used in API requests
axios.defaults.headers.common['Authorization'] = `Bearer ${linkedInAccessToken}`;

// Create server instance
const server = new McpServer({
  name: "linkedin-content-strategist",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Tool to analyze LinkedIn content history
server.tool(
  "analyze-content-history",
  "Analyze LinkedIn content history to identify patterns and engagement hooks",
  {
    userId: z.string().describe("LinkedIn user ID to analyze"),
  },
  async ({ userId }) => {
    try {
      // Simulate fetching posts from LinkedIn API
      const response: AxiosResponse<{ elements: any[] }> = await axios.get(
        `https://api.linkedin.com/v2/posts?author=${userId}`
      );

      const posts = response.data.elements;

      // Explicitly type the post parameter
      const analysis = posts.map(
        (post: {
          id: string;
          text: string;
          engagementMetrics: {
            likes: number;
            comments: number;
            shares: number;
          };
        }) => ({
          id: post.id,
          text: post.text,
          likes: post.engagementMetrics.likes,
          comments: post.engagementMetrics.comments,
          shares: post.engagementMetrics.shares,
        })
      );

      return {
        content: [
          {
            type: "text",
            text: `Analyzed ${posts.length} posts for user ${userId}. Found patterns and engagement hooks.`,
          },
          {
            type: "resource",
            resource: {
              text: JSON.stringify(analysis, null, 2),
              uri:
                "data:application/json;base64," +
                Buffer.from(JSON.stringify(analysis)).toString("base64"),
              mimeType: "application/json",
            },
          },
        ],
        _meta: {},
        isError: false,
      };
    } catch (error) {
      console.error("Error analyzing content history:", error);
      throw new Error("Failed to analyze content history.");
    }
  }
);

// Tool to generate viral hooks and content ideas
server.tool(
  "generate-viral-hooks",
  "Generate viral hooks and content ideas for LinkedIn",
  {
    topic: z.string().describe("Topic for generating content ideas"),
  },
  async ({ topic }) => {
    try {
      // Simulate generating content ideas
      const ideas = [
        `Top 5 tips for ${topic} that you can't miss!`,
        `How to master ${topic} in 30 days`,
        `The ultimate guide to ${topic}`,
        `Lessons learned from experts in ${topic}`,
        `Why ${topic} is the key to success in 2025`,
      ];

      return {
        content: ideas.map((idea) => ({
          type: "text",
          text: idea,
        })),
        _meta: {},
        isError: false,
      };
    } catch (error) {
      console.error("Error generating viral hooks:", error);
      throw new Error("Failed to generate viral hooks.");
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("LinkedIn Content Strategist MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
