# Arquitectura del sistema

```mermaid
flowchart TD
 P[Proyecto y objetivos] --> G[Guion revisado por una persona]
 G --> V[Configuración de escenas verticales]
 G --> L[Guion largo en primera persona]
 V --> T[ElevenLabs: texto a voz]
 T --> A[MP3 por escena]
 A --> M[FFmpeg: medir duración]
 M --> J[JSON de tiempos]
 A --> U[HeyGen: subir audio]
 U --> H[HeyGen: generar avatar con audio]
 H --> ID[Guardar identificador y consultar estado]
 ID --> D[Descargar MP4 al completar]
 V --> MM[Diagramas Mermaid editables]
 MM --> PNG[Mermaid CLI: PNG]
 J --> S[SRT por escenas]
 J --> F[FFmpeg: montaje 50/50]
 PNG --> F
 D --> F
 PR[Prompt musical propio] --> SU[Suno: crear pista]
 SU --> MP[Descarga manual MP3]
 MP --> MU[FFmpeg: mezclar bajo la voz]
 F --> MU
 MU --> R[Revisión humana]
 S --> R
 L --> SY[Synthesia: API o editor]
 SY --> LG[Fuente horizontal]
 LG --> E[Edición del largo con gráficos]
 PNG --> E
 E --> R
 R --> PUB[Publicación manual]
 ENV[Claves e identificadores locales] -.-> T
 ENV -.-> U
 ENV -.-> H
 ENV -.-> SY
```

## Contratos de datos

- Configuración vertical: `project`, `title`, `scenes[]` con `text` y `visual`.
- Tiempos: `duration` total y `scenes[]` con `start`, `end`, `duration`, texto y visual originales.
- Diagramas: `.mmd` fuente y `.png` con el mismo nombre base que `visual`.
- Avatar: MP4 descargado con voz; el montaje usa ese audio.
- Configuración larga: `scenes[]` con `text`; los identificadores de avatar vienen del entorno.

## Límites

La caché de ElevenLabs evita regenerar escenas idénticas con la misma voz. No hay orquestador completo, cola de trabajos, reintentos de pago, alineación por palabra ni subida automática a plataformas. La revisión y el montaje editorial del largo siguen siendo parte del trabajo de producción.
