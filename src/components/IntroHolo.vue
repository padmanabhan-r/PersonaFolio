<script setup lang="ts">
import { profile } from "@/content/profile";
import skillsImg from "@/content/images/skills.png";

// High-level focus themes (summary). Full breakdown lives on the Skills page.
const focus = [
  "Generative AI & LLM Applications",
  "AI Product Management & Delivery",
  "Agentic AI Systems",
  "Machine Learning Engineering",
  "Cloud & Data Platform Architecture",
];
</script>

<template>
  <section id="holo" class="holo">
    <img class="holo-bg" :src="skillsImg" alt="" aria-hidden="true" />
    <div class="holo-scrim" aria-hidden="true"></div>

    <div class="holo-grid">
      <!-- name (upper-left) -->
      <div class="panel panel-name">
        <span class="lead lead-right" aria-hidden="true"></span>
        <p class="who">{{ profile.name }}</p>
        <p class="where mono">◉ {{ profile.location }}</p>
      </div>

      <!-- bio (lower-left) -->
      <div class="panel panel-bio">
        <span class="lead lead-right" aria-hidden="true"></span>
        <p>Turns business goals into production-grade AI products that ship and scale.</p>
      </div>

      <!-- skills summary (right) -->
      <div class="panel panel-skills">
        <span class="lead lead-left" aria-hidden="true"></span>
        <p class="panel-h mono">Skills</p>
        <ul class="focus">
          <li v-for="f in focus" :key="f">{{ f }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.holo {
  position: relative;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  background: #140d03;
  color: var(--holo-cream);
}

.holo-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.holo-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(rgba(10, 6, 1, 0.42), rgba(10, 6, 1, 0.42)),
    radial-gradient(ellipse 40% 66% at 50% 50%, transparent 44%, rgba(10, 6, 1, 0.5) 100%),
    linear-gradient(90deg, rgba(10, 6, 1, 0.6) 0%, transparent 30%, transparent 70%, rgba(10, 6, 1, 0.6) 100%);
}

/* mobile: stacked column; desktop: panels absolutely placed as a HUD around the figure */
.holo-grid {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
  min-height: 100svh;
  justify-content: center;
  padding: calc(var(--header-h) + var(--s-5)) var(--outer) var(--s-7);

  @include mq(lg) {
    display: contents;
  }
}

/* ── HUD panels ── */
.panel {
  position: relative;
  width: 100%;
  max-width: 24rem;
  background: var(--holo-panel);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid var(--gold-line);
  border-radius: var(--r-md);
  box-shadow:
    0 0 24px var(--gold-glow),
    4px 4px 0 rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  padding: var(--s-4) var(--s-5);

  @include mq(lg) {
    position: absolute;
    z-index: 2;
    width: auto;
  }
}

.panel-name {
  @include mq(lg) {
    top: 19%;
    left: 6%;
    min-width: 14rem;
  }
}
.panel-bio {
  @include mq(lg) {
    top: 56%;
    left: 9%;
    max-width: 18rem;
  }
}
.panel-skills {
  @include mq(lg) {
    top: 28%;
    right: 6%;
    min-width: 15rem;
  }
}

/* gentle floating — staggered durations/offsets so the panels don't bob in unison */
@keyframes floaty-a {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes floaty-b {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-13px); }
}
@keyframes floaty-c {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.panel-name {
  animation: floaty-a 5s ease-in-out infinite;
}
.panel-bio {
  animation: floaty-b 6s ease-in-out infinite 0.8s;
}
.panel-skills {
  animation: floaty-c 4.6s ease-in-out infinite 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  .panel-name,
  .panel-bio,
  .panel-skills {
    animation: none;
  }
}

/* connector stubs toward the central figure (desktop only) */
.lead {
  display: none;
  @include mq(lg) {
    display: block;
    position: absolute;
    top: 50%;
    width: 11vw;
    height: 2px;
    box-shadow: 0 0 8px var(--gold-glow);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 9px;
      height: 9px;
      background: var(--gold-line);
      box-shadow: 0 0 10px var(--gold-line);
      transform: translateY(-50%) rotate(45deg);
    }
  }
}
.lead-right {
  left: 100%;
  background: linear-gradient(to right, var(--gold-line), transparent);
  &::after {
    right: -4px;
  }
}
.lead-left {
  right: 100%;
  background: linear-gradient(to left, var(--gold-line), transparent);
  &::after {
    left: -4px;
  }
}

.who {
  font-family: var(--f-manga);
  font-size: clamp(1.8rem, 3.6vw, 2.4rem);
  line-height: 1;
  color: #fff;
  -webkit-text-stroke: 1.5px var(--manga-ink);
  paint-order: stroke fill;
}

.where {
  font-size: 12px;
  color: var(--gold-line);
  margin-top: 8px;
}

.panel-bio p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--holo-cream);
}

.panel-h {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 12px;
  color: var(--gold-line);
  margin-bottom: var(--s-3);
}

.focus {
  display: flex;
  flex-direction: column;
  gap: 7px;

  li {
    position: relative;
    padding-left: var(--s-4);
    font-size: 0.92rem;
    color: var(--holo-cream);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      width: 7px;
      height: 7px;
      background: var(--gold-line);
      box-shadow: 0 0 8px var(--gold-glow);
      transform: rotate(45deg);
    }
  }
}

</style>
