import { getAuthToken, getUserInfo } from '../../../helpers/authHelper'
import offline from '../../../assets/images/icons/offline_icon.png'
const userInfo = getUserInfo()
const dashboard_header_menu = [
  {
    text: 'Teaching Materials',
    link: '#',
    mainMenuSlug: 'library',
    sub_menu: [
      {
        text: 'E-books',
        link: '/library',
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
        text: 'Assignment review',
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
    // subMenuSlug: 'blog',
    mainMenuSlug: 'connect',
    // sub_menu: [
    //   {
    //     text: 'Blog',
    //     link: '/connect/blog',
    //     subMenuSlug: 'blog',
    //   },

    //   {
    //     text: 'Group',
    //     link: '/connect/group',
    //     subMenuSlug: 'group',
    //   },
    // ],
  },
  {
    text: 'Tuition',
    icon: offline,
    link: '#',
    style: {
      backgroundColor: '#aa9c68',
      color: '#fff',
      borderRadius: '10px',
      padding: '0PX 0PX',
    },
    clicked: true,
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
    text: 'Training',
    link: '/training-program',
    mainMenuSlug: 'training-program',
    style: {
      border: '1px solid white',
      padding: '0% 0%',
      borderRadius: '10px',
      marginLeft: '6px',
    },
  },
  //   {
  //     text: 'Live Class',
  //     link: '/live-class',
  //     mainMenuSlug: 'live-class',
  //   },

  // {
  //   text: 'What is KATON',
  //   link: '#',
  //   sub_menu: [
  //     {
  //       text: 'About us',
  //       link: '/about',
  //     },
  //     {
  //       text: 'Who Can Join Us',
  //       link: '/who-can-join',
  //     },
  //     {
  //       text: '360-degree Learning',
  //       link: '/360-degree-learning',
  //     },
  //   ],
  // },
]

export default dashboard_header_menu

export const dashboard_header_student_menu = [
  {
    text: 'Library',
    link: '#',
    mainMenuSlug: 'library',
    sub_menu: [
      {
        text: 'E-books',
        link: '/library',
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
    // subMenuSlug: 'blog',
    mainMenuSlug: 'connect',
    // sub_menu: [
    //   {
    //     text: 'Blog',
    //     link: '/connect/blog',
    //     subMenuSlug: 'blog',
    //   },

    //   {
    //     text: 'Group',
    //     link: '/connect/group',
    //     subMenuSlug: 'group',
    //   },
    // ],
  },
  {
    text: 'Tuition',
    icon: offline,
    link: '#',
    style: {
      backgroundColor: '#aa9c68',
      color: '#fff',
      borderRadius: '10px',
      padding: '0PX 0PX',
    },
    clicked: true,
    mainMenuSlug: 'auth/tution',
    // sub_menu: [
    //   {
    //     text: 'Public Teacher',
    //     link: '/auth/tpublicteacher',
    //     tabName: 'Teacher',
    //     subMenuSlug: 'signInTeacher',
    //   },
    //   {
    //     text: 'Learner',
    //     link: '/auth/tlearner',
    //     tabName: 'Student',
    //     subMenuSlug: 'signInStudent',
    //   },
    // ],
  },
  //   {
  //     text: 'Training',
  //     link: '/training-program',
  //     mainMenuSlug: 'training-program',
  //   },
  //   {
  //     text: 'Live Class',
  //     link: '/live-class',
  //     mainMenuSlug: 'live-class',
  //   },

  // {
  //   text: 'What is KATON',
  //   link: '#',
  //   sub_menu: [
  //     {
  //       text: 'About us',
  //       link: '/about',
  //     },
  //     {
  //       text: 'Who Can Join Us',
  //       link: '/who-can-join',
  //     },
  //     {
  //       text: '360-degree Learning',
  //       link: '/360-degree-learning',
  //     },
  //   ],
  // },
]
