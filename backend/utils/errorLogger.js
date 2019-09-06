module.exports = ({ msg, reqId, ctx }) => {
  console.log()
  console.error(`[ERROR ${reqId} ${ctx}]`, msg)
  console.log()
}
