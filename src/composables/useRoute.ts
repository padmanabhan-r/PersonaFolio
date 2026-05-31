import { onMounted, onUnmounted, ref, watch } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectIds } from "@/content/projects";
import { getSection } from "@/content/sections";
import { activeSection } from "./useActiveSection";
import { scrollToTarget } from "./useScroll";

// URL-driven routing.
//   /                     → home (hero)
//   /<section-id>         → scroll to a section (about, experience, skills, work, education, contact)
//   /project/<slug>       → full-screen project overlay
// Explicit navigation (nav clicks, voice tools) pushes history; passive scrolling
// rewrites the current URL silently so the bar always reflects the visible section.
export const activeSlug = ref<string | null>(null);

// While a programmatic scroll is in flight, ignore passive scroll-sync so the URL
// doesn't flicker through intermediate sections before settling on the target.
let navLock = false;
let navLockTimer: number | null = null;
const lockNav = () => {
  navLock = true;
  if (navLockTimer) clearTimeout(navLockTimer);
  navLockTimer = window.setTimeout(() => {
    navLock = false;
    navLockTimer = null;
  }, 2600);
};

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
  activeSlug.value = null; // close any open overlay
  lockNav();
  const path = `/${section.id}`;
  if (window.location.pathname !== path) window.history.pushState({}, "", path);
  scrollToTarget("#" + section.elementId, duration);
  return true;
};

/** Back to the top (home). */
export const goHome = () => {
  activeSlug.value = null;
  lockNav();
  if (window.location.pathname !== "/") window.history.pushState({}, "", "/");
  scrollToTarget(0);
};

export const useRoute = () => {
  let stopWatch: (() => void) | null = null;

  const onPop = () => {
    const proj = projectFromPath();
    activeSlug.value = proj;
    if (proj) return;
    // Home may have just been re-shown (v-show) after leaving a project page —
    // wait a frame, refresh ScrollTrigger pins, then scroll to the target.
    const sec = sectionFromPath();
    lockNav();
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
      lockNav();
      // Wait for Lenis + ScrollTrigger pins to be ready before scrolling.
      requestAnimationFrame(() =>
        window.setTimeout(() => scrollToTarget("#" + getSection(sec)!.elementId), 300),
      );
    }

    window.addEventListener("popstate", onPop);

    // Passive scroll → keep the URL in sync silently (no history entries).
    stopWatch = watch(activeSection, (id) => {
      if (navLock || activeSlug.value) return;
      const section = getSection(id);
      if (!section) return;
      const path = `/${section.id}`;
      if (window.location.pathname !== path) window.history.replaceState({}, "", path);
    });
  });

  onUnmounted(() => {
    window.removeEventListener("popstate", onPop);
    if (navLockTimer) clearTimeout(navLockTimer);
    stopWatch?.();
  });
};
