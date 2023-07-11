import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
    publicPath: '/To_Do_List/',
  },
  module: {
    rules: [
      {

        test: /\.css$/i,

        use: ['style-loader', 'css-loader'],
      },
      {

        test: /\.(png|svg|jpg|jpeg|gif)$/i,

        type: 'asset/resource',

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
    static: './dist',
    port: 500,
    open: true,
  },

};