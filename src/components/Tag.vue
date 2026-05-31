<script setup lang="ts">
import { tagLabel } from "@/content/tags";
defineProps<{ name: string }>();
</script>

<template>
  <span class="tag mono">{{ tagLabel(name) }}</span>
</template>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--muted);
  background: var(--bg-2);
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  padding: 5px 11px;
  white-space: nowrap;
  transition:
    background 0.2s var(--ease),
    color 0.2s var(--ease),
    border-color 0.2s var(--ease);

  &:hover {
    background: var(--accent-soft);
    border-color: transparent;
    color: #2a1606;
  }
}
</style>
