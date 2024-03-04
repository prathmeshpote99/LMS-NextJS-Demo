import { get, post, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getLiveClasses = (
  ls_category = '',
  ls_subCategory = '',
  ls_topic = '',
  tc_id = '',
  st_level = '',
) => {
  return get(
    `${url.LIVECLASS}/getAllScheduledSession?ls_category=${ls_category}&ls_subCategory=${ls_subCategory}&ls_topic=${ls_topic}&tc_id=${tc_id}&ls_level=${st_level}`,
    getApiConfig(),
  )
}

export const getLiveClassesRecorded = (
  ls_category = '',
  ls_subCategory = '',
  ls_topic = '',
  tc_id = '',
  st_level = '',
) => {
  return get(
    `${url.LIVECLASS}/getAllRecordedSession?ls_category=${ls_category}&ls_subCategory=${ls_subCategory}&ls_topic=${ls_topic}&tc_id=${tc_id}&ls_level=${st_level}`,
    getApiConfig(),
  )
}

export const getLiveClass = (id) => {
  return get(`${url.LIVECLASS}/${id}`, getApiConfig())
}

export const getLiveClassByTeacher = (id) => {
  return get(`${url.LIVECLASS}/get?tc_id=${id}`, getApiConfig())
}

export const generateTokenForRoom = (id, data) => {
  return post(`${url.LIVECLASS}/generate/token/${id}`, data, getApiConfig())
}

export const getRecordingsByRoom = (roomId) => {
  return get(
    `${url.ENABLEX}/getRecordingsByRoom/?roomId=${roomId}`,
    getApiConfig(),
  )
}

export const updateLiveClassAPI = (id, body) => {
  return put(`${url.LIVECLASS}/${id}`, body, getApiConfig())
}

export const updateLiveClassByRoomId = (id, body) => {
  return put(
    `${url.LIVECLASS}/updateLiveSessionByRoomId/update?room_id=${id}`,
    body,
    getApiConfig(),
  )
}
