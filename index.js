var domain = require('domain')
  , once = require('once')
  ;

module.exports = function (cleanup, noOutput) {
  var d = domain.create()
  d.cleanup = once(cleanup)
  var handler = once(function (e) {
    if (e === 0 || !e) return d.cleanup()
    if (!noOutput) console.error(e.stack || e)
    d.cleanup(e)
  })

  d.on('error', handler)
  process.on('uncaughtException', handler)
  process.on('exit', handler)

  d.enter()
  return d
}