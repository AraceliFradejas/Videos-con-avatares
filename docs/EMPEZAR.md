# De cero a un vídeo con tu propio avatar

## Qué incluye y qué debes aportar

Este proyecto conecta herramientas; no entrena avatares ni publica en redes. El ejemplo completo es `projects/avatar-pipeline/`. El corto utiliza ElevenLabs para la voz y HeyGen para la imagen; el largo es una ruta independiente con Synthesia. Mermaid genera los gráficos y FFmpeg monta el vídeo vertical. Puedes ejecutar una sola ruta.

Aporta tus cuentas con acceso por API, claves, un `voice_id` y los identificadores de los avatares que puedas usar. Los recursos de Araceli y Arucci no se distribuyen. Una suscripción al editor de un proveedor no garantiza acceso a su API. Comprueba el acceso antes de generar; las solicitudes pueden consumir créditos. No se incluyen música ni licencias de voces o avatares de terceros.

## 1. Instalar

Necesitas Git, Node.js 22 o superior, npm, FFmpeg, jq y zsh. Los scripts de montaje usan zsh; no son scripts de PowerShell.

macOS con Homebrew:

```bash
brew install node ffmpeg jq
```

Ubuntu/Debian: instala Node.js 22 o superior siguiendo su distribución oficial y las otras herramientas con:

```bash
sudo apt-get install ffmpeg jq zsh fonts-dejavu-core
```

Windows: utiliza WSL2 con Linux y ejecuta todos los comandos dentro de WSL. No se ha validado ejecución nativa en Windows.

Clona el repositorio y entra en su carpeta:

```bash
git clone https://github.com/AraceliFradejas/Videos-con-avatares.git
cd Videos-con-avatares
```

Después ejecuta:

```bash
npm ci
cp .env.example .env
npm run check
npm test
```

La instalación de Mermaid CLI descarga Chromium a través de Puppeteer. Necesita conexión y espacio disponible. Las comprobaciones y diagramas no llaman a proveedores de generación.

## 2. Configurar tus recursos

Edita `.env` localmente:

```dotenv
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
HEYGEN_API_KEY=
HEYGEN_AVATAR_ID=
SYNTHESIA_API_KEY=
SYNTHESIA_AVATAR_ID=
FFMPEG_BIN=ffmpeg
```

No compartas ese archivo. Copia los identificadores desde tu cuenta o consulta el listado de voces/avatares del proveedor. Un nombre visible no sustituye al identificador. Para Synthesia v2 utiliza una clave con el alcance Legacy (v2), según su documentación. Si tu avatar personal no está disponible en API, utiliza el editor de Synthesia y el guion Markdown.

Los scripts leen `.env`, después `.env.elevenlabs`, `.env.heygen` o `.env.synthesia` cuando existen; las variables exportadas en el entorno tienen prioridad. Las rutas se interpretan desde la raíz del repositorio. `FFMPEG_BIN` en `.env` sirve para el generador de audio; para los scripts de shell expórtalo en tu terminal si tu ejecutable no está en PATH. `FONT_FILE` permite elegir una fuente en el montaje.

## 3. Personalizar el guion y generar los gráficos

Revisa `projects/avatar-pipeline/guion.md`. Cambia el nombre de la presentadora, la historia y el texto en `config/vertical-arucci.json`. Los campos `text` contienen exclusivamente texto hablado. Cada `visual` debe coincidir con una imagen en `assets/screenshots/`. Mantén `project` como identificador con letras, números, guiones o guiones bajos.

Los `.mmd` son las fuentes editables. Puedes verlos en GitHub o exportarlos a PNG:

```bash
npm run diagrams -- projects/avatar-pipeline
```

Para tu propio proyecto, copia `templates/project` a `projects/mi-proyecto`, adapta el JSON y crea su carpeta `assets/diagrams`. Utiliza pocos nodos por plano para que sean legibles en móvil; reserva el diagrama completo para la documentación.

## 4. Generar voz — llamada a ElevenLabs

Este comando envía el texto y consume los recursos de tu cuenta:

```bash
node scripts/audio/generar-elevenlabs.mjs projects/avatar-pipeline/config/vertical-arucci.json
```

Se guardan los MP3 por escena, el audio unido y `avatar-pipeline-timings.json` en `projects/avatar-pipeline/output/audio/`. La caché comprueba texto y voz; borrar una escena MP3 fuerza su regeneración. Los tiempos se miden con FFmpeg. No son alineaciones por palabra y deben revisarse en el montaje.

## 5. Generar el avatar — llamada a HeyGen

```bash
node scripts/avatars/generar-heygen.mjs \
  projects/avatar-pipeline/output/audio/avatar-pipeline-arucci-elevenlabs.mp3 \
  "Mi vídeo con avatar"
```

Conserva el `video_id` devuelto. El script sube audio y solicita una generación, pero no espera a que termine. Consulta el mismo trabajo, sin volver a generarlo:

```bash
node scripts/avatars/descargar-heygen.mjs VIDEO_ID \
  projects/avatar-pipeline/output/source/arucci.mp4
```

Repite la consulta más tarde si sigue procesando. Si falla, revisa el panel y la documentación del proveedor; el script no reintenta automáticamente solicitudes de generación. El MP4 solo se escribe al completarse.

## 6. Subtítulos y montaje local

```bash
mkdir -p projects/avatar-pipeline/subtitles projects/avatar-pipeline/output/video
node scripts/subtitles/crear-srt.mjs \
  projects/avatar-pipeline/output/audio/avatar-pipeline-timings.json \
  projects/avatar-pipeline/subtitles/vertical.srt
zsh scripts/video/render-vertical-50-50.sh \
  projects/avatar-pipeline/config/vertical-arucci.json \
  projects/avatar-pipeline/output/audio/avatar-pipeline-timings.json \
  projects/avatar-pipeline/output/source/arucci.mp4 \
  projects/avatar-pipeline/assets/screenshots \
  projects/avatar-pipeline/output/video/vertical-clean.mp4
```

El render es 1080 × 1920, H.264/AAC y 30 fps. El recorte superior está preparado para una fuente HeyGen de 720 × 1280. Otro encuadre o avatar puede requerir ajustar `crop=720:640:0:175` en el script. Revisa un fotograma antes de producir toda una serie. El SRT contiene un bloque por escena: puedes dividirlo en frases en un editor para mejorar lectura. No se incrusta en el vídeo.

## 7. Música opcional: crear una pista con Suno

En el ejemplo utilizamos **Warm Analog Pad**, creada por Araceli con Suno. Puedes crear tu propia banda sonora: activa el modo instrumental, describe instrumentos, ambiente y ritmo, genera varias opciones y descarga la elegida en WAV o MP3. Aporta el archivo localmente; no hace falta una clave ni una integración API de Suno.

Un punto de partida para el estilo:

```text
Instrumental synth-pop, warm analog synthesizers, shimmering arpeggios,
rounded bass, restrained electronic drums. Bright, nostalgic and hopeful.
108 BPM. Spacious arrangement for spoken narration, short intro,
consistent energy and a clean ending. No vocals, humming or vocal chops.
Original melody.
```

Comprueba los permisos aplicables a tu pista y plan antes de usarla en contenido comercial; crear una pista con IA no significa que sea de dominio público. Consulta las [condiciones de Suno](https://help.suno.com/en/articles/9601665). El kit distribuye el proceso y el prompt, no la pista personal.

Usa una pista cuya licencia permita tu publicación; el kit funciona sin música. Sustituye la ruta por una pista propia y utiliza la duración indicada en el JSON de tiempos:

```bash
zsh scripts/audio/mezclar-musica.sh \
  projects/avatar-pipeline/output/video/vertical-clean.mp4 \
  /ruta/a/tu-musica.mp3 DURACION_EN_SEGUNDOS \
  projects/avatar-pipeline/output/video/vertical-music.mp4
```

El modo `single` requiere una pista suficientemente larga. El modo heredado `loop` del script está ajustado a la música de la serie original; adapta sus cortes a tu pista antes de usarlo.

## 8. Ruta larga de Synthesia

Adapta `guion-youtube.md` y `config/youtube-synthesia.json` al relato en primera persona. El script solicita un vídeo privado 16:9 con escenas de avatar; no incorpora automáticamente los Mermaid ni realiza el montaje editorial del largo.

```bash
node scripts/avatars/generar-synthesia.mjs \
  projects/avatar-pipeline/config/youtube-synthesia.json \
  "Cómo creo vídeos con avatares"
node scripts/avatars/descargar-synthesia.mjs VIDEO_ID \
  projects/avatar-pipeline/output/source/synthesia.mp4
```

Guarda el identificador y consulta después si aún procesa. Para una voz o composición concreta, revisa la configuración en el editor. La configuración incluida usa los valores predeterminados del proveedor para la voz. Puedes trabajar manualmente en el editor con el mismo guion, exportar la fuente e incorporar los gráficos en tu editor de vídeo. No necesitas ElevenLabs ni HeyGen para esta ruta.

## 9. Revisar y publicar

Comprueba voz, pronunciación, sincronización, encuadre, tamaño de los textos y duración. Sube el MP4 y el SRT según las opciones de cada plataforma. Los textos de `publishing/` son borradores: sustituye la referencia al repositorio por su URL real. La publicación es manual.

## Problemas habituales

| Síntoma | Qué revisar |
| --- | --- |
| Falta configuración | `.env` en la raíz y los identificadores del proveedor utilizado |
| 401 / 403 | Clave correcta, permisos API y acceso al avatar o voz |
| 402 / cuota | Créditos y límites de tu cuenta; consulta al proveedor |
| 429 | Espera antes de volver a consultar; no repitas la generación a ciegas |
| El vídeo no se descarga | Estado del trabajo; conserva su identificador |
| No aparece FFmpeg / jq | Instalación y PATH de la terminal |
| Mermaid no abre Chromium | Dependencias del navegador en Linux y permisos de instalación de Puppeteer |
| Cambié el guion | Regenera voz, tiempos, avatar, SRT y montaje |
| Imágenes fuera de tiempo | Revisa MP3, pausas y posibles cambios introducidos por el proveedor |
| Avatar recortado | Adapta el filtro de recorte a tu fuente |

## Referencias oficiales

- [ElevenLabs: Text to Speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [HeyGen: API](https://docs.heygen.com/)
- [Synthesia: inicio rápido y alcance de la clave](https://developers.synthesia.io/docs/synthesia-api-quickstart)
- [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli)
- [FFmpeg](https://ffmpeg.org/documentation.html)

Los scripts son integraciones concretas, no clientes completos de las API. El ejemplo vertical se ha producido con ElevenLabs y HeyGen y se ha montado con FFmpeg. Las comprobaciones automatizadas no consumen API; la ruta API de Synthesia no se ha vuelto a ejecutar para esta edición. Ante cambios del proveedor, contrasta sus documentos y prueba primero una escena breve.
