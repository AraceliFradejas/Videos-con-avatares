# Verificación y estado

**Araceli Fradejas Muñoz · 2 de noviembre de 2026**

## Ejemplo vertical

| Elemento | Comprobación |
| --- | --- |
| Voz | Generación por escenas con ElevenLabs; narración revisada de 59,27 s. |
| Avatar | Nueva generación de HeyGen con la narración que incluye Suno; fuente completada y descargada. |
| Diagramas | Ocho fuentes Mermaid exportadas a PNG. |
| Montaje | Composición 50/50, H.264/AAC, 1080 × 1920, 30 fps. |
| Música | Warm Analog Pad en MP3, mezclada con entrada/salida progresivas y reducción bajo la voz. |
| Integridad del MP4 | Decodificación completa con FFmpeg sin errores. |
| Revisión visual | Fotogramas inspeccionados, incluido el plano que explica la creación con Suno. |
| Subtítulos | Archivo SRT externo regenerado desde los tiempos de la narración revisada. |

La duración de contenedor del montaje revisado es aproximadamente 59,27 s. Puede haber diferencias de unos milisegundos entre la suma de escenas, la fuente del proveedor y el MP4 final.

Los MP4 y el audio personal no se incluyen en Git. La tabla describe una producción de referencia, no una prueba de todos los avatares y cuentas posibles.

## Comprobaciones del repositorio

```bash
npm run check
npm test
npm run diagrams -- projects/avatar-pipeline
```

`check` valida sintaxis JavaScript, estructura de las configuraciones del ejemplo, presencia de fuentes Mermaid y herramientas locales. Las pruebas cubren la combinación de archivos de entorno, comillas, valores con signos igual, prioridad de variables exportadas y mensajes de configuración faltante.

La integración continua ejecuta las comprobaciones locales y las pruebas en Ubuntu con Node.js 22. No utiliza claves ni genera contenido de pago. El render de Mermaid se realiza por separado; la integración continua no descarga Chromium ni comprueba visualmente los gráficos.

## Límites de esta verificación

- La producción audiovisual de referencia se ha ejecutado en macOS.
- Linux y WSL2 tienen instrucciones, pero no se ha producido allí el vídeo completo.
- El largo se está preparando manualmente en Synthesia; no se presenta como terminado.
- La ruta API de Synthesia está incluida, pero no se ha vuelto a ejecutar en esta edición.
- Las pruebas locales no verifican los contratos actuales de los proveedores externos.
- No se ha verificado la publicación del archivo en cada red ni su tratamiento posterior.
- La revisión técnica del MP4 no sustituye la escucha y aprobación final de la pieza.
- Los permisos de la música dependen de las condiciones de la pista y de la cuenta; no se afirma que sea de dominio público.
