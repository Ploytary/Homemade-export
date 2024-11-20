import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';
import PugPlugin from 'pug-plugin';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';
import path from 'path';
import Dotenv from 'dotenv-webpack';

export function buildPlugins({ isAnalyze, mode }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins = [
    new webpack.ProgressPlugin(),
    new Dotenv({ path: `./.env.${mode}` }),
    new PugPlugin({
      entry: './src/pug/page',
      pretty: 'auto',
      js: {
        filename(pathData) {
          if (pathData.chunk instanceof webpack.Chunk && pathData.chunk.chunkReason) {
            return 'assets/js/[name].[contenthash:8].js';
          }
          const outPath = pathData.filename
            ? `assets/js/${path.dirname(pathData.filename).split(path.sep).at(-1)}-page.[contenthash:8].js`
            : 'assets/js/[name].[contenthash:8].js';
          return outPath;
        },
        chunkFilename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    } as HtmlBundlerPlugin.PluginOptions),
  ];

  if (isAnalyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      })
    );
  }

  return plugins;
}
