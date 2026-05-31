// ElevenLabs Conversational AI agent (driven through D-ID's external_agent).
// Creates the client tools + an EL agent, then prints the agent_id and the D-ID Studio
// hand-off steps.
//
// Usage: npm run bootstrap:elevenlabs
//
// Env (loaded from .env via `tsx --env-file=.env`):
//   ELEVENLABS_API_KEY   (required) — sent as `xi-api-key`
//   ELEVENLABS_API_BASE  (default https://api.elevenlabs.io)
//   ELEVENLABS_VOICE_ID  (default cjVigY5qzO86Huf0OWal)
//   ELEVENLABS_LLM       (default gpt-4.1)

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiKey = process.env.ELEVENLABS_API_KEY;
const apiBase = process.env.ELEVENLABS_API_BASE || "https://api.elevenlabs.io";
const voiceId = process.env.ELEVENLABS_VOICE_ID || "cjVigY5qzO86Huf0OWal";
const llm = process.env.ELEVENLABS_LLM || "gpt-4.1";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const instructions = readFileSync(resolve(root, "agent/prompts/prompt.md"), "utf8");

type ToolDef = { name: string; description: string; schema: Record<string, unknown> };
const tools = JSON.parse(readFileSync(resolve(root, "agent/tools.json"), "utf8")) as ToolDef[];

async function call<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "xi-api-key": apiKey!, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`POST ${path} → ${res.status}\n${text}`);
    process.exit(1);
  }
  return (text ? JSON.parse(text) : {}) as T;
}

async function main() {
  if (!apiKey) {
    console.error("Missing ELEVENLABS_API_KEY (put it in .env). Aborting.");
    process.exit(1);
  }

  // 1) Create each client tool on ElevenLabs.
  const toolIds: string[] = [];
  for (const t of tools) {
    const res = await call<{ id?: string; tool_id?: string }>("/v1/convai/tools", {
      tool_config: {
        type: "client",
        name: t.name,
        description: t.description,
        parameters: t.schema,
        expects_response: true,
      },
    });
    const id = res.id ?? res.tool_id!;
    toolIds.push(id);
    console.error(`✓ EL tool ${t.name} → ${id}`);
  }

  // 2) Create the agent referencing those tool ids.
  const agent = await call<{ agent_id: string }>("/v1/convai/agents/create", {
    name: "Padmanabhan — Portfolio Avatar",
    conversation_config: {
      agent: { prompt: { prompt: instructions, llm, tool_ids: toolIds } },
      tts: { voice_id: voiceId, model_id: "eleven_turbo_v2" },
    },
  });
  console.error(`✓ EL agent → ${agent.agent_id}`);

  console.log("");
  console.log("Next steps (D-ID Studio):");
  console.log(`  1. Studio → Apps → ElevenLabs agent integration.`);
  console.log(`  2. Paste this agent_id: ${agent.agent_id}  and your ELEVENLABS_API_KEY.`);
  console.log(`     D-ID encrypts the key server-side; it never reaches the browser.`);
  console.log(`  3. Copy the D-ID agent_id + client_key Studio gives you into .env.local`);
  console.log(`     as VITE_DID_AGENT_ID / VITE_DID_CLIENT_KEY.`);
  console.log("Note: per docs/key-findings, the EL external_agent runtime may be un-provisioned on a D-ID trial plan.");
}

main();
