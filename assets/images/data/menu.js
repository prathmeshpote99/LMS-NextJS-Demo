import { getUserInfo } from '@/helpers/authHelper'
import offline from '@/assets/images/icons/offline_icon.png'
const userInfo = getUserInfo()
const menu = [
  {
    text: 'Library',
    link: '#',
    mainMenuSlug: 'library',
    sub_menu: [
      {
        text: 'E-books',
        // link: '/library',
        link: '/books',
        subMenuSlug: 'library',
      },
      {
        text: 'Videos',
        link: '/videos',
        subMenuSlug: 'videos',
      },
    ],
  },
  {
    text: 'Practice',
    link: '#',
    mainMenuSlug: 'practice',
    sub_menu: [
      {
        text: 'Assignment',
        link: '/practice/assignment',
        subMenuSlug: 'assignment',
      },
      {
        text: 'Past Questions',
        link: '/practice/pastQuestion',
        subMenuSlug: 'pastQuestion',
      },
      {
        text: 'Self Assessment',
        link: '/practice/selfAssessment',
        subMenuSlug: 'selfAssessment',
      },
    ],
  },
  {
    text: 'Connect',
    link: '/connect/blog',
    mainMenuSlug: 'connect',
  },
  {
    text: 'Tuition',
    classNames: 'menu-item tution',
    icon: offline,
    style: {
      backgroundColor: '#aa9c68',
      color: '#fff',
      borderRadius: '10px',
      padding: '0PX 0PX',
    },
    clicked: true,
    link: '#',
    mainMenuSlug: 'auth/tution',
    sub_menu: [
      {
        text: 'Public Teacher',
        link: '#',
        tabName: 'Teacher',
        subMenuSlug: 'signInTeacher',
      },
      {
        text: 'Learner',
        link: '#',
        tabName: 'Student',
        subMenuSlug: 'signInStudent',
      },
    ],
  },
  {
    text: 'Sign In',
    link: '#',
    mainMenuSlug: 'auth/signin',
    sub_menu: [
      {
        text: 'Public Teacher',
        link: '/auth/signin',
        tabName: 'Teacher',
        subMenuSlug: 'signInTeacher',
      },
      {
        text: 'Learner',
        link: '/auth/signin',
        tabName: 'Student',
        subMenuSlug: 'signInStudent',
      },
    ],
  },
]
export default menu