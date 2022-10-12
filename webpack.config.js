const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');

module.exports = {
  mode: 'development',
  entry: join(__dirname, './src/index.tsx'),
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
    path: join(__dirname, './build'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module\.css$/i,
        use: ['style-loader', { loader: 'css-loader', options: { modules: true } }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, './public/index.html'),
    }),
  ],
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    static: {
      directory: join(__dirname, './public'),
    },
    port: 3001,
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    historyApiFallback: true,
  },
};
