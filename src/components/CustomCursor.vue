<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const dot = ref<HTMLElement | null>(null);
const ring = ref<HTMLElement | null>(null);
const enabled = ref(false);
const on = ref(false);

const HOVER_SEL = "[data-cursor], a, button, .pcard, .nav-link, .filter, .social";

let raf = 0;
let tx = 0;
let ty = 0;
let dx = 0;
let dy = 0;
let rx = 0;
let ry = 0;

const move = (e: PointerEvent) => {
  tx = e.clientX;
  ty = e.clientY;
};

const over = (e: Event) => {
  if ((e.target as Element)?.closest?.(HOVER_SEL)) on.value = true;
};
const out = (e: Event) => {
  if ((e.target as Element)?.closest?.(HOVER_SEL)) on.value = false;
};

const tick = () => {
  // dot tracks tightly, ring trails for a smooth lag
  dx += (tx - dx) * 0.4;
  dy += (ty - dy) * 0.4;
  rx += (tx - rx) * 0.16;
  ry += (ty - ry) * 0.16;
  if (dot.value) dot.value.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
  if (ring.value) ring.value.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  raf = requestAnimationFrame(tick);
};

onMounted(() => {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  enabled.value = true;
  tx = ty = dx = dy = rx = ry = -100;
  window.addEventListener("pointermove", move);
  document.addEventListener("mouseover", over);
  document.addEventListener("mouseout", out);
  raf = requestAnimationFrame(tick);
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("pointermove", move);
  document.removeEventListener("mouseover", over);
  document.removeEventListener("mouseout", out);
});
</script>

<template>
  <template v-if="enabled">
    <div ref="ring" class="cursor-ring" :class="{ on }"></div>
    <div ref="dot" class="cursor-dot" :class="{ on }"></div>
  </template>
</template>

<style scoped lang="scss">
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-dot {
  width: 7px;
  height: 7px;
  background: var(--text);
  transition:
    background 0.2s var(--ease),
    opacity 0.2s var(--ease);
}

.cursor-ring {
  width: 34px;
  height: 34px;
  border: 1.5px solid var(--border-strong, rgba(80, 50, 20, 0.35));
  transition:
    width 0.28s var(--ease),
    height 0.28s var(--ease),
    border-color 0.28s var(--ease),
    background 0.28s var(--ease);
}

.cursor-ring.on {
  width: 46px;
  height: 46px;
  border-color: var(--accent);
  background: rgba(199, 154, 58, 0.1);
}

.cursor-dot.on {
  background: var(--accent);
}
</style>
