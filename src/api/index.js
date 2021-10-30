import { login, sendSms } from '@/api/login'
import { getUserInfo } from '@/api/my'
import { getUserChannels, getArticles } from '@/api/home'
export const loginAPI = login

export const sendSmsAPI = sendSms

export const getUserInfoAPI = getUserInfo

export const getUserChannelsAPI = getUserChannels

export const getArticlesAPI = getArticles
