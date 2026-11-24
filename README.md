# Invitación de Grado · Instituto Moderno Americano 2026

Invitación web (Vue 3 + Vite) publicada en GitHub Pages.

## Personalizar

- **Fecha, lugar, cupos y mensaje:** `src/datos.ts`
- **Música:** `src/assets/audio/pompa-y-circunstancia.mp3` (Elgar, *Pompa y Circunstancia n.º 1*, grabación de la U.S. Marine Band, dominio público)
- **Logo:** `src/assets/img/logo-ima-bandera.svg` (el primer logo de `logo-cv.vectorcraft`)

## Enlaces personalizados (opcional)

Se puede enviar un enlace distinto a cada familia:

```
https://ima.innube.online/?n=Laura+Camila&a=Pulido+Idárraga
```

- `n` y `a`: nombres y apellidos del graduando. La entrada dice "Invitación para la familia de <nombres>" y la portada muestra el nombre completo.
- `para` y `graduando`: textos libres, por si se necesita otro texto
- `cupos`: cambia "Invitación válida para N personas" (por defecto, 5)

## Desarrollo

```bash
npm install
npm run dev
```

Cada push a `main` se publica solo en GitHub Pages.
