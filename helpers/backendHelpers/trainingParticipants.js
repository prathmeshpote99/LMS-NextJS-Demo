import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//student profile picture update
export const uploadSignedForm = async (data, tps_id) => {
  let userInfo = getUserInfo()
  return put(
    `${url.DASHBOARD_API_URL}/training-participants/${tps_id}?from=studentApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}

export const updateTrainingParticipants = (body, id) => {
  return put(`${url.TRAININGPARTICIPANTS}/${id}`, body, getApiConfig(false))
}

export const updateTrainingParticipantsAdmin = (body, id) => {
  return put(
    `${url.DASHBOARD_API_URL}/training-participants/${id}`,
    body,
    getApiConfig(true),
  )
}

export const createCertificate = (id) => {
  return get(
    `${url.DASHBOARD_API_URL}/training-participants/certificate/create?tps_id=${id}`,
    getApiConfig(false),
  )
}

export const updateTrainingParticipantsDash = (body, id) => {
  return put(
    `${url.DASHBOARD_API_URL}/training-participants/${id}?from=studentApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    body,
    getApiConfig(true),
  )
}

export const generateSignedForm = (body) => {
  return post(
    `${url.DASHBOARD_API_URL}/training-participants/generateSignedForm`,
    body,
    getApiConfig(true),
  )
}
