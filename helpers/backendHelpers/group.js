import { get, post, del, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllGroup = () => {
  return get(`${url.GROUP}`, getApiConfig())
}

export const getGroupById = (id) => {
  return get(`${url.GROUP}/${id}`, getApiConfig())
}

export const getGroupsByStudentAPI = (id) => {
  return get(`${url.GROUP}/getGroupsByStudent?st_id=${id}`, getApiConfig())
}

export const getGroupsBySchoolAndClass = (grp_level, st_id) => {
  return get(
    `${url.GROUP}/getGroupBySchoolAndClass?grp_level=${grp_level}&st_id=${st_id}`,
    getApiConfig(),
  )
}

export const getSingleGroupDetails = (id) => {
  return get(`${url.GROUP}/getSingleGroupDetails?grp_id=${id}`, getApiConfig())
}

export const createGroupAPI = (data) => {
  return post(`${url.GROUP}`, data, getApiConfig())
}

export const joinGroupAPI = (data) => {
  return post(`${url.GROUP}/joinGroup`, data, getApiConfig())
}

export const updateGroup = (id, body) => {
  return put(`${url.GROUP}/${id}`, body, getApiConfig())
}

export const deleteGroup = (id) => {
  return del(`${url.GROUP}/${id}`, getApiConfig())
}

export const exitGroup = (grp_id, st_id) => {
  return get(
    `${url.GROUP}/exitGroup?grp_id=${grp_id}&st_id=${st_id}`,
    getApiConfig(),
  )
}

export const deleteGroupByAdmin = (grp_id, st_id) => {
  return del(
    `${url.GROUP}/deleteGroupByAdmin?grp_id=${grp_id}&st_id=${st_id}`,
    getApiConfig(),
  )
}
