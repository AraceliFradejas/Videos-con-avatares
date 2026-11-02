# Guion largo · Avatar personal de Synthesia

Duración orientativa: 5–6 minutos, pendiente de voz real. Primera persona. Alternar presentación y diagramas del corto con una demostración de archivos de ejemplo.

## presentacion

Este vídeo explica un proyecto y, al mismo tiempo, está hecho con él. Soy Araceli Fradejas Muñoz y he creado un sistema para transformar mis proyectos de desarrollo en vídeos con avatares. En este recorrido voy a enseñarte qué partes automatizo, qué herramientas conecto y qué decisiones siguen dependiendo de mí.

## problema

Terminar una aplicación es solo una parte del trabajo. También necesito explicar qué resuelve, mostrar cómo funciona y contar lo que he aprendido. Cuando repito ese proceso con varios proyectos, aparecen tareas comunes: escribir la narración, preparar las imágenes, generar la voz y montar el resultado. Por eso organicé un flujo reutilizable, con una estructura de carpetas y configuraciones por escenas.

## guion

Todo empieza por una historia concreta. Selecciono el problema, una demostración y una decisión que merezca la pena explicar. Después divido el relato en escenas. Cada escena tiene un texto hablado y una imagen o un diagrama asociado. En este ejemplo utilizo Mermaid para representar el proceso. Los diagramas se guardan como texto, se pueden modificar y se exportan a imágenes para incorporarlos al montaje.

## voz

En el formato vertical, Arucci es mi narradora y habla de mí en tercera persona. Su nombre se escribe Arucci, pero en el guion fonético utilizo Aruchi. Un script envía el texto de cada escena a ElevenLabs con la voz configurada por el usuario. Guarda el audio y mide su duración. Esos tiempos permiten construir una línea temporal y producir un archivo de subtítulos independiente. Si cambio el texto o la voz, el audio de esa escena debe regenerarse.

## heygen

El siguiente paso utiliza HeyGen. El script sube el audio y solicita un vídeo con el avatar elegido. ElevenLabs aporta la voz y HeyGen genera la imagen hablando con ese audio. La solicitud devuelve un identificador de trabajo. La generación tarda un tiempo y se consulta después para descargar el resultado cuando está terminado. Guardo ese identificador para poder consultar el mismo trabajo sin volver a solicitar otra generación.

## montaje

Una vez descargado el avatar, FFmpeg combina los recursos. En vertical, el avatar ocupa la mitad superior y las imágenes la inferior. Los tiempos de la narración indican cuánto dura cada gráfico. Puedo añadir música con un nivel reducido mientras habla el avatar. Los subtítulos se entregan en un archivo SRT separado. Reviso la legibilidad en móvil, el encuadre y la sincronización antes de publicar. El proceso no publica automáticamente en redes.

## synthesia

Para los vídeos largos utilizo mi avatar personal de Synthesia y hablo en primera persona. Preparo un guion más desarrollado, con demostraciones y explicaciones. Es una rama distinta del proceso, con su propia configuración y su propia clave. Puedo generar la presentación con la API cuando mi cuenta y mi avatar tienen acceso compatible, o montar las escenas desde el editor. Después incorporo los recursos visuales necesarios y reviso el resultado.

## reutilizar

He preparado una versión del repositorio para que puedas seguir el proceso con tus propios recursos. Incluye scripts, configuraciones de ejemplo, diagramas y una guía de instalación. Las claves se guardan en un archivo local que Git ignora. Necesitarás tu propia voz y avatares disponibles en cada servicio. Las generaciones pueden consumir créditos y el acceso por API depende de cada proveedor. Puedes empezar con un ejemplo pequeño, comprobar el resultado y después adaptar el guion a tu proyecto.

## cierre

Lo que he construido conecta varias herramientas en un proceso repetible. La historia, la selección de imágenes y la revisión final siguen siendo decisiones mías. Si quieres probarlo, encontrarás el enlace al repositorio en la descripción cuando esté publicado. Suscríbete para seguir aprendiendo conmigo y cuéntame qué proyecto te gustaría explicar con tu propio avatar.

