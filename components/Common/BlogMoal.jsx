import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '../../helpers/urlHelper'

const PDfModal = (props) => {
  const { isOpen, toggle, pdf, type } = props
  if (!pdf) return <> </>
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="tutorModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          {type === 'pdf' ? 'Read PDF' : 'Read ePub'}
        </ModalHeader>
        <ModalBody>
          <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
            <iframe
              title="test"
              className="embed-responsive-item"
              src={`${IMAGE_URL}/${pdf}#toolbar=0`}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

PDfModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default PDfModal
