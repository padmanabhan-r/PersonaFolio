<script setup lang="ts">
import type { Project } from "@/content/projects";
import { openProject } from "@/composables/useRoute";
import Tag from "./Tag.vue";

defineProps<{ project: Project }>();
</script>

<template>
  <button class="pcard" v-tilt data-cursor="open" @click="openProject(project.slug)" :aria-label="`Open ${project.title}`">
    <div class="pcard-media">
      <img :src="project.image" :alt="project.title" loading="lazy" />
      <span class="pcard-open mono">View →</span>
    </div>
    <div class="pcard-body">
      <h3 class="pcard-title">{{ project.title }}</h3>
      <p class="pcard-blurb">{{ project.blurb }}</p>
      <div class="pcard-tags">
        <Tag v-for="t in project.tags.slice(0, 3)" :key="t" :name="t" />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.pcard {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;
  @include glass();
  border-radius: var(--r-lg);
  overflow: hidden;
  transition:
    box-shadow 0.4s var(--ease),
    border-color 0.4s var(--ease);
  will-change: transform;

  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-soft);

    .pcard-open {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.pcard-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-2);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.pcard-open {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 11px;
  color: var(--accent-ink);
  background: var(--accent);
  padding: 6px 13px;
  border-radius: 999px;
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.3s var(--ease),
    transform 0.3s var(--ease);
}

.pcard-body {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  padding: var(--s-5);
  flex: 1;
}

.pcard-title {
  font-size: 1.4rem;
}

.pcard-blurb {
  font-size: 0.98rem;
  color: var(--muted);
  flex: 1;
}

.pcard-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
