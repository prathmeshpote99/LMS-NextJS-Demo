import html2pdf from 'html2pdf.js'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import logo from '../../assets/images/logo/MOE_Logooo2.png'
import signedFormFooterImage from '../../assets/images/signFormfooter.jpg'
import ButtonLoader from './ButtonLoader'

const AttentionForm = (props) => {
  const {
    isOpen,
    toggle,
    toggleSignatureModal,
    modalTitle,
    signature,
    selectedSignatureStyle,
    fullName = '',
    schoolName = '',
    staffId = '',
    submitAttentionFormWithSign,
    downloadAttentionForm,
    attentionFormType,
    isLoading,
    setIsLoading,
  } = props

  const fetchImageAndConvertToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })
  }

  const attentionFormFormate = async (
    fullName = 'Harsh',
    staffId = '',
    schoolName = '',
    signatureFontFamily = 'Betterlett',
    singnatureText = 'Nitin Gulabani',
  ) => {
    const katonLogo = await fetchImageAndConvertToBase64(`${logo}`)

    const signedFormFooter = await fetchImageAndConvertToBase64(
      `${signedFormFooterImage}`,
    )
    return `
    <div class="row px-5 attension-form" id="attension-form">
    <div class="col-md-12 d-flex justify-content-end mb-5">
      <img class='img-fluid' src='${katonLogo}' alt=""></img>
    </div>
    <div class="col-md-12 mb-5 d-flex flex-column align-items-end">
      <h3 class="mb-3 ms-auto heading-color">ATTESTATION FORM</h3>
      <h5 class="ms-auto heading-color">
        ICT SKILLS ACQUISITION FOR TEACHERS
      </h5>
    </div>
    <div class="col-md-12 mb-5">
      <h6 class="mb-5 default-color">
        I hereby attest that I have completed the ICT SKILLS ACQUISITION FOR
        TEACHERS as well as the Office 365 Teacher Academy and Microsoft
        Innovative Education.
      </h6>
      <h6 class="default-color">
        I have been taught, read and understood the subject areas covered
        under the training. Thank you.
      </h6>
    </div>
    <div class="col-md-12">
      <div class="d-flex">
        <h5 class="mb-5 d-inline-block field-title">NAME:</h5>
        <div class="input-value ms-3">
          <h5 class="form-field">${fullName}</h5>
        </div>
      </div>
      <div class="d-flex">
        <h5 class="mb-5 d-inline-block field-title">STAFF ID:</h5>
        <div class="input-value ms-3">
          <h5 class="form-field">${staffId ? staffId : '-'}</h5>
        </div>
      </div>
      <div class="d-flex">
        <h5 class="mb-5 d-inline-block field-title">NAME OF SCHOOL:</h5>
        <div class="input-value ms-3">
          <h5 class="form-field">${schoolName ? schoolName : '-'}</h5>
        </div>
      </div>
      <div class="d-flex">
        <h5 class="mb-5 d-inline-block field-title">SIGNATURE:</h5>
        <div class="input-value ms-3">
          <h5 class="form-field signature text-center" style='font-family:${signatureFontFamily}'>
            ${singnatureText}
          </h5>
        </div>
      </div>
    </div>
    <div class="col-md-12">
    <img class='img-fluid mt-4' src='${signedFormFooter}' alt=""></img>
    </div>
    
  </div>
    `
  }

  const convertToPdf = async (htmlElement) => {
    const element = await attentionFormFormate(
      fullName,
      staffId,
      schoolName,
      selectedSignatureStyle,
      signature,
    )

    const pdf = await html2pdf().from(element).output('arraybuffer')
    return pdf
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
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody className="scrollable-modal">
          <div className="row px-5 attension-form" id="attension-form">
            <div className="col-md-12 d-flex justify-content-end mb-5">
              <img src={logo} alt="" />
            </div>
            <div className="col-md-12 mb-5 d-flex flex-column align-items-end">
              <h3 className="mb-3 ms-auto heading-color">ATTESTATION FORM</h3>
              <h5 className="ms-auto heading-color">
                ICT SKILLS ACQUISITION FOR TEACHERS
              </h5>
            </div>
            <div className="col-md-12 mb-5">
              <h6 className="mb-5 default-color">
                I hereby attest that I have completed the ICT SKILLS ACQUISITION
                FOR TEACHERS as well as the Office 365 Teacher Academy and
                Microsoft Innovative Education.
              </h6>
              <h6 className="default-color">
                I have been taught, read and understood the subject areas
                covered under the training. Thank you.
              </h6>
            </div>
            <div className="col-md-12">
              <div className="d-flex">
                <h5 className="mb-5 d-inline-block field-title">NAME:</h5>
                <div className="input-value ms-3">
                  <h5 className="form-field">{fullName}</h5>
                </div>
              </div>
              <div className="d-flex">
                <h5 className="mb-5 d-inline-block field-title">STAFF ID:</h5>
                <div className="input-value ms-3">
                  <h5 className="form-field">{staffId}</h5>
                </div>
              </div>
              <div className="d-flex">
                <h5 className="mb-5 d-inline-block field-title">
                  NAME OF SCHOOL:
                </h5>
                <div className="input-value ms-3">
                  <h5 className="form-field">
                    {schoolName ? schoolName : '-'}
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-baseline">
                <h5 className="mb-5 d-inline-block field-title">SIGNATURE:</h5>
                <div className="input-value ms-3">
                  <h5
                    className="form-field signature text-center"
                    style={{
                      fontFamily: selectedSignatureStyle,
                    }}
                  >
                    {signature}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <img
                className="mb-3 img-fluid"
                src={signedFormFooterImage}
                alt="footer"
              ></img>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {attentionFormType === '1' ? (
            <>
              <button
                type="button"
                className="enroll-btn cmn--btn w-25"
                onClick={() => {
                  toggle()
                  toggleSignatureModal()
                }}
              >
                <div className="d-flex justify-content-center align-items-center position-relative">
                  {/* <ButtonLoader></ButtonLoader> */}

                  <span className="">Back</span>
                </div>
              </button>
              <button
                disabled={isLoading}
                type="button"
                className="enroll-btn cmn--btn w-25"
                onClick={async () => {
                  setIsLoading(true)
                  const pdf = await convertToPdf()
                  const res = await submitAttentionFormWithSign(pdf)
                  setIsLoading(false)
                }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  {isLoading && <ButtonLoader></ButtonLoader>}

                  <span>Submit</span>
                </div>
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              className="enroll-btn cmn--btn w-25"
              onClick={async () => {
                await downloadAttentionForm()
                toggle()
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                {isLoading && <ButtonLoader></ButtonLoader>}

                <span>{isLoading ? 'Downloading' : 'Download PDF'}</span>
              </div>
            </button>
          )}
        </ModalFooter>
      </Modal>
    </>
  )
}

AttentionForm.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default AttentionForm
