<script setup lang="ts">
import { education } from "@/content/resume";
import Reveal from "./Reveal.vue";
</script>

<template>
  <section id="education" class="section edu-sec">
    <span class="paper-note mono" aria-hidden="true">★</span>
    <div class="container">
      <Reveal>
        <p class="eyebrow">Education</p>
        <h2 class="section-title">Foundations.</h2>
      </Reveal>

      <div class="grid">
        <Reveal v-for="(e, i) in education" :key="e.degree" :delay="i * 0.06">
          <article class="card">
            <h3 class="degree">{{ e.degree }}</h3>
            <p class="school">{{ e.school }}</p>
            <p class="loc mono">{{ e.location }}</p>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.edu-sec {
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

/* sticky-note label (matches the other sections) */
.eyebrow {
  @include manga-sticky;

  &::before {
    display: none;
  }
}

.grid {
  display: grid;
  gap: var(--s-5);

  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  @include manga-card();
  height: 100%;
  padding: var(--s-6);
  transition:
    transform var(--t-fast) var(--ease),
    box-shadow var(--t-fast) var(--ease);

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 var(--manga-ink);
  }

  @include reduce-motion {
    &:hover {
      transform: none;
    }
  }
}

/* gentle floating — staggered amplitudes/durations so neighbours don't bob in unison (matches the About HUD) */
@keyframes float-1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
@keyframes float-2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-11px); }
}
@keyframes float-3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.grid :deep(.reveal:nth-child(3n + 1)) .card {
  animation: float-1 5.6s ease-in-out infinite;
}
.grid :deep(.reveal:nth-child(3n + 2)) .card {
  animation: float-3 6s ease-in-out infinite 0.6s;
}
.grid :deep(.reveal:nth-child(3n)) .card {
  animation: float-2 6.8s ease-in-out infinite 1s;
}

@include reduce-motion {
  .grid :deep(.reveal) .card {
    animation: none;
  }
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
