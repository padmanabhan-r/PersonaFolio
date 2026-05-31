<script setup lang="ts">
import { profile } from "@/content/profile";
const year = 2026;
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="mono">© {{ year }} {{ profile.name }}</p>
      <p class="mono dim">Built with ElevenLabs · D-ID</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid var(--glass-border);
  padding-block: var(--s-6);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--muted);
}

.dim {
  color: var(--faint);
}
</style>
