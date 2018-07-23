const {resolve} = require('path');

module.exports = {
  entry: {
    main: './src/native/main.ts',
    renderer: './src/app/renderer.ts'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: "dist/"
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: [
      '.js',
      '.ts'
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: "source-map-loader"
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts?$/,
        use: "source-map-loader"
      },
      {
        // For our normal typescript
        test: /\.ts?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.json'
            }
          }
        ],
        exclude: /(?:node_modules)/,
      },
    ]
  },
  target: 'node-webkit',
  devtool: 'inline-source-map'
};
