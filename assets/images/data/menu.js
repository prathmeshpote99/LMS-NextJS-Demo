import { getAuthToken, getUserInfo } from '../../../helpers/authHelper'
import offline from '../../../assets/images/icons/offline_icon.png'
const userInfo = getUserInfo()
const menu = [
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
    mainMenuSlug: 'connect',
    // subMenuSlug: 'blog',
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
  // {
  //   text: 'Training',
  //   link: '/training-program',
  //   mainMenuSlug: 'training-program',
  // },
  // {
  //   text: 'Live Class',
  //   link: '/live-class',
  //   mainMenuSlug: 'live-class',
  // },

  // {
  //   text: 'Get Started',
  //   link: '#',
  //   mainMenuSlug: 'auth/signup',
  //   sub_menu: [
  //     {
  //       text: 'Freelance Teacher',
  //       link: '/auth/signup',
  //       tabName: 'Teacher',
  //       subMenuSlug: 'signUpTeacher',
  //     },
  //     {
  //       text: 'Premium Learner',
  //       link: '/auth/signup',
  //       tabName: 'Student',
  //       subMenuSlug: 'signUpStudent',
  //     },
  //     // {
  //     //   text: 'Parent',
  //     //   link: '/auth/signup',
  //     //   tabName: 'Parent',
  //     //   subMenuSlug: 'signUpParent',
  //     // },
  //     // {
  //     //   text: 'Publisher',
  //     //   link: '/auth/signup',
  //     //   tabName: 'Publisher',
  //     //   subMenuSlug: 'signUpPublisher',
  //     // },
  //   ],
  // },
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
      // {
      //   text: 'Parent',
      //   link: '/auth/signin',
      //   tabName: 'Parent',
      //   subMenuSlug: 'signInParent',
      // },
      // {
      //   text: 'Publisher',
      //   link: '/auth/signin',
      //   tabName: 'Publisher',
      //   subMenuSlug: 'signInPublisher',
      // },
    ],
  },
  // {
  //   text: 'English',
  //   link: '#',
  //   // mainMenuSlug: 'auth/signin',
  //   sub_menu: [
  //     {
  //       text: 'English',
  //       link: '#',
  //       tabName: 'English',
  //       subMenuSlug: 'English',
  //     },
  //     {
  //       text: 'French',
  //       link: '#',
  //       tabName: 'French',
  //       subMenuSlug: 'French',
  //     },
  //     {
  //       text: 'Portuguese',
  //       link: '#',
  //       tabName: 'Portuguese',
  //       subMenuSlug: 'Portuguese',
  //     },
  //   ],
  // },
]
export default menu

// const dashboard_header_menu = [
//   {
//     text: 'Teaching Materials',
//     link: '#',
//     mainMenuSlug: 'library',
//     sub_menu: [
//       {
//         text: 'E-books',
//         link: '/library',
//         subMenuSlug: 'library',
//       },
//       {
//         text: 'Videos',
//         link: 'Videos',
//         subMenuSlug: 'videos',
//       },
//     ],
//   },
//   {
//     text: 'Practice',
//     link: '#',
//     mainMenuSlug: 'practice',
//     sub_menu: [
//       {
//         text: 'Assignment',
//         link: '/practice/assignment',
//         subMenuSlug: 'assignment',
//       },
//       {
//         text: 'Past Questions',
//         link: '/practice/pastQuestion',
//         subMenuSlug: 'pastQuestion',
//       },
//       {
//         text: 'Self Assessment',
//         link: '/practice/selfAssessment',
//         subMenuSlug: 'selfAssessment',
//       },
//     ],
//   },
//   {
//     text: 'Connect',
//     link: '/connect/blog',
//     // subMenuSlug: 'blog',
//     mainMenuSlug: 'connect',
//     // sub_menu: [
//     //   {
//     //     text: 'Blog',
//     //     link: '/connect/blog',
//     //     subMenuSlug: 'blog',
//     //   },

//     //   {
//     //     text: 'Group',
//     //     link: '/connect/group',
//     //     subMenuSlug: 'group',
//     //   },
//     // ],
//   },
//   {
//     text: 'Tuition',
//     link: '#',
//     mainMenuSlug: 'auth/tution',
//     // sub_menu: [
//     //   {
//     //     text: 'Public Teacher',
//     //     link: '/auth/tpublicteacher',
//     //     tabName: 'Teacher',
//     //     subMenuSlug: 'signInTeacher',
//     //   },
//     //   {
//     //     text: 'Learner',
//     //     link: '/auth/tlearner',
//     //     tabName: 'Student',
//     //     subMenuSlug: 'signInStudent',
//     //   },
//     // ],
//   },
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

//   // {
//   //   text: 'What is KATON',
//   //   link: '#',
//   //   sub_menu: [
//   //     {
//   //       text: 'About us',
//   //       link: '/about',
//   //     },
//   //     {
//   //       text: 'Who Can Join Us',
//   //       link: '/who-can-join',
//   //     },
//   //     {
//   //       text: '360-degree Learning',
//   //       link: '/360-degree-learning',
//   //     },
//   //   ],
//   // },
// ]

// export default { menu, dashboard_header_menu }

// export const dashboard_header_student_menu = [
//   {
//     text: 'Library',
//     link: '#',
//     mainMenuSlug: 'library',
//     sub_menu: [
//       {
//         text: 'E-books',
//         link: '/library',
//         subMenuSlug: 'library',
//       },
//       {
//         text: 'Videos',
//         link: 'Videos',
//         subMenuSlug: 'videos',
//       },
//     ],
//   },
//   {
//     text: 'Practice',
//     link: '#',
//     mainMenuSlug: 'practice',
//     sub_menu: [
//       {
//         text: 'Assignment',
//         link: '/practice/assignment',
//         subMenuSlug: 'assignment',
//       },
//       {
//         text: 'Past Questions',
//         link: '/practice/pastQuestion',
//         subMenuSlug: 'pastQuestion',
//       },
//       {
//         text: 'Self Assessment',
//         link: '/practice/selfAssessment',
//         subMenuSlug: 'selfAssessment',
//       },
//     ],
//   },
//   {
//     text: 'Connect',
//     link: '/connect/blog',
//     // subMenuSlug: 'blog',
//     mainMenuSlug: 'connect',
//     // sub_menu: [
//     //   {
//     //     text: 'Blog',
//     //     link: '/connect/blog',
//     //     subMenuSlug: 'blog',
//     //   },

//     //   {
//     //     text: 'Group',
//     //     link: '/connect/group',
//     //     subMenuSlug: 'group',
//     //   },
//     // ],
//   },
//   {
//     text: 'Tuition',
//     link: '#',
//     mainMenuSlug: 'auth/tution',
//     // sub_menu: [
//     //   {
//     //     text: 'Public Teacher',
//     //     link: '/auth/tpublicteacher',
//     //     tabName: 'Teacher',
//     //     subMenuSlug: 'signInTeacher',
//     //   },
//     //   {
//     //     text: 'Learner',
//     //     link: '/auth/tlearner',
//     //     tabName: 'Student',
//     //     subMenuSlug: 'signInStudent',
//     //   },
//     // ],
//   },
//   //   {
//   //     text: 'Training',
//   //     link: '/training-program',
//   //     mainMenuSlug: 'training-program',
//   //   },
//   //   {
//   //     text: 'Live Class',
//   //     link: '/live-class',
//   //     mainMenuSlug: 'live-class',
//   //   },

//   // {
//   //   text: 'What is KATON',
//   //   link: '#',
//   //   sub_menu: [
//   //     {
//   //       text: 'About us',
//   //       link: '/about',
//   //     },
//   //     {
//   //       text: 'Who Can Join Us',
//   //       link: '/who-can-join',
//   //     },
//   //     {
//   //       text: '360-degree Learning',
//   //       link: '/360-degree-learning',
//   //     },
//   //   ],
//   // },
// ]
