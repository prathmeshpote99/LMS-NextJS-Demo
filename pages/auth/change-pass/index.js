import ButtonLoader from 'components/Common/ButtonLoader'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'
import DashboardSidebar from '../../components/DashboardSidebar'
import { getUserInfo } from '../../helpers/authHelper'
import { updatePassword } from '../../helpers/backendHelper'
import './Auth.scss'
import PasswordInput from './PasswordInput'

const SignupSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Please enter your old password'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters at minimum')
    .max(30, 'Maximum 20 characters')
    .required('Please enter your password'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Please confirm your password')
          .oneOf([Yup.ref('password')], 'Password must match')
      : field,
  ),
})

const ChangePass = () => {
  const userInfo = getUserInfo()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  return (
    <div className="py-5">
      <ToastContainer position="top-right" />
      <div className="container">
        <div className="d-flex flex-wrap">
          <DashboardSidebar />
          <div className="dashboard-article">
            <div className="card cmn--card">
              <div className="card-header py-3">
                <h5 className="card-title">Change Password</h5>
              </div>
              <div className="card-body">
                {(userInfo?.userType === 'Student' ||
                  userInfo?.userType === 'Premium') && (
                  <Formik
                    initialValues={{
                      currentPassword: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, actions) => {
                      let { currentPassword, confirmPassword } = values
                      let reqBody = {
                        oldPassword: currentPassword,
                        newPassword: confirmPassword,
                        userId: userInfo?.id,
                        userType:
                          userInfo?.userType === 'Premium'
                            ? 'Student'
                            : 'Student',
                      }
                      try {
                        setIsLoading(true)
                        setIsSubmitLoading(true)
                        const response = await updatePassword(reqBody)
                        if (!response?.status) {
                          let message =
                            response?.message || 'Error while logging in'
                          return toast.error(message, {
                            autoClose: 3000,
                          })
                        } else {
                          setError('')
                          toast.success('Password changed successfully', {
                            autoClose: 3000,
                          })
                        }
                        setIsLoading(false)
                        setIsSubmitLoading(false)
                      } catch (error) {
                        let message =
                          error?.response?.data?.message ||
                          error?.message ||
                          'Error while logging in'
                        setIsLoading(false)
                        setIsSubmitLoading(false)
                        toast.error(message, {
                          autoClose: 3000,
                        })
                        return setError(message)
                      }
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
                        className="profile-form my-4 py-2"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <div className="input--group">
                          <PasswordInput
                            errors={errors.currentPassword}
                            touched={touched.currentPassword}
                            placeholder="Confirm Current Password"
                            name="currentPassword"
                          />
                        </div>

                        <div className="input--group">
                          <PasswordInput
                            errors={errors.password}
                            touched={touched.password}
                            placeholder="Enter New Password"
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
                )}
                {(userInfo?.userType === 'Teacher' ||
                  userInfo?.userType === 'Freelance') && (
                  <Formik
                    initialValues={{
                      currentPassword: '',
                      password: '',
                      confirmPassword: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, actions) => {
                      let { currentPassword, confirmPassword } = values
                      let reqBody = {
                        oldPassword: currentPassword,
                        newPassword: confirmPassword,
                        userId: userInfo?.id,
                        userType:
                          userInfo?.userType === 'Freelance'
                            ? 'Teacher'
                            : 'Teacher',
                      }
                      try {
                        setIsLoading(true)
                        setIsSubmitLoading(true)
                        const response = await updatePassword(reqBody)
                        if (!response?.status) {
                          let message =
                            response?.message || 'Error while logging in'
                          return toast.error(message, {
                            autoClose: 3000,
                          })
                        } else {
                          setError('')
                          toast.success('Password changed successfully', {
                            autoClose: 3000,
                          })
                        }
                        setIsLoading(false)
                        setIsSubmitLoading(false)
                      } catch (error) {
                        let message =
                          error?.response?.data?.message ||
                          error?.message ||
                          'Error while logging in'
                        setIsLoading(false)
                        setIsSubmitLoading(false)
                        toast.error(message, {
                          autoClose: 3000,
                        })
                        return setError(message)
                      }
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
                        className="profile-form my-4 py-2"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <div className="input--group">
                          <PasswordInput
                            errors={errors.currentPassword}
                            touched={touched.currentPassword}
                            placeholder="Confirm Current Password"
                            name="currentPassword"
                          />
                        </div>

                        <div className="input--group">
                          <PasswordInput
                            errors={errors.password}
                            touched={touched.password}
                            placeholder="Enter New Password"
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePass
