const Fastify = require('fastify')

const fastifyRedis = require('fastify-redis')
const fastifyHelmet = require('fastify-helmet')
const fastifyRateLimit = require('fastify-rate-limit')

const app = require('./app')
const config = require('./config')

const fastify = Fastify(config.fastify)

fastify
  .get('/healthcheck', (request, reply) => {
    reply.send('OK')
  })
  .register(fastifyHelmet)
  .register(fastifyRateLimit, config.rateLimit)
  .register(fastifyRedis, config.redis)
  .register(app)
  .listen(config.fastify.port, config.fastify.host, err => {
    fastify.redis.on('error', redisError => {
      throw Error(
        'Cannot connect to Redis instance with code ' + redisError.code
      )

      process.exit(1)
    })

    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
