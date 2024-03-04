import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllQuestionsByPaperID = (pp_id) => {
  return get(`${url.ASSIGNMENTQUELIST}/getAll?pp_id=${pp_id}`, getApiConfig())
}

export const getAssignmentQueList = (id) => {
  return get(
    `${url.ASSIGNMENTQUELIST}/getAssignmentQueByAssignWeb?asn_id=${id}`,
    getApiConfig(),
  )
}

export const getAllQueByFilter = (aq_category, aq_subCategory, aq_topic) => {
  return get(
    `${url.ASSIGNMENTQUELIST}/getAllQueByFilter/get?aq_category=${aq_category}&aq_subCategory=${aq_subCategory}&aq_topic=${aq_topic}`,
    getApiConfig(),
  )
}

export const getPracticeQuestions = (
  studentClass,
  subject,
  topic,
  type,
  limit,
) => {
  let routeUrl = `${url.ASSIGNMENTQUELIST}/practice?studentClass=${studentClass}&subject=${subject}&type=${type}&limit=${limit}`
  if (topic) {
    routeUrl += `&topic=${topic}`
  }

  return get(routeUrl, getApiConfig())
}
