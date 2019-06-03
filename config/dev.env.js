'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BASE_FILE_VIEW:'"http://localhost:8080/simple/attachment/Attachment/download?fileAddress="',
  BASE_ONLINE_VIEW:'"http://localhost:8012/onlinePreview?url="',
  NODE_ENV: '"development"',
  BASE_FILE_API:'"http://localhost:8080/file/"',
  BASE_SIMPLE_API:'"http://localhost:8080"',
  BASE_GENERATOR_API:'"http://localhost:8111"',
  BASE_TASK_MISSION_API:'"http://127.0.0.1/task"'
})
