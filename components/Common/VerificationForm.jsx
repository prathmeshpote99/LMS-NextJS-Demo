import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const VerificationForm = (props) => {
  const {
    isOpen,
    toggle,
    pdf,
    type,
    modalTitle,
    handleContinueSubmitting,
    teacherData,
    studentData,
    submitUserType,
    registerStep,
    generateTeacherOTP,
    setRegisterStep,
    generateStudentOTP,
  } = props

  return (
    <Modal
      isOpen={isOpen}
      size="md"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="tutorModal"
      tabIndex="-1"
      toggle={() => {
        toggle()
      }}
    >
      <ModalHeader
        toggle={() => {
          toggle()
        }}
      >
        {modalTitle}
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column my-4">
          <p>Please verify your account details.</p>
          <br />
          <br />
          <div className="d-flex justify-content-between me-5">
            <p className="fw-bolder ">
              {submitUserType === 1
                ? teacherData?.tc_email
                : studentData?.st_email}
            </p>
            <p
              className={`${
                submitUserType === 1
                  ? teacherData?.tc_isEmailVerified
                    ? 'text-success'
                    : ''
                  : studentData?.st_isEmailVerified
                  ? 'text-success'
                  : ''
              }`}
            >
              {submitUserType === 1
                ? teacherData?.tc_isEmailVerified
                  ? 'Verified'
                  : 'Pending'
                : studentData?.st_isEmailVerified
                ? 'Verified'
                : 'Pending'}
            </p>
          </div>
          <div className="d-flex justify-content-between me-5">
            <p className="fw-bolder ">
              {submitUserType === 1
                ? `+${teacherData?.tc_countryCode} ${teacherData?.tc_phoneNumber}`
                : `+${studentData?.st_countryCode} ${studentData?.st_phoneNumber}`}
            </p>
            <p
              className={`${
                submitUserType === 1
                  ? teacherData?.tc_isPhoneVerified
                    ? 'text-success'
                    : ''
                  : studentData?.st_isPhoneVerified
                  ? 'text-success'
                  : ''
              }`}
            >
              {submitUserType === 1
                ? teacherData?.tc_isPhoneVerified
                  ? 'Verified'
                  : 'Pending'
                : studentData?.st_isPhoneVerified
                ? 'Verified'
                : 'Pending'}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button
              onClick={async () => {
                toggle()

                if (submitUserType === 1) {
                  if (!teacherData?.tc_isEmailVerified) {
                    let body = {
                      email: teacherData?.tc_email,
                      type: 1,
                    }
                    await generateTeacherOTP(body, 2)
                  } else if (!teacherData?.tc_isPhoneVerified) {
                    let body = {
                      email: teacherData?.tc_email,
                      type: 2,
                    }
                    await generateTeacherOTP(body, 3)
                  }
                } else if (submitUserType === 2) {
                  if (!studentData?.st_isEmailVerified) {
                    let body = {
                      email: studentData?.st_email,
                      type: 1,
                    }
                    await generateStudentOTP(body, 2)
                  } else if (!studentData?.st_isPhoneVerified) {
                    let body = {
                      email: studentData?.st_email,
                      type: 2,
                    }
                    await generateStudentOTP(body, 3)
                  }
                }
              }}
              className="edit--btn viewAllBtn rounded py-2 w-25 ms-3"
            >
              Verify Now
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

VerificationForm.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default VerificationForm
