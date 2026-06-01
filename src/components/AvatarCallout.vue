<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import { avatarReady } from "@/composables/useDidAgent";

// Shows once per session — a golden nudge toward the avatar bubble. Stays until the visitor
// either dismisses (X) or interacts with the avatar; scrolling does NOT dismiss it. The chosen
// exit retires it for the session (sessionStorage), so it never re-nags on internal re-renders.
const KEY = "pf_callout_seen";
const visible = ref(false);

const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let showTimer: number | null = null;

// The avatar renders in a cross-origin iframe, so clicks inside it never reach us — but focusing
// it fires window "blur" while the tab stays visible. That + a pointerdown outside our Vue root
// (the embed's own launcher chrome) cover "the visitor engaged the avatar".
const onAvatarBlur = () => {
  if (!document.hidden) dismiss(); // tab still visible → focus went into the embed iframe
};
const onDocDown = (e: PointerEvent) => {
  const t = e.target as Element | null;
  if (t && !t.closest("#app")) dismiss(); // clicked the embed widget (mounted outside #app)
};

const teardown = () => {
  if (showTimer !== null) window.clearTimeout(showTimer);
  showTimer = null;
  window.removeEventListener("blur", onAvatarBlur);
  document.removeEventListener("pointerdown", onDocDown, true);
};

const dismiss = () => {
  visible.value = false;
  teardown();
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* private mode — fine, just won't persist */
  }
};

// Wait for the embed to actually load, then reveal once the bubble has settled.
const stop = watch(
  avatarReady,
  (ready) => {
    if (!ready) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    stop(); // one-shot
    showTimer = window.setTimeout(() => {
      visible.value = true;
      window.addEventListener("blur", onAvatarBlur);
      document.addEventListener("pointerdown", onDocDown, true);
    }, 800);
  },
  { immediate: true },
);

onUnmounted(() => {
  stop();
  teardown();
});
</script>

<template>
  <Transition name="callout">
    <div v-if="visible" class="callout" :class="{ still: reduceMotion }" aria-live="polite">
      <div class="bubble">
        <span class="label mono">Click to talk</span>
        <button class="dismiss" type="button" aria-label="Dismiss" @click="dismiss">x</button>
      </div>
      <svg class="arrow" viewBox="0 0 120 104" fill="none" aria-hidden="true">
        <!-- ink outline behind, gold on top -->
        <path class="ink" d="M18 12 Q 24 78 92 90" />
        <polyline class="ink" points="70 84, 92 90, 86 68" />
        <path class="gold" d="M18 12 Q 24 78 92 90" />
        <polyline class="gold" points="70 84, 92 90, 86 68" />
      </svg>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.callout {
  position: fixed;
  bottom: 230px;
  right: 200px;
  z-index: 9990;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  width: max-content;
  max-width: 220px;
  pointer-events: none; /* load-bearing: never block the avatar click beneath */
}

.bubble {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px 7px 14px;
  background: var(--gold-line);
  border: 2px solid var(--manga-ink);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--manga-ink);
  transform: rotate(-2deg);
  pointer-events: auto;
}

.label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--manga-ink);
  white-space: nowrap;
}

.dismiss {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--manga-ink);
  color: var(--gold-line);
  font-family: var(--f-mono);
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  pointer-events: auto;
  transition: transform var(--t-fast) var(--ease);

  &:hover {
    transform: scale(1.12);
  }

  @include reduce-motion {
    &:hover {
      transform: none;
    }
  }
}

/* curved arrow pointing down-right at the avatar bubble */
.arrow {
  width: 96px;
  height: 84px;
  margin-right: 14px;
  overflow: visible;
  animation: callout-bob 2.4s ease-in-out infinite;

  .ink {
    stroke: var(--manga-ink);
    stroke-width: 9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .gold {
    stroke: var(--gold-line);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
}

@keyframes callout-bob {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(3px, 4px); }
}

.callout.still .arrow {
  animation: none;
}
@include reduce-motion {
  .arrow {
    animation: none;
  }
}

/* enter/leave */
.callout-enter-active,
.callout-leave-active {
  transition:
    opacity 0.4s var(--ease),
    transform 0.4s var(--ease);
}
.callout-enter-from,
.callout-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@include reduce-motion {
  .callout-enter-active,
  .callout-leave-active {
    transition: opacity 0.2s linear;
  }
  .callout-enter-from,
  .callout-leave-to {
    transform: none;
  }
}

/* smaller embed on phones — tuck higher so it clears the footer CTA */
@media (max-width: 600px) {
  .callout {
    bottom: 205px;
    right: 44px;
  }
  .arrow {
    width: 74px;
    height: 64px;
  }
}
</style>
