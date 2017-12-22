import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import router from '~/router'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(cfg => {
  cfg.data = qs.stringify(cfg.data)
  return cfg
})

axios.interceptors.response.use(res => {
  console.log('响应:', res.config.url, res)
  if (res.data.code !== 0) {
    Message({
      message: res.data.msg,
      type: 'error'
    })
  }
  return res.data
}, err => {
  if (err.response) {
    console.log('请求:', err.config.url, err.config)
    switch (err.response.status) {
      case 401:
        // router.replace({
        //   name: 'login',
        //   query: {
        //     redirect: router.currentRoute.fullPath
        //   }
        // })
        Message({
          message: '没有权限！',
          type: 'error'
        })
    }
  }
  return Promise.reject(err)
})

export default axios
