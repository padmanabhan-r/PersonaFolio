import { onMounted, onUnmounted } from "vue";
import { openProject, goToSection, goHome } from "./useRoute";
import { getSection, SECTION_IDS } from "@/content/sections";
import { projectIds } from "@/content/projects";

const AGENT_ID = import.meta.env.VITE_DID_AGENT_ID;
const CLIENT_KEY = import.meta.env.VITE_DID_CLIENT_KEY;
const EMBED_SRC = import.meta.env.VITE_DID_EMBED_SRC ?? "https://agent.d-id.com/v2/index.js";

type ClientToolHandler = (args: unknown) => string;

declare global {
  interface Window {
    DID_AGENTS_API?: {
      functions?: { registerClientTool?: (name: string, handler: ClientToolHandler) => void };
    };
    __didTools?: Record<string, ClientToolHandler>;
  }
}

const ok = (extra: Record<string, unknown> = {}) => JSON.stringify({ success: true, ...extra });
const fail = (error: string, extra: Record<string, unknown> = {}) => JSON.stringify({ success: false, error, ...extra });
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

export const useDidAgent = () => {
  let scriptEl: HTMLScriptElement | null = null;
  let pollTimer: number | null = null;

  const scrollToSection: ClientToolHandler = (raw) => {
    if (!isObj(raw)) return fail("invalid_args");
    const section = getSection(String(raw.section_id ?? ""));
    if (!section) return fail("unknown_section", { available: SECTION_IDS });
    goToSection(section.id);
    return ok({ section_id: section.id });
  };

  const openProjectTool: ClientToolHandler = (raw) => {
    if (!isObj(raw)) return fail("invalid_args");
    const slug = String(raw.slug ?? "");
    if (!openProject(slug)) return fail("unknown_project", { available: projectIds });
    return ok({ slug });
  };

  const goHomeTool: ClientToolHandler = () => {
    goHome();
    return ok();
  };

  const TOOLS: Record<string, ClientToolHandler> = {
    scroll_to_section: scrollToSection,
    open_project: openProjectTool,
    go_home: goHomeTool,
  };

  const register = () => {
    const reg = window.DID_AGENTS_API?.functions?.registerClientTool;
    if (!reg) return false;
    for (const [name, handler] of Object.entries(TOOLS)) reg(name, handler);
    return true;
  };

  onMounted(() => {
    if (typeof window === "undefined") return;

    if (import.meta.env.DEV) window.__didTools = TOOLS;

    if (!AGENT_ID || !CLIENT_KEY) return; // not configured → skip embed

    scriptEl = document.createElement("script");
    scriptEl.type = "module";
    scriptEl.src = EMBED_SRC;
    scriptEl.setAttribute("data-name", "did-agent");
    scriptEl.setAttribute("data-mode", "fabio");
    scriptEl.setAttribute("data-position", "right");
    scriptEl.setAttribute("data-client-key", CLIENT_KEY);
    scriptEl.setAttribute("data-agent-id", AGENT_ID);
    document.body.appendChild(scriptEl);

    const deadline = Date.now() + 8000;
    const poll = () => {
      if (register() || Date.now() > deadline) {
        pollTimer = null;
        return;
      }
      pollTimer = window.setTimeout(poll, 200);
    };
    poll();
  });

  onUnmounted(() => {
    if (pollTimer !== null) window.clearTimeout(pollTimer);
    if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    if (import.meta.env.DEV) delete window.__didTools;
  });
};
