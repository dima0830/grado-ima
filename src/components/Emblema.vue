<!-- Birrete con laurel dorado (dibujo vectorial, se adapta al tamaño) -->
<template>
  <svg class="emblema" viewBox="0 0 160 120" role="img" aria-label="Birrete de graduación">
    <defs>
      <linearGradient id="oro" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f3dea6" />
        <stop offset=".5" stop-color="#d8b46a" />
        <stop offset="1" stop-color="#a98336" />
      </linearGradient>
    </defs>
    <!-- laurel izquierdo -->
    <g fill="url(#oro)">
      <path d="M44 104c-14-8-22-24-20-42" fill="none" stroke="url(#oro)" stroke-width="1.6" stroke-linecap="round" />
      <ellipse v-for="(h, i) in hojas" :key="'i' + i" :cx="h.x" :cy="h.y" rx="6.5" ry="2.6" :transform="`rotate(${h.r} ${h.x} ${h.y})`" />
    </g>
    <!-- laurel derecho (espejo) -->
    <g fill="url(#oro)" transform="translate(160 0) scale(-1 1)">
      <path d="M44 104c-14-8-22-24-20-42" fill="none" stroke="url(#oro)" stroke-width="1.6" stroke-linecap="round" />
      <ellipse v-for="(h, i) in hojas" :key="'d' + i" :cx="h.x" :cy="h.y" rx="6.5" ry="2.6" :transform="`rotate(${h.r} ${h.x} ${h.y})`" />
    </g>
    <!-- birrete -->
    <path d="M80 26 38 44l42 18 42-18z" fill="url(#oro)" />
    <path d="M56 54v15c0 6 11 12 24 12s24-6 24-12V54L80 64z" fill="url(#oro)" opacity=".88" />
    <path d="M116 47v20" stroke="url(#oro)" stroke-width="2" stroke-linecap="round" />
    <path d="M113 67h6l2 11h-10z" fill="url(#oro)" />
  </svg>
</template>

<script setup lang="ts">
const hojas = [
  { x: 40, y: 99, r: -20 },
  { x: 32, y: 90, r: -40 },
  { x: 27, y: 79, r: -60 },
  { x: 25, y: 68, r: -78 },
  { x: 34, y: 100, r: 30 },
  { x: 25, y: 89, r: 10 },
  { x: 20, y: 77, r: -10 },
];
</script>

<style scoped>
.emblema { display: block; width: 100%; height: auto; overflow: visible; }
</style>
