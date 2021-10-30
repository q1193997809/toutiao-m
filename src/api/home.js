import request from '@/utils/request'

export const getUserChannels = () => request({
  method: 'GET',
  url: '/v1_1/user/channels'
})

export const getArticles = params => request({
  method: 'GET',
  url: '/v1_1/articles',
  params
})
