import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectIds } from "@/content/projects";
import { getSection } from "@/content/sections";
import { scrollToTarget } from "./useScroll";

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

  const doScroll = () => scrollToTarget("#" + section.elementId, duration);
  if (wasOnProject) {
    // Home was hidden (v-show) while the project page showed — wait for it to re-render
    // and refresh the pinned ScrollTriggers before scrolling, or we'd land on the hero.
    requestAnimationFrame(() =>
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        doScroll();
      }, 120),
    );
  } else {
    doScroll();
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
    // wait a frame, refresh ScrollTrigger pins, then scroll to the target.
    const sec = sectionFromPath();
    requestAnimationFrame(() =>
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        if (sec) scrollToTarget("#" + getSection(sec)!.elementId);
        else scrollToTarget(0);
      }, 120),
    );
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
