import Vue from 'vue'
import App from './App'
import '@/utils/weui.wxss'
import { post } from '@/utils/reuqest'
import store from '@/stores/global-store'
import config from '@/utils/config'
const { baseUrl } = config

Vue.prototype.$post = post
Vue.prototype.$store = store
Vue.prototype._baseUrl = baseUrl
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
