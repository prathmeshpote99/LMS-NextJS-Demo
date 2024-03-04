import { encryptId, getAuthToken } from 'helpers/authHelper'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import default_card_img from '../assets/images/default_card_img.png'
import { IMAGE_URL } from '../helpers/urlHelper'

const EventCard = ({
  tp_typeOfProgram,
  tp_programImage,
  tp_id,
  tp_createdAt,
  tp_programTitle,
  tp_description,
  classes,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname

  const LoginAlert = async () => {
    const value = await swal('Please do login into your account', {
      buttons: {
        defeat: 'Log in',
        cancel: 'Cancel',
      },
    })
    switch (value) {
      case 'defeat':
        navigate('/auth/signin', {
          state: {
            url: pathName,
          },
        })
        break
      default:
    }
  }

  const handleTrainingDetailsPage = async () => {
    const isLoggedIn = getAuthToken() ? true : false
    const encryptedId = await encryptId(tp_id)
    if (!isLoggedIn) {
      LoginAlert()
    } else {
      return navigate(`/training-program/${encryptedId}`)
    }
  }

  return (
    <div className={`event__card h-100 bg-white ${classes}`}>
      <div className="event__card-img">
        <Link to={`#`}>
          {tp_programImage ? (
            <img
              src={`${IMAGE_URL}/${tp_programImage}`}
              alt=""
              onClick={() => handleTrainingDetailsPage()}
            />
          ) : (
            <img
              src={default_card_img}
              alt=""
              onClick={() => handleTrainingDetailsPage()}
            />
          )}
        </Link>
        {/* {tp_typeOfProgram === 'Physical' ? (
          <span
            className="training-map--marker"
            style={{ backgroundColor: '#111d5e' }}
          >
            <BiAccessibility />
            {tp_typeOfProgram}
          </span>
        ) : (
          <span className="training-map--marker">
            <GiVirtualMarker />
            {tp_typeOfProgram}
          </span>
        )} */}
      </div>
      <div className="event__card-content">
        {/* <div className="event-meta row d-flex align-items-center mb-4 mt-1">
          <div className="col-6">
            <BsCalendarWeek style={{ color: 'white' }} />{' '}
            <span className="h8 text-white">
              {moment(tp_createdAt).format('DD MMM, YYYY')}
            </span>
          </div>
          <div className="col-6 text-center">
            <BsFillClockFill style={{ color: 'white' }} />{' '}
            <span className="h8 text-white">2 Hours</span>
          </div>
        </div> */}
        <h5
          className="title cursor-pointer"
          onClick={() => handleTrainingDetailsPage()}
        >
          {tp_programTitle}
        </h5>
        {/* <button
          onClick={() => handleTrainingDetailsPage()}
          className="cmn--btn"
        >
          Details
        </button> */}
        <span
          className="training-detail-btn d-flex justify-content-end me-3 cursor-pointer"
          onClick={() => handleTrainingDetailsPage()}
        >
          Details
        </span>
      </div>
    </div>
  )
}

export default EventCard
