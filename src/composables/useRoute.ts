import { onMounted, onUnmounted, ref } from "vue";
import { projectIds } from "@/content/projects";
import { getSection } from "@/content/sections";
import { scrollToTarget, scrollToSectionAfterHome } from "./useScroll";

// URL-driven routing.
//   /                → home (hero)
//   /<section-id>    → a section (about, experience, skills, elevenhacks, education, contact)
//   /project/<slug>  → a project page
// The URL changes only on EXPLICIT navigation (nav clicks, voice tools, back/forward).
// Manual scrolling does NOT rewrite the URL.
export const activeSlug = ref<string | null>(null);

const projectFromPath = (): string | null => {
  if (typeof window === "undefined") return null;
  const m = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);
  return m && projectIds.includes(m[1]!) ? m[1]! : null;
};

const sectionFromPath = (): string | null => {
  if (typeof window === "undefined") return null;
  const seg = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return getSection(seg)?.id ?? null;
};

export const openProject = (slug: string): boolean => {
  if (!projectIds.includes(slug)) return false;
  window.history.pushState({}, "", `/project/${slug}`);
  activeSlug.value = slug;
  return true;
};

export const closeProject = () => {
  // Prefer browser back so history stays clean; fall back to home.
  if (window.history.length > 1) {
    window.history.back(); // popstate handler re-syncs activeSlug
  } else {
    window.history.pushState({}, "", "/");
    activeSlug.value = null;
  }
};

/** Navigate to a section by id or alias: updates the URL and smooth-scrolls. */
export const goToSection = (idOrAlias: string, duration = 1.1): boolean => {
  const section = getSection(idOrAlias);
  if (!section) return false;
  const wasOnProject = activeSlug.value !== null;
  activeSlug.value = null; // close any open project page
  const path = `/${section.id}`;
  if (window.location.pathname !== path) window.history.pushState({}, "", path);

  if (wasOnProject) {
    // Home was hidden (v-show) under the project page — recompute Lenis's scroll limit
    // and re-pin before scrolling, or the target clamps to the stale max and we hit the hero.
    scrollToSectionAfterHome("#" + section.elementId, duration);
  } else {
    scrollToTarget("#" + section.elementId, duration);
  }
  return true;
};

/** Back to the top (home). */
export const goHome = () => {
  activeSlug.value = null;
  if (window.location.pathname !== "/") window.history.pushState({}, "", "/");
  scrollToTarget(0);
};

export const useRoute = () => {
  const onPop = () => {
    const proj = projectFromPath();
    activeSlug.value = proj;
    if (proj) return;
    // Home may have just been re-shown (v-show) after leaving a project page —
    // recompute Lenis + pins, then scroll to the target (or top).
    const sec = sectionFromPath();
    scrollToSectionAfterHome(sec ? "#" + getSection(sec)!.elementId : 0);
  };

  onMounted(() => {
    // Resolve the initial URL (deep link).
    activeSlug.value = projectFromPath();
    const sec = !activeSlug.value ? sectionFromPath() : null;
    if (sec) {
      // Wait for Lenis + ScrollTrigger pins to be ready before scrolling.
      requestAnimationFrame(() =>
        window.setTimeout(() => scrollToTarget("#" + getSection(sec)!.elementId), 300),
      );
    }
    window.addEventListener("popstate", onPop);
  });

  onUnmounted(() => window.removeEventListener("popstate", onPop));
};
