import fs from "node:fs";

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) throw new Error("Uso: node crear-srt-desde-timings.mjs TIMINGS_JSON SALIDA_SRT");

const format = (seconds) => {
  const milliseconds = Math.round(seconds * 1000);
  const ms = milliseconds % 1000;
  const totalSeconds = Math.floor(milliseconds / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
};

const { scenes } = JSON.parse(fs.readFileSync(input, "utf8"));
const srt = scenes.map((scene, index) =>
  `${index + 1}\n${format(scene.start)} --> ${format(scene.end)}\n${scene.text}\n`
).join("\n");
fs.writeFileSync(output, srt);
console.log(output);
