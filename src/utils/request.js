import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-big'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
request.interceptors.request.use(function(config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function(err) {
  return Promise.reject(err)
})
export default request
