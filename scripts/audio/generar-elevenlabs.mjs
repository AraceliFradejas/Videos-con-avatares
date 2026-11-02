import { createHash } from "node:crypto";
import { loadEnv } from "../lib/env.mjs";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const configPath = process.argv[2];
if (!configPath) throw new Error("Uso: node generar-elevenlabs.mjs CONFIG_JSON");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const env = loadEnv("elevenlabs");

if (!env.ELEVENLABS_API_KEY || !env.ELEVENLABS_VOICE_ID) {
  throw new Error("Faltan ELEVENLABS_API_KEY o ELEVENLABS_VOICE_ID");
}

const ffmpeg = env.FFMPEG_BIN || "ffmpeg";
if (!/^[a-zA-Z0-9_-]+$/.test(config.project)) throw new Error("project debe usar letras, números, guiones o guiones bajos");
if (!config.scenes?.length || config.scenes.some(s => !s.text?.trim())) throw new Error("Se necesitan escenas con texto");
const work = path.resolve(path.dirname(configPath), '../output/audio');
fs.mkdirSync(work, { recursive: true });

function audioDuration(file) {
  const probe = spawnSync(ffmpeg, ["-i", file, "-f", "null", "-"], { encoding: "utf8" });
  const match = probe.stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  if (!match) throw new Error(`No se pudo medir la duración de ${file}`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
}

const durations = [];
for (let index = 0; index < config.scenes.length; index += 1) {
  const output = path.join(work, `scene-${String(index + 1).padStart(2, "0")}.mp3`);
  const fingerprint = createHash('sha256').update(JSON.stringify({ text: config.scenes[index].text, voice: env.ELEVENLABS_VOICE_ID, model: 'eleven_multilingual_v2', settings: '0.55/0.75/0/1' })).digest('hex');
  const cacheFile = `${output}.sha256`;
  if (fs.existsSync(output) && fs.statSync(output).size > 0 && fs.existsSync(cacheFile) && fs.readFileSync(cacheFile, 'utf8') === fingerprint) {
    durations.push(audioDuration(output));
    console.log(`Escena ${index + 1}/${config.scenes.length}: reutilizada (${durations.at(-1).toFixed(2)} s)`);
    continue;
  }
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${env.ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      text: config.scenes[index].text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0, use_speaker_boost: true, speed: 1 }
    })
  });
  if (!response.ok) throw new Error(`ElevenLabs escena ${index + 1}: ${response.status} ${await response.text()}`);
  fs.writeFileSync(output, Buffer.from(await response.arrayBuffer()));
  fs.writeFileSync(cacheFile, fingerprint);
  durations.push(audioDuration(output));
  console.log(`Escena ${index + 1}/${config.scenes.length}: ${durations.at(-1).toFixed(2)} s`);
}

const concatFile = path.join(work, "concat.txt");
fs.writeFileSync(concatFile, config.scenes.map((_, index) => `file '${path.join(work, `scene-${String(index + 1).padStart(2, "0")}.mp3`)}'`).join("\n") + "\n");
const fullAudio = path.join(work, `${config.project}-arucci-elevenlabs.mp3`);
const joined = spawnSync(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", concatFile, "-c:a", "libmp3lame", "-b:a", "192k", fullAudio], { encoding: "utf8" });
if (joined.status !== 0) throw new Error(joined.stderr);

let cursor = 0;
const timing = config.scenes.map((scene, index) => {
  const start = cursor;
  cursor += durations[index];
  return { ...scene, start, end: cursor, duration: durations[index] };
});
fs.writeFileSync(path.join(work, `${config.project}-timings.json`), JSON.stringify({ duration: cursor, scenes: timing }, null, 2));
console.log(JSON.stringify({ audio: fullAudio, timings: path.join(work, `${config.project}-timings.json`), duration: cursor }));
