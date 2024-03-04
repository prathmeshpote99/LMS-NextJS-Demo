import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllAssignment = (id, level, userType) => {
  let fetchUrl = `${url.ASSIGNMENT}/getAll?st_id=${id}`
  if (level) fetchUrl += `&level=${level}`
  if (userType) fetchUrl += `&userType=${userType}`

  return get(fetchUrl, getApiConfig())

  // const userInfo = getUserInfo()
  // let fetchUrl = `${url.ASSIGNMENT}/getAll`
  // if (userInfo.userType === 'Teacher') {
  //   fetchUrl += `?st_id=${id}`
  // } else if (userInfo.userType === 'Student') {
  //   if (level) {
  //     fetchUrl += `?st_level=${level}`
  //   } else {
  //     console.error('Level is required for students.')
  //     return Promise.reject('Level is required for students.')
  //   }
  // }
  return get(fetchUrl, getApiConfig())
}

export const getAssignmentResultByStudentAPI = (st_id, asn_id) => {
  return get(
    `${url.ASSIGNMENTRESULT}/getAssignmentResultByStudent/get?asn_id=${asn_id}&st_id=${st_id}`,
    getApiConfig(),
  )
}
