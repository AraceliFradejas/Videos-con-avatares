import { loadEnv, requireEnv } from "../lib/env.mjs";
import fs from "node:fs";

const root = process.cwd();
const audioPath = process.argv[2];
const title = process.argv[3] ?? "Arucci · fuente vertical";
if (!audioPath) throw new Error("Uso: node generar-heygen-desde-audio.mjs AUDIO [TÍTULO]");

const env = loadEnv("heygen");
requireEnv(env, ["HEYGEN_API_KEY", "HEYGEN_AVATAR_ID"]);

const upload = await fetch("https://upload.heygen.com/v1/asset", {
  method: "POST",
  headers: { "X-Api-Key": env.HEYGEN_API_KEY, "Content-Type": "audio/mpeg" },
  body: fs.readFileSync(audioPath)
});
const uploaded = await upload.json();
if (!upload.ok || uploaded.error) throw new Error(`Subida ${upload.status}: ${JSON.stringify(uploaded)}`);
const assetId = uploaded.data?.id ?? uploaded.data?.asset_id ?? uploaded.id;
if (!assetId) throw new Error(`No se recibió asset_id: ${JSON.stringify(uploaded)}`);

const response = await fetch("https://api.heygen.com/v2/video/generate", {
  method: "POST",
  headers: { "X-Api-Key": env.HEYGEN_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({
    video_inputs: [{
      character: { type: "avatar", avatar_id: env.HEYGEN_AVATAR_ID, avatar_style: "normal" },
      voice: { type: "audio", audio_asset_id: assetId },
      background: { type: "color", value: "#071827" }
    }],
    dimension: { width: 720, height: 1280 },
    aspect_ratio: "9:16",
    caption: false,
    title
  })
});
const result = await response.json();
if (!response.ok || result.error) throw new Error(`HeyGen ${response.status}: ${JSON.stringify(result)}`);
console.log(JSON.stringify({ video_id: result.data?.video_id ?? result.video_id, status: "submitted" }));
