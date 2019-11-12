'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/tools.cjs.prod.js')
} else {
  module.exports = require('./dist/tools.cjs.js')
}
