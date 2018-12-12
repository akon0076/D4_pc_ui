'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BASE_FILE_VIEW:'"http://localhost:8080/simple/attachment/Attachment/download?fileAddress="',
  BASE_ONLINE_VIEW:'"http://localhost:8012/onlinePreview?url="',
  NODE_ENV: '"development"',
  BASE_FILE_API:'"http://localhost:8080/file/"',
  BASE_SIMPLE_API:'"http://localhost:8080"',
  BASE_PM_API:'"http://localhost:8081"',
  BASE_PS_API:'"http://localhost:8083"',
  BASE_GENERATOR_API:'"http://localhost:8111"'
})
