<script setup lang="ts">
import type { Project } from "@/content/projects";
import { openProject } from "@/composables/useRoute";
import Tag from "./Tag.vue";

defineProps<{ project: Project }>();
</script>

<template>
  <button class="pcard" data-cursor="open" @click="openProject(project.slug)" :aria-label="`Open ${project.title}`">
    <div class="pcard-media">
      <img :src="project.image" :alt="project.title" loading="lazy" />
      <span class="pcard-open mono">View →</span>
    </div>
    <div class="pcard-body">
      <h3 class="pcard-title">{{ project.title }}</h3>
      <p class="pcard-blurb">{{ project.blurb }}</p>
      <div class="pcard-foot">
        <div class="pcard-tags">
          <Tag v-for="t in project.tags.slice(0, 3)" :key="t" :name="t" />
        </div>
        <div class="pcard-meta">
          <span v-if="project.award" class="pcard-award">{{ project.award }}</span>
          <span class="pcard-week mono">Week {{ project.week }}</span>
        </div>
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
  @include manga-card();
  overflow: hidden;
  transition:
    transform var(--t-fast) var(--ease),
    box-shadow var(--t-fast) var(--ease);

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 var(--manga-ink);

    .pcard-open {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @include reduce-motion {
    &:hover {
      transform: none;
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
    object-fit: cover;
    object-position: center top;
  }
}

.pcard-open {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 11px;
  color: var(--accent-ink);
  background: var(--accent);
  border: 1.5px solid var(--manga-ink);
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

/* footer: tags on the left, award + week badge bottom-right */
.pcard-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
}

.pcard-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
}

.pcard-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}

.pcard-award {
  font-size: 1.15rem;
  line-height: 1;
}

/* weekly build number — sticky-note badge */
.pcard-week {
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--manga-ink);
  background: var(--sticky-1);
  border: 2px solid var(--manga-ink);
  box-shadow: 2px 2px 0 var(--manga-ink);
  padding: 3px 9px;
  transform: rotate(-3deg);
  white-space: nowrap;
}
</style>
