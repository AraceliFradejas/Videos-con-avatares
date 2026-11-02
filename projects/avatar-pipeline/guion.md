# Cómo creo vídeos con avatares

Corto vertical con Arucci. Duración de la narración revisada: 59,27 segundos. Ocho diagramas sucesivos, sin mostrar claves ni paneles privados. La grafía hablada es «Aruchi».

## Escena 1: 01-recorrido

**Texto hablado:** ¿Cómo se convierte un proyecto de programación en un vídeo como este? Con un proceso que conecta guiones, voz y avatares.

```mermaid
flowchart TD
 A[Proyecto real] --> B[Guion por escenas]
 B --> C[Voz y avatar]
 C --> D[Montaje con música de Suno]
 D --> E[Vídeo para redes]
```

## Escena 2: 02-escenas

**Texto hablado:** Soy Aruchi, el avatar de Araceli. Ella prepara qué contar y qué gráfico acompaña cada frase.

```mermaid
flowchart TD
 A[Una idea por escena] --> B[Texto hablado]
 A --> C[Diagrama Mermaid]
 B --> D[Configuración JSON]
 C --> D
```

## Escena 3: 03-voz

**Texto hablado:** ElevenLabs transforma cada texto en audio. Un script mide su duración para ajustar las imágenes a la narración.

```mermaid
flowchart TD
 A[Texto de cada escena] --> B[ElevenLabs]
 B --> C[Audio MP3]
 C --> D[Medir duración real]
 D --> E[Tiempos para el montaje]
```

## Escena 4: 04-avatar

**Texto hablado:** Después, HeyGen recibe ese audio y genera mi vídeo sincronizando la boca con la voz. La voz y la imagen son pasos distintos.

```mermaid
flowchart TD
 A[Audio de ElevenLabs] --> B[Subir audio a HeyGen]
 C[Avatar propio] --> D[Generar vídeo]
 B --> D
 D --> E[Vídeo con voz sincronizada]
```

## Escena 5: 05-montaje

**Texto hablado:** FFmpeg combina el avatar arriba y los diagramas abajo. Los tiempos deciden cuándo cambia cada gráfico.

```mermaid
flowchart TD
 A[Vídeo del avatar] --> D[FFmpeg]
 B[Diagramas PNG] --> D
 C[Tiempos por escena] --> D
 D --> E[Vertical 1080 por 1920]
```

## Escena 6: 06-revision

**Texto hablado:** La música también la creamos con inteligencia artificial, usando Suno. FFmpeg la mezcla bajo mi voz. Araceli revisa el vídeo y los subtítulos antes de publicar.

```mermaid
flowchart TD
 A[Prompt musical] --> B[Suno: crear música]
 B --> C[Descargar MP3]
 C --> D[FFmpeg: mezclar bajo la voz]
 D --> E[Revisar vídeo y subtítulos]
 E --> F[Publicar]
```

## Escena 7: 07-formatos

**Texto hablado:** Para YouTube largo utiliza su avatar personal en Synthesia. Cada formato tiene su propio guion.

```mermaid
flowchart TD
 A[Historia del proyecto] --> B[Guion corto]
 A --> C[Guion largo]
 B --> D[ElevenLabs y HeyGen]
 C --> E[Synthesia]
 D --> F[Vertical para redes]
 E --> G[Horizontal para YouTube]
```

## Escena 8: 08-reutilizar

**Texto hablado:** El repositorio explica cómo reproducirlo con tus propias claves, tu voz y tu avatar. Este vídeo es la demostración. ¿Qué crearías tú?

```mermaid
flowchart TD
 A[Copia el repositorio] --> B[Configura tu archivo .env]
 B --> C[Tu voz y tu avatar]
 C --> D[Tu guion y diagramas]
 D --> E[Genera y revisa tu vídeo]
```

## Dirección visual

Avatar en la mitad superior. Cada diagrama ocupa la inferior. Mostrar de 4 a 6 nodos con etiquetas breves; revelar o resaltar un paso por frase en edición si se desea. No reducir un diagrama grande hasta hacerlo ilegible. La explicación detallada del conjunto está en el README del kit público. Sin subtítulos incrustados.
