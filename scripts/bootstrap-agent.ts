// D-ID agent bootstrapper (native D-ID reasoning + voice).
// Creates the client tools from agent/tools.json, then attaches them + the
// interview instructions (agent/instructions.md) to a D-ID agent.
//
// Usage:
//   # Update the existing avatar agent (keeps presenter/voice):
//   DID_AGENT_ID=v2_agt_xxx npm run bootstrap:agent
//   # Or create a fresh agent (default presenter) for a new user:
//   npm run bootstrap:agent
//
// Env (loaded from .env via `tsx --env-file=.env`):
//   D_ID_API_KEY   (required) — base64 key, sent as `Authorization: Basic <key>`
//   D_ID_API_BASE  (default https://api.d-id.com)
//   DID_AGENT_ID   (optional) — existing agent to PATCH instead of creating

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiKey = process.env.D_ID_API_KEY;
const apiBase = process.env.D_ID_API_BASE || "https://api.d-id.com";
const agentId = process.env.DID_AGENT_ID || "";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const instructions = readFileSync(resolve(root, "agent/prompts/prompt.md"), "utf8");

type ToolDef = {
  name: string;
  description: string;
  schema: Record<string, unknown>;
  config: { type: "client" } | { type: "server"; url: string; method: string; headers: Record<string, string> };
};
const tools = JSON.parse(readFileSync(resolve(root, "agent/tools.json"), "utf8")) as ToolDef[];

// Persona config that rides with the agent (not in instructions.md).
const greetings = ["Hey — I'm Limb. Ask me anything.", "Hi, I'm Limb. What do you want to know?"];
const starterMessages = [
  "Tell me about yourself",
  "What are your skills?",
  "Walk me through your experience",
  "Where did you study?",
  "Tell me about the ElevenHacks build",
  "Show me a project in depth",
  "How do I connect with you?",
];

const llm = {
  provider: "openai",
  model: "gpt-4.1",
  template: "assistant",
  temperature: 0.5,
  instructions,
  prompt_customization: {
    role: "Portfolio Avatar — Padmanabhan",
    personality: "Confident, warm, and concise",
    knowledge_source: "base_knowledge",
    prompt_knowledge: "",
  },
};

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${apiKey}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`${method} ${path} → ${res.status}\n${text}`);
    process.exit(1);
  }
  return (text ? JSON.parse(text) : {}) as T;
}

async function main() {
  if (!apiKey) {
    console.error("Missing D_ID_API_KEY (put it in .env). Aborting.");
    process.exit(1);
  }

  // Fast path: update ONLY the prompt text. Preserve whatever Studio set (RAG template,
  // knowledge_source/knowledge, presenter, voice, greetings, starters) by merging into the
  // existing llm. No new tools / client key.
  if (process.env.INSTRUCTIONS_ONLY) {
    if (!agentId) {
      console.error("INSTRUCTIONS_ONLY needs DID_AGENT_ID.");
      process.exit(1);
    }
    const current = await call<{ llm?: Record<string, unknown> }>("GET", `/agents/${agentId}`);
    const mergedLlm = { ...(current.llm ?? {}), instructions };
    await call("PATCH", `/agents/${agentId}`, { llm: mergedLlm });
    console.error(`✓ updated prompt on ${agentId} (preserved RAG/knowledge, presenter, greetings; tools + key unchanged)`);
    return;
  }

  // 1) Create each client tool.
  const items: { tool_id: string }[] = [];
  for (const t of tools) {
    const { id } = await call<{ id: string }>("POST", "/tools", {
      name: t.name,
      description: t.description,
      schema: { parameters: t.schema },
      config: t.config,
      provider: "personafolio",
    });
    items.push({ tool_id: id });
    console.error(`✓ tool ${t.name} → ${id}`);
  }

  // 2) Attach tools + instructions to the agent.
  const payload = { llm, greetings, starter_message: starterMessages, tools: { items } };

  let id = agentId;
  if (agentId) {
    await call("PATCH", `/agents/${agentId}`, payload);
    console.error(`✓ patched existing agent ${agentId}`);
  } else {
    const created = await call<{ id: string }>("POST", "/agents", {
      preview_name: "Limb — Portfolio Avatar",
      presenter: {
        type: "expressive",
        presenter_id: "public_richard_sport_elegant@avt_Z1tYgP",
        is_greenscreen: true,
        background: {},
        voice: { type: "elevenlabs", voice_id: "onwK4e9ZLuTAKqWW03F9", access: "private", language: "English" },
      },
      ...payload,
      vision: { enabled: true },
      version: 2,
      embed: true,
      access: "private",
    });
    id = created.id;
    console.error(`✓ created agent → ${id}`);
  }

  // 3) Read back to confirm the tools landed.
  const agent = await call<{ tools?: { items?: unknown[] } }>("GET", `/agents/${id}`);
  const attached = agent.tools?.items?.length ?? 0;
  console.error(`✓ agent now reports ${attached} tool(s) attached`);
  if (attached < tools.length) {
    console.error(
      `⚠ expected ${tools.length} tools but agent has ${attached}. If PATCH didn't take the tools, ` +
        `add them in D-ID Studio (3 client tools: ${tools.map((t) => t.name).join(", ")}).`,
    );
  }

  // 4) Mint an agent-scoped client key allowed on the dev origin (+ optional prod).
  const allowedDomains = ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"];
  if (process.env.PUBLIC_BASE_URL) allowedDomains.push(process.env.PUBLIC_BASE_URL);
  const ck = await call<{ client_key?: string }>("POST", `/agents/${id}/client-keys`, {
    allowed_domains: allowedDomains,
  });
  if (!ck.client_key) {
    console.error("⚠ client-key create returned no client_key — check the API response above.");
    process.exit(1);
  }
  console.error(`✓ client key (allowed: ${allowedDomains.join(", ")})`);

  console.log("");
  console.log("Put these in .env.local (public client identifiers):");
  console.log(`VITE_DID_AGENT_ID=${id}`);
  console.log(`VITE_DID_CLIENT_KEY=${ck.client_key}`);
}

main();
