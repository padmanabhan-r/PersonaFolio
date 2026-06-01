<script setup lang="ts">
import { computed } from "vue";
import CustomCursor from "./components/CustomCursor.vue";
import AvatarCallout from "./components/AvatarCallout.vue";
import AppHeader from "./components/AppHeader.vue";
import IntroStage from "./components/IntroStage.vue";
import Experience from "./components/Experience.vue";
import Skills from "./components/Skills.vue";
import ElevenHacks from "./components/ElevenHacks.vue";
import Education from "./components/Education.vue";
import Contact from "./components/Contact.vue";
import SiteFooter from "./components/Footer.vue";
import ProjectPage from "./components/ProjectPage.vue";
import { useScroll } from "./composables/useScroll";
import { useRoute, activeSlug } from "./composables/useRoute";
import { useDidAgent } from "./composables/useDidAgent";
import { useSounds } from "./composables/useSounds";

useScroll();
useRoute();
useDidAgent();
useSounds();

// A project route replaces the home view entirely (standalone page, not a popup).
const onProject = computed(() => activeSlug.value !== null);
</script>

<template>
  <CustomCursor />
  <AvatarCallout />
  <!-- Home stays mounted (v-show) so scroll + GSAP state survive a project round-trip. -->
  <div v-show="!onProject" class="home-wrapper">
    <AppHeader />
    <main>
      <IntroStage />
      <Experience />
      <Skills />
      <ElevenHacks />
      <Education />
      <Contact />
    </main>
    <SiteFooter />
  </div>
  <ProjectPage v-if="onProject" />
</template>
