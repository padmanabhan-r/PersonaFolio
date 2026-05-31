<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from "vue";
import { activeSlug, closeProject, openProject, goHome } from "@/composables/useRoute";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { lenis } from "@/composables/useScroll";
import Tag from "./Tag.vue";

const project = computed(() => (activeSlug.value ? getProject(activeSlug.value) : null));
const index = computed(() => projects.findIndex((p) => p.slug === activeSlug.value));
const next = computed(() => (index.value >= 0 ? projects[(index.value + 1) % projects.length] : null));

// Each project is its own page → start at the top whenever the slug changes.
const toTop = () => {
  if (lenis.value) lenis.value.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
};
watch(activeSlug, (v) => v && toTop());

const onKey = (e: KeyboardEvent) => {
  if (project.value && e.key === "Escape") closeProject();
};

onMounted(() => {
  window.addEventListener("keydown", onKey);
  toTop();
});
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <Transition name="page" appear>
    <main v-if="project" class="project" :aria-label="project.title">
      <div class="ptopbar container">
        <button class="back" @click="closeProject" data-cursor="back">← Back</button>
        <button class="home mono" @click="goHome" data-cursor="home">{{ profile.handle }} / home</button>
      </div>

      <div class="container pmain">
        <div class="pinfo">
          <p class="pkicker mono">ElevenHacks · build</p>
          <h1 class="phero-title">{{ project.title }}</h1>
          <p class="phero-blurb">{{ project.blurb }}</p>
          <div class="phero-tags">
            <Tag v-for="t in project.tags" :key="t" :name="t" />
          </div>
          <p class="pbody">{{ project.body }}</p>
          <div v-if="project.live" class="phero-actions">
            <a class="mbtn-gold" :href="project.live" target="_blank" rel="noopener" data-cursor="visit">Live view →</a>
          </div>
        </div>

        <div class="pmedia">
          <img :src="project.image" :alt="project.title" />
        </div>
      </div>

      <div v-if="next" class="container pnext">
        <button class="nextcard" @click="openProject(next.slug)" data-cursor="next">
          <div class="nextcard-cover"><img :src="next.image" :alt="next.title" /></div>
          <div class="nextcard-meta">
            <p class="mono">Next build</p>
            <h3>{{ next.title }}</h3>
          </div>
          <span class="nextcard-arrow">→</span>
        </button>
      </div>
    </main>
  </Transition>
</template>

<style scoped lang="scss">
.project {
  position: relative;
  min-height: 100svh;
  background: var(--bg);
  padding: var(--s-5) 0 var(--s-8);
}

.ptopbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  position: sticky;
  top: var(--s-4);
  z-index: 5;
}

/* comic-panel buttons (match Hero .mbtn) */
.back,
.home {
  font-family: var(--f-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--manga-ink);
  background: #fff;
  border: 2.5px solid var(--manga-ink);
  box-shadow: 4px 4px 0 var(--manga-ink);
  padding: 10px 18px;
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
}

.pmain {
  margin-top: var(--s-7);
  display: grid;
  gap: var(--s-6);
  align-items: start;

  @include mq(lg) {
    grid-template-columns: 1fr 1fr;
    gap: var(--s-8);
  }
}

.pinfo {
  display: flex;
  flex-direction: column;
}

.pkicker {
  display: inline-block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--manga-ink);
  background: var(--sticky-1);
  border: 2px solid var(--manga-ink);
  box-shadow: 3px 3px 0 var(--manga-ink);
  padding: 4px 11px;
  transform: rotate(-1.5deg);
}

.phero-title {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  line-height: 0.92;
  letter-spacing: 0.01em;
  margin: var(--s-5) 0 var(--s-3);
  transform: rotate(-1deg);
  @include manga-pop;
}

.phero-blurb {
  font-family: var(--f-sans);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--muted);
}

.phero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: var(--s-4) 0;
}

.phero-actions {
  margin-top: var(--s-5);
}

.mbtn-gold {
  display: inline-block;
  font-family: var(--f-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 13px;
  color: var(--accent-ink);
  background: var(--accent);
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
}

/* image in a bordered manga panel */
.pmedia {
  @include mq(lg) {
    position: sticky;
    top: var(--s-6);
  }

  img {
    width: 100%;
    border-radius: var(--r-md);
    border: 3px solid var(--manga-ink);
    box-shadow: 8px 8px 0 var(--manga-ink);
  }
}

.pbody {
  margin-top: var(--s-5);
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--text);
}

.pnext {
  margin-top: var(--s-8);
}

.nextcard {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--s-5);
  text-align: left;
  background: #fff;
  border: 2.5px solid var(--manga-ink);
  box-shadow: 5px 5px 0 var(--manga-ink);
  border-radius: var(--r-md);
  padding: var(--s-4);
  transition:
    transform 0.1s var(--ease),
    box-shadow 0.1s var(--ease);

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 var(--manga-ink);
  }
}

.nextcard-cover {
  width: 120px;
  flex: none;
  aspect-ratio: 16 / 11;
  border-radius: var(--r-sm);
  overflow: hidden;
  border: 2px solid var(--manga-ink);
  background: var(--bg-2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.nextcard-meta {
  flex: 1;

  p {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-text);
  }
  h3 {
    font-size: 1.4rem;
    color: var(--manga-ink);
  }
}

.nextcard-arrow {
  font-family: var(--f-manga);
  font-size: 28px;
  color: var(--manga-ink);
}

/* fade in (standalone page, not a slide-up overlay) */
.page-enter-active {
  transition: opacity var(--t-mid) var(--ease);
}
.page-enter-from {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active {
    transition: none;
  }
}
</style>
