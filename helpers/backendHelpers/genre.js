import { get } from '../apiHelper'
import * as url from '../urlHelper'
import { getApiConfig } from '../authHelper'
export const getBookGenre = () => {
  return get(`${url.API_URL}/genre`, getApiConfig())
}
