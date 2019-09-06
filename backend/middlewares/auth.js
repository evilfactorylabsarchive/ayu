module.exports = (request, reply, next) => {
  const auth = request.headers.authorization

  if (!auth) {
    reply.status(403).send({ message: 'missing authorization headers' })
  }

  next()
}
