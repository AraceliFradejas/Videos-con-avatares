import { loadEnv, requireEnv } from '../lib/env.mjs';
import fs from 'node:fs';
import path from 'node:path';

const [videoId, outputPath] = process.argv.slice(2);
if (!videoId || !outputPath) {
  console.error('Uso: node descargar-synthesia.mjs VIDEO_ID OUTPUT_MP4');
  process.exit(2);
}

const env = loadEnv('synthesia');
requireEnv(env, ['SYNTHESIA_API_KEY']);

const response = await fetch(`https://api.synthesia.io/v2/videos/${videoId}`, {
  headers: { Authorization: env.SYNTHESIA_API_KEY, Accept: 'application/json' }
});
const body = await response.text();
if (!response.ok) throw new Error(`Synthesia ${response.status}: ${body}`);
const data = JSON.parse(body);
console.log(JSON.stringify({ status: data.status, duration: data.duration ?? null }));
if (data.status !== 'complete') process.exit(0);
const download = await fetch(data.download);
if (!download.ok) throw new Error(`Descarga ${download.status}`);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, Buffer.from(await download.arrayBuffer()));
console.log(JSON.stringify({ downloaded: outputPath }));
