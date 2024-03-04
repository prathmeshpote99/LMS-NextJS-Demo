import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '../../helpers/urlHelper'

const ListenModal = (props) => {
  const { isOpen, toggle, audio } = props
  if (!audio) return <> </>

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
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Listen Book Audio</ModalHeader>
        <ModalBody>
          <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
            <iframe
              title="test"
              className="embed-responsive-item"
              src={`${IMAGE_URL}/${audio}`}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

ListenModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default ListenModal
