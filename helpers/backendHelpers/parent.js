import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//Parent profile update
export const updateParentProfile = async (data) => {
  return put(`${url.PARENT}`, { ...data }, getApiConfig())
}

//Parent profile picture update
export const updateProfilePictureParent = async (data) => {
  let userInfo = getUserInfo()
  return put(
    `${url.DASHBOARD_API_URL}/parent/${userInfo.id}?from=parentApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}

//get Parent details
export const getParentProfile = async () => {
  return await get(url.PARENT, getApiConfig())
}
