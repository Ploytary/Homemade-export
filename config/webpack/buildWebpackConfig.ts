import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';
import { buildExternals } from './buildExternals';
import 'dotenv/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
  const { paths, mode, isDev } = options;

  return {
    mode,
    output: {
      path: paths.build,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    externals: buildExternals(),
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: {
      splitChunks: {
        cacheGroups: {
          shared: {
            test: /\.(js|ts|mjs|mts|cjs|cts)$/,
            chunks: 'all',
            name({ context }: { context: string }, chunks: webpack.Chunk, groupName: string) {
              if (/[\\/]node_modules[\\/]/.test(context)) {
                const result = context.match(/[\\/]node_modules[\\/](.*?)(?:[\\/]|$)/);
                if (!result) return groupName;
                const moduleName = result[1].replace('@', '');
                return `npm.${moduleName}`;
              }
              return groupName;
            },
          },
        },
      },
    },
  };
}
