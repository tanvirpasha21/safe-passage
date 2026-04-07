import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'locales');

export function getTranslations(locale) {
  const filePath = path.join(localesDir, locale, 'common.json');
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // fallback to English
    const fallback = fs.readFileSync(path.join(localesDir, 'en', 'common.json'), 'utf-8');
    return JSON.parse(fallback);
  }
}
