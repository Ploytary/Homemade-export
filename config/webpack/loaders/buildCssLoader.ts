import path from 'path';

export function buildCssLoader(isDev: boolean) {
  return [
    {
      test: /\.(css|scss|sass)$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: (resPath: string) => Boolean(resPath.includes('.module.')),
              localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            },
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.resolve(__dirname, 'postcss.config.js'),
            },
          },
        },
        'sass-loader',
      ],
    },
  ];
}
