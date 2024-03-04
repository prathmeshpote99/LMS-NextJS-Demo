import { get, post, put } from '../apiHelper'
import { getApiConfig, getUserInfo } from '../authHelper'
import * as url from '../urlHelper'

export const forgotPasswordAPI = (email, userType, phoneNumber = '') => {
  return get(
    `${url.AUTH}/forgotPassword?email=${email}&userType=${userType}&phoneNumber=${phoneNumber}`,
    getApiConfig(),
  )
}

export const verifyForgotPasswordOtpAPI = (
  emailOrPhone,
  userType,
  otp,
  verifyType,
) => {
  return get(
    `${url.AUTH}/verifyForgotPasswordOTP?emailOrPhone=${emailOrPhone}&userType=${userType}&otp=${otp}&verifyType=${verifyType}`,
    getApiConfig(),
  )
}

export const generateTeacherOTPAPI = (body) => {
  return post(`${url.AUTH}/generateTeacherOtp`, body, getApiConfig())
}

export const generateStudentOTPAPI = (body) => {
  return post(`${url.AUTH}/generateStudentOtp`, body, getApiConfig())
}

export const resetPasswordAPI = (
  emailOrPhone,
  userType,
  password,
  verifyType,
) => {
  return get(
    `${url.AUTH}/resetPassword?emailOrPhone=${emailOrPhone}&userType=${userType}&password=${password}&verifyType=${verifyType}`,
    getApiConfig(),
  )
}
