<template>
  <!-- PANTALLA DE ENTRADA: el toque del invitado permite iniciar la música -->
  <Transition name="telon">
    <div v-if="!abierta" class="entrada" role="dialog" aria-modal="true" aria-labelledby="entrada-titulo">
      <div class="entrada-marco">
        <div class="entrada-emblema"><Emblema /></div>
        <p class="sobretitulo">{{ datos.institucion }}</p>
        <h1 id="entrada-titulo" class="entrada-titulo">Ceremonia de Graduación</h1>
        <p class="entrada-promo">Promoción {{ datos.promocion }}</p>
        <p v-if="personal.para" class="entrada-para">
          <span>Invitación para</span>
          {{ personal.para }}
        </p>
        <button class="boton boton-oro boton-abrir" type="button" @click="abrir">Abrir invitación</button>
      </div>
    </div>
  </Transition>

  <main class="tarjeta" :class="{ visible: abierta }">
    <div class="marco" aria-hidden="true" />

    <!-- PORTADA -->
    <header class="portada">
      <div class="destellos" aria-hidden="true">
        <i v-for="n in 14" :key="n" :style="destello(n)" />
      </div>
      <div class="portada-emblema revelar"><Emblema /></div>
      <p class="anio revelar">20 <span>·</span> {{ datos.promocion.slice(2) }}</p>
      <p class="ceremonia-de revelar">Ceremonia de</p>
      <h1 class="titulo revelar">Graduación</h1>
      <div class="filete revelar" aria-hidden="true"><span /></div>
      <p class="intro revelar">
        El <strong>{{ datos.institucion }}</strong> invita a la ceremonia de graduación de nuestros
        <span class="oro">{{ datos.titulo }}</span>.
      </p>
      <p v-if="personal.graduando" class="graduando revelar">
        <span>Graduando</span>
        {{ personal.graduando }}
      </p>
    </header>

    <!-- FECHA -->
    <section class="bloque fecha revelar" aria-label="Fecha y hora">
      <div class="fecha-lado">{{ datos.diaSemana }}</div>
      <div class="fecha-centro">
        <span class="fecha-dia">{{ datos.dia }}</span>
        <span class="fecha-mes">{{ datos.mes }}</span>
      </div>
      <div class="fecha-lado">{{ datos.hora }}</div>
    </section>

    <!-- CUENTA REGRESIVA -->
    <section class="bloque revelar" aria-labelledby="t-cuenta">
      <h2 id="t-cuenta" class="etiqueta">Faltan</h2>
      <CuentaRegresiva :fecha="datos.fecha" />
    </section>

    <!-- LUGAR -->
    <section class="bloque lugar revelar" aria-labelledby="t-lugar">
      <h2 id="t-lugar" class="etiqueta">Lugar</h2>
      <svg class="icono-lugar" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
      <p class="lugar-nombre">
        <span v-for="l in datos.lugar.nombre" :key="l">{{ l }}</span>
      </p>
      <p class="lugar-dir">{{ datos.lugar.direccion }}<br />{{ datos.lugar.ciudad }}</p>
      <div class="botones">
        <a class="boton boton-oro" :href="datos.lugar.mapa" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
          Ver ubicación
        </a>
        <a class="boton boton-linea" :href="enlaceCalendario()" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
          Agendar fecha
        </a>
      </div>
    </section>

    <!-- CUPOS -->
    <section class="cupos revelar" aria-label="Cupos">
      <span class="cupos-linea" aria-hidden="true" />
      <p>Invitación válida para <strong>{{ personal.cupos }} {{ personal.cupos === 1 ? "persona" : "personas" }}</strong></p>
      <span class="cupos-linea" aria-hidden="true" />
    </section>

    <!-- MENSAJE Y CIERRE -->
    <section class="cierre revelar">
      <p class="mensaje">{{ datos.mensaje }}</p>
      <p class="felicidades">¡Felicitaciones, graduandos!</p>
      <div class="logo">
        <img :src="logo" :alt="datos.institucion" width="640" height="275" loading="lazy" />
      </div>
    </section>

    <footer class="pie">
      Invitación digital por
      <a href="https://wa.me/573023798490" target="_blank" rel="noopener noreferrer">Innube</a>
    </footer>
  </main>

  <BotonMusica v-if="abierta" :sonando="sonando" @alternar="alternarMusica" />
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import Emblema from "./components/Emblema.vue";
import CuentaRegresiva from "./components/CuentaRegresiva.vue";
import BotonMusica from "./components/BotonMusica.vue";
import { datos, personal, enlaceCalendario } from "./datos";
import logo from "./assets/img/logo-ima.webp";
import cancion from "./assets/audio/pompa-y-circunstancia.mp3";

const abierta = ref(false);
const sonando = ref(false);
const audio = new Audio(cancion);
audio.loop = true;
audio.volume = 0.55;
audio.preload = "auto";
audio.addEventListener("play", () => (sonando.value = true));
audio.addEventListener("pause", () => (sonando.value = false));

function alternarMusica() {
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

async function abrir() {
  audio.play().catch(() => {});
  abierta.value = true;
  await nextTick();
  observar();
}

/* Puntitos dorados que suben en la portada (posiciones fijas, sin azar) */
function destello(n: number) {
  const x = (n * 37) % 100;
  return {
    left: `${x}%`,
    animationDelay: `${-(n * 1.7) % 9}s`,
    animationDuration: `${7 + (n % 5)}s`,
    transform: `scale(${0.5 + (n % 4) * 0.25})`,
  };
}

/* Aparición suave de cada bloque al bajar */
let observador: IntersectionObserver | undefined;
function observar() {
  observador?.disconnect();
  observador = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("dentro");
          observador?.unobserve(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  document.querySelectorAll(".revelar").forEach((el) => observador!.observe(el));
}

/* pausa la música si el invitado cambia de app o de pestaña */
function alOcultar() {
  if (document.hidden) audio.pause();
}
onMounted(() => document.addEventListener("visibilitychange", alOcultar));
onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", alOcultar);
  observador?.disconnect();
  audio.pause();
});
</script>
