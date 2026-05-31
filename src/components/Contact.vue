<script setup lang="ts">
import { profile } from "@/content/profile";
import Reveal from "./Reveal.vue";
import connectBg from "@/content/images/connect.png";
</script>

<template>
  <section id="contact" class="contact">
    <img class="contact-bg" :src="connectBg" alt="" aria-hidden="true" />
    <div class="contact-scrim" aria-hidden="true"></div>
    <div class="container contact-inner">
      <Reveal>
        <p class="eyebrow">Contact</p>
        <h2 class="contact-title">Let's build something<br />worth <em>talking</em> to.</h2>
        <a class="contact-mail" :href="profile.x" target="_blank" rel="noopener" data-cursor="open">@__padmanabhan</a>
        <div class="socials">
          <a
            v-for="s in profile.socials"
            :key="s.label"
            class="social mono"
            :href="s.url"
            target="_blank"
            rel="noopener"
            data-cursor="open"
          >
            {{ s.label }}
          </a>
        </div>
      </Reveal>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact {
  position: relative;
  overflow: hidden;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: var(--section-y);
}

.contact-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

/* warm cream wash, heavier on the left where the copy sits */
.contact-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(100deg, rgba(236, 228, 214, 0.88) 0%, rgba(236, 228, 214, 0.5) 36%, rgba(236, 228, 214, 0) 64%),
    linear-gradient(to top, rgba(28, 18, 6, 0.18) 0%, transparent 28%);
}

.contact-inner {
  position: relative;
  z-index: 2;
}

.contact-title {
  font-size: clamp(2.4rem, 7vw, 5rem);
  margin: var(--s-3) 0;
  @include manga-pop;

  em {
    font-style: italic;
    color: var(--accent-text);
  }
}

.contact-mail {
  display: inline-block;
  font-family: var(--f-sans);
  font-weight: 700;
  font-size: clamp(1.4rem, 4vw, 2.4rem);
  font-style: italic;
  margin-top: var(--s-5);
  border-bottom: 2px solid var(--accent);
  transition: color 0.2s var(--ease);

  &:hover {
    color: var(--accent-text);
  }
}

.socials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  margin-top: var(--s-7);
}

.social {
  @include glass();
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text);
  padding: 11px 20px;
  border-radius: 999px;
  transition: transform 0.2s var(--ease);

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
