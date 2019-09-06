const crypto = require('crypto')

module.exports = payload =>
  crypto
    .createHash('md5')
    .update(payload)
    .digest('hex')
