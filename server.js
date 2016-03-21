var fs = require('fs')
var http = require('http')
var qs = require('querystring')
var minimist = require('minimist')
var ecstatic = require('ecstatic')
var Router = require('routes')
var eos = require('end-of-stream')
var wsock = require('websocket-stream')
var xtend = require('xtend')
var RPC = require('multiplex-rpc')
var api = require('./lib/api')

var argv = minimist(process.argv.slice(2), {
  alias: { p: 'port' }, default: { port: 8000 }
})

var router = new Router
router.addRoute(/^\/[^\/.]*$/, function (req, res) {
  fs.createReadStream(__dirname + '/index.html').pipe(res)
})

var st = ecstatic(__dirname + '/public')

var server = http.createServer(handle)
wsock.createServer({ server: server }, onwsock)

server.listen(argv.port, function () {
  console.log('listening on :' + server.address().port)
})

function handle (req, res) {
  var s = req.url.split('?')
  var m = router.match(s[0])
  var q = qs.parse(s.slice(1).join('?'))
  if (m) m.fn(req, res, { params: xtend(q, m.params) })
  else st(req, res)
}

function onwsock (stream) {
  var rpc = RPC(api)
  stream.pipe(rpc).pipe(stream)
  eos(stream, function (err) {
    if (err) console.error(err)
    rpc.destroy()
  })
}