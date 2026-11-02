# Memoria · Vídeos con avatares

**Autora: Araceli Fradejas Muñoz**  
**Fecha de esta edición: 2 de noviembre de 2026**

## Motivación

Cuando termino un proyecto de desarrollo, quiero mostrar algo más que una lista de tecnologías. Me interesa explicar el problema, enseñar el resultado y contar las decisiones que he tomado. En mi portfolio, esa comunicación se repite con cada proyecto y necesita guiones, imágenes y montaje.

Este sistema surge para organizar ese trabajo. Mi objetivo es tener un proceso que pueda reutilizar y adaptar, y compartirlo para que otras personas expliquen sus propios proyectos con su voz y su avatar.

## Objetivos

- Dividir cada historia en escenas con un texto y un recurso visual definidos.
- Producir un formato vertical para redes y preparar un guion largo para YouTube.
- Conectar generación de voz, avatar y montaje mediante configuraciones y scripts.
- Representar el proceso con diagramas que también se puedan editar como texto.
- Incorporar música instrumental creada para el proyecto.
- Mantener las claves y los recursos personales fuera del repositorio público.
- Documentar qué se automatiza y qué reviso personalmente.

## Dos maneras de contar una misma historia

En el formato vertical utilizo a **Arucci**, mi avatar. Habla de mí en tercera persona y presenta una idea técnica con apoyo visual. La grafía del nombre es Arucci y en los textos hablados utilizo «Aruchi» para orientar la pronunciación.

En el vídeo largo utilizo mi avatar personal de **Synthesia** y narro en primera persona. Ese espacio permite desarrollar la motivación, las decisiones y los aprendizajes. El largo tiene su propio guion; no consiste en alargar el texto del corto.

## Desarrollo del proceso

### 1. Guion y escenas

Parto de una historia concreta y decido qué debe entender quien la vea. Divido la narración en escenas y asocio a cada una una imagen. El JSON guarda el texto hablado y el nombre del recurso visual; el Markdown permite revisar el relato completo.

### 2. Diagramas con Mermaid

Los diagramas explican relaciones y pasos del proceso. Los guardo en archivos `.mmd` y los exporto a PNG mediante Mermaid CLI. Esto permite versionar cambios, reutilizar los gráficos y mostrar su código directamente en GitHub.

Para el móvil distribuyo el contenido en varios planos. El ejemplo utiliza ocho diagramas: recorrido general, escenas, voz, sincronización del avatar, montaje, música y revisión, formatos y reutilización.

### 3. Voz con ElevenLabs

Un script genera un MP3 por escena y mide su duración con FFmpeg. Con esos datos construye los tiempos del montaje y el audio unido. La caché comprueba el texto y la voz para reutilizar escenas sin cambios y regenerar las que se han modificado.

Los tiempos se obtienen de los archivos de audio: no son una alineación por palabra. La sincronización final debe comprobarse con el vídeo descargado.

### 4. Avatar con HeyGen

El audio se sube a HeyGen y se solicita un vídeo con el avatar configurado. La generación devuelve un identificador de trabajo, que sirve para consultar el estado y descargar el resultado cuando termina. La generación de voz y la imagen del avatar permanecen como operaciones distintas.

### 5. Banda sonora con Suno

He incorporado una pista instrumental, **Warm Analog Pad**, creada con Suno y descargada en MP3. La dirección musical busca sintetizadores cálidos, ritmo contenido y espacio para que se entienda la narración.

La creación musical se realiza en Suno y la descarga es manual. Después FFmpeg incorpora el archivo al vídeo, reduce su presencia bajo la voz y aplica entrada y salida progresivas. El repositorio comparte el proceso y un prompt de referencia; no distribuye la pista personal.

### 6. Montaje y subtítulos

FFmpeg combina el avatar arriba y los gráficos abajo en una composición 50/50. Los tiempos de la narración determinan la permanencia de cada imagen. El resultado se exporta en vertical 1080 × 1920 y se conserva también una versión sin música.

Los subtítulos se entregan en un archivo SRT independiente. El generador produce un bloque por escena; si se necesita una lectura más ágil, esos bloques se pueden dividir en frases en un editor.

### 7. Vídeo largo

El guion del largo está preparado para mi avatar personal de Synthesia. El montaje se trabaja en el editor, con recursos visuales adaptados al formato horizontal. El repositorio incluye una configuración y scripts para usar la API cuando una cuenta y un avatar tengan acceso compatible; es una alternativa al editor.

## Resultado de esta edición

El corto revisado dura **59,27 segundos** y contiene ocho diagramas Mermaid. Explica las funciones de ElevenLabs, HeyGen, FFmpeg, Synthesia y Suno. La escena musical describe explícitamente la creación de la pista en Suno y su mezcla bajo la voz.

El MP4 final utiliza H.264/AAC, 1080 × 1920 y 30 fps. Se ha comprobado su decodificación completa y se han inspeccionado fotogramas del montaje. Esto no sustituye la escucha final ni garantiza cómo tratará el archivo cada plataforma.

El largo está en preparación en Synthesia. No se presenta como un entregable terminado.

## Qué automatizo y qué decido

| Automatización | Trabajo de producción |
| --- | --- |
| Solicitar voz por escenas. | Elegir la historia y escribir el guion. |
| Medir duraciones y generar tiempos. | Revisar pausas, pronunciación y sincronización. |
| Solicitar y descargar el avatar. | Elegir el avatar y su encuadre. |
| Exportar Mermaid a imágenes. | Diseñar diagramas comprensibles y legibles. |
| Componer vídeo y mezclar música. | Seleccionar la pista y revisar el equilibrio con la voz. |
| Crear un archivo SRT. | Revisar y adaptar sus bloques antes de publicar. |

## Aprendizajes

La continuidad entre herramientas depende de contratos sencillos: texto, audio, tiempos, imágenes e identificadores de trabajo. Separar esos archivos hace más fácil corregir una escena y entender en qué paso aparece un problema.

La automatización también necesita límites claros. Los proveedores procesan trabajos de forma asíncrona, los encuadres cambian entre avatares y una buena presentación depende de decisiones narrativas. Por eso conservo una revisión humana antes de publicar y documento las limitaciones de los scripts.

## Próximas mejoras

- Finalizar el largo y añadir su enlace público cuando esté disponible.
- Configurar el recorte del avatar sin editar el filtro de FFmpeg.
- Facilitar subtítulos divididos en frases.
- Ampliar la validación en Linux y WSL2.
- Incorporar un registro de trabajos que ayude a consultar las generaciones sin repetirlas.

Estas mejoras están planteadas; no se describen como funciones ya implementadas.

## Reutilización

La [guía completa](docs/EMPEZAR.md) permite seguir el proceso con cuentas y recursos propios. El código, documentación y diagramas se distribuyen bajo licencia MIT. Los servicios y los contenidos personales conservan sus propias condiciones.

**Araceli Fradejas Muñoz** · [GitHub](https://github.com/AraceliFradejas)
