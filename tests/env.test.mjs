import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadEnv, requireEnv } from '../scripts/lib/env.mjs';
test('combina archivo común y proveedor, respeta comillas y variables exportadas', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'avatar-env-'));
  try {
    fs.writeFileSync(path.join(root, '.env'), 'AVATAR_TEST_A=base\nAVATAR_TEST_B="value=with=equals"\nAVATAR_TEST_C=plain # comment\n');
    fs.writeFileSync(path.join(root, '.env.fake'), "AVATAR_TEST_A='provider'\n");
    let result = loadEnv('fake', root);
    assert.equal(result.AVATAR_TEST_A, 'provider');
    assert.equal(result.AVATAR_TEST_B, 'value=with=equals');
    assert.equal(result.AVATAR_TEST_C, 'plain');
    process.env.AVATAR_TEST_A = 'exported';
    assert.equal(loadEnv('fake', root).AVATAR_TEST_A, 'exported');
  } finally { delete process.env.AVATAR_TEST_A; fs.rmSync(root, { recursive: true, force: true }); }
});
test('funciona sin archivos y comunica nombres faltantes sin revelar valores', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'avatar-env-'));
  try {
    assert.ok(loadEnv('fake', root));
    assert.throws(() => requireEnv({ KEY: 'private' }, ['KEY', 'VOICE']), /VOICE/);
    requireEnv({ KEY: 'private' }, ['KEY']);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});


test('HeyGen falla antes de subir audio si faltan clave o avatar', async () => {
  const { spawnSync } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'avatar-missing-'));
  try {
    const script = fileURLToPath(new URL('../scripts/avatars/generar-heygen.mjs', import.meta.url));
    const result = spawnSync(process.execPath, [script, 'audio.mp3'], { cwd: root, env: {}, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Falta configuración: HEYGEN_API_KEY, HEYGEN_AVATAR_ID/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
