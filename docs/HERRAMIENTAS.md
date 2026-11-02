# Herramientas, cuentas y configuración

**Araceli Fradejas Muñoz · Vídeos con avatares**

## Qué aporta cada pieza

| Herramienta | Función | Configuración propia |
| --- | --- | --- |
| ElevenLabs | Convertir el texto de las escenas en voz. | `ELEVENLABS_API_KEY` y `ELEVENLABS_VOICE_ID`. |
| HeyGen | Generar el avatar hablando con el audio creado. | `HEYGEN_API_KEY` y `HEYGEN_AVATAR_ID`. |
| Synthesia | Preparar la presentación larga con avatar. | Cuenta del editor; para la API, `SYNTHESIA_API_KEY` y `SYNTHESIA_AVATAR_ID`. |
| Suno | Crear una banda sonora instrumental. | Cuenta con permisos adecuados para la pista; descarga manual, sin API en este proyecto. |
| Mermaid CLI | Convertir los diagramas `.mmd` en imágenes. | Dependencia local de npm y navegador de Puppeteer. |
| FFmpeg | Medir audio, montar imagen y voz, mezclar música. | Ejecutable en PATH o ruta configurada. |
| jq y zsh | Leer configuraciones y ejecutar el montaje. | Herramientas instaladas en el sistema. |

Puedes seguir solo el camino vertical o solo el largo. No necesitas configurar todos los servicios para probar los gráficos o leer los guiones.

## Archivo local de entorno

Copia `.env.example` a `.env` y completa únicamente las variables de los proveedores que utilices. El archivo de ejemplo deja todos los identificadores personales vacíos.

Los scripts de Node combinan, de menor a mayor prioridad:

1. `.env` en la raíz.
2. `.env.<proveedor>` cuando existe.
3. Variables exportadas en la terminal.

No ejecutes `source .env` si no conoces su contenido: los scripts leen los valores directamente y no necesitan ejecutarlo como shell.

## Identificadores y permisos

Una voz o avatar visible en el editor no garantiza que pueda utilizarse mediante la API. Comprueba el acceso de la cuenta y copia el identificador correcto. Los scripts no clonan voces ni crean el avatar personal: utilizan recursos que ya tengas disponibles.

La ruta de Synthesia emplea la API v2. Su guía indica una clave con alcance Legacy (v2). La configuración incluida no selecciona una voz concreta; para controlar ese acabado puedes trabajar en el editor o ampliar el payload siguiendo la documentación del proveedor.

## Operaciones que pueden consumir créditos

- `generar-elevenlabs.mjs`: envía texto a ElevenLabs; reutiliza la caché válida por escena.
- `generar-heygen.mjs`: sube audio y solicita un vídeo nuevo.
- `generar-synthesia.mjs`: solicita un vídeo nuevo con `test: false`.

Los scripts `descargar-*` consultan trabajos existentes y descargan el archivo cuando está terminado. No crean otra generación. No hay reintentos automáticos de los comandos de generación.

No se publican precios en esta guía porque dependen del proveedor y del plan. Comprueba límites y consumo en tu propia cuenta antes de producir una serie.

## Qué queda fuera de Git

Claves, vídeos generados, audio de voz, caché de producción y música permanecen localmente. Los diagramas PNG se incluyen porque son gráficos del proyecto y ayudan a reproducir la composición sin regenerarlos.

La música del ejemplo no se distribuye como archivo. Para tu versión, genera o consigue una pista con permisos adecuados, descárgala y utiliza su ruta en el comando de mezcla.

## Documentación oficial

- [ElevenLabs: Text to Speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert).
- [HeyGen: documentación](https://docs.heygen.com/).
- [Synthesia: inicio rápido de la API](https://developers.synthesia.io/docs/synthesia-api-quickstart).
- [Suno: derechos con suscripción de pago](https://help.suno.com/en/articles/9601665).
- [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli).
- [FFmpeg](https://ffmpeg.org/documentation.html).
