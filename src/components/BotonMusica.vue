<template>
  <button
    class="musica"
    :class="{ sonando }"
    type="button"
    :aria-label="sonando ? 'Pausar música' : 'Reproducir música'"
    :aria-pressed="sonando"
    @click="$emit('alternar')"
  >
    <span class="barras" aria-hidden="true"><i /><i /><i /><i /></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{ sonando: boolean }>();
defineEmits<{ alternar: [] }>();
</script>

<style scoped>
.musica {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  bottom: max(16px, env(safe-area-inset-bottom));
  z-index: 20;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--oro);
  background: rgba(18, 28, 61, 0.82);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: grid;
  place-items: center;
}
.barras { display: flex; align-items: flex-end; gap: 3px; height: 18px; }
.barras i {
  display: block;
  width: 3px;
  height: 5px;
  border-radius: 2px;
  background: var(--oro);
  transition: height 0.3s;
}
.sonando .barras i { animation: rebote 0.9s ease-in-out infinite; }
.sonando .barras i:nth-child(2) { animation-delay: -0.3s; }
.sonando .barras i:nth-child(3) { animation-delay: -0.6s; }
.sonando .barras i:nth-child(4) { animation-delay: -0.15s; }
@keyframes rebote {
  0%, 100% { height: 5px; }
  50% { height: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .sonando .barras i { animation: none; height: 12px; }
}
</style>
