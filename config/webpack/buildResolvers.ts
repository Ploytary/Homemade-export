import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';
import path from 'path';

export function buildResolvers(options: BuildOptions): ResolveOptions {
  const { paths } = options;
  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {
      '@sprite': path.resolve(paths.root, 'src/assets/images/common/svg-sprite/sprite.svg'),
      '@image': path.resolve(paths.root, 'src/assets/images'),
      '@video': path.resolve(paths.root, 'src/assets/videos'),
      '@script': path.resolve(paths.root, 'src/assets/js'),
      '@style': path.resolve(paths.root, 'src/assets/style'),
    },
  };
}
