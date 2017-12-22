var webpack = require('webpack')
var merge = require('webpack-merge')
var common = require('./webpack.common.js')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var CompressionPlugin = require("compression-webpack-plugin")

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      comments: false
    })
    /*,
    new CompressionPlugin({
      test: /\.(js|html|css)$/,
      asset: "[path].gz[query]",
      algorithm: "gzip",
      threshold: 0,
      minRatio: 0.8
    })
    */
    // new BundleAnalyzerPlugin()
  ]
})
