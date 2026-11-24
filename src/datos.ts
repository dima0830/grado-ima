/*
  DATOS DE LA INVITACIÓN
  Cambia aquí la fecha, el lugar o el texto: toda la tarjeta se actualiza sola.
*/
export const datos = {
  institucion: "Instituto Moderno Americano",
  promocion: "2026",
  titulo: "Bachilleres Académicos",

  /* Fecha y hora de la ceremonia (Colombia: -05:00) */
  fecha: "2026-12-05T15:30:00-05:00",
  diaSemana: "sábado",
  dia: "05",
  mes: "diciembre",
  hora: "3:30 p.m.",

  lugar: {
    nombre: ["Institución Educativa", "Antonio Ricaurte CASD"],
    direccion: "Diagonal 19 N.º 20-56, Cantarrana 1",
    ciudad: "Villavicencio, Meta",
    mapa: "https://maps.app.goo.gl/PawtfceGTqgMPgNYA",
  },

  /* Cupos por invitación. Se puede cambiar por enlace: ?cupos=3 */
  cupos: 5,

  mensaje:
    "Nos honra contar con su presencia en esta ceremonia, donde celebramos con alegría el esfuerzo, la dedicación y los sueños cumplidos de cada graduando.",
};

/*
  Invitación personalizada por enlace (opcional):
  - Corto, por estudiante:  https://ima.innube.online/?n=José+Albeiro&a=Barrera+Álvarez
      → entrada "Invitación para la familia de José Albeiro"
      → portada "Graduando: José Albeiro Barrera Álvarez"
  - Libre: https://ima.innube.online/?para=Familia+Pérez&graduando=Laura+Pérez&cupos=4
*/
const q = new URLSearchParams(location.search);
const limpiar = (v: string | null) => (v ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
const nombres = limpiar(q.get("n"));
const apellidos = limpiar(q.get("a"));
export const personal = {
  para: limpiar(q.get("para")) || (nombres ? `la familia de ${nombres}` : ""),
  graduando: limpiar(q.get("graduando")) || [nombres, apellidos].filter(Boolean).join(" "),
  cupos: Math.min(20, Math.max(1, Number(q.get("cupos")) || datos.cupos)),
};

/* Enlace para agendar en Google Calendar (ceremonia de 3:30 a 6:30 p.m.) */
export function enlaceCalendario() {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `Ceremonia de Graduación · ${datos.institucion}`,
    dates: "20261205T203000Z/20261205T233000Z",
    details: `Ceremonia de graduación de los ${datos.titulo.toLowerCase()} del ${datos.institucion}. Invitación válida para ${personal.cupos} personas.`,
    location: `${datos.lugar.nombre.join(" ")}, ${datos.lugar.direccion}, ${datos.lugar.ciudad}`,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}
