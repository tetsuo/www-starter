var path = require('path')
var through = require('through2')
var sass = require('node-sass')

module.exports = function (file) {
  var s = '';
  if ('.scss' !== path.extname(file)) return through()
  return through(function (row, enc, cb) {
    s += row.toString()
    cb()
  }, function (cb) {
    var self = this
    sass.render({
      data: s,
      precision: 6,
      outputStyle: 'compressed',
      indentedSyntax: true
    }, function (err, res) {
      if (err) {
        console.error(err)
      } else {
        res = res.css.toString()
        res = res.replace(/\r?\n|\r/g, ' ')
        res = 'module.exports=\'' + res + '\''
        self.push(res)
      }
      s = ''; cb()
    })
  })
}
