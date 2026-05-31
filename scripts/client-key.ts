// Mint an agent-scoped D-ID client key for the given domains.
// Usage: DID_AGENT_ID=v2_agt_xxx npx tsx --env-file=.env scripts/client-key.ts https://your.app http://localhost:3000
// Env: D_ID_API_KEY (Basic), D_ID_API_BASE, DID_AGENT_ID.
const apiKey = process.env.D_ID_API_KEY;
const apiBase = process.env.D_ID_API_BASE || "https://api.d-id.com";
const id = process.env.DID_AGENT_ID;
const allowed_domains = process.argv.slice(2);

async function main() {
  if (!apiKey || !id) {
    console.error("Need D_ID_API_KEY (.env) + DID_AGENT_ID.");
    process.exit(1);
  }
  if (!allowed_domains.length) {
    console.error("Pass at least one domain, e.g. https://your.app http://localhost:3000");
    process.exit(1);
  }
  const res = await fetch(`${apiBase}/agents/${id}/client-keys`, {
    method: "POST",
    headers: { Authorization: `Basic ${apiKey}`, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ allowed_domains }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`POST /agents/${id}/client-keys → ${res.status}\n${text}`);
    process.exit(1);
  }
  const key = (JSON.parse(text) as { client_key?: string }).client_key;
  console.error(`✓ client key for: ${allowed_domains.join(", ")}`);
  console.log(`VITE_DID_CLIENT_KEY=${key}`);
}
main();
