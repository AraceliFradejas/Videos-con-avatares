# Tu proyecto

Copia esta carpeta a `projects/mi-proyecto` y personaliza `config/vertical.json`.

- `project`: identificador único con letras, números, guiones o guiones bajos.
- `scenes[].text`: texto hablado con tu presentación y tu historia.
- `scenes[].visual`: nombre de la imagen en `assets/screenshots/`.
- `intro` y `outro`: tarjetas heredadas que mencionan a Arucci; sustitúyelas por imágenes propias para tu identidad.

Crea `assets/diagrams/` con archivos Mermaid `.mmd` y renderiza con `npm run diagrams -- projects/mi-proyecto`. También puedes aportar capturas PNG en `assets/screenshots/`.

El generador de ElevenLabs crea `output/audio/`. El resto de descargas y montajes se guarda en `output/source/` y `output/video/`. Conserva los SRT en `subtitles/`.

Sigue [la guía completa](../../docs/EMPEZAR.md) sustituyendo las rutas del ejemplo por las de tu proyecto.
