import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import PropTypes from 'prop-types'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IMAGE_URL } from '../../helpers/urlHelper'

const PdfReaderModal = (props) => {
  const {
    isOpen,
    toggle,
    pdf,
    type,
    modalTitle,
    showFooter = false,
    downloadAttentionForm,
    isLoading,
    setShowFooter,
  } = props
  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const { Toolbar } = toolbarPlugin()

  return (
    <div>
      <Modal
        onContextMenu={handleContextMenu}
        isOpen={isOpen}
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
          {type === 'pdf'
            ? modalTitle
              ? modalTitle
              : 'Read PDF'
            : 'Read ePub'}
        </ModalHeader>
        <ModalBody>
          <style>
            {`
            .rpv-toolbar-item[data-element="download"] {
              display: none;
            }
            .rpv-toolbar-item[data-element="print"] {
              display: none;
            }
            `}
          </style>
          <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <div>
                <Viewer
                  fileUrl={`${IMAGE_URL}/${pdf}#toolbar=0`}
                  plugins={[
                    defaultLayoutPluginInstance,
                    { toolbar: { render: () => null } },
                  ]}
                />
              </div>
            </Worker>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

PdfReaderModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default PdfReaderModal
