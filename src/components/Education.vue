<script setup lang="ts">
import { education } from "@/content/resume";
import Reveal from "./Reveal.vue";
import GlassPanel from "./GlassPanel.vue";
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <Reveal>
        <p class="eyebrow">Education</p>
        <h2 class="section-title">Foundations.</h2>
      </Reveal>

      <div class="grid">
        <Reveal v-for="(e, i) in education" :key="e.degree" :delay="i * 0.06">
          <GlassPanel class="card">
            <h3 class="degree">{{ e.degree }}</h3>
            <p class="school">{{ e.school }}</p>
            <p class="loc mono">{{ e.location }}</p>
          </GlassPanel>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  gap: var(--s-5);

  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  padding: var(--s-6);
  height: 100%;
}

.degree {
  font-size: 1.6rem;
}

.school {
  font-size: 1.1rem;
  color: var(--muted);
  margin-top: var(--s-2);
}

.loc {
  font-size: 12px;
  color: var(--faint);
  margin-top: var(--s-2);
}
</style>
