import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getQuestionsByPastPaper = (pp_id) => {
  return get(
    `${url.ASSIGNMENTQSET}/getAssignmentQsetByPastPaper?pp_id=${pp_id}`,
    getApiConfig(),
  )
}

export const getAssignmentQsetByAssign = (asn_id) => {
  return get(
    `${url.ASSIGNMENTQSET}/getAssignmentQsetByAssign?asn_id=${asn_id}`,
    getApiConfig(),
  )
}
