import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ContinueSubmitForm = (props) => {
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
  } = props
  if (!pdf) return <> </>

  return (
    <>
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
            <p>
              Confirm your account details as{' '}
              <b>
                {submitUserType === 1 ? 'Freelance Teacher' : 'Premium Learner'}
              </b>
              . We will send you a verification code via email and SMS right now
              to validate the following details in next step.
            </p>
            <p className="fw-bolder mt-2">
              Email :&nbsp;
              {submitUserType === 1
                ? teacherData?.tc_email
                : studentData?.st_email}
            </p>
            <p className="fw-bolder">
              Phone : &nbsp;
              {submitUserType === 1
                ? teacherData?.tc_phoneNumber
                : studentData?.st_phoneNumber}{' '}
            </p>
            <div className="d-flex justify-content-center mt-2">
              <button
                onClick={() => {
                  handleContinueSubmitting()
                  toggle()
                }}
                className="confirm--btn viewAllBtn rounded py-2 w-25"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  toggle()
                }}
                className="edit--btn viewAllBtn rounded py-2 w-25 ms-3"
              >
                Edit
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

ContinueSubmitForm.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ContinueSubmitForm
