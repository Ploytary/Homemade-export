import webpack from 'webpack';
import { buildWebpackConfig } from './config/webpack/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/webpack/types/config';
import { ProjectPaths } from './config';

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    root: ProjectPaths.ROOT,
    build: ProjectPaths.BUILD,
    src: ProjectPaths.SRC,
  };

  const mode = env.mode || 'development';
  const PORT = env.port || 3000;
  const isAnalyze = env.analyze || false;

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    isAnalyze,
    port: PORT,
  });

  return config;
};
