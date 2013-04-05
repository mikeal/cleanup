var cleanup = require('./')
  , called = false
  ;

var d = cleanup(function (error) {
  if (called) {
    console.error('Cleanup was called twice')
    process.exit(1)
  }
  called = true
  if (!error) {
    console.error('Error was not trapped')
    process.exit(1)
  }

}, true)

d.enter()

process.nextTick(function () {
  throw new Error('YAH!')
})

process.nextTick(function () {
  d.cleanup()
})