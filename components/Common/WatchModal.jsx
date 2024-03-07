import { getUserInfo } from '@/helpers/authHelper'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '@/helpers/urlHelper'
import PracticeQuestionsContent from './PractiseQuestionsContent'

const VideoContent = ({ video }) => (
  <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
    <video
      allow="fullscreen"
      frameBorder="0"
      width="100%"
      className="embed-responsive-item"
      height="700"
      controls
      controlsList="nodownload"
    >
      <source src={`${IMAGE_URL}/${video}#toolbar=0`} />
    </video>
  </div>
)

const VideoModal = ({ toggle, videoData }) => {
  const video = videoData?.bk_video
  const isOpen = !!video
  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false)

  const togglePracticeQuestions = () => {
    setShowPracticeQuestions(!showPracticeQuestions)
  }

  const userInfo = getUserInfo()

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      scrollable
      style={{ overflowY: 'auto' }}
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
            <div className="video-modal-header">
              {showPracticeQuestions
                ? 'Practice Questions'
                : `${videoData?.bk_title}`}
              {userInfo?.userType === 'Student' ? (
                <Button
                  className="video-modal-button"
                  color="dark"
                  onClick={togglePracticeQuestions}
                >
                  {showPracticeQuestions
                    ? `Back to Video`
                    : 'Practice Questions'}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        {showPracticeQuestions ? (
          <PracticeQuestionsContent
            bookData={videoData}
            type="video"
            handleCloseModalCallback={toggle}
            isSingleChoice={true}
          />
        ) : (
          <VideoContent video={video} />
        )}
      </ModalBody>
    </Modal>
  )
}

VideoModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default VideoModal
