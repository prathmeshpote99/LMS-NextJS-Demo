import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//student profile update
export const updateFteacherProfile = async (data) => {
  return put(`${url.FTEAHCER_PROFILE}`, { ...data }, getApiConfig())
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

//get fTeacher details
export const getfTeacherProfile = async () => {
  return await get(url.FTEAHCER_PROFILE, getApiConfig())
}
