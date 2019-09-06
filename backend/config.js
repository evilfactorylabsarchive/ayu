const id = require('./utils/id')

module.exports = {
  fastify: {
    host: process.env.HOST,
    port: process.env.PORT,
    logger: true,
    genReqId: req => id()
  },
  rateLimit: {
    max: 100,
    timeWindow: '1 minute'
  },
  redis: process.env.REDIS_URI
}
