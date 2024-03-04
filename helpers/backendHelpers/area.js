import { get, post, del, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getAllArea = () => {
  return get(`${url.AREA}/circuit`, getApiConfig())
}
