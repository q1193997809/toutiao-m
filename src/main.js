import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

// 加载vant核心组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 使用 lib-flexible动态设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'

import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
