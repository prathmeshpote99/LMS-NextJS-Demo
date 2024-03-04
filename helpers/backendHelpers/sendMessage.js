import { get, post } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const getMessages = (sm_student, sm_class, sc_id) => {
  return get(
    `${url.MESSAGE}/getAllMessageByStudent?sm_student=${sm_student}&cr_id=${sm_class}&sc_id=${sc_id}`,
    getApiConfig(),
  )
}
