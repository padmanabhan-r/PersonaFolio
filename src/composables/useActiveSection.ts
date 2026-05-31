import { onMounted, onUnmounted, ref } from "vue";
import { SECTIONS } from "@/content/sections";

export const activeSection = ref<string>(SECTIONS[0]?.id ?? "");

export const useActiveSection = () => {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection.value = entry.target.id;
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.elementId);
      if (el) observer.observe(el);
    }
  });

  onUnmounted(() => observer?.disconnect());

  return { activeSection };
};
