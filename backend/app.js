const md5 = require('./utils/md5')
const errorLogger = require('./utils/errorLogger')

const authMiddleware = require('./middlewares/auth')
const traceMiddleware = require('./middlewares/tracer')

module.exports = (fastify, opts, done) => {
  const { redis } = fastify

  const Index = (request, reply) => {
    reply.send({ mampir: 'https://github.com/evilfactorylabs/tinker' })
  }

  const CreateData = (request, reply) => {
    const id = require('cuid').slug()
    const timestamp = Date.now()
    const token = md5(id + timestamp)

    try {
      const payload = {
        meta: {
          id,
          token,
          timestamp
        },
        data: request.body
      }

      const $payload = JSON.stringify(payload)

      redis.set(`ayu:${id}`, $payload, err => {
        reply.send(payload)
      })
    } catch (err) {
      errorLogger({
        msg: err,
        reqId: request.id,
        ctx: `set:${id}`
      })

      reply
        .status(500)
        .send({ message: 'something went wrong', requestId: request.id })
    }
  }

  const GetData = (request, reply) => {
    const { id } = request.params

    redis.get(`ayu:${id}`, (err, value) => {
      if (!value) {
        reply.status(404).send({ message: 'data not found' })
      } else {
        try {
          const parse = JSON.parse(value)
          redis.incr(`ayu:${id}:hits`)
          redis.set(`ayu:${id}:updated`, Date.now())

          reply.send(parse.data)
        } catch (err) {
          errorLogger({
            msg: err,
            reqId: request.id,
            ctx: `get:${id}`
          })

          reply
            .status(500)
            .send({ message: 'something went wrong', requestId: request.id })
        }
      }
    })
  }

  const DeleteData = (request, reply) => {
    const { id } = request.params

    redis.get(`ayu:${id}`, (err, value) => {
      if (!value) {
        reply.status(404).send({ message: 'data not found' })
      } else {
        try {
          const parse = JSON.parse(value)
          const auth = request.headers.authorization
          const authToken = auth.split(' ')[1]
          const token = parse.meta.token

          if (token !== authToken) {
            reply.status(403).send({ message: 'token is not match' })
          } else {
            redis.del(`ayu:${id}`)
            redis.del(`ayu:${id}:updated`)
            redis.del(`ayu:${id}:hits`)
            reply.send({ message: `data with id ${id} is deleted` })
          }
        } catch (err) {
          errorLogger({
            msg: err,
            reqId: request.id,
            ctx: `del:${id}`
          })

          reply
            .status(500)
            .send({ message: 'something went wrong', requestId: request.id })
        }
      }
    })
  }

  fastify
    .use(traceMiddleware)
    .get('/', Index)
    .post('/', CreateData)
    .get('/:id', GetData)
    .delete('/:id', { preHandler: [authMiddleware] }, DeleteData)

  done()
}
