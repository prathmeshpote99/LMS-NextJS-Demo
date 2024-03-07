import { Form, Formik } from 'formik'
import { updateTrainingParticipantsAdmin } from '@/helpers/backendHelpers/trainingParticipants'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap'
import * as Yup from 'yup'

function BrowseDocumentModel({ tpsId, refreshComponent }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const formInitialState = {
    tps_signedForm: { fileName: '', file: {} },
  }

  const toggleModal = () => {
    setIsModalOpen((state) => !state)
  }

  const handleFormSubmit = async (values) => {
    const data = {
      tps_attentionFormDate: new Date(),
      tps_trainingStatus: 3,
      tps_signedForm: values.tps_signedForm.file,
    }

    try {
      setIsLoading(true)
      const fileName = 'UploadedFile.pdf'
      const signedFormName = new Blob([data.tps_signedForm], {
        type: 'application/pdf',
      })
      signedFormName.name = fileName
      data.tps_signedForm = signedFormName
      let response = await updateTrainingParticipantsAdmin(data, tpsId)

      setIsModalOpen(false)
      setIsLoading(false)

      if (response?.status) {
        toast.success('Form Uploaded Successfully', { autoClose: 3000 })

        // Check if a PDF or PNG file is selected, and then navigate
        if (
          (values.tps_signedForm.file.type === 'application/pdf' ||
            values.tps_signedForm.file.type === 'image/png') &&
          response?.status
        ) {
          navigate(
            `/training-program/VTJGc2RHVmtYMStEVllUSmFHdndtMGtNZ1B3SHBjWm1wa3dXUUp2bjdNWT0=`,
          )
        }
      } else {
        toast.error('Something Went Wrong!')
      }

      refreshComponent()
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isModalOpen ? (
        <Modal isOpen={true} centered={true}>
          <ModalHeader color="dark" toggle={toggleModal}>
            Upload Attestation
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={formInitialState}
              validationSchema={Yup.object({
                tps_score: Yup.string().matches(
                  /^[0-9]+$/,
                  'Please Enter a valid Score',
                ),
                tps_signedForm: Yup.mixed()
                  .required('Please Select Pdf')
                  .test('fileFormat', 'Unsupported Format', (value) => {
                    if (!value.file?.type) return false
                    return ['application/pdf'].includes(value.file.type)
                  }),
              })}
              onSubmit={handleFormSubmit}
            >
              {({ touched, errors, values, handleSubmit, setFieldValue }) => (
                <>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSubmit(e)
                      return false
                    }}
                  >
                    <Row>
                      <Col xs="12" md="12" className="mb-4">
                        <Label className="form-label">
                          Signed Document
                          <span className="text-lowercase text-secondary">
                            {' '}
                            (.png/.pdf)
                          </span>
                          {/* <span className="text-danger">*</span> */}
                        </Label>
                        <Input
                          name="tps_signedForm"
                          type="file"
                          accept=".pdf, .png, .jpg"
                          placeholder="Select file"
                          onChange={(e) => {
                            setFieldValue('tps_signedForm', {
                              fileName: e.target.value,
                              file: e.target.files[0],
                            })
                          }}
                          invalid={
                            !!touched.tps_signedForm && !!errors.tps_signedForm
                          }
                          defaultValue={values.tps_signedForm.fileName}
                        />
                        {!!touched.tps_signedForm &&
                          !!errors.tps_signedForm && (
                            <FormFeedback>{errors.tps_signedForm}</FormFeedback>
                          )}
                      </Col>

                      <Row className="mb-3 text-center">
                        <Col>
                          <Button
                            size="md"
                            color="danger"
                            type="button"
                            disabled={isLoading}
                            className="mx-2"
                            onClick={toggleModal}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="md"
                            color="dark"
                            type="submit"
                            disabled={isLoading}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </Row>
                  </Form>
                </>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      ) : null}
      <div className="container mt-4 mb-0 text-center">
        <p>
          <b>OR</b>
        </p>
      </div>
      <button
        className="mt-4 enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
        onClick={() => toggleModal()}
        disabled={isLoading}
      >
        Upload Attestation Form
      </button>
    </>
  )
}

export default BrowseDocumentModel
