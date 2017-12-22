var { resolve } = require('path')
var webpack = require('webpack')
var url = require('url')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var publicPath = '/admin'

module.exports = {
  entry: {
    index: './src/main.js',
    vendor: ['axios', 'qs', 'vue', 'vue-router']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:7].js',
    publicPath: publicPath
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:7].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      // filename:生成的html文件名
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  }
}
