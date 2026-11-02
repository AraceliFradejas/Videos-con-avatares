# Esquemas del vídeo largo de Synthesia

**Autora: Araceli Fradejas Muñoz**

Catorce láminas para desarrollar los diez bloques del guion largo. Las explicaciones se integran en la [memoria del proyecto](../../MEMORIA.md#esquemas-detallados-del-vídeo-de-synthesia).

- **PNG:** 1920 × 1080, listo para incorporar al vídeo o consultar en pantalla.
- **SVG:** versión vectorial con la misma composición.
- **Mermaid:** fuente editable de cada diagrama.

No hay rótulos de escena ni tiempos incrustados en las imágenes. Las referencias a bloques de la tabla son una guía de montaje.

| Bloque del guion | Esquema | PNG | SVG | Mermaid |
| --- | --- | --- | --- | --- |
| 1 | Del proyecto técnico a una historia comprensible | [Abrir](png/01-reto.png) | [Abrir](svg/01-reto.svg) | [Editar](mermaid/01-reto.mmd) |
| 2 | Propósito, escenas y dos formatos | [Abrir](png/02-proposito.png) | [Abrir](svg/02-proposito.svg) | [Editar](mermaid/02-proposito.mmd) |
| 3 | Guion, configuración y gráficos editables | [Abrir](png/03-archivos.png) | [Abrir](svg/03-archivos.svg) | [Editar](mermaid/03-archivos.mmd) |
| 4 | Voz por escenas, caché y tiempos reales | [Abrir](png/04-voz.png) | [Abrir](svg/04-voz.svg) | [Editar](mermaid/04-voz.mmd) |
| 5 | Generación asíncrona y conservación del identificador | [Abrir](png/05-heygen.png) | [Abrir](svg/05-heygen.svg) | [Editar](mermaid/05-heygen.mmd) |
| 6 | Entradas del montaje y composición vertical | [Abrir](png/06a-montaje.png) | [Abrir](svg/06a-montaje.svg) | [Editar](mermaid/06a-montaje.mmd) |
| 6 | Dirección musical, creación en Suno y mezcla local | [Abrir](png/06b-suno.png) | [Abrir](svg/06b-suno.svg) | [Editar](mermaid/06b-suno.mmd) |
| 6 | Subtítulos externos y revisión de la producción | [Abrir](png/06c-subtitulos.png) | [Abrir](svg/06c-subtitulos.svg) | [Editar](mermaid/06c-subtitulos.mmd) |
| 7 | Una ruta propia para el vídeo largo | [Abrir](png/07-formatos.png) | [Abrir](svg/07-formatos.svg) | [Editar](mermaid/07-formatos.mmd) |
| 8 | Repositorio público, producción local y proveedores externos | [Abrir](png/08a-datos.png) | [Abrir](svg/08a-datos.svg) | [Editar](mermaid/08a-datos.mmd) |
| 8 | La licencia del código y los permisos de los recursos | [Abrir](png/08b-permisos.png) | [Abrir](svg/08b-permisos.svg) | [Editar](mermaid/08b-permisos.mmd) |
| 9 | Reutilización y consulta para evitar repeticiones | [Abrir](png/09a-costes.png) | [Abrir](svg/09a-costes.svg) | [Editar](mermaid/09a-costes.mmd) |
| 9 | Pruebas de código y validación audiovisual | [Abrir](png/09b-evidencia.png) | [Abrir](svg/09b-evidencia.svg) | [Editar](mermaid/09b-evidencia.mmd) |
| 10 | Valor, integración, evidencia y responsabilidad | [Abrir](png/10-criterio.png) | [Abrir](svg/10-criterio.svg) | [Editar](mermaid/10-criterio.mmd) |

## Cómo leerlos

Turquesa identifica scripts o generación; ámbar, decisiones y tareas manuales; azul, archivos y resultados; lila discontinuo, estados pendientes o próximos pasos. Las explicaciones de la memoria detallan el alcance de cada representación.

Los gráficos de montaje, música y subtítulos se utilizan como planos sucesivos dentro del mismo bloque. Lo mismo ocurre con datos y permisos, y con costes y evidencia. La edición en Synthesia se adapta a la narración final.

Las fuentes `.mmd` contienen el diagrama central. Para exportarlo de forma independiente puedes utilizar Mermaid CLI, instalado con `npm ci`, desde la raíz del repositorio:

```bash
npx --no-install mmdc -i docs/esquemas-synthesia/mermaid/04-voz.mmd -o /tmp/04-voz.svg
```

La cabecera, leyenda y pie de autoría forman parte de las láminas SVG/PNG proporcionadas; Mermaid CLI por sí solo exporta el diagrama central.
