import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/img/[name].[hash:8][ext]',
    },
  };

  const cssLoader = buildCssLoader(isDev);

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext][query]',
    },
  };

  const imageLoader = {
    test: /\.(png|jpg|jpeg|gif|ico)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/img/[name].[hash:8][ext]',
    },
  };

  const videoLoader = {
    test: /\.(mp4|mov|wmv|avi|flv|mkv|webm)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/video/[name].[hash:8][ext]',
    },
  };

  const phpLoader = {
    test: /\.php$/,
    type: 'asset/resource',
    generator: {
      filename: 'assets/php/[name][ext]',
    },
  };

  return [svgLoader, ...cssLoader, fontLoader, imageLoader, videoLoader, typescriptLoader, phpLoader];
}
