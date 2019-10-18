import axios from 'axios'
import { Message, Modal } from 'iview'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  // do something before request is sent
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token] is a custom headers key
    // please modify it according to the actual situation
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  /**
  * if you want to get http information such as headers or status
  * Please return response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message.error(res.message)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Modal.confirm({
          title: '提示',
          content: '你已被登出，可以取消继续留在该页面，或者重新登录',
          okText: '重新登录',
          onOk: () => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message.error(error.message)
    return Promise.reject(error)
  })

export default service
