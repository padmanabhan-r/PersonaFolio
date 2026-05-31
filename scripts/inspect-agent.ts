// Read-only: dump the live agent's llm + tools so we can see how tool-calling is wired.
// Usage: DID_AGENT_ID=v2_agt_xxx npm run inspect:agent   (or: tsx --env-file=.env scripts/inspect-agent.ts)
const apiKey = process.env.D_ID_API_KEY;
const apiBase = process.env.D_ID_API_BASE || "https://api.d-id.com";
const id = process.env.DID_AGENT_ID;

async function get(path: string) {
  const res = await fetch(`${apiBase}${path}`, {
    headers: { Authorization: `Basic ${apiKey}`, accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`GET ${path} → ${res.status}\n${text}`);
    process.exit(1);
  }
  return JSON.parse(text);
}

async function main() {
  if (!apiKey || !id) {
    console.error("Need D_ID_API_KEY (.env) + DID_AGENT_ID.");
    process.exit(1);
  }
  const agent = await get(`/agents/${id}`);
  console.log("=== overview ===");
  console.log(JSON.stringify({
    preview_name: agent.preview_name,
    status: agent.status,
    error: agent.error,
    modified: agent.modified_at,
    greetings: agent.greetings,
    starter_message: agent.starter_message,
    knowledge: agent.knowledge,
  }, null, 2));
  const llm = agent.llm ?? {};
  console.log("=== llm ===");
  console.log(JSON.stringify({ ...llm, instructions: llm.instructions ? `[${llm.instructions.length} chars]` : undefined }, null, 2));
  console.log("=== presenter ===");
  console.log(JSON.stringify(agent.presenter, null, 2));
  console.log("=== tools (top-level agent.tools) ===");
  console.log(JSON.stringify(agent.tools, null, 2));

  // Expand each referenced tool id to see its stored config + schema.
  const items: { tool_id?: string }[] = agent.tools?.items ?? [];
  for (const it of items) {
    if (!it.tool_id) continue;
    const tool = await get(`/tools/${it.tool_id}`);
    console.log(`=== tool ${it.tool_id} ===`);
    console.log(JSON.stringify({ name: tool.name, config: tool.config, schema: tool.schema }, null, 2));
  }
}
main();
