import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//student profile update
export const updateProfile = async (data) => {
  return put(`${url.STUDENT_PROFILE}`, { ...data }, getApiConfig())
}

//student profile picture update
export const updateProfilePicture = async (data) => {
  let userInfo = getUserInfo()
  return put(
    `${url.DASHBOARD_API_URL}/student/${userInfo.id}?from=studentApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}

//get student details
export const getProfile = async () => {
  return await get(url.STUDENT_PROFILE, getApiConfig())
}

//get student details
export const getStudentById = async (id) => {
  return await get(
    `${url.STUDENT_PROFILE}/getStudentById?st_id=${id}`,
    getApiConfig(),
  )
}

//get student details
export const getStudentsByClassAndSchoolAPI = async (st_class, st_schoolId) => {
  return await get(
    `${url.STUDENT_PROFILE}/getStudentByClassAndDiv?st_class=${st_class}&st_schoolId=${st_schoolId}`,
    getApiConfig(),
  )
}

export const getAllSchoolByArea = (region, district, circuit) => {
  return get(
    `${url.STUDENT_PROFILE}/filterSchool?sc_region=${region}&sc_district=${district}&sc_circuit=${circuit}`,
    getApiConfig(),
  )
}
