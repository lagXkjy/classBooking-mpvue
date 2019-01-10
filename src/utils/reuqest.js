/**
 * User: vickyzhe@outlook.com
 * Date: 2018/9/21
 * Time: 下午1:31
 *
 */
import queryString from './queryString'
import config from './config'
const { baseUrl } = config
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
fly.config.timeout = 20000
fly.config.baseURL = baseUrl

// 通用的post请求
export const post = (params) => {
  return fly.post(params.url, queryString.stringify(params.data))
}
