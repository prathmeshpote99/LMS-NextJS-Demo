import { getAllAssignmentResultByAsn } from 'helpers/backendHelpers/assignmentResult'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import SubmitLoader from './SubmitLoader'

const AnswerListModal = (props) => {
  const { isOpen, toggle, asn_id, type, modalTitle } = props
  const [assignmentResult, setAssignmentResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [noRecords, setNoRecords] = useState(false)

  useEffect(() => {
    if (!asn_id) return

    const getAssignmentResultById = async () => {
      try {
        setIsLoading(true)
        let response = await getAllAssignmentResultByAsn(asn_id)
        let { assignmentResult } = response.data
        setAssignmentResult(assignmentResult)
        if (assignmentResult.length === 0) {
          setNoRecords(true)
        } else {
          setNoRecords(false)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log('error12', error)
      }
    }

    getAssignmentResultById()
  }, [asn_id])

  return (
    <>
      <div>
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
            {type === 'pdf'
              ? modalTitle
                ? modalTitle
                : 'Read PDF'
              : 'Read ePub'}
          </ModalHeader>
          <ModalBody>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">Marks</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <div
                    style={
                      isLoading
                        ? {
                            position: 'relative',
                            opacity: '0.8',
                            minHeight: '300px',
                          }
                        : {}
                    }
                  >
                    <SubmitLoader />
                  </div>
                ) : (
                  <>
                    {noRecords && (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '300px' }}
                      >
                        <h1>No system activity found.</h1>
                      </div>
                    )}
                    {assignmentResult &&
                      assignmentResult.length > 0 &&
                      assignmentResult.map((data) => {
                        return (
                          <>
                            <tr>
                              <td>{data?.ar_student?.st_fullName}</td>
                              <td>{data?.ar_score}</td>
                            </tr>
                          </>
                        )
                      })}
                  </>
                )}
              </tbody>
            </table>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

AnswerListModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default AnswerListModal
