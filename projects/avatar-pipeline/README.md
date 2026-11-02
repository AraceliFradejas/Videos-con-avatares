# Un vídeo que explica cómo está hecho

Este ejemplo recorre mi sistema de producción con Arucci como narradora: guion, voz, avatar, gráficos, música y montaje. El corto revisado dura **59,27 segundos** y utiliza ocho diagramas Mermaid.

## Material incluido

- [Guion del corto](guion.md), con texto y Mermaid por escena.
- [Guion del largo](guion-youtube.md), preparado para mi avatar personal en Synthesia.
- [Configuración vertical](config/vertical-arucci.json), lista para los scripts.
- [Configuración del largo](config/youtube-synthesia.json), alternativa para la API.
- [Diagramas editables](assets/diagrams/) e [imágenes exportadas](assets/screenshots/).
- [Música y prompt](publishing/musica.md).

Genera los gráficos desde la raíz con `npm run diagrams -- projects/avatar-pipeline`. Sigue la [guía de producción](../../docs/EMPEZAR.md) para crear voz, avatar y montaje con tus propios recursos.

## Producción de referencia

La composición vertical coloca a Arucci arriba y los gráficos abajo, con Warm Analog Pad de fondo. La pista fue creada con Suno. Se guarda una versión con música, una limpia y un archivo SRT externo. Los MP4, el audio y los recursos personales se conservan localmente y no forman parte de este repositorio.

El vídeo largo se prepara en el editor de Synthesia con mi avatar personal y el guion en primera persona. La configuración API es una alternativa, no un requisito para seguir ese camino.

Antes de generar tu versión, cambia las referencias a Arucci y Araceli por tu presentación y configura tus propios identificadores.
