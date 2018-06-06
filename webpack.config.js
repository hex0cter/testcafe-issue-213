const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = packageName => ({
  mode: 'development',
  devtool: 'inline-sourcemap',
  context: path.resolve('packages', packageName),
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: `${packageName}.js`
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }]
    }, {
      test: /\.txt$/,
      use: 'raw-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: `./${packageName}.html`
    })
  ],
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  }
})
