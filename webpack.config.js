const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, './dist/'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, ('./index.html')),
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
};
