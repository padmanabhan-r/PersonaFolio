<script setup lang="ts">
import { skills } from "@/content/resume";
import Reveal from "./Reveal.vue";
</script>

<template>
  <section id="skills" class="section skills-sec">
    <span class="paper-note mono" aria-hidden="true">★</span>
    <div class="container">
      <Reveal>
        <span class="stack-tag mono">Stack</span>
        <h2 class="skills-title">Skills</h2>
      </Reveal>

      <div class="sgrid">
        <Reveal v-for="(g, i) in skills" :key="g.category" :delay="i * 0.04">
          <div class="sgroup">
            <h3 class="sgroup-t">{{ g.category }}</h3>
            <div class="chips">
              <span v-for="item in g.items" :key="item" class="chip mono">{{ item }}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skills-sec {
  @include manga-paper;
}

/* keep copy above the decorative star stamp */
.container {
  position: relative;
  z-index: 1;
}

/* tilted comic star stamp in the gutter */
.paper-note {
  @include manga-note(-7deg);
}

.stack-tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sticky-1);
  background: var(--manga-ink);
  border: 2px solid var(--manga-ink);
  box-shadow: 3px 3px 0 rgba(28, 18, 6, 0.3);
  padding: 4px 12px;
  transform: rotate(-3deg);
}

.skills-title {
  font-family: var(--f-manga);
  font-weight: 400;
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: 0.01em;
  color: var(--manga-ink);
  margin: var(--s-3) 0 var(--s-7);
  transform: rotate(-1.5deg);
  @include manga-pop;
}

/* even grid — equal-height rows, no ragged masonry bottoms */
.sgrid {
  display: grid;
  gap: var(--s-5);

  @include mq(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mq(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* each group fills its row's height so cards line up flush */
.sgrid :deep(.reveal) {
  height: 100%;
}

.sgroup {
  @include manga-card($border: 2px, $shadow: 4px);
  height: 100%;
  padding: var(--s-5);
}

.sgroup-t {
  font-family: var(--f-sans);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--text);
  margin-bottom: var(--s-3);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  font-size: 12px;
  color: var(--manga-ink);
  background: #fff;
  border: 2px solid var(--manga-ink);
  box-shadow: 2px 2px 0 var(--manga-ink);
  border-radius: 999px;
  padding: 5px 13px;
  transition:
    transform var(--t-fast) var(--ease),
    box-shadow var(--t-fast) var(--ease);

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 var(--manga-ink);
  }

  @include reduce-motion {
    &:hover {
      transform: none;
    }
  }
}
</style>
