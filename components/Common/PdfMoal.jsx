import { getUserInfo } from 'helpers/authHelper'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '../../helpers/urlHelper'
import ButtonLoader from './ButtonLoader'
import PracticeQuestionsContent from './PractiseQuestionsContent'

const PDfModal = (props) => {
  const {
    isOpen,
    toggle,
    pdf,
    showFooter = false,
    downloadAttentionForm,
    isLoading,
    setShowFooter,
    book,
  } = props

  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false)

  const togglePracticeQuestions = () => {
    setShowPracticeQuestions(!showPracticeQuestions)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  const userInfo = getUserInfo()

  return (
    <Modal
      onContextMenu={handleContextMenu}
      isOpen={isOpen}
      scrollable
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="tutorModal"
      tabIndex="-1"
      toggle={() => {
        toggle()
        setShowFooter(false)
      }}
    >
      <ModalHeader
        toggle={() => {
          toggle()
          setShowFooter(false)
        }}
      >
        <div className="container">
          <div className="row">
            <div className="video-modal-headers">
              {showPracticeQuestions ? 'Practice Questions' : 'Book PDF'}
              {userInfo?.userType === 'Student' ? (
                <Button
                  className="video-modal-button"
                  color="dark"
                  onClick={togglePracticeQuestions}
                >
                  {showPracticeQuestions ? 'Read PDF' : 'Practice Questions'}
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        {showPracticeQuestions ? (
          <PracticeQuestionsContent
            bookData={book}
            type="e-book"
            handleCloseModalCallback={toggle}
            isSingleChoice={true}
          />
        ) : (
          <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
            <iframe
              oncontextmenu="return false;"
              id="pdfIframe"
              // onContextMenu={handleContextMenu}
              style={{ height: '100%', width: '100%' }}
              title="test"
              className="embed-responsive-item"
              src={`${IMAGE_URL}/${pdf}#toolbar=0`}
            />
          </div>
        )}
      </ModalBody>
      {showFooter && (
        <ModalFooter>
          <button
            type="button"
            disabled={isLoading}
            className="enroll-btn cmn--btn w-25"
            onClick={async () => {
              await downloadAttentionForm()
              toggle()
              setShowFooter(false)
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              {isLoading && <ButtonLoader></ButtonLoader>}

              <span>{isLoading ? 'Downloading' : 'Download PDF'}</span>
            </div>
          </button>
        </ModalFooter>
      )}
    </Modal>
  )
}

PDfModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default PDfModal
