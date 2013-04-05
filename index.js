var domain = require('domain')
  , once = require('once')
  ;

module.exports = function (cleanup, noOutput) {
  var d = domain.create()
  d.cleanup = once(cleanup)
  d.on('error', function (e) {
    if (!noOutput) console.error(e.stack || e)
    d.cleanup(e)
  })
  return d
}