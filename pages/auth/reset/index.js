import ButtonLoader from 'components/Common/ButtonLoader'
import { Field, Form, Formik } from 'formik'
import {
  forgotPasswordAPI,
  resetPasswordAPI,
  verifyForgotPasswordOtpAPI,
} from 'helpers/backendHelpers/auth'
import { useEffect, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import OtpInput from 'react-otp-input'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'
import './Auth.scss'
import PasswordInput from './PasswordInput'

const Reset = () => {
  let location = useLocation()
  let userType = location?.state?.forgotPasswordUserType
  const pathName = location.pathname
  const navigate = useNavigate()
  const otpInput = {
    width: '100%',
    padding: '20px 0',
    borderRadius: '5px',

    margin: '0 5px',
  }

  // 1 = Enter Email, 2 = Verify OTP, 3 = Reset Password
  const [registerStep, setRegisterStep] = useState(0)
  const [verifyType, setVerifyType] = useState(1)
  const [emailOtp, setEmailOtp] = useState(0)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [disabledResendCode, setDisabledResendCode] = useState(true)

  const [userEmailOrPhone, setUserEmailOrPhone] = useState('')

  const handleEmailOtp = (e) => {
    setEmailOtp(e)
    if (e.length === 6) {
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  const forgotPasswordVerification = async (values) => {
    try {
      setIsSubmitLoading(true)
      let isThisEmail = isEmail(values.emailOrPhone)
      let isThisPhoneNumber = isPhoneNumber(values.emailOrPhone)
      let response = []
      if (isThisEmail) {
        response = await forgotPasswordAPI(values.emailOrPhone, userType, '')
      } else if (isThisPhoneNumber) {
        response = await forgotPasswordAPI('', userType, values.emailOrPhone)
      }
      if (response.status) {
        setRegisterStep(response.data?.verifyStep)
        setVerifyType(response.data?.verifyStep)
      } else {
        toast.error(response.message)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const reSendForgotPasswordOTP = async () => {
    try {
      setIsSubmitLoading(true)
      let isThisEmail = isEmail(userEmailOrPhone)
      let isThisPhoneNumber = isPhoneNumber(userEmailOrPhone)
      let response = []
      if (isThisEmail) {
        response = await forgotPasswordAPI(userEmailOrPhone, userType, '')
      } else if (isThisPhoneNumber) {
        response = await forgotPasswordAPI('', userType, userEmailOrPhone)
      }
      if (response.status) {
        toast.success('Otp Resend Successfully', {
          autoClose: 2000,
        })
        // setRegisterStep(response.data?.verifyStep)
        // setVerifyType(response.data?.verifyStep)
      } else {
        // toast.error(response.message)
        console.log(response.message)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const verifyForgotPasswordOTP = async () => {
    try {
      setIsSubmitLoading(true)
      let response = []
      response = await verifyForgotPasswordOtpAPI(
        userEmailOrPhone,
        userType,
        emailOtp,
        verifyType,
      )
      if (response.status) {
        toast.success(response.message)
        setRegisterStep(3)
      } else {
        toast.error(response.message)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  const resetPassword = async (values) => {
    try {
      setIsSubmitLoading(true)
      const response = await resetPasswordAPI(
        userEmailOrPhone,
        userType,
        values.password,
        verifyType,
      )
      if (response.status) {
        toast.success(
          'Password Reset successful, Please login with your new Password',
          { autoClose: 2000 },
        )
        setTimeout(() => {
          navigate('/auth/signin', {
            state: {
              url: pathName,
            },
          })
        }, 2000)
      } else {
        toast.error(response.message)
      }
      setIsSubmitLoading(false)
    } catch (error) {
      setIsSubmitLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  // const reSend = async (type) => {
  //   try {
  //     setIsSubmitLoading(true)
  //     let body = {}
  //     let response = {}
  //     if (userType === 'Teacher') {
  //       body = {
  //         email: teacherData?.tc_email,
  //         type: type,
  //       }
  //       response = await generateTeacherOTPAPI(body)
  //     } else if (submitUserType === 'Student') {
  //       body = {
  //         email: studentData?.st_email,
  //         type: type,
  //       }
  //       response = await generateStudentOTPAPI(body)
  //     }
  //     if (response.status) {
  //       toast.success('Otp Resend Successfully', {
  //         autoClose: 2000,
  //       })
  //     } else {
  //     }
  //     setIsSubmitLoading(false)
  //   } catch (error) {
  //     setIsSubmitLoading(false)
  //     let finalMsg = error?.response?.data?.message?.replace(/,/g, '\n')
  //     const message =
  //       finalMsg || error?.message || 'There was problem while sign up'
  //     console.log('error', message)
  //   }
  // }

  const isEmail = (value) => {
    // Regular expression for email validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
    emailRegex.test(value)
    return emailRegex.test(value)
  }

  const isPhoneNumber = (value) => {
    // Regular expression for phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(value)
  }

  useEffect(() => {
    if (registerStep >= 1) {
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

  const reSendTimer = () => {
    setMinutes(0)
    setSeconds(30)
  }

  return (
    <section className="auth-section pt-100 pb-100">
      <ToastContainer position="top-right" />
      <div className="container">
        <div className="auth-wrapper bg-white">
          <>
            {registerStep === 0 && (
              <>
                <div className="auth-top">
                  <h3 className="mt-3 mb-4" style={{ color: 'black' }}>
                    Forget Your Password?
                  </h3>
                  <p className="mt-2 pb-2">
                    No Worries.Enter your verified email Or Mobile Number to
                    reset your password.
                  </p>
                </div>
                <Formik
                  initialValues={{
                    emailOrPhone: '',
                  }}
                  validationSchema={Yup.object().shape({
                    emailOrPhone: Yup.string() // Email validation
                      .test(
                        'emailOrDigits',
                        'Must be a valid email or 9 digit number,without adding 0',
                        (value) => {
                          if (!value) return true
                          if (value.length === 9) return true
                          return Yup.string().email().isValidSync(value)
                        },
                      )
                      .required(
                        'Plese enter email or 9 digit number,without adding 0',
                      ),
                  })}
                  onSubmit={async (values) => {
                    setUserEmailOrPhone(values.emailOrPhone)
                    forgotPasswordVerification(values)
                  }}
                >
                  {({
                    errors,
                    touched,
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                    values,
                  }) => (
                    <Form
                      className="mt-4 pt-2"
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <div className="input--group">
                        <Field
                          className={`form-control ${
                            errors.emailOrPhone && touched.emailOrPhone
                              ? 'form-err'
                              : ''
                          }`}
                          name="emailOrPhone"
                          placeholder="Enter Email Or Mobile Number"
                        />
                        <span className="icon">
                          <FaEnvelope />
                        </span>
                        {errors.emailOrPhone && touched.emailOrPhone ? (
                          <div className="form-err-msg">
                            {errors.emailOrPhone}
                          </div>
                        ) : null}
                      </div>
                      <button
                        style={{ backgroundColor: 'black', color: 'white' }}
                        disabled={isSubmitLoading}
                        className="cmn--btn  w-100 form-control"
                        type="submit"
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                          <span>Submit</span>
                        </div>
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}

            {registerStep === 1 && (
              <>
                <h3 className="text-center mb-3">Email Verification</h3>
                <br />
                <h6>
                  Enter the 6 digit code sent to your email address : &nbsp;
                  {userEmailOrPhone}{' '}
                </h6>
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
                    if (emailOtp && emailOtp.length === 6) {
                      verifyForgotPasswordOTP(userEmailOrPhone)
                    } else {
                      return setShowError(true)
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
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    </>
                  )}
                  <h6
                    className={`d-flex justify-content-end cursor-pointer ${
                      disabledResendCode ? 'disable-color' : ''
                    }`}
                    onClick={() => {
                      if (!disabledResendCode) {
                        reSendTimer()
                        reSendForgotPasswordOTP()
                      }
                    }}
                  >
                    Resend Code
                  </h6>
                </div>
              </>
            )}

            {registerStep === 2 && (
              <>
                <h3 className="text-center mb-3">Phone Verification</h3>
                <br />
                <h6>
                  Enter the 6 digit code sent to your Phone Number :&nbsp;
                  {userEmailOrPhone}
                </h6>
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
                  // disabled={isSubmitting}
                  disabled={isSubmitLoading}
                  className="cmn--btn  w-100 form-control"
                  type="submit"
                  onClick={() => {
                    if (emailOtp && emailOtp.length === 6) {
                      verifyForgotPasswordOTP(userEmailOrPhone)
                    } else {
                      return setShowError(true)
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
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    </>
                  )}
                  <h6
                    className={`d-flex justify-content-end cursor-pointer ${
                      disabledResendCode ? 'disable-color' : ''
                    }`}
                    onClick={() => {
                      if (!disabledResendCode) {
                        reSendTimer()
                        reSendForgotPasswordOTP()
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
                <h3 className="text-center mb-3">Reset Password</h3>
                <Formik
                  initialValues={{
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string()
                      .min(4, 'Password must be more than 6 characters')
                      .required('Please Enter Your Password'),
                    confirmPassword: Yup.string().when(
                      'password',
                      (password, field) =>
                        password
                          ? field
                              .required('Please Confirm Your Password')
                              .oneOf(
                                [Yup.ref('password')],
                                'Password does not match.',
                              )
                          : field,
                    ),
                  })}
                  onSubmit={(values, actions) => {
                    resetPassword(values)
                    actions.setSubmitting(false)
                  }}
                >
                  {({
                    errors,
                    touched,
                    isSubmitting,
                    handleSubmit,
                    handleChange,
                    values,
                  }) => (
                    <Form
                      className="mt-4 pt-2"
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <div className="input--group">
                        <PasswordInput
                          errors={errors.password}
                          touched={touched.password}
                          placeholder="New Password"
                          name="password"
                        />
                      </div>
                      <div className="input--group">
                        <PasswordInput
                          errors={errors.confirmPassword}
                          touched={touched.confirmPassword}
                          placeholder="Confirm Password"
                          name="confirmPassword"
                        />
                      </div>
                      <button
                        disabled={isSubmitLoading}
                        className="cmn--btn  w-100 form-control"
                        type="submit"
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                          <span>Submit</span>
                        </div>
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}

            <div className="signup-option text-center mt-4">
              Remember your Password? <Link to="/auth/signin">Sign In</Link>
            </div>
          </>
        </div>
      </div>
    </section>
  )
}

export default Reset
