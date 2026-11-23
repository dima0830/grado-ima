# Invitación de Grado · Instituto Moderno Americano 2026

Invitación web (Vue 3 + Vite) publicada en GitHub Pages.

## Personalizar

- **Fecha, lugar, cupos y mensaje:** `src/datos.ts`
- **Música:** `src/assets/audio/pompa-y-circunstancia.mp3` (Elgar, *Pompa y Circunstancia n.º 1*, grabación de la U.S. Marine Band, dominio público)
- **Logo:** `src/assets/img/logo-ima.webp`

## Enlaces personalizados (opcional)

Se puede enviar un enlace distinto a cada familia:

```
https://dima0830.github.io/grado-ima/?para=Familia%20Pérez&graduando=Laura%20Pérez&cupos=4
```

- `para`: aparece en la pantalla de entrada ("Invitación para…")
- `graduando`: aparece en la portada
- `cupos`: cambia "Invitación válida para N personas" (por defecto, 5)

## Desarrollo

```bash
npm install
npm run dev
```

Cada push a `main` se publica solo en GitHub Pages.
