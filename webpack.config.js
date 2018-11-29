const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
require('babel-polyfill');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
});
const appPath = path.join(__dirname, 'src/client');
module.exports = {
  context: appPath,
  entry: ['babel-polyfill', appPath],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [appPath],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  plugins: [htmlPlugin],
};
