import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = data => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${data}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}
export const getUserChanels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
