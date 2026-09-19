import { readFileSync } from 'fs';
import { join } from 'path';

function readEnvFile(): Record<string, string> {
  const values: Record<string, string> = {};
  try {
    for (const line of readFileSync(join(__dirname, '..', '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (match) values[match[1]] = match[2];
    }
  } catch {
    // fall back to defaults below
  }
  return values;
}

const file = readEnvFile();

export const credentials = {
  username: file.USERNAME || 'standard_user',
  password: file.PASSWORD || 'tta_secret',
  lockedOutUsername: 'locked_out_user',
};
