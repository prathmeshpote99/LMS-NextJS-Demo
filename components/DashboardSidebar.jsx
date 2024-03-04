import { useContext, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import dashboard_menu from '../assets/images/data/dashboard-menu'
import { AuthContext } from '../contexts/AuthContext'
import { removeAuthInfo } from '../helpers/authHelper'
import {
  logOutParent,
  logOutPublisher,
  logOutUser,
  logOutfTeacher,
} from '../helpers/backendHelper'

const DashboardSidebar = () => {
  const { setLogout, userInfo } = useContext(AuthContext)

  const [temp, setTemp] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  const handleLogout = async () => {
    const value = await swal('Are you sure you want to logout?', {
      buttons: {
        defeat: 'Log out',
        cancel: 'Cancel',
      },
    })

    if (value === 'defeat') {
      if (userInfo === 'Student') {
        logOutUser()
      } else if (userInfo === 'Teacher') {
        logOutfTeacher()
      } else if (userInfo === 'Parent') {
        logOutParent()
      } else if (userInfo === 'Publisher') {
        logOutPublisher()
      }
      removeAuthInfo()
      setLogout()
      navigate('/auth/signin', {
        state: {
          url: pathName,
        },
      })
      setTemp(!temp)
    }
  }

  return (
    <>
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner">
          <h5 className="title" style={{ color: 'black' }}>
            My Account
          </h5>
          {dashboard_menu && (
            <ul>
              {dashboard_menu.map(({ title, link, icon }, i) => (
                <li key={i}>
                  {link === '#logout' ? (
                    <span className="menu-link" onClick={handleLogout}>
                      {icon} {title}
                    </span>
                  ) : (
                    <NavLink to={link}>
                      {icon} {title}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

export default DashboardSidebar
