import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllAssignmentResult = () => {
  return get(`${url.ASSIGNMENTRESULT}`, getApiConfig())
}
export const getAssignmentResult = (id) => {
  return get(
    `${url.ASSIGNMENTRESULT}/getAssignmentResultByAssign/${id}`,
    getApiConfig(),
  )
}
export const getAllAssignmentResultByAsn = (id) => {
  return get(
    `${url.ASSIGNMENTRESULT}/getAllAssignmentResultByAssignment/${id}`,
    getApiConfig(),
  )
}
export const createAssignmentResult = (data) => {
  return post(`${url.ASSIGNMENTRESULT}`, data, getApiConfig())
}
