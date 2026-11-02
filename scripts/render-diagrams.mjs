import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const project = process.argv[2] ?? 'projects/avatar-pipeline';
const input = path.resolve(project, 'assets/diagrams');
const output = path.resolve(project, 'assets/screenshots');
fs.mkdirSync(output, { recursive: true });
const cli = path.resolve('node_modules/.bin/mmdc');
if (!fs.existsSync(cli)) throw new Error('Ejecuta npm ci antes de renderizar diagramas');
for (const name of fs.readdirSync(input).filter(n => n.endsWith('.mmd')).sort()) {
  const result = spawnSync(cli, ['-i', path.join(input, name), '-o', path.join(output, name.replace(/\.mmd$/, '.png')), '-c', 'config/mermaid.json', '-b', '#071827', '-w', '1080', '-H', '960', '-s', '2'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
