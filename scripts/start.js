const fs = require('fs')
const yargs = require('yargs').argv
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const webpackHotClient = require('webpack-hot-client')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config')

const getDirectoriesFromPath = dirPath => {
  return fs.readdirSync(dirPath).filter(file => {
    return (
      fs.statSync(path.join(dirPath, file)).isDirectory() &&
      fs.existsSync(path.join(dirPath, file, 'index.html'))
    )
  })
}

const packageName = yargs._[0]
const port = yargs.port || 8080

console.log(chalk.green(`Starting server on http://localhost:${port}...`))

const excludedPackages = ['shared']
const packages = packageName ? [packageName] : getDirectoriesFromPath(
  path.resolve('packages')
).filter(packageName => (
  !excludedPackages.includes(packageName)
))

const config = packages.map(webpackConfig)
const compiler = webpack(config)
const app = express()

packages.forEach(packageName => (
  app.get(`/${packageName}`, (req, res, next) => {
    req.url = `/${packageName}.html`
    next()
  })
))

if (!packageName) {
  app.get('/', (req, res, next) => {
    req.url = '/demo.html'
    next()
  })
}

const server = app.listen(port)

if (!yargs.disableHotReload) {
  webpackHotClient(compiler, {
    // https://github.com/webpack-contrib/webpack-hot-client#server
    server
  })
}

app.use(webpackDevMiddleware(compiler))
