### Cleanup -- cleanup handlers for domains

[![Greenkeeper badge](https://badges.greenkeeper.io/mikeal/cleanup.svg)](https://greenkeeper.io/)

`npm install cleanup`

```
var cleanup = require('cleanup')

var domain = cleanup(function (error) {
  doDatabaseCleaning(function (e, success) {
    if (error) process.exit(1)
    server.close()
  })
})

domain.enter()

var server = http.createServer(function (req, resp) {
  doDatabaseQuery(function (e, message) {
    if (e) throw e
    resp.statusCode = 200
    resp.end('ok')
  })
})

server.listen(8080, function () {
  writeManyThingsToDatabase(function (e, i) {
    if (e) throw e
    request('http://localhost:8080', function (e, resp, body) {
      if (e) throw e
      assert.equal(resp.statusCode, 200)

      domain.cleanup()
    })
  })
})
```
