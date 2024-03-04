export const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://tlmsghdev.in'
// const DASHBOARD_BASE_URL =
// process.env.REACT_APP_DASHBOARD_URL || 'https://dashapi.katondev.in'
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'https://user.api.tlmsghdev.in'
const DASHBOARD_BASE_URL =
  process.env.REACT_APP_DASHBOARD_URL || 'https://dashboard.api.tlmsghdev.in'

// const DASHBOARD_BASE_URL = const DASHBOARD_BASE_URL ='https://dashapi.katondev.in'
const IMAGE_BASE_URL = 'https://katon-dev-uploads.s3.eu-central-1.amazonaws.com'

export const API_URL = `${API_BASE_URL}/api/v1/web`

//EPUB URL
export const EPUB_URL =
  process.env.REACT_APP_EPUB_URL || 'https://katon.katechnologiesgh.com/epub'

//PROFILE PICTURE UPDATE
export const DASHBOARD_API_URL = `${DASHBOARD_BASE_URL}/api/v1/admin`

//IMAGE URL
export const IMAGE_URL = `${IMAGE_BASE_URL}`

//LOG IN
export const USER_LOGIN = '/auth/login'

//AUTH
export const AUTH = '/auth'

//LOG IN FTEACHER
export const FTEACHER_LOGIN = '/auth/ftlogin'

//LOG IN TEACHER
export const TEACHER_LOGIN = '/auth/tlogin'

//LOG IN PARENT
export const PARENT_LOGIN = '/auth/ptlogin'

//LOG IN PUBLISHER
export const PUBLISHER_LOGIN = '/auth/pblogin'

//LOG OUT
export const USER_LOGOUT = '/auth/logout'

//FTEACHER LOG OUT
export const FTEACHER_LOGOUT = '/auth/ftlogout'

//PARENT LOG OUT
export const PARENT_LOGOUT = '/auth/ptLogout'

//PUBLISHER LOG OUT
export const PUBLISHER_LOGOUT = '/auth/pbLogout'

//PASSWORD UPDATE
export const PASSWORD_UPDATE = '/auth/changePassword'

//PASSWORD TEACHER UPDATE
export const TEACHER_PASSWORD_UPDATE = '/auth/updateTeacherPassword'

//PROFILE UPDATE
export const STUDENT_PROFILE = '/student'

//FTEAHCER PROFILE UPDATE
export const FTEAHCER_PROFILE = '/fTeacher'

//TEAHCER PROFILE UPDATE
export const TEAHCER_PROFILE = '/teacher'

//FTEAHCER PROFILE UPDATE
export const PARENT = '/parent'

//PUBLISHER PROFILE UPDATE
export const PUBLISHER = '/publisher'

//BOOK
export const BOOK = '/book'

//SIMILAR_BOOKS
export const SIMILAR_BOOK = '/book/similar-book'

//BOOK CATEGORY
export const BOOK_CATEGORY = '/contentCategory'

//TEACHER SIGN UP
export const TEACHER_SIGNUP = '/auth/tSignUp'

// STUDENT SIGN UP
export const STUDENT_SIGNUP = '/auth/stSignup'

// PARENT SIGN UP
export const PARENT_SIGNUP = '/auth/ptSignup'

// PUBLISHER SIGN UP
export const VERIFY_OTP = '/auth/verifyOtp'

// STUDENT SIGN UP
export const VERIFY_STUDENT_OTP = '/auth/verifyStudentOtp'

// Resend OTP email
export const RESEND_OTP_EMAIL = '/auth/sendMail/reSend'

// Resend OTP email
export const RESEND_OTP_EMAIL_STUDENT = '/auth/sendMail/student/reSend'

// Resend OTP SMS
export const RESEND_OTP_SMS = '/auth/sendSms/reSend'

// Resend OTP SMS student
export const RESEND_OTP_SMS_STUDENT = '/auth/sendSms/student/reSend'

// PUBLISHER SIGN UP
export const PUBLISHER_SIGNUP = '/auth/pbSignup'

// TRAINING PROGRAM
export const TRAININGPROGRAM = '/training-program'

// LIVE CLASS
export const LIVECLASS = '/liveSession'

// ENABLEX
export const ENABLEX = '/enableX'

// MESSAGE
export const MESSAGE = '/sendMessage'

// LIVE CLASS
export const ASSIGNMENTQUELIST = '/all-Questions'

// GET ASSIGNMENT
export const ASSIGNMENT = '/assignment'

// GET selfAssessment
export const SELFASSESSMENT = '/selfAssessment'

// GET ASSIGNMENT
export const ASSIGNMENTRESULT = '/assignmentResult'

// GET PASTPAPER
export const PASTPAPER = '/pastPaper'

//  ASSIGNMENTQSET
export const ASSIGNMENTQSET = '/assignmentQset'

// BOKKREVIEW
export const BOOKREVIEW = '/bookReview'

// CONTENT
export const CONTENT = '/content'

// TRAININGQSET
export const TRAININGQSET = '/trainingQset'

// AREA
export const AREA = '/area'

// ClassRoomType Dropdown
export const classRoomType = [
  {
    label: 'Kindergarten',
    options: [
      { label: 'KG 1', value: 'KG 1' },
      { label: 'KG 2', value: 'KG 2' },
    ],
  },
  {
    label: 'Primary School',
    options: [
      { label: 'Primary 1', value: 'Primary 1' },
      { label: 'Primary 2', value: 'Primary 2' },
      { label: 'Primary 3', value: 'Primary 3' },
      { label: 'Primary 4', value: 'Primary 4' },
      { label: 'Primary 5', value: 'Primary 5' },
      { label: 'Primary 6', value: 'Primary 6' },
    ],
  },
  {
    label: 'Junior High School',
    options: [
      { label: 'JHS 1', value: 'JHS 1' },
      { label: 'JHS 2', value: 'JHS 2' },
    ],
  },
  {
    label: 'Senior High School ',
    options: [
      { label: 'SHS 1', value: 'SHS 1' },
      { label: 'SHS 2', value: 'SHS 2' },
      { label: 'SHS 3', value: 'SHS 3' },
    ],
  },
  {
    label: 'Vocational and Technical Education',
    options: [
      { label: 'Level 1', value: 'Level 1' },
      { label: 'Level 2', value: 'Level 2' },
      { label: 'Level 3', value: 'Level 3' },
      { label: 'Level 4', value: 'Level 4' },
    ],
  },
]
// EnableX Create Room
export const CREATE_ROOM = 'https://api.enablex.io/video/v2/rooms'

// Training Participants
export const TRAININGPARTICIPANTS = '/training-participants'

// AREA
export const REGION = '/area/regions'

// GROUP
export const GROUP = '/group'

// BLOG
export const BLOG = '/blog'

// BLOG
export const BLOGCOMMENT = '/blogComment'

// BLOG
export const GROUPMEMBER = '/groupMember'

// Book Subjects
export const BOOK_SUBJECTS = '/book/all-book-subjects'
