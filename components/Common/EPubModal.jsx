import { getUserInfo } from '@/helpers/authHelper'
// import ReaderWrapper from 'pages/EPub/container/Reader'
import { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '@/helpers/urlHelper'
import PracticeQuestionsContent from './PractiseQuestionsContent'

const EPubModal = ({ isOpen, ePubUrl, toggle, book }) => {
  const EPUB_URL = `${IMAGE_URL}/${ePubUrl}`

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
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>
        <div className="container">
          <div className="row">
            <div className="video-modal-headers">
              {showPracticeQuestions ? 'Practice Questions' : 'Book E-Pub'}
              {userInfo?.userType === 'Student' ? (
                <Button
                  className="video-modal-button"
                  color="dark"
                  onClick={togglePracticeQuestions}
                >
                  {showPracticeQuestions ? 'Read E-Pub' : 'Practice Questions'}
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
          <ReaderWrapper url={EPUB_URL} isSpeech="web" />
        )}
      </ModalBody>
    </Modal>
  )
}

export default EPubModal
