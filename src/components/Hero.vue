<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { profile } from "@/content/profile";
import { goToSection } from "@/composables/useRoute";
import heroBg from "@/content/images/hero.png";

// Cycle the big hero title between the name and the handle.
const names = [profile.name, profile.handle];
const idx = ref(0);
const name = computed(() => names[idx.value]);
let timer: number | undefined;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  timer = window.setInterval(() => {
    idx.value = (idx.value + 1) % names.length;
  }, 2800);
});
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <section id="hero" class="hero">
    <img class="hero-bg" :src="heroBg" alt="" aria-hidden="true" fetchpriority="high" />
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="hero-burst" aria-hidden="true"></div>

    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="eyebrow-manga mono">&gt;&gt; {{ profile.role }} &lt;&lt;</p>

        <h1 class="hero-name">
          <Transition name="swap" mode="out-in">
            <span :key="name">{{ name }}</span>
          </Transition>
        </h1>

        <div class="hero-cta">
          <button class="mbtn mbtn-primary" data-cursor="view" @click="goToSection('elevenhacks')">View builds</button>
          <button class="mbtn" data-cursor="say hi" @click="goToSection('contact')">Get in touch</button>
        </div>
      </div>
    </div>

    <button class="hero-scroll mono" data-cursor="scroll" @click="goToSection('about')">scroll ↓</button>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: calc(var(--header-h) + var(--s-6));
  padding-bottom: var(--s-8);
  overflow: hidden;
}

/* full-bleed scene */
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 60% center;
  z-index: 0;
}

/* warm cream wash, heavier on the left where the copy lives */
.hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(100deg, rgba(236, 228, 214, 0.82) 0%, rgba(236, 228, 214, 0.42) 34%, rgba(236, 228, 214, 0) 60%),
    linear-gradient(to top, rgba(28, 18, 6, 0.22) 0%, transparent 30%);
}

/* faint speed-line burst behind the title for comic energy + title contrast */
.hero-burst {
  position: absolute;
  z-index: 2;
  left: -8%;
  top: 46%;
  transform: translateY(-50%);
  width: min(80vw, 920px);
  aspect-ratio: 1;
  pointer-events: none;
  opacity: 0.55;
  background:
    radial-gradient(circle, rgba(244, 221, 130, 0.35) 0%, transparent 52%),
    repeating-conic-gradient(
      from 0deg at 50% 50%,
      rgba(28, 18, 6, 0.06) 0deg 1.4deg,
      transparent 1.4deg 6deg
    );
  -webkit-mask: radial-gradient(circle, #000 0%, transparent 56%);
  mask: radial-gradient(circle, #000 0%, transparent 56%);
}

.hero-inner {
  position: relative;
  z-index: 3;
}

.hero-copy {
  max-width: 40rem;
}

.eyebrow-manga {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--manga-ink);
  background: var(--sticky-1);
  border: 2px solid var(--manga-ink);
  box-shadow: 3px 3px 0 var(--manga-ink);
  padding: 5px 12px;
  transform: rotate(-1.5deg);
}

.hero-name {
  font-family: var(--f-manga);
  font-weight: 400;
  font-size: clamp(3.6rem, 13vw, 10.5rem);
  line-height: 0.9;
  letter-spacing: 0.01em;
  margin: var(--s-4) 0;
  transform: rotate(-2deg);
  min-height: 0.9em; /* hold height during the out-in swap */

  span {
    display: inline-block;
    color: #fff;
    paint-order: stroke fill;
    -webkit-text-stroke: clamp(2px, 0.55vw, 5px) var(--manga-ink);
    text-shadow:
      3px 3px 0 var(--manga-ink),
      7px 7px 0 rgba(28, 18, 6, 0.28);
  }
}

.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.35s var(--ease),
    transform 0.35s var(--ease);
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(0.25em);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-0.25em);
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  margin-top: var(--s-6);
}

.mbtn {
  font-family: var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 13px;
  color: var(--manga-ink);
  background: #fff;
  border: 2.5px solid var(--manga-ink);
  box-shadow: 4px 4px 0 var(--manga-ink);
  padding: 13px 24px;
  border-radius: 4px;
  transition:
    transform 0.1s var(--ease),
    box-shadow 0.1s var(--ease);

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 6px 6px 0 var(--manga-ink);
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 var(--manga-ink);
  }

  &-primary {
    background: var(--accent);
    color: var(--accent-ink);
  }
}

.hero-scroll {
  position: absolute;
  z-index: 4;
  bottom: var(--s-5);
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--manga-ink);
  background: #fff;
  border: 2px solid var(--manga-ink);
  box-shadow: 3px 3px 0 var(--manga-ink);
  padding: 6px 14px;
  animation: bob 1.8s ease-in-out infinite;
}

@keyframes bob {
  50% {
    transform: translate(-50%, 6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll {
    animation: none;
  }
}
</style>
