const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const outputDirectory = 'dist';


const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(item => ['.bin'].indexOf(item) === -1 )  // exclude the .bin folder
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  externals: nodeModules,
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: {
      "vscode": "commonjs vscode"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    //host: "localhost",
    port: 3000, //This port is for frontend
    open: true,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  //externals: nodeModules,
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};