import path from 'path';
import fs from 'fs';
import { BuildOptions } from '../types/config';

export function getPugEntryConfig(options: BuildOptions): Record<string, string> {
  const { paths } = options;
  const PAGES_DIR = path.resolve(paths.src, 'pug', 'page');
  const pugPages = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));
  const pugPagesEntries = pugPages.map((pugPage) => [
    pugPage.split('.')[0],
    path.resolve(paths.src, 'pug', 'page', pugPage),
  ]);
  return Object.fromEntries(pugPagesEntries);
}
