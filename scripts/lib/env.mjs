import fs from 'node:fs';
import path from 'node:path';

// Precedence: exported variables > provider file > .env. Never log values.
export function loadEnv(provider, root = process.cwd()) {
  const result = {};
  for (const name of ['.env', `.env.${provider}`]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;
    for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const match = raw.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match) continue;
      let value = match[2];
      if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
      else value = value.replace(/\s+#.*$/, '').trim();
      result[match[1]] = value;
    }
  }
  return { ...result, ...process.env };
}
export function requireEnv(env, names) {
  const missing = names.filter(name => !env[name]);
  if (missing.length) throw new Error(`Falta configuración: ${missing.join(', ')}. Copia .env.example a .env y usa tus propios identificadores.`);
}
