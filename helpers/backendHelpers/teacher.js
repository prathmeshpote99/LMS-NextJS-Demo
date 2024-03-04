import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//Teacher profile update
export const updateTeacherProfile = async (data) => {
  return put(`${url.TEAHCER_PROFILE}`, { ...data }, getApiConfig())
}

//Teacher profile picture update
export const updateProfilePictureTeacher = async (data) => {
  let userInfo = getUserInfo()
  return put(
    `${url.DASHBOARD_API_URL}/teacher/${userInfo.id}?from=teacherApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}

//get fTeacher details
export const getTeacherProfile = async () => {
  return await get(url.TEAHCER_PROFILE, getApiConfig())
}

//get fTeacher details
export const getTeacherById = async (id) => {
  return await get(`${url.TEAHCER_PROFILE}/getTeacherById?tc_id=${id}`, getApiConfig())
}

// Get All Area
export const getAllRegion = () => {
  return get(url.REGION, getApiConfig())
}
