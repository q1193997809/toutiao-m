import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = 'http://toutiao-app.itheima.net/'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
