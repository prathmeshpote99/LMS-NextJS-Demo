import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllPastPaper = (level) => {
  let fetchUrl = `${url.PASTPAPER}/getAll`
  if (level) fetchUrl += `?level=${level}`

  return get(fetchUrl, getApiConfig())
}

export const getAllPastPaperWithFilterAPI = (pp_category, pp_year) => {
  return get(
    `${url.PASTPAPER}/getAllWithFilter?pp_category=${pp_category}&pp_year=${pp_year}`,
    getApiConfig(),
  )
}

// export const getAssignmentResultByStudentAPI = (st_id, asn_id) => {
//   return get(
//     `${url.ASSIGNMENTRESULT}/getAssignmentResultByStudent/get?asn_id=${asn_id}&st_id=${st_id}`,
//     getApiConfig(),
//   )
// }
