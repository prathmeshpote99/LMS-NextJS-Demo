import { signatureStyleNames } from 'helpers/dropdownVals'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const SignatureModal = (props) => {
  const {
    isOpen,
    toggle,
    signature,
    setSignature,
    toggleAttentionFormModal,
    selectedSignatureStyle,
    setSelectedSignatureStyle,
  } = props
  const [tempSignatue, setTempSignatue] = useState('')
  const [selectedSignIndex, setSelectedSignIndex] = useState(0)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setTempSignatue(signature)
  }, [signature])

  const handleNextStep = () => {
    if (!selectedSignatureStyle) {
      // setShowError(true)
    } else {
      toggleAttentionFormModal()
      toggle()
      setSignature(tempSignatue)
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="lg"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="tutorModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Signature</ModalHeader>
        <ModalBody className="scrollable-modal">
          <div className="row d-flex justify-content-center">
            <div className="col-md-9 text-center">
              <div className="input--group">
                <Input
                  name="signature"
                  type="text"
                  placeholder="Type Your Name"
                  onChange={(e) => {
                    setTempSignatue(e.target.value)
                  }}
                  value={tempSignatue}
                />
              </div>
            </div>
            <div className="col-md-3 text-center">
              <button
                type="button"
                className="enroll-btn cmn--btn w-100"
                onClick={() => setSignature(tempSignatue)}
              >
                Change
              </button>
            </div>
            {showError && (
              <div className="col-md-12 mt-3">
                <p className="text-danger">Please Select Signature</p>
              </div>
            )}
            <div className="row">
              {signatureStyleNames.map((name, i) => {
                return (
                  <div className="col-md-4 mt-3 cursor-pointer">
                    <div
                      className={`${
                        i === selectedSignIndex ? 'selected-sign' : ''
                      } mt-3 bg-white shadow rounded-4 signature-card`}
                      style={{ fontFamily: name }}
                      onClick={() => {
                        setSelectedSignatureStyle(name)
                        setSelectedSignIndex(i)
                        setShowError(false)
                      }}
                    >
                      {signature}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="enroll-btn cmn--btn w-25 mt-3"
            onClick={() => handleNextStep()}
          >
            Next
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}

SignatureModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default SignatureModal
