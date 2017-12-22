var webpack = require('webpack')
var merge = require('webpack-merge')
var common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 8010,
    proxy: {
      '/api': {
        target: '',
        secure: false,
        changeOrigin: true
        //pathRewrite: {
        //  '^/api': '/api'
        //}
      }
    },
    historyApiFallback: {
      index: common.output.publicPath
    },
    inline: true,
    hot: true,
    open: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 要么--hot，要么hot:true+new webpack.HotModuleReplacementPlugin()
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ]
})
