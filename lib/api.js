exports.hello = hello
exports.echo = echo

function echo (s, cb) {
    cb(null, s)
}

function hello (cb) {
  cb(null, 'world')
}
