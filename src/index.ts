import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { sanctionsScreen } from "./tools/sanctions.js";
import { cveBrief } from "./tools/cve-brief.js";
import { evidenceVerify } from "./tools/evidence.js";
import { chronolocateSun } from "./tools/chronolocate.js";
import { iocSearch } from "./tools/ioc.js";

const server = new Server(
  {
    name: "mcp-osint-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "sanctions_screen",
        description: "Screen a name against EU sanctions list",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            birth_year: { type: "number" },
          },
          required: ["name"],
        },
      },
      {
        name: "cve_brief",
        description: "Get prioritized vulnerability brief",
        inputSchema: {
          type: "object",
          properties: {
            watchlist: { type: "array", items: { type: "string" } },
            max_items: { type: "number" },
            lang: { type: "string", enum: ["en", "nl", "es"] },
          },
        },
      },
      {
        name: "evidence_verify",
        description: "Verify evidence chain integrity",
        inputSchema: {
          type: "object",
          properties: {
            case_id: { type: "string" },
            evidence_dir: { type: "string" },
          },
          required: ["case_id", "evidence_dir"],
        },
      },
      {
        name: "chronolocate_sun",
        description: "Calculate sun position for verification",
        inputSchema: {
          type: "object",
          properties: {
            lat: { type: "number" },
            lon: { type: "number" },
            time: { type: "string" },
          },
          required: ["lat", "lon", "time"],
        },
      },
      {
        name: "ioc_search",
        description: "Search indicators of compromise",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            type: { type: "string", enum: ["ip", "domain", "hash", "url"] },
          },
          required: ["query"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "sanctions_screen": {
        const result = await sanctionsScreen(args as any);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      case "cve_brief": {
        const result = await cveBrief(args as any);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      case "evidence_verify": {
        const result = await evidenceVerify(args as any);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      case "chronolocate_sun": {
        const result = await chronolocateSun(args as any);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      case "ioc_search": {
        const result = await iocSearch(args as any);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: String(error) }],
      isError: true,
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("OSINT MCP Server running on stdio");
}

run().catch(console.error);
