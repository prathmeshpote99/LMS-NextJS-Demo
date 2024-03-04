import { getApiConfig, getUserInfo } from '../authHelper'
import { get, post, put, del } from '../apiHelper'
import * as url from '../urlHelper'

//Publisher profile update
export const updatePublisherProfile = async (data) => {
  return put(`${url.PUBLISHER}`, { ...data }, getApiConfig())
}

//Publisher picture update
export const updateProfilePicturePublisher = async (data) => {
  let userInfo = getUserInfo()
  return put(
    `${url.DASHBOARD_API_URL}/publisher/${userInfo.id}?from=publisherApp&key=${process.env.REACT_APP_UPLOAD_SECRET_KEY}`,
    { ...data },
    getApiConfig(true),
  )
}

//get Publisher details
export const getPublisherProfile = async () => {
  return await get(url.PUBLISHER, getApiConfig())
}
