var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'redux', 'react-redux', 'react-router',
  'redux-thunk', 'redux-form', 'highcharts', 'highcharts-draggable-points',
   'jquery', 'redux-promise'
];//libraries to cache

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/ocm',
    filename: '[name].[chunkhash].js' //chunkhash for cache busting new contents
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
      ]
  },
  devServer: {
    historyApiFallback: {
      index: '/ocm/index.html',
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({//separate vendor code from our code for caching
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({//automatically add script tags to html (bundle, vendor, etc.)
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
  })
  ]
};
