import { useFormik } from 'formik'
import { getUserInfo, setFullUserInfo } from 'helpers/authHelper'
import { getCategories } from 'helpers/backendHelpers/book'
import { updateProfile } from 'helpers/backendHelpers/student'
import { updateTeacherProfile } from 'helpers/backendHelpers/teacher'
import { defaultRDCSeparator } from 'helpers/common'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { TbLogout } from 'react-icons/tb'
import { toast } from 'react-toastify'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as Yup from 'yup'
import ButtonLoader from './ButtonLoader'
import StudentCommonEditForm from './StudentCommonEditForm'

const FormModal = (props) => {
  const { isOpen, pdf, type, toggle, modalTitle, closeToggleFormModal } = props
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState(null)

  const childRef = useRef()

  const [studentForm, setStudentForm] = useState({
    st_fullName: '',
    st_parentName: '',
    st_phoneNumber: '',
    st_countryCode: '',
    st_email: '',
    st_altEmail: '',
    st_studentId: '',
    st_class: '',
    st_division: '',
    areaValue: '',
    st_schoolId: '',
    st_parentEmail: '',
    st_parentPhoneNumber: '',
    st_parentCountryCode: '',
    st_profilePic: { fileName: '', file: {} },
  })
  const [teacherForm, setTeacherForm] = useState({
    tc_fullName: '',
    tc_phoneNumber: '',
    tc_countryCode: '',
    tc_email: '',
    tc_altEmail: '',
    tc_profilePic: { fileName: '', file: {} },
    areaValue: '',
    tc_staffId: '',
    tc_dateOfBirth: '',
    tc_experience: '',
    tc_level: '',
    tc_bloodGroup: '',
    tc_address: '',
    tc_briefProfile: '',
    tc_schoolId: '',
    tc_alsoKnownAs: '',
    tc_languageSpoken: '',
    tc_certificate: '',
  })

  const userInfo = getUserInfo()

  useEffect(() => {
    getAllCategories()
  }, [])

  const updateStudentProfileDash = async (data) => {
    try {
      data.isFirstTimeLogin = 1
      setIsLoading(true)
      setIsSubmitLoading(true)
      const response = await updateProfile(data)
      let { student } = response.data
      if (response.status) {
        let message = 'Great! Your profile is completed successfully'
        toggle()
        setFullUserInfo(student[1][0])
        setIsLoading(false)
        toast.success(message, {
          autoClose: 5000,
        })
      }
      setIsSubmitLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while profile update'
      setIsSubmitLoading(false)
      setIsLoading(false)
      toast.error(message, {
        autoClose: 5000,
      })
    }
  }

  const updateTeacherProfileDash = async (data) => {
    try {
      data.isFirstTimeLogin = 1
      setIsLoading(true)
      setIsSubmitLoading(true)
      const response = await updateTeacherProfile(data)
      let { teacher } = response.data
      if (response.status) {
        toggle()
        setFullUserInfo(teacher[1][0])
        let message = 'Great! Your profile is completed successfully'
        setIsLoading(false)
        toast.success(message, {
          autoClose: 5000,
        })
      }
      setIsSubmitLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while profile update'
      setIsSubmitLoading(false)
      setIsLoading(false)
      toast.error(message, {
        autoClose: 5000,
      })
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: studentForm,
    onSubmit: (values) => {
      let studentData = values
      let [st_region, st_district, st_circuit] =
        (values?.areaValue + '' || '')?.split(defaultRDCSeparator) || []
      st_region = st_region || null
      st_district = st_district || null
      st_circuit = st_circuit || null
      studentData['st_region'] = st_region
      studentData['st_district'] = st_district
      studentData['st_circuit'] = st_circuit
      delete studentData['st_profilePic']
      updateStudentProfileDash(studentData)
    },
    validationSchema: Yup.object({
      st_fullName: Yup.string()
        .min(5, 'Mininum 5 characters')
        .test(
          'st_fullName',
          'This username has already been taken',
          function (st_fullName) {
            return 'st_fullName'
          },
        )
        .required('Please enter full name'),
      st_email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),
      st_altEmail: Yup.string()
        .email('Invalid email address')
        .notRequired()
        .nullable(),
      st_class: Yup.string().required('Please enter your class').nullable(),
      st_division: Yup.string()
        .required('Please enter your division')
        .nullable(),

      st_phoneNumber: Yup.string()
        .required('Please enter your phone number')
        .matches(/^\d{9}$/, 'Please enter 9 digit number,without adding 0'),
      st_profilePic: Yup.mixed().notRequired().nullable(),
      areaValue: Yup.mixed().test(
        'invalidInput',
        'Please select region-district',
        (value) => {
          return !!value
        },
      ),
      st_schoolId: Yup.string().required('Please select school').nullable(),
      st_parentEmail: Yup.string().email('Invalid email address').notRequired(),
      st_parentPhoneNumber: Yup.string()
        .required('Please enter your parent phone number')
        .matches(/^\d{9}$/, 'Please enter 9 digit number,without adding 0')
        .nullable(),
    }),
  })

  const teacherFormik = useFormik({
    enableReinitialize: true,
    initialValues: teacherForm,
    onSubmit: (values) => {
      let teacherData = values
      let [tc_region, tc_district, tc_circuit] =
        (values?.areaValue + '' || '')?.split(defaultRDCSeparator) || []
      let tc_languageSpoken = selectedLanguages.map((data) => data.value)
      let tc_subject = teacherForm?.tc_subject ? teacherForm?.tc_subject : null
      let tc_classRoomId = teacherForm?.tc_classRoomId
        ? teacherForm?.tc_classRoomId
        : null
      tc_region = tc_region || null
      tc_district = tc_district || null
      tc_circuit = tc_circuit || null
      teacherData['tc_region'] = tc_region
      teacherData['tc_district'] = tc_district
      teacherData['tc_circuit'] = tc_circuit
      teacherData['tc_languageSpoken'] = tc_languageSpoken
        ? tc_languageSpoken?.toString()
        : null
      teacherData['tc_subject'] = tc_subject ? tc_subject?.toString() : null
      teacherData['tc_classRoomId'] = tc_classRoomId
        ? tc_classRoomId?.toString()
        : null
      delete teacherData['tc_profilePic']

      updateTeacherProfileDash(teacherData)
    },
    validationSchema: Yup.object({
      tc_fullName: Yup.string()
        .min(5, 'Mininum 5 characters')
        .test(
          'tc_fullName',
          'This username has already been taken',
          function (tc_fullName) {
            return 'tc_fullName'
          },
        )
        .required('Please enter full name'),

      tc_email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email'),

      tc_altEmail: Yup.string()
        .email('Invalid email address')
        .required('Please provide your NTC email address')
        .nullable(),

      tc_phoneNumber: Yup.string()
        .required('Please enter phone number')
        .matches(/^\d{9}$/, 'Please enter 9 digit number,without adding 0'),
      tc_countryCode: Yup.string().required('Please enter country code'),
      tc_staffId: Yup.string().required('Please enter your staff id'),
      tc_certificate: Yup.string()
        .required('Please enter your certificates')
        .nullable(),
      tc_profilePic: Yup.mixed().notRequired().nullable(),
      tc_dateOfBirth: Yup.string().notRequired().nullable(),
      tc_briefProfile: Yup.string()
        .required('Please enter your brief profile')
        .nullable(),
      tc_experience: Yup.string()
        .required('Please enter your experience')
        .nullable(),
      tc_level: Yup.string().required('Please enter your level').nullable(),
      tc_bloodGroup: Yup.string()
        .nullable()
        .notRequired('Please select bloodgroups'),
      tc_languageSpoken: Yup.mixed().test(
        'invalidInput',
        'Please Select Languages',
        (value) => {
          if (value) {
            return value.length
          } else {
            return false
          }
        },
      ),
      areaValue: Yup.mixed().test(
        'invalidInput',
        'Please select region-district',
        (value) => {
          return !!value
        },
      ),
      tc_schoolId: Yup.string().required('Please select school').nullable(),
    }),
  })

  const studentHandleSubmit = () => {
    formik.handleSubmit()
  }

  const teacherHandleSubmit = () => {
    teacherFormik.handleSubmit()
  }

  const getAllCategories = async (filterCategory = '') => {
    try {
      let response = await getCategories()
      let { categories } = response.data
      let vals = []
      let mainCategoryArray = []

      if (filterCategory) {
        let filteredData = categories.filter(
          (data) => data.categoryId === filterCategory,
        )
        filteredData[0].category.map((data) => {
          vals.push({ name: data.CategoryName, value: data.CategoryName })
        })
      } else {
        categories.map((mainCategory) => {
          let val = []
          let { category } = mainCategory

          category.map((cat) => {
            val.push({ label: cat.CategoryName, value: cat.CategoryName })
          })
          mainCategoryArray.push({
            label: mainCategory.categoryName,
            options: val,
          })
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const childFunction = () => {
    // Function logic in the child component
    console.log('Child function called')
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="tutorModal signUpFormModal"
        tabIndex="-1"
        toggle={toggle}
        backdrop="static"
      >
        <ModalHeader
          toggle={toggle}
          close={
            <TbLogout
              style={{ cursor: 'pointer' }}
              fontSize={24}
              onClick={closeToggleFormModal}
            />
          }
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody className="scrollable-modal px-4">
          <>
            <p className="mt-3">
              Complete your profile to continue using Katon platform
            </p>

            <StudentCommonEditForm
              callFrom={1}
              ref={childRef}
              childFunction={childFunction}
              teacherFormik={teacherFormik}
              teacherForm={teacherForm}
              setTeacherForm={setTeacherForm}
              formik={formik}
              studentForm={studentForm}
              setStudentForm={setStudentForm}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              isSubmitLoading={isSubmitLoading}
              setIsSubmitLoading={setIsSubmitLoading}
            />
          </>
        </ModalBody>
        <ModalFooter>
          <>
            <button
              disabled={isSubmitLoading}
              type="button"
              className="enroll-btn cmn--btn w-25 mx-auto"
              onClick={async () => {
                if (
                  userInfo.userType === 'Student' ||
                  userInfo.userType === 'Premium'
                ) {
                  studentHandleSubmit()
                } else if (
                  userInfo.userType === 'Teacher' ||
                  userInfo.userType === 'Freelance'
                ) {
                  teacherHandleSubmit()
                }
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                <span>Submit</span>
              </div>
            </button>
          </>
        </ModalFooter>
      </Modal>
    </>
  )
}

FormModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default FormModal
