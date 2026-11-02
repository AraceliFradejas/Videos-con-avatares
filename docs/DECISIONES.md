# Decisiones de diseño y producción

**Araceli Fradejas Muñoz · Vídeos con avatares**

## Escenas como unidad de trabajo

Cada escena relaciona una idea, un texto hablado y un recurso visual. El JSON permite ejecutar los scripts y el Markdown permite revisar la historia. Si cambia la narración, hay que actualizar ambos para conservar la misma versión editorial.

El audio se genera por escena para reutilizar partes sin cambios. Los tiempos medidos se guardan aparte y sirven para el montaje y el SRT.

## Dos formatos con voz narrativa propia

En vertical, Arucci habla de mí en tercera persona. En el largo hablo en primera persona con mi avatar personal. Cada guion se adapta a la duración y al tipo de explicación; no se usa una simple ampliación del corto.

## Mermaid como fuente editable

Un `.mmd` guarda el gráfico como texto y permite revisar cambios en Git. Mermaid CLI genera el PNG que necesita FFmpeg. Los ocho gráficos del ejemplo se distribuyen en planos separados para facilitar la lectura en una pantalla móvil.

La documentación contiene además un diagrama completo del proceso. Ese gráfico general no se reduce para insertarlo entero en el corto.

## Composición 50/50 en vertical

El avatar mantiene la continuidad visual y los gráficos aportan la explicación. La mitad superior se recorta de una fuente de 720 × 1280 y la inferior muestra la imagen correspondiente. El separador turquesa ayuda a distinguir ambas zonas.

El filtro de recorte está ajustado al encuadre del ejemplo. Un avatar distinto puede necesitar una modificación manual; no hay detección automática de caras.

## Subtítulos externos

Conservo el SRT separado para poder revisarlo y cargarlo donde lo permita la plataforma. El generador utiliza un bloque por escena; no hace reconocimiento de voz ni alineación por palabra.

## Música instrumental creada con Suno

La música refuerza la identidad audiovisual, pero la voz debe seguir siendo comprensible. Por eso selecciono una base instrumental y aplico reducción de nivel bajo la narración. Suno se incorpora como una etapa creativa manual: prompt, generación, elección y descarga.

El repositorio documenta ese paso sin distribuir la pista ni depender de una API de Suno. Cada usuario debe aportar una banda sonora con permisos adecuados.

## Separación entre kit público y producción personal

El repositorio público contiene el flujo, los ejemplos y los scripts necesarios. Las claves se leen desde el entorno y los entregables se guardan fuera del seguimiento de Git. Las voces y avatares del ejemplo forman parte de mi presentación personal y no son recursos incluidos para reutilizar.

## Alcance de la automatización

Los scripts conectan pasos concretos; no son un servicio de generación continua. Mantengo la selección del relato, el diseño visual, la revisión de las voces y la publicación como decisiones de producción. Los identificadores de trabajo permiten consultar una generación existente sin repetirla.
