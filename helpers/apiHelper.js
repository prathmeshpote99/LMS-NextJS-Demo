import axios from 'axios'
import {
  logOutUser,
  logOutfTeacher,
  logOutParent,
  logOutPublisher,
} from './backendHelper'
import { getUserInfo, removeAuthInfo } from './authHelper'
import { API_URL } from './urlHelper'

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const userInfo = getUserInfo()
    if (!userInfo) return Promise.reject(error)

    const originalRequest = error.config

    // Check if the error status is 401 and if it's not a retry request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // logout the users
      if (userInfo.userType === 'Student') {
        logOutUser()
      } else if (userInfo.userType === 'Teacher') {
        logOutfTeacher()
      } else if (userInfo.userType === 'Parent') {
        logOutParent()
      } else if (userInfo.userType === 'Publisher') {
        logOutPublisher()
      }

      removeAuthInfo()
      window.location.href = '/auth/signin?invalidToken=true'
    }

    return Promise.reject(error)
  },
)

export const get = async (url, config = {}) => {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data)
}

export const post = async (url, data, config = {}) => {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
}

export const put = async (url, data, config = {}) => {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data)
}

export const del = async (url, config = {}) => {
  return axiosApi.delete(url, { ...config }).then((response) => response.data)
}
