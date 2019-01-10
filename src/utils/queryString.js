const arrplit = encodeURIComponent('[]')

function isArray (o) {
  return Object.prototype.toString.call(o) == '[object Array]'
}
function isObject (o) {
  return Object.prototype.toString.call(o) == '[object Object]'
}
function serialValue (value) {
  if (value instanceof Date) {
    return value.getTime()
  }
  return value
}
function connectArrayStr (i, value) {
  return `${encodeURIComponent(i)}${arrplit}=${encodeURIComponent(serialValue(value) + '')}`
}
function connect (i, value) {
  return `${encodeURIComponent(i)}=${encodeURIComponent(serialValue(value) + '')}`
}
function isEmpty (val) {
  return val == null || val == undefined
}
function stringify (obj) {
  if (!obj) {
    return ''
  }
  const s = []
  // 纯数组
  if (isArray(obj)) {
    return `[${obj.map(t => encodeURIComponent(t)).join(',')}]`
  }
  if (isObject(obj)) {
    // 对象
    for (let i in obj) {
      if (isEmpty(obj[i])) continue
      if (isArray(obj[i])) {
        for (let k of obj[i]) {
          if (!k || k === '' || k.toString().trim() === '') continue
          s.push(connectArrayStr(i, k))
        }
      } else {
        s.push(connect(i, obj[i]))
      }
    }
    return s.join('&')
  }
  return encodeURIComponent(obj + '')
}

export default {
  stringify
}
