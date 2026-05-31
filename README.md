# PersonaFolio

A conversational AI portfolio for **Padmanabhan (@Limb)** — a Software Engineer in Applied AI.
Instead of clicking through static pages, visitors **talk to a D-ID avatar** that answers
questions and navigates the site by voice (scrolls to sections, opens projects).

Original work, built from scratch. Liquid-glass editorial design, no WebGL/3D.

## Stack

Vue 3 + Vite + TypeScript · GSAP + Lenis (motion) · SCSS · D-ID Agents + ElevenLabs (voice).

## Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on port **3000** |
| `npm run build` | Typecheck + production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run bootstrap:agent` | Option A — create client tools + configure the D-ID agent |
| `npm run bootstrap:elevenlabs` | Option B — create the ElevenLabs agent + tools |

## Structure

- `src/content/` — all content: `profile.ts`, `resume.ts`, `sections.ts`, `projects.ts`, `tags.ts`, `images/`.
- `src/components/` — sections (Hero, About, Experience, Skills, Work, Education, Contact) + primitives (GlassPanel, Reveal, Tag, MeshGradient) + ProjectDetail overlay + AvatarWidget.
- `src/composables/` — `useScroll` (Lenis + GSAP), `useActiveSection`, `useProjectOverlay`, `useDidAgent`.
- `src/styles/` — `tokens.scss` (design tokens), `mixins.scss` (injected), `base.scss`.
- `agent/` — D-ID agent `tools.json` (client tools) + `instructions.md` (persona + knowledge).

## The avatar agent — interview a portrait

The avatar embeds via the D-ID Agents script and **navigates the page as it answers**. Visitors
interview it ("tell me about yourself", "your skills", "the ElevenHacks build", "deep-dive a
project", "how to connect"); it calls a client tool to move to the right section/page, then
explains — confidently, in the first person. Tools live in `src/composables/useDidAgent.ts`:

- `scroll_to_section({ section_id })` → `about` · `experience` · `skills` · `elevenhacks` · `education` · `contact`
- `open_project({ slug })` → opens a project page (deep dive)
- `go_home()` → back to top

Persona + tool schemas: `agent/instructions.md` and `agent/tools.json`.
In dev the tools are exposed for manual testing, e.g.
`window.__didTools.scroll_to_section({ section_id: "elevenhacks" })`.

### Bootstrap (pick one)

Put the relevant keys in `.env` / `.env.local` (see `.env.example`).

**Option A — native D-ID agent (primary).** Reasoning, voice, and avatar from D-ID.
```bash
# update an existing agent (keeps its avatar/voice):
DID_AGENT_ID=v2_agt_xxxx npm run bootstrap:agent
# or create a fresh agent:
npm run bootstrap:agent
```
Then copy `VITE_DID_AGENT_ID` / `VITE_DID_CLIENT_KEY` into `.env.local` (client key from D-ID
Studio; make sure its `allowed_domains` includes `http://localhost:3000`). `npm run dev`.

**Option B — D-ID + ElevenLabs.** Avatar/lip-sync from D-ID; reasoning + voice from ElevenLabs,
proxied server-side via D-ID's `external_agent`.
```bash
npm run bootstrap:elevenlabs
```
Then in D-ID Studio → Apps → ElevenLabs integration, paste the printed `agent_id` + your
`ELEVENLABS_API_KEY`; copy the D-ID `agent_id` / `client_key` into `.env.local`.

Without any of these vars the embed is skipped and the site works normally.

## License

MIT — see `LICENSE`.
