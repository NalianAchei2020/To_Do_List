import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [

    new HtmlWebpackPlugin({

      title: 'Development',
      template: './src/index.html',

    }),
  ],

  devServer: {
    contentBase: path.join(process.cwd(), 'public'),
    port: 500,
  },

};