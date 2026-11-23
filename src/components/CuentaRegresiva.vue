<template>
  <div class="cuenta" aria-live="polite">
    <template v-if="!terminado">
      <div v-for="u in unidades" :key="u.nombre" class="unidad">
        <span class="numero">{{ String(u.valor).padStart(2, "0") }}</span>
        <span class="nombre">{{ u.nombre }}</span>
      </div>
    </template>
    <p v-else class="hoy">¡Hoy celebramos este gran logro!</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{ fecha: string }>();
const objetivo = new Date(props.fecha).getTime();
const ahora = ref(Date.now());
let reloj: number | undefined;

onMounted(() => (reloj = window.setInterval(() => (ahora.value = Date.now()), 1000)));
onBeforeUnmount(() => clearInterval(reloj));

const resta = computed(() => Math.max(0, objetivo - ahora.value));
// pasada la hora de inicio, el mensaje se queda el resto del día
const terminado = computed(() => resta.value === 0);
const unidades = computed(() => {
  const s = Math.floor(resta.value / 1000);
  return [
    { nombre: "días", valor: Math.floor(s / 86400) },
    { nombre: "horas", valor: Math.floor((s % 86400) / 3600) },
    { nombre: "min", valor: Math.floor((s % 3600) / 60) },
    { nombre: "seg", valor: s % 60 },
  ];
});
</script>

<style scoped>
.cuenta {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  max-width: 22rem;
  margin: 0 auto;
}
.unidad {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.85rem 0 0.7rem;
  border: 1px solid var(--oro-linea);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(216, 180, 106, 0.09), rgba(216, 180, 106, 0.02));
}
.numero {
  font-family: var(--serif);
  font-size: clamp(2rem, 9vw, 2.6rem);
  line-height: 1;
  color: var(--oro-claro);
  font-variant-numeric: lining-nums tabular-nums;
}
.nombre {
  margin-top: 0.4rem;
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--texto-suave);
}
.hoy {
  grid-column: 1 / -1;
  font-family: var(--serif);
  font-size: 1.6rem;
  font-style: italic;
  color: var(--oro-claro);
  text-align: center;
}
</style>
