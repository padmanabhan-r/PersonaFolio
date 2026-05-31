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

## Structure

- `src/content/` — all content: `profile.ts`, `resume.ts`, `sections.ts`, `projects.ts`, `tags.ts`, `images/`.
- `src/components/` — sections (Hero, About, Experience, Skills, Work, Education, Contact) + primitives (GlassPanel, Reveal, Tag, MeshGradient) + ProjectDetail overlay + AvatarWidget.
- `src/composables/` — `useScroll` (Lenis + GSAP), `useActiveSection`, `useProjectOverlay`, `useDidAgent`.
- `src/styles/` — `tokens.scss` (design tokens), `mixins.scss` (injected), `base.scss`.
- `agent/` — D-ID agent `tools.json` (client tools) + `instructions.md` (persona + knowledge).

## Voice agent

The avatar embeds via the D-ID Agents script and drives the page through client tools
registered in `src/composables/useDidAgent.ts`:

- `scroll_to_section({ section_id })` → smooth-scrolls to a section
- `open_project({ slug })` → opens a project's detail overlay
- `go_home()` → back to top

Configure credentials in `.env.local` (see `.env.example`). Without them the embed is skipped
and the site works normally. In dev, the tools are exposed at `window.__didTools` for testing,
e.g. `window.__didTools.scroll_to_section({ section_id: "work" })`.

## License

MIT — see `LICENSE`.
