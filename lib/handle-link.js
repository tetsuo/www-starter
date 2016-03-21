import url from 'url'

export default function (cb, ev) {
  if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented)
    return true

  var anchor = null
  var n = ev.target 
  for (n = ev.target; n.parentNode; n = n.parentNode) {
    if (n.nodeName === 'A') {
      anchor = n
      break
    }
  }

  if (!anchor) return true

  var u = url.parse(anchor.getAttribute('href'))
  if (u.host && u.host !== location.host) return true

  ev.preventDefault()

  cb(url.resolve(location.pathname, u.path))
}

