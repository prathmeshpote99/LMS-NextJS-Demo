import { get, post, put } from '../apiHelper'
import { getApiConfig, getFullUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const createSelfAssessment = (data) => {
  return post(`${url.SELFASSESSMENT}/`, data, getApiConfig())
}

export const updateSelfAssessment = (id, data) => {
  return put(`${url.SELFASSESSMENT}/${id}`, data, getApiConfig())
}

export const getAllSelfAssessment = () => {
  const userInfo = getFullUserInfo()
  let fetchUrl = `${url.SELFASSESSMENT}/getAll`
  if (userInfo?.st_id) {
    fetchUrl += `?st_id=${userInfo?.st_id}`
  }

  return get(fetchUrl, getApiConfig())
}

export const getAllQueBySelfAssessment = (sa_id) => {
  return get(
    `${url.SELFASSESSMENT}/getAllQueBySelfAssessment?sa_id=${sa_id}`,
    getApiConfig(),
  )
}

export const getAllClasses = (mainCategory) => {
  return get(
    `${url.SELFASSESSMENT}/getAllClass?mainCategory=${mainCategory}`,
    getApiConfig(),
  )
}
