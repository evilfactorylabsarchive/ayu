module.exports = async (request, reply, next) => {
  reply.setHeader('X-REQUEST-ID', request.id)
  next()
}
