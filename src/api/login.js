import request from '@/utils/request'

export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

export const sendSms = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`
})

export const getUserInfo = () => request({
  url: '/v1_0/user'
})
