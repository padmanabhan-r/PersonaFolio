<script setup lang="ts">
import { computed, ref } from "vue";
import { projects } from "@/content/projects";
import Reveal from "./Reveal.vue";
import ProjectCard from "./ProjectCard.vue";

const CATEGORY: Record<string, string> = {
  killmystartup: "voice",
  vault: "games",
  eleventales: "voice",
  grooveforge: "tools",
  stringiq: "tools",
  "rhythm-kingdom": "games",
  hnplusplus: "tools",
  beacon: "voice",
  multiverse: "tools",
  "hermes-xi": "agentic",
  personafolio: "agentic",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "voice", label: "Voice" },
  { id: "agentic", label: "Agentic" },
  { id: "tools", label: "Tools" },
  { id: "games", label: "Games" },
];

const active = ref("all");
const filtered = computed(() =>
  active.value === "all" ? projects : projects.filter((p) => CATEGORY[p.slug] === active.value),
);
</script>

<template>
  <section id="elevenhacks" class="section eh-sec">
    <span class="paper-note mono" aria-hidden="true">★</span>
    <div class="container">
      <Reveal class="head">
        <p class="eyebrow">ElevenHacks</p>
        <h2 class="section-title">Eleven AI builds, one hack at a time.</h2>
        <p class="sub">Real products with real purpose — built to scale, not hackathon toys that die after the demo. Open any card to dive in.</p>
      </Reveal>

      <Reveal :delay="0.1">
        <div class="filters">
          <button
            v-for="f in FILTERS"
            :key="f.id"
            class="filter mono"
            :class="{ active: active === f.id }"
            @click="active = f.id"
          >
            {{ f.label }}
          </button>
        </div>
      </Reveal>

      <TransitionGroup tag="div" name="grid" class="grid">
        <ProjectCard v-for="p in filtered" :key="p.slug" :project="p" />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped lang="scss">
.eh-sec {
  @include manga-paper;
}

/* keep copy above the decorative star stamp */
.container {
  position: relative;
  z-index: 1;
}

/* tilted comic star stamp in the gutter */
.paper-note {
  @include manga-note(6deg);
}

.head {
  margin-bottom: var(--s-5);
}

/* sticky-note label (matches the other sections) */
.eyebrow {
  @include manga-sticky;

  &::before {
    display: none;
  }
}

.sub {
  font-family: var(--f-sans);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--muted);
  max-width: 48ch;
  margin-top: calc(-1 * var(--s-4));
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-bottom: var(--s-6);
}

.filter {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--manga-ink);
  padding: 9px 17px;
  border-radius: 999px;
  border: 2px solid var(--manga-ink);
  background: #fff;
  box-shadow: 2px 2px 0 var(--manga-ink);
  transition:
    transform var(--t-fast) var(--ease),
    box-shadow var(--t-fast) var(--ease),
    background var(--t-fast) var(--ease),
    color var(--t-fast) var(--ease);

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 var(--manga-ink);
  }

  &.active {
    color: var(--accent-ink);
    background: var(--accent);
  }

  @include reduce-motion {
    &:hover {
      transform: none;
    }
  }
}

.grid {
  display: grid;
  gap: var(--s-5);
  grid-template-columns: 1fr;

  @include mq(sm) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mq(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid-enter-active,
.grid-leave-active {
  transition:
    opacity 0.4s var(--ease),
    transform 0.4s var(--ease);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.grid-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .grid-enter-active,
  .grid-leave-active {
    transition: none;
  }
}
</style>
