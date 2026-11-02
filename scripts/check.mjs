import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
let failed = false;
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
for (const file of walk('scripts').filter(f => f.endsWith('.mjs'))) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status) { console.error(result.stderr); failed = true; }
}
for (const file of walk('projects/avatar-pipeline/config').filter(f => f.endsWith('.json'))) {
  const config = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!config.scenes?.length || config.scenes.some(s => !s.text?.trim())) throw new Error(`Escenas inválidas: ${file}`);
  if (config.project) for (const scene of config.scenes) {
    const source = path.join('projects/avatar-pipeline/assets/diagrams', scene.visual.replace(/\.png$/, '.mmd'));
    if (!fs.existsSync(source)) throw new Error(`Falta diagrama: ${source}`);
  }
}
for (const binary of ['ffmpeg', 'jq', 'zsh']) {
  const result = spawnSync(binary, ['--version'], { encoding: 'utf8' });
  // ffmpeg uses -version, but presence suffices here.
  if (result.error) { console.error(`No se encuentra ${binary}`); failed = true; }
}
if (failed) process.exit(1);
console.log('Sintaxis, configuración, fuentes Mermaid y herramientas locales: OK. Sin llamadas de pago.');
