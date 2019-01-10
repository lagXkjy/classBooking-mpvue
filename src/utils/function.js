/**
 * User: vickyzhe@outlook.com
 * Date: 2018/9/26
 * Time: 上午11:35
 *
 */
function goPagewithLogin(isLogin, url) {
  if (!isLogin) {
    wx.showModal({
      title: '提示',
      content: '必须先登录',
    })
  }else {
    wx.navigateTo({
      url: url
    })
  }
}

function jsonToArry(json) {
  const jsonArr = []
  let index = -1
  for(let key in json) {
    index++
    jsonArr[index] = {
      name: key,
      value: json[key]
    }
  }
  return jsonArr
}

export default {
  goPagewithLogin, jsonToArry
}
