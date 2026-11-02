import { loadEnv, requireEnv } from '../lib/env.mjs';
import fs from 'node:fs';
import path from 'node:path';

const [configPath, title = 'Vídeo generado con Synthesia'] = process.argv.slice(2);
if (!configPath) {
  console.error('Uso: node generar-synthesia.mjs CONFIG_JSON [TITULO]');
  process.exit(2);
}

const env = loadEnv('synthesia');
requireEnv(env, ['SYNTHESIA_API_KEY', 'SYNTHESIA_AVATAR_ID']);

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
if (!env.SYNTHESIA_API_KEY || !env.SYNTHESIA_AVATAR_ID) {
  throw new Error('Faltan SYNTHESIA_API_KEY o SYNTHESIA_AVATAR_ID');
}

const payload = {
  test: false,
  title,
  description: config.description ?? '',
  visibility: 'private',
  aspectRatio: '16:9',
  input: config.scenes.map((scene) => ({
    avatar: env.SYNTHESIA_AVATAR_ID,
    avatarSettings: {
      style: 'rectangular',
      horizontalAlign: 'center',
      scale: 0.5
    },
    background: 'off_white',
    scriptText: scene.text
  }))
};

const response = await fetch('https://api.synthesia.io/v2/videos', {
  method: 'POST',
  headers: {
    Authorization: env.SYNTHESIA_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify(payload)
});
const body = await response.text();
if (!response.ok) throw new Error(`Synthesia ${response.status}: ${body}`);
const data = JSON.parse(body);
console.log(JSON.stringify({ video_id: data.id, status: data.status ?? 'submitted' }));
