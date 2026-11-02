import path from 'node:path';
import { loadEnv, requireEnv } from '../lib/env.mjs';
import fs from "node:fs";

const root = process.cwd();
const videoId = process.argv[2];
const output = process.argv[3];
if (!videoId || !output) throw new Error("Uso: node descargar-heygen.mjs VIDEO_ID ARCHIVO_SALIDA");

const env = loadEnv('heygen');
requireEnv(env, ['HEYGEN_API_KEY']);
const apiKey = env.HEYGEN_API_KEY;

const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
  headers: { "X-Api-Key": apiKey }
});
const result = await response.json();
if (!response.ok || result.error) throw new Error(`HeyGen ${response.status}: ${JSON.stringify(result)}`);
const video = result.data ?? result;
console.log(JSON.stringify({ status: video.status, duration: video.duration ?? null }));
if (video.status === "completed") {
  const download = await fetch(video.video_url);
  if (!download.ok) throw new Error(`Descarga ${download.status}`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.from(await download.arrayBuffer()));
  console.log(JSON.stringify({ downloaded: output }));
}
