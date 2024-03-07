import ButtonLoader from '@/components/Common/ButtonLoader'
import VerificationForm from '@/components/Common/VerificationForm'
import { Field, Form, Formik } from 'formik'
import {
  generateStudentOTPAPI,
  generateTeacherOTPAPI,
} from '@/helpers/backendHelpers/auth'
import { useContext, useEffect, useState } from 'react'
import { FaAngleDown, FaUser } from 'react-icons/fa'
import OtpInput from 'react-otp-input'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'
import { AuthContext } from '@/contexts/AuthContext'
import {
  setAuthToken,
  setFullUserInfo,
  setUserInfo,
} from '@/helpers/authHelper'
import {
  loginParent,
  loginPublisher,
  loginTeacher,
  loginUser,
  reSendOtpSMS,
  verifyOtpAPI,
  verifyStudentOtpAPI,
} from '@/helpers/backendHelper'
import { InvalidTokenMessage } from '../InvalidTokenMessage'
import PasswordInput from '../PasswordInput'
import { useRouter } from 'next/router'

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be more than 6 characters')
    .required('Please Enter Your Password'),
  remember: Yup.bool().oneOf(
    [true],
    'You need to accept the terms and conditions',
  ),
})
const SignIn = () => {
  const router = useRouter()
  let name = router?.query?.tabName ? router?.query?.tabName : 'Teacher'

  const [error, setError] = useState('')
  const { setLogin, isLoggedIn } = useContext(AuthContext)

  const [selectedUser, setSelectedUser] = useState('Teacher')
  const [registerStep, setRegisterStep] = useState(1)
  const [teacherData, setTeacherData] = useState({})
  const [studentData, setStudentData] = useState({})
  const [teacherCredentials, setTeacherCredentials] = useState({})
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [verificationModal, setVerificationModal] = useState(false)
  const [submitUserType, setSubmitUserType] = useState(1)
  const [showError, setShowError] = useState(false)
  const [emailOtp, setEmailOtp] = useState(0)
  const [phoneOtp, setPhoneOtp] = useState(0)
  const [disabledResendCode, setDisabledResendCode] = useState(true)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)

  const otpInput = {
    width: '100%',
    padding: '20px 0',
    borderRadius: '5px',
    // border: "none",
    margin: '0 5px',
  }

  useEffect(() => {
    setSelectedUser(name)
  }, [name])

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/profile')
    } else {
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (registerStep >= 2) {
      if (seconds === 0) {
        setDisabledResendCode(false)
      } else {
        setDisabledResendCode(true)
      }
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval)
          } else {
            setSeconds(59)
            setMinutes(minutes - 1)
          }
        }
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [seconds, registerStep])

  const submitData = async (values) => {
    let { email, password } = values
    let reqBody = {
      userName: email,
      password,
    }
    let saveData = {
      email,
      password,
    }

    setTeacherCredentials(saveData)
    try {
      setIsSubmitLoading(true)
      let responseData = {}
      if (selectedUser === 'Student') {
        responseData = await loginUser(reqBody)
      } else if (selectedUser === 'Teacher') {
        responseData = await loginTeacher(reqBody)
      } else if (selectedUser === 'Parent') {
        responseData = await loginParent(reqBody)
      } else if (selectedUser === 'Publisher') {
        responseData = await loginPublisher(reqBody)
      }
      setIsSubmitLoading(false)
      if (!responseData?.status) {
        let message = responseData?.message || 'Error while logging in'
        return setError(message)
      }

      let { token } = responseData.data
      let student = {}
      let teacher = {}
      let parent = {}
      let publisher = {}
      let userInfo = {}

      // 1 = Public,2 = Freelance (Teacher)
      // 1 = Public,2 = Premium (Student)
      if (selectedUser === 'Student') {
        student = responseData.data.student
        userInfo = {
          id: student.st_id,
          fullName: student.st_fullName,
          classRoomId: student.st_classRoomId,
          userType: student?.st_userType === 1 ? 'Student' : 'Premium',
          profilePic: student?.st_profilePic,
        }
        setStudentData(student)
        if (!student?.st_isEmailVerified || !student?.st_isPhoneVerified) {
          setSubmitUserType(2)
          if (!student?.st_isEmailVerified) {
            return toggleVerificationModal()
          } else if (!student?.st_isPhoneVerified) {
            return toggleVerificationModal()
          }
        } else {
          setAuthInfo(token, userInfo, student.st_profilePic, student)
        }
      } else if (selectedUser === 'Teacher') {
        teacher = responseData.data.teacher
        userInfo = {
          id: teacher.tc_id,
          fullName: teacher.tc_fullName,
          userType: teacher?.tc_userType === 1 ? 'Teacher' : 'Freelance',
          profilePic: teacher?.tc_profilePic,
        }
        setTeacherData(teacher)
        if (!teacher?.tc_isEmailVerified || !teacher?.tc_isPhoneVerified) {
          setSubmitUserType(1)
          if (!teacher?.tc_isEmailVerified) {
            return toggleVerificationModal()
          } else if (!teacher?.tc_isPhoneVerified) {
            return toggleVerificationModal()
          }
        } else {
          setAuthInfo(token, userInfo, teacher.tc_profilePic, teacher)
        }
      } else if (selectedUser === 'Parent') {
        parent = responseData.data.parent
        userInfo = {
          id: parent.pt_id,
          fullName: parent.pt_fullName,
          userType: 'Parent',
          profilePic: parent?.pt_profilePic,
        }
        setAuthInfo(token, userInfo, parent.pt_profilePic, parent)
      } else if (selectedUser === 'Publisher') {
        publisher = responseData.data.publisher
        userInfo = {
          id: publisher.pb_id,
          fullName: publisher.pb_fullName,
          userType: 'Publisher',
          profilePic: publisher?.pb_profilePic,
        }
        setAuthInfo(token, userInfo, publisher.pb_profilePic, publisher)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while logging in'
      setIsSubmitLoading(false)
      return setError(message)
    }
  }

  const setAuthInfo = (token, userInfo, profilePic, fullUserInfo = {}) => {
    if (!token) {
      return setError('Error while logging in')
    }

    token = `Bearer ${token}`

    if (!setAuthToken(token)) {
      return setError('Error while adding details')
    }
    if (!setUserInfo(userInfo)) {
      return setError('Error while adding UserInfo details')
    }
    if (!setFullUserInfo(fullUserInfo)) {
      return setError('Error while adding FullUserInfo details')
    }
    setLogin()
    setError('')
    router.push('/profile')
    typeof window !== "undefined" ? localStorage.setItem('profilePic', profilePic) : null
  }

  const verifyTeacherOtp = async (otpType) => {
    try {
      setIsSubmitLoading(true)
      let body = {}
      body = {
        otp: otpType === 1 ? emailOtp : phoneOtp,
        email: teacherData?.tc_email,
        otpType,
      }
      const response = await verifyOtpAPI(body)
      if (response.status) {
        if (otpType === 1) {
          toast.success(response.message, {
            autoClose: 5000,
          })
          setRegisterStep(3)
          reSendTimer(0, 30)
        } else {
          // submitData(teacherCredentials)
          toast.success('Registration successful,Please Login', {
            autoClose: 2000,
          })
          setTimeout(() => {
            router.push('/auth/signin')
            setRegisterStep(1)
          }, 2000)
        }
      } else {
        console.log('response', response)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
      toast.error(message, {
        autoClose: 5000,
      })
    }
  }

  const handleEmailOtp = (e) => {
    setEmailOtp(e)
    if (e.length === 6) {
      setShowError(false)
    } else {
      setShowError(true)
    }
  }
  const handlePhoneOtp = (e) => {
    setPhoneOtp(e)
    if (e.length === 6) {
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  const reSend = async (type) => {
    try {
      setIsSubmitLoading(true)
      let body = {}
      let response = {}
      if (submitUserType === 1) {
        body = {
          email: teacherData?.tc_email,
          type: type,
        }
        response = await generateTeacherOTPAPI(body)
      } else if (submitUserType === 2) {
        body = {
          email: studentData?.st_email,
          type: type,
        }
        response = await generateStudentOTPAPI(body)
      }
      if (response.status) {
        toast.success('Otp Resend Successfully', {
          autoClose: 2000,
        })
      } else {
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
      console.log('error', message)
    }
  }

  const reSendSMS = async () => {
    try {
      setIsSubmitLoading(true)
      const response = await reSendOtpSMS(teacherCredentials?.email, 1)
      if (response.status) {
        toast.success('Otp Resend Successfully', {
          autoClose: 2000,
        })
      } else {
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
      console.log('error', message)
    }
  }

  const toggleVerificationModal = () => {
    setVerificationModal(!verificationModal)
  }

  const generateTeacherOTP = async (body, registerStep) => {
    try {
      setIsSubmitLoading(true)
      const response = await generateTeacherOTPAPI(body)
      if (response.status) {
        toast.success('Otp send successfully', {
          autoClose: 2000,
        })
        setRegisterStep(registerStep)
      } else {
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
    }
  }

  const generateStudentOTP = async (body, registerStep) => {
    try {
      setIsSubmitLoading(true)
      const response = await generateStudentOTPAPI(body)
      if (response.status) {
        toast.success('Otp send successfully', {
          autoClose: 2000,
        })
        setRegisterStep(registerStep)
      } else {
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
    }
  }

  const verifyStudentOtp = async (otpType) => {
    try {
      setIsSubmitLoading(true)
      let body = {}
      body = {
        otp: otpType === 1 ? emailOtp : phoneOtp,
        email: studentData?.st_email,
        otpType,
      }
      const response = await verifyStudentOtpAPI(body)
      if (response.status) {
        if (otpType === 1) {
          toast.success(response.message, {
            autoClose: 5000,
          })
          setRegisterStep(3)
          reSendTimer(0, 30)
        } else {
          toast.success('Registration successful,Please Login', {
            autoClose: 2000,
          })
          setTimeout(() => {
            router.push('/auth/signin')
            setRegisterStep(1)
          }, 2000)
        }
      } else {
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
      const message =
        finalMsg || error?.message || 'There was problem while sign up'
      toast.error(message, {
        autoClose: 2000,
      })
    }
  }

  const reSendTimer = (min, sec) => {
    setMinutes(min)
    setSeconds(sec)
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <InvalidTokenMessage />
      <VerificationForm
        isOpen={verificationModal}
        modalTitle={'Account Verification'}
        toggle={toggleVerificationModal}
        teacherData={teacherData}
        studentData={studentData}
        submitUserType={submitUserType}
        registerStep={registerStep}
        setRegisterStep={setRegisterStep}
        generateTeacherOTP={generateTeacherOTP}
        generateStudentOTP={generateStudentOTP}
      />
      <section className="auth-section pt-100 pb-100 ">
        <div className="container">
          <div className="auth-wrapper bg-white">
            <>
              <div className="auth-top">
                <h3 className="px-5 border-0 mb-5">Sign In</h3>
              </div>
              {registerStep === 1 && (
                <>
                  <ul className="nav nav-tabs auto-tab">
                    <li
                      // className="active"
                      style={{ marginRight: '3%' }}
                      onClick={() => setSelectedUser('Teacher')}
                      className={`${name === 'Teacher' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Teacher"
                    >
                      <span>Public Teacher</span>
                      <FaAngleDown />
                    </li>
                    <li
                      onClick={() => setSelectedUser('Student')}
                      className={`${name === 'Student' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Student"
                    >
                      <span>Learner</span>
                      <FaAngleDown />
                    </li>
                    {/* <li
                      onClick={() => setSelectedUser('Parent')}
                      className={`${name === 'Parent' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Parent"
                    >
                      <span>Parent</span>
                      <FaAngleDown />
                    </li>
                    <li
                      onClick={() => setSelectedUser('Publisher')}
                      className={`${name === 'Publisher' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Publisher"
                    >
                      <span>Publisher</span>
                      <FaAngleDown />
                    </li> */}
                  </ul>
                  <div className="tab-content px-5">
                    <div
                      className={`tab-pane fade ${
                        name === 'Teacher' && 'show active'
                      }`}
                      id="Teacher"
                    >
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                          remember: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                          submitData(values)
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            {error ? (
                              <div className="input--group text-danger">
                                {' '}
                                <p className="form-err-msg">{error}</p>{' '}
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>

                            <div className="remember-checkbox d-flex flex-wrap justify-content-between mb-3">
                              <div className="form-check">
                                <Field
                                  id="remember"
                                  type="checkbox"
                                  name="remember"
                                  className="form-check-input"
                                />

                                <label
                                  className={`form-check-label ${
                                    errors.remember && touched.remember
                                      ? 'text-danger'
                                      : ''
                                  }`}
                                  htmlFor="remember"
                                >
                                  Remember Me
                                </label>
                              </div>
                              <Link
                                href="/auth/reset"
                                state={{ forgotPasswordUserType: 'Teacher' }}
                                className="forget-link"
                              >
                                Forget Password
                              </Link>
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>

                    <div
                      className={`tab-pane fade ${
                        name === 'Student' && 'show active'
                      }`}
                      id="Student"
                    >
                      {/* student sign up */}
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                          remember: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                          submitData(values)
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            {error ? (
                              <div className="input--group text-danger">
                                {' '}
                                <p className="form-err-msg">{error}</p>{' '}
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>

                            <div className="remember-checkbox d-flex flex-wrap justify-content-between mb-3">
                              <div className="form-check">
                                <Field
                                  id="remember"
                                  type="checkbox"
                                  name="remember"
                                  className="form-check-input"
                                />

                                <label
                                  className={`form-check-label ${
                                    errors.remember && touched.remember
                                      ? 'text-danger'
                                      : ''
                                  }`}
                                  htmlFor="remember"
                                >
                                  Remember Me
                                </label>
                              </div>
                              <Link
                                href="/auth/reset"
                                state={{ forgotPasswordUserType: 'Student' }}
                                className="forget-link"
                              >
                                Forget Password
                              </Link>
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>

                    {/* <div
                      className={`tab-pane fade ${
                        name === 'Parent' && 'show active'
                      }`}
                      id="Parent"
                    >
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                          remember: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                          submitData(values)
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            {error ? (
                              <div className="input--group text-danger">
                                {' '}
                                <p className="form-err-msg">{error}</p>{' '}
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>

                            <div className="remember-checkbox d-flex flex-wrap justify-content-between mb-3">
                              <div className="form-check">
                                <Field
                                  id="remember"
                                  type="checkbox"
                                  name="remember"
                                  className="form-check-input"
                                />

                                <label
                                  className={`form-check-label ${
                                    errors.remember && touched.remember
                                      ? 'text-danger'
                                      : ''
                                  }`}
                                  htmlFor="remember"
                                >
                                  Remember Me
                                </label>
                              </div>
                              <Link
                                href="/auth/reset"
                                state={{ forgotPasswordUserType: 'Parent' }}
                                className="forget-link"
                              >
                                Forget Password
                              </Link>
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div> */}

                    {/* <div
                      className={`tab-pane fade ${
                        name === 'Publisher' && 'show active'
                      }`}
                      id="Publisher"
                    >
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                          remember: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values) => {
                          submitData(values)
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          setFieldValue,
                          setFieldTouched,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            {error ? (
                              <div className="input--group text-danger">
                                {' '}
                                <p className="form-err-msg">{error}</p>{' '}
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>

                            <div className="remember-checkbox d-flex flex-wrap justify-content-between mb-3">
                              <div className="form-check">
                                <Field
                                  id="remember"
                                  type="checkbox"
                                  name="remember"
                                  className="form-check-input"
                                />

                                <label
                                  className={`form-check-label ${
                                    errors.remember && touched.remember
                                      ? 'text-danger'
                                      : ''
                                  }`}
                                  htmlFor="remember"
                                >
                                  Remember Me
                                </label>
                              </div>
                              <Link
                                href="/auth/reset"
                                state={{ forgotPasswordUserType: 'Publisher' }}
                                className="forget-link"
                              >
                                Forget Password
                              </Link>
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div> */}
                  </div>
                </>
              )}

              {registerStep === 2 && (
                <>
                  <h3 className="text-center mb-3">Email Verification</h3>
                  <br />
                  {submitUserType === 1 && (
                    <h6>
                      Enter the 6 digit code sent to your email : &nbsp;
                      {teacherData?.tc_email}
                    </h6>
                  )}
                  {submitUserType === 2 && (
                    <h6>
                      Enter the 6 digit code sent to your email : &nbsp;
                      {studentData?.st_email}
                    </h6>
                  )}
                  <br />

                  <div className="input--group">
                    <OtpInput
                      value={emailOtp}
                      inputStyle={otpInput}
                      onChange={handleEmailOtp}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    {showError && (
                      <p className="text-danger mt-3">Please enter code</p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitLoading}
                    className="cmn--btn  w-100 form-control"
                    type="submit"
                    onClick={() => {
                      if (submitUserType === 1) {
                        if (emailOtp && emailOtp.length === 6) {
                          verifyTeacherOtp(1)
                        } else {
                          return setShowError(true)
                        }
                      } else if (submitUserType === 2) {
                        if (emailOtp && emailOtp.length === 6) {
                          verifyStudentOtp(1)
                        } else {
                          return setShowError(true)
                        }
                      }
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                      <span>Submit</span>
                    </div>
                  </button>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    {seconds > 0 && (
                      <>
                        <p className="mb-0 me-4 mt-0">
                          Time Remaining:{' '}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      </>
                    )}
                    <h6
                      className={`d-flex justify-content-end cursor-pointer ${
                        disabledResendCode ? 'disable-color' : ''
                      }`}
                      onClick={() => {
                        if (!disabledResendCode) {
                          reSendTimer(0, 30)
                          reSend(1)
                        }
                      }}
                    >
                      Resend Code
                    </h6>
                  </div>
                </>
              )}
              {registerStep === 3 && (
                <>
                  <h3 className="text-center mb-3">
                    Phone Number Verification
                  </h3>
                  <br />
                  {submitUserType === 1 && (
                    <h6>
                      Enter the 6 digit code sent to your phone Number : &nbsp;
                      {teacherData?.tc_phoneNumber}
                    </h6>
                  )}
                  {submitUserType === 2 && (
                    <h6>
                      Enter the 6 digit code sent to your phone Number : &nbsp;
                      {studentData?.st_phoneNumber}
                    </h6>
                  )}

                  <br />
                  <div className="input--group">
                    <OtpInput
                      value={phoneOtp}
                      inputStyle={otpInput}
                      onChange={handlePhoneOtp}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    {showError && (
                      <p className="text-danger mt-3">Please enter code</p>
                    )}
                  </div>

                  <button
                    style={{ backgroundColor: 'black', color: 'white' }}
                    // disabled={isSubmitting}
                    disabled={isSubmitLoading}
                    className="cmn--btn  w-100 form-control"
                    type="submit"
                    onClick={() => {
                      if (submitUserType === 1) {
                        if (phoneOtp && phoneOtp.length === 6) {
                          verifyTeacherOtp(2)
                        } else {
                          return setShowError(true)
                        }
                      } else if (submitUserType === 2) {
                        if (phoneOtp && phoneOtp.length === 6) {
                          verifyStudentOtp(2)
                        } else {
                          return setShowError(true)
                        }
                      }
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                      <span>Submit</span>
                    </div>
                  </button>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    {seconds > 0 && (
                      <>
                        <p className="mb-0 me-4 mt-0">
                          Time Remaining:{' '}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      </>
                    )}
                    <h6
                      className={`d-flex justify-content-end cursor-pointer  ${
                        disabledResendCode ? 'disable-color' : ''
                      }`}
                      onClick={() => {
                        if (!disabledResendCode) {
                          reSendTimer(0, 30)
                          reSend(2)
                        }
                      }}
                    >
                      Resend Code
                    </h6>
                  </div>
                </>
              )}
              {/* {registerStep === 1 && (
                <div className="signup-option text-center mt-4">
                  Don't have any Account?{' '}
                  <Link href="/auth/signup" state={{ tabName: selectedUser }}>
                    Sign up
                  </Link>
                </div>
              )} */}

              {/* <div className="text-center">It takes than minute</div> */}
            </>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignIn
