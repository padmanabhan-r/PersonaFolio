<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { SECTIONS } from "@/content/sections";
import { useActiveSection } from "@/composables/useActiveSection";
import { goToSection, goHome } from "@/composables/useRoute";
import SoundToggle from "./SoundToggle.vue";

const { activeSection } = useActiveSection();
const hidden = ref(false);
let lastY = 0;

const onScroll = () => {
  const y = window.scrollY;
  hidden.value = y > lastY && y > 320;
  lastY = y;
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header class="header" :class="{ hide: hidden }">
    <div class="header-inner">
      <button class="brand mono" @click="goHome()" data-cursor="top" aria-label="Back to top">
        #PersonaFolio
      </button>
      <nav class="nav" aria-label="Sections">
        <button
          v-for="s in SECTIONS"
          :key="s.id"
          class="nav-link mono"
          :class="{ active: activeSection === s.id }"
          @click="goToSection(s.id)"
        >
          {{ s.label }}
          <span v-if="s.id === 'elevenhacks'" class="hot">Hot</span>
        </button>
      </nav>
      <div class="header-actions">
        <button class="cta mono" @click="goToSection('contact')" data-cursor="say hi">Get in touch</button>
        <SoundToggle />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 28px);
  max-width: var(--container);
  z-index: 100;
  transition: transform var(--t-mid) var(--ease);
}

.header.hide {
  transform: translateX(-50%) translateY(-150%);
}

.header-inner {
  @include glass(var(--glass-bg-strong));
  height: 56px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  padding: 0 8px 0 18px;
}

.brand {
  font-weight: 700;
  font-size: 14px;
}

.nav {
  display: none;
  gap: 1px;

  @include mq(lg) {
    display: flex;
  }
}

.nav-link {
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
  color: var(--muted);
  padding: 8px 12px;
  border-radius: 999px;
  transition:
    color 0.2s var(--ease),
    background 0.2s var(--ease);

  &:hover {
    color: var(--accent-ink);
    background: var(--accent);
  }

  &.active {
    color: var(--accent-text);
    background: rgba(199, 154, 58, 0.16);
  }

  &.active:hover {
    color: var(--accent-ink);
    background: var(--accent);
  }
}

.hot {
  position: absolute;
  top: -7px;
  right: -7px;
  font-family: var(--f-mono);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.3;
  color: #fff;
  background: #e0552b;
  border: 1px solid var(--manga-ink);
  border-radius: 999px;
  padding: 1px 5px;
  transform: rotate(9deg);
  box-shadow: 1px 1px 0 var(--manga-ink);
  pointer-events: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cta {
  font-size: 12px;
  font-weight: 500;
  padding: 9px 17px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  white-space: nowrap;
  transition: transform var(--t-fast) var(--ease);

  &:hover {
    transform: translateY(-1px);
  }
}
</style>
