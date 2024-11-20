import path from 'path';

const ROOT = path.resolve(__dirname, '..');

export const ProjectPaths = {
  ROOT,
  BUILD: path.resolve(ROOT, 'build'),
  LOCAL_SERVER_BUILD: path.resolve(ROOT, 'C:/wamp64/www/formtest.loc'),
  SRC: path.resolve(ROOT, 'src'),
};
