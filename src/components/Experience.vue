<script setup lang="ts">
import { experience } from "@/content/resume";
import Reveal from "./Reveal.vue";
import Tag from "./Tag.vue";
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <Reveal>
        <p class="eyebrow">Experience</p>
        <h2 class="section-title">A decade building data &amp; AI systems.</h2>
      </Reveal>

      <ol class="timeline">
        <Reveal v-for="(entry, i) in experience" :key="entry.company" :delay="i * 0.05">
          <article class="card">
            <h3 class="card-company">{{ entry.company }}</h3>
            <div v-for="role in entry.roles" :key="role.title + role.period" class="role">
              <div class="role-head">
                <p class="role-title">{{ role.title }}</p>
                <p class="role-period mono">{{ role.period }}</p>
              </div>
              <ul class="role-bullets">
                <li v-for="b in role.bullets" :key="b">{{ b }}</li>
              </ul>
            </div>
          </article>
        </Reveal>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--s-5);
}

.card {
  @include glass();
  border-radius: var(--r-lg);
  padding: clamp(var(--s-5), 4vw, var(--s-7));
}

.card-company {
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin-bottom: var(--s-4);
}

.role {
  &:not(:last-child) {
    margin-bottom: var(--s-5);
    padding-bottom: var(--s-5);
    border-bottom: 1px solid var(--glass-border);
  }
}

.role-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s-2);
}

.role-title {
  font-weight: 600;
  font-size: 1.15rem;
}

.role-period {
  font-size: 12px;
  color: var(--accent-text);
  white-space: nowrap;
}

.role-bullets {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  margin-top: var(--s-3);

  li {
    position: relative;
    padding-left: var(--s-4);
    color: var(--muted);
    font-size: 1rem;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent);
    }
  }
}
</style>
