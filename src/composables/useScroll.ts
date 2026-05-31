import { onMounted, onUnmounted, ref } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const lenis = ref<Lenis | null>(null);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scroll to a section element by id (or 0 for top). */
export const scrollToTarget = (target: string | number) => {
  if (lenis.value) {
    lenis.value.scrollTo(target as any, { offset: 0, duration: 1.1 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const useScroll = () => {
  let raf = 0;

  onMounted(() => {
    if (prefersReducedMotion()) {
      // Native scrolling; still let ScrollTrigger drive reveals.
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.value = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    if (raf) cancelAnimationFrame(raf);
    lenis.value?.destroy();
    lenis.value = null;
  });
};
