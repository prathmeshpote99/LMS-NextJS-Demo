import { get, post, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const createSelfAssessment = (data) => {
  return post(`${url.SELFASSESSMENT}/`, data, getApiConfig())
}

export const updateSelfAssessment = (id, data) => {
  return put(`${url.SELFASSESSMENT}/${id}`, data, getApiConfig())
}

export const getAllSelfAssessment = () => {
  return get(`${url.SELFASSESSMENT}/getAll`, getApiConfig())
}

export const getAllTrainingQueByTE = (tp_id) => {
  return get(
    `${url.TRAININGQSET}/getAllTrainingQsetByTE?tp_id=${tp_id}`,
    getApiConfig(),
  )
}

export const generateOtpForExam = (tps_id) => {
  return post(`${url.AUTH}/generateOtpForExam?tps_id=${tps_id}`, getApiConfig())
}
