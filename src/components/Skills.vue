<script setup lang="ts">
import { skills } from "@/content/resume";
import Reveal from "./Reveal.vue";
</script>

<template>
  <section id="skills" class="section skills-sec">
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

.sgrid {
  display: grid;
  gap: var(--s-6) var(--s-7);

  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  border: 1.5px solid rgba(28, 18, 6, 0.22);
  box-shadow: 2px 2px 0 rgba(28, 18, 6, 0.12);
  border-radius: 999px;
  padding: 5px 13px;
  transition:
    transform var(--t-fast) var(--ease),
    box-shadow var(--t-fast) var(--ease),
    border-color var(--t-fast) var(--ease);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    box-shadow: 3px 3px 0 rgba(28, 18, 6, 0.2);
  }
}
</style>
