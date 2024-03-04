// import { AiOutlineMessage } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiBook } from 'react-icons/fi'
import { TbLogout } from 'react-icons/tb'
import { GoLock } from 'react-icons/go'
// import { RiFileHistoryLine } from 'react-icons/ri'
const dashboard_menu = [
  // {
  //   title: 'My Library',
  //   link: '/my-library',
  //   icon: <FiBook />,
  // },
  // {
  // 	title: "Order History",
  // 	link: "/order-history",
  // 	icon: <RiFileHistoryLine />,
  // },
  // {
  //   title: 'Messages',
  //   link: '/messages',
  //   icon: <AiOutlineMessage />,
  // },
  {
    title: 'Edit Profile',
    link: '/profile',
    icon: <CgProfile />,
  },
  {
    title: 'Change Password',
    link: '/auth/change-pass',
    icon: <GoLock />,
  },
  {
    title: 'Logout',
    link: '#logout',
    icon: <TbLogout />,
  },
]
export default dashboard_menu
