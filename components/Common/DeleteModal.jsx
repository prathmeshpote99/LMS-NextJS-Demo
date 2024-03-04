import PropTypes from 'prop-types'
import { Col, Modal, ModalBody, Row } from 'reactstrap'

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <h4 className="mb-2">Are you sure?</h4>
              <h6>{"You won't be able to revert this!"}</h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success ms-2 h6"
                onClick={onDeleteClick}
              >
                Yes, delete it!
              </button>
              <button
                type="button"
                className="btn btn-danger ms-2 h6"
                onClick={onCloseClick}
              >
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
}

export default DeleteModal
