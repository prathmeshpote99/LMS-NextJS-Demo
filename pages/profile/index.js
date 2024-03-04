import StudentCommonEditForm from 'components/Common/StudentCommonEditForm'
import { useFormik } from 'formik'
import {
  getUserInfo,
  setAuthToken,
  setFullUserInfo,
  setUserInfo,
} from 'helpers/authHelper'
import { getCategories } from 'helpers/backendHelpers/book'
import { defaultRDCSeparator } from 'helpers/common'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import DashboardSidebar from '../../components/DashboardSidebar'
import {
  getAllSchoolByArea,
  getProfile,
  updateProfile,
} from '../../helpers/backendHelpers/student'
import { updateTeacherProfile } from '../../helpers/backendHelpers/teacher'

const Profile = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(true)
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false)
  const [selectedClass, setSelectedClass] = useState({})
  const [selectedDivsion, setSelectedDivsion] = useState({})

  const userInfo = getUserInfo()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState('')
  const [schoolDropdownValues, setSchoolDropdownValues] = useState([])
  const [categoryList, setCategoryList] = useState(null)
  const [selectedLanguages, setSelectedLanguages] = useState(null)

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

  useEffect(() => {
    setSuccess('')
    setError('')
    getAllCategories()
    if (userInfo.userType === 'Student' || userInfo.userType === 'Premium') {
      fetchStudentForEdit()
    } else if (
      userInfo.userType === 'Teacher' ||
      userInfo.userType === 'Freelance'
    ) {
      // fetchTeacherForEdit()
    }
    // else if (userInfoJson.userType === 'Parent') {
    //   fetchParentForEdit()
    // } else if (userInfoJson.userType === 'Publisher') {
    //   fetchPublisherForEdit()
    // }
  }, [])

  const fetchStudentForEdit = async () => {
    try {
      setIsLoading(true)
      let response = await getProfile()
      let { studentProfile } = response.data || {}
      let { st_region, st_district, st_circuit } = studentProfile
      let areaValue = ''
      if (st_region || st_district || st_circuit) {
        areaValue = `${st_region || ''}${defaultRDCSeparator}${
          st_district || ''
        }${defaultRDCSeparator}${st_circuit || ''}`

        studentProfile['areaValue'] = areaValue
      } else {
        studentProfile['areaValue'] = ''
      }
      setSelectedClass({
        label: studentProfile.st_class,
        value: studentProfile.st_class,
      })
      setSelectedDivsion({
        label: studentProfile.st_division,
        value: studentProfile.st_division,
      })
      studentProfile['st_profilePic_old'] = studentProfile['st_profilePic']
      studentProfile['st_profilePic'] = { fileName: '', file: {} }
      studentProfile['st_parentName'] = studentProfile['st_parentName']
        ? studentProfile['st_parentName']
        : ''
      studentProfile['st_class'] = studentProfile['st_class']
        ? studentProfile['st_class']
        : ''
      studentProfile['st_division'] = studentProfile['st_division']
        ? studentProfile['st_division']
        : ''
      studentProfile['st_phoneNumber'] = studentProfile['st_phoneNumber']
        ? studentProfile['st_phoneNumber']
        : ''

      fetchAllSchoolByArea(areaValue, studentProfile['st_schoolId'])
      setStudentForm(studentProfile)
      setIsLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while fetching profile details'
      setIsLoading(false)
      return setError(message)
    }
  }

  const updateStudentProfileDash = async (data) => {
    try {
      setIsLoading(true)
      setIsSubmitLoading(true)
      setIsSubmitButtonLoading(true)
      const response = await updateProfile(data)
      let { student, token } = response.data || {}
      if (response.status) {
        let message = 'Great! Your profile is completed successfully'
        setIsLoading(false)
        toast.success(message, {
          autoClose: 5000,
        })
      }

      // set userinfo, fullinfo, and token
      const userInfo = {
        id: student[1][0].st_id,
        fullName: student[1][0].st_fullName,
        userType: 'Student',
        profilePic: student[1][0]?.st_profilePic,
      }

      setUserInfo(userInfo)
      setFullUserInfo(student[1][0])
      setAuthToken(`Bearer ${token}`)

      setIsSubmitLoading(true)
      setIsSubmitButtonLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while profile update'
      setIsSubmitLoading(false)
      setIsSubmitButtonLoading(false)
      setIsLoading(false)
      toast.error(message, {
        autoClose: 5000,
      })
    }
  }

  const updateTeacherProfileDash = async (data) => {
    try {
      setIsLoading(true)
      setIsSubmitLoading(true)
      setIsSubmitButtonLoading(true)
      const response = await updateTeacherProfile(data)
      if (response.status) {
        let message = 'Great! Your profile is completed successfully'
        setIsLoading(false)
        toast.success(message, {
          autoClose: 5000,
        })
      }

      // set userinfo, fullinfo, and token
      const userInfo = {
        id: response?.data?.teacher[1][0].tc_id,
        fullName: response?.data?.teacher[1][0].tc_fullName,
        userType: 'Teacher',
        profilePic: response?.data?.teacher[1][0]?.tc_profilePic,
      }

      setUserInfo(userInfo)
      setFullUserInfo(response?.data?.teacher[1][0])
      setAuthToken(`Bearer ${response?.data?.token}`)

      setIsSubmitLoading(true)
      setIsSubmitButtonLoading(false)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Error while profile update'
      setIsSubmitLoading(false)
      setIsSubmitButtonLoading(false)
      setIsLoading(false)
      toast.error(message, {
        autoClose: 5000,
      })
    }
  }

  const fetchAllSchoolByArea = async (values, oldVal) => {
    if (values === '') {
      if (userInfo.userType === 'Student' || userInfo.userType === 'Premium') {
        setStudentForm({ ...studentForm, st_schoolId: '' })
      } else if (
        userInfo.userType === 'Teacher' ||
        userInfo.userType === 'Freelance'
      ) {
        setTeacherForm({ ...teacherForm, tc_schoolId: '' })
      }
    } else {
      try {
        let [region, district, circuit] =
          (values + '' || '')?.split(defaultRDCSeparator) || []
        region = region || ''
        district = district || ''
        circuit = circuit || ''

        const response = await getAllSchoolByArea(region, district, circuit)
        let { schools } = response.data || {}

        let dropdownVals = schools.map((school) => {
          return { value: school.sc_id, label: school.sc_schoolName }
        })

        dropdownVals = dropdownVals || []
        setSchoolDropdownValues(dropdownVals)
        if (oldVal) {
          const defVal = dropdownVals.find((item) => item.value === oldVal)
          defVal
            ? setSelectedSchool(defVal)
            : setSelectedSchool({ label: '', value: '' })
        } else {
          setSelectedSchool({ label: '', value: '' })
        }
      } catch (error) {
        let message =
          error?.response?.data?.message ||
          error?.message ||
          'There Was A Problem Fetching Schools'

        setSchoolDropdownValues([])
      }
    }
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
      setCategoryList(mainCategoryArray)
    } catch (error) {
      console.log('error', error)
    }
  }

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
      // console.log('teacherdatasubmit', teacherData)
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

      tc_altEmail:
        userInfo?.userType === 'Teacher'
          ? Yup.string()
              .email('Invalid email address')
              .required('Please provide your NTC email address')
              .nullable()
          : Yup.string().email('Invalid email address').nullable(),

      tc_phoneNumber: Yup.string()
        .required('Please enter phone number')
        .matches(/^\d{9}$/, 'Please enter 9 digit number,without adding 0'),
      tc_countryCode: Yup.string().required('Please enter country code'),
      tc_staffId:
        userInfo?.userType === 'Teacher' &&
        Yup.string().required('Please enter your staff id'),
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

  const handleFormValueChange = (e) => {
    setIsSubmitLoading(false)
  }

  return (
    <div className="py-5">
      <div className="container">
        {/* <ToastContainer position="top-right" /> */}
        <div className="d-flex flex-wrap">
          <DashboardSidebar />
          <div className="dashboard-article">
            <div className="card cmn--card">
              <div className="card-header py-3">
                <h5 className="card-title">Edit Profile</h5>
              </div>
              <div className="card-body">
                <StudentCommonEditForm
                  callFrom={2}
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
                  setIsSubmitButtonLoading={setIsSubmitButtonLoading}
                  isSubmitButtonLoading={isSubmitButtonLoading}
                  handleFormValueChange={handleFormValueChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
