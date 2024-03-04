import { get, post } from '../apiHelper'
import * as url from '../urlHelper'
import { getApiConfig } from '../authHelper'

export const getTrainingPrograms = (userType = '') => {
  return get(`${url.TRAININGPROGRAM}?userType=${userType}`, getApiConfig())
}

export const getTrainingProgram = (id) => {
  return get(`${url.TRAININGPROGRAM}/${id}`)
}
export const getBooksByTPAPI = (id) => {
  return get(`${url.TRAININGPROGRAM}/getBooksByTP/get?tp_id=${id}`)
}
export const getEnrolledTrainingProgram = (data) => {
  return post(
    `${url.TRAININGPARTICIPANTS}/getEnrolledTrainingProgram`,
    data,
    getApiConfig(),
  )
}
export const createTrainingParticipants = (data) => {
  return post(`${url.TRAININGPARTICIPANTS}/`, data, getApiConfig())
}
