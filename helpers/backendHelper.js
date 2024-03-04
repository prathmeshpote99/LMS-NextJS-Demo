import axios from 'axios'
import { get, post, put, del } from './apiHelper'
import { getApiConfig } from './authHelper'
import * as url from './urlHelper'

export const loginUser = (reqBody) => {
  return post(url.USER_LOGIN, reqBody, {})
}

export const loginfTeacher = (reqBody) => {
  return post(url.FTEACHER_LOGIN, reqBody, {})
}

export const loginTeacher = (reqBody) => {
  return post(url.TEACHER_LOGIN, reqBody, {})
}

export const loginParent = (reqBody) => {
  return post(url.PARENT_LOGIN, reqBody, {})
}

export const loginPublisher = (reqBody) => {
  return post(url.PUBLISHER_LOGIN, reqBody, {})
}

// Student Logout
export const logOutUser = () => {
  return del(url.USER_LOGOUT, getApiConfig())
}

// fTeacher Logout
export const logOutfTeacher = () => {
  return del(url.FTEACHER_LOGOUT, getApiConfig())
}

// parent Logout
export const logOutParent = () => {
  return del(url.PARENT_LOGOUT, getApiConfig())
}

// Publisher Logout
export const logOutPublisher = () => {
  return del(url.PUBLISHER_LOGOUT, getApiConfig())
}

export const updatePassword = (reqBody) => {
  return put(`${url.PASSWORD_UPDATE}`, reqBody, getApiConfig())
}

export const updateTeacherPassword = (reqBody, tc_id) => {
  return put(
    `${url.TEACHER_PASSWORD_UPDATE}?tc_id=${tc_id}`,
    reqBody,
    getApiConfig(),
  )
}

//for freelance teacher
export const signUpTeacher = (reqBody) => {
  return post(url.TEACHER_SIGNUP, reqBody, {})
}

//for student
export const signUpStudent = (reqBody) => {
  return post(url.STUDENT_SIGNUP, reqBody, {})
}

//for Parent
export const signUpParent = (reqBody) => {
  return post(url.PARENT_SIGNUP, reqBody, {})
}

//for Publisher
export const signUpPublisher = (reqBody) => {
  return post(url.PUBLISHER_SIGNUP, reqBody, {})
}

//for Publisher
export const verifyOtpAPI = (reqBody) => {
  return post(url.VERIFY_OTP, reqBody, {})
}

//for Publisher
export const verifyStudentOtpAPI = (reqBody) => {
  return post(url.VERIFY_STUDENT_OTP, reqBody, {})
}

//Resend Email
export const reSendOtpEmail = (email, type = 1) => {
  return post(`${url.RESEND_OTP_EMAIL}?email=${email}&type=${type}`, {}, {})
}

//Resend Email
export const reSendOtpEmailStudent = (email, type = 1) => {
  return post(
    `${url.RESEND_OTP_EMAIL_STUDENT}?email=${email}&type=${type}`,
    {},
    {},
  )
}

//Resend Phone
export const reSendOtpPhone = (email, type = 1) => {
  return post(`${url.RESEND_OTP_EMAIL}?email=${email}&type=${type}`, {}, {})
}

//for Publisher
export const reSendOtpSMS = (tc_phoneNumber, type = 1) => {
  return post(`${url.RESEND_OTP_SMS}?tc_phoneNumber=${tc_phoneNumber}`, {}, {})
}

//for Publisher
export const reSendOtpSMSStudent = (st_phoneNumber, type = 1) => {
  return post(
    `${url.RESEND_OTP_SMS_STUDENT}?st_phoneNumber=${st_phoneNumber}`,
    {},
    {},
  )
}
