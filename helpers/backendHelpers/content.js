import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllContentByTPAPI = (id) => {
  return get(`${url.CONTENT}/getAllContentByTP?tp_id=${id}`, getApiConfig())
}

