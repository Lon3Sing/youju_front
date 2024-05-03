import axios from 'axios'
import router from '@/router/index'

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // timeout: 5000
})

httpInstance.defaults.headers['Content-Type'] = 'multipart/form-data'
// 请求头，headers 信息

httpInstance.interceptors.request.use(config => {
  // 设置请求头
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // const userStore = useUserStore()
    // let username
    // let token
    // console.log(userStore.loginType)
    // switch (userStore.loginType){
    //     case 'merchant':
    //         token  = userStore.merchantInfo.authorization
    //         username = userStore.merchantInfo.username
    //         break
    //     case 'user':
    //         token  = userStore.userInfo.authorization
    //         username = userStore.userInfo.username
    //         break
    //     case 'rider':
    //         token  = userStore.riderInfo.authorization
    //         username = userStore.riderInfo.username
    //         break
    // }
    // console.log(username)
    // console.log(token)
    //   if (username && token) {
    //     config.data = config.data || {}
    //     config.data.username = username
    //     config.data.authorization = token
    //   }
    //   return config
}, e => Promise.reject(e))


// 请求拦截器，内部根据返回值，重新组装，统一管理。
httpInstance.interceptors.response.use(function (res){
    console.log(res)
    if (res.data.error !== 0) {
    // 统一错误提示
    console.log(res.data.error)
    if (res.data.error === 4001 || res.data.error === 4002) {
      console.log(1)
      ElMessageBox.confirm(
          '该操作需要先完成登录~',
          '提示',
          {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            console.log(1)
            router.push({ path: '/' })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消',
            })
          })
    }
    ElMessage({
      type: 'warning',
      message: res.data.msg
    })

    return Promise.reject(res)
  }
  else {
    console.log("请求成功")
    return res.data
  }
})

export default httpInstance