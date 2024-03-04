import { get, post, del, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllGroupMember = () => {
  return get(`${url.GROUPMEMBER}`, getApiConfig())
}

export const getGroupMemberById = (id) => {
  return get(`${url.GROUPMEMBER}/${id}`, getApiConfig())
}

export const getGroupMemberByStudentAPI = (id) => {
  return get(
    `${url.GROUPMEMBER}/getGroupMemberByStudent?st_id=${id}`,
    getApiConfig(),
  )
}

export const createGroupMemberAPI = (data) => {
  return post(`${url.GROUPMEMBER}`, data, getApiConfig())
}

export const updateGroupMember = (id, body) => {
  return put(`${url.GROUPMEMBER}/${id}`, body, getApiConfig())
}

export const deleteGroupMember = (id) => {
  return del(`${url.GROUPMEMBER}/${id}`, getApiConfig())
}
