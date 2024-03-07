import { TextField } from '@mui/material'
import Typography from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import EPubModal from '@/components/Common/EPubModal'
import PDfModal from '@/components/Common/PdfMoal'
import { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import Link from "next/link"
import { Button, Modal } from 'reactstrap'
import sampleBookImage from '@/assets/images/book.png'
import { IMAGE_URL } from '@/helpers/urlHelper'
import { useRouter } from 'next/router'
import Image from 'next/image'
// import './Books.scss'

const BooksSingle = ({ book, toggleDetails }) => {
  // Pdf model states
  const [pdfFile, setPdfFile] = useState('')
  const [ePubUrl, setEPubUrl] = useState('')
  const [currentSelectedBookData, setCurrentSelectedBookData] = useState(null)

  const togglePdfModal = () => {
    setPdfFile('')
    setCurrentSelectedBookData(null)
  }

  const toggleEPubModal = () => {
    setEPubUrl('')
    setCurrentSelectedBookData(null)
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const currentUrl = window.location.href

  const router = useRouter()
  
  // Check if window is defined (i.e., we're on the client-side)
  let currentUrl
  if (typeof window !== 'undefined') {
    // We're on the client-side, so we can use window.location.origin
    currentUrl = window.location.origin + router.asPath
  } else {
    // We're on the server-side, so we only have the path, not the domain
    currentUrl = router.asPath
  }


  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
  }

  return (
    <section className="books-single py-5">
      {pdfFile ? (
        <PDfModal
          isOpen={true}
          toggle={togglePdfModal}
          pdf={pdfFile}
          type="pdf"
          book={currentSelectedBookData}
        />
      ) : null}

      {ePubUrl ? (
        <EPubModal
          isOpen={true}
          toggle={toggleEPubModal}
          ePubUrl={ePubUrl}
          book={currentSelectedBookData}
        />
      ) : null}

      <div className="container">
        <div className="page-header-2">
          <ul className="breadcrumb-2">
            <li>
              <Link href="/library">
                Library
                <BiChevronRight />
              </Link>
            </li>
            <li>{book.bk_title}</li>
          </ul>
          <div onClick={toggleDetails} className="back-btn text-base">
            <BiChevronLeft /> Back to Listing
          </div>
        </div>

        <div className="books-single row">
          <div className="books-single-wrapper col-lg-12">
            <div className="books-single-inner">
              <div className="books-single-top">
                <div className="col-md-12">
                  <div className="container">
                    <Image
                      fill
                      className="books-single-img w-100"
                      src={
                        book.bk_preview
                          ? `${IMAGE_URL}/${book.bk_preview}`
                          : sampleBookImage
                      }
                      alt={book.bk_name}
                    />
                  </div>
                </div>
                <div className="container">
                  <div className="bcol-md-12 ooks-single-top-cont">
                    <h2 className="mt-4 mb-4 book-single-title">
                      {book.bk_title}
                    </h2>

                    <ul className="genre-info">
                      <li>
                        <span>Publication: </span>
                        <strong>{book.bk_publisher}</strong>
                      </li>
                      <li>
                        <span>Author: </span>
                        <strong>{book.bk_author}</strong>
                      </li>
                      <li>
                        <p className="txt mt-3">{book.bk_description}</p>
                      </li>
                    </ul>
                    <div className="details__btn-grp">
                      {book.bk_epub ? (
                        <button
                          onClick={() => {
                            setEPubUrl(book.bk_epub)
                            setCurrentSelectedBookData(book)
                          }}
                          className="cmn--btn bg--title"
                        >
                          Read ePub
                        </button>
                      ) : (
                        <></>
                      )}
                      {book.bk_pdf && (
                        <Link
                          href="#"
                          className="cmn--btn bg--title"
                          onClick={() => {
                            setPdfFile(book.bk_pdf)
                            setCurrentSelectedBookData(book)
                          }}
                        >
                          Read Pdf
                        </Link>
                      )}

                      <Tooltip title="Share" arrow>
                        <Button
                          onClick={handleOpen}
                          style={{
                            marginLeft: '2%',
                            padding: '1% 1%',
                            cursor: 'pointer',
                          }}
                        >
                          <i
                            style={{
                              fontSize: '1.5rem',
                            }}
                            className="fa-solid fa-share mt-1"
                          ></i>
                        </Button>
                      </Tooltip>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '35%',
                            maxWidth: '300',
                            backgroundColor: 'white',
                            border: '1px solid #888',
                            padding: '20',
                          }}
                        >
                          <div
                            className="head"
                            style={{
                              textAlign: 'right',
                              backgroundColor: '#000',
                              height: '7vh',
                            }}
                          >
                            {/* <Tooltip title="Close" placement="right-start"> */}
                            <Button
                              className="mt-2"
                              varient="contained"
                              color="primary"
                              onClick={handleClose}
                            >
                              <i
                                style={{ color: 'white' }}
                                className="fa-solid fa-xmark"
                              ></i>
                            </Button>
                            {/* </Tooltip> */}
                          </div>
                          <Typography varient="h6" id="modal-title">
                            <div
                              className="row mt-5"
                              style={{
                                width: '95%',
                                height: '25vh',
                                marginLeft: '5%',
                              }}
                            >
                              <div className="col-md-4">
                                <Image
                                  // style={{ height: '90%', width: '90%' }}
                                  fill
                                  src={
                                    book.bk_preview
                                      ? `${IMAGE_URL}/${book.bk_preview}`
                                      : sampleBookImage
                                  }
                                  alt={book.bk_name}
                                />
                              </div>
                              <div className="mt-2 col-md-8">
                                <h6>E-Book</h6>
                                <h6 className="title">
                                  Topic:{' '}
                                  <span className="text-secondary">
                                    {book.bk_title}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </Typography>
                          <div className="mt-5" style={{ textAlign: 'center' }}>
                            <TextField
                              style={{
                                width: '80%',
                                marginBottom: '0%',
                                border: '1px solid black',
                                padding: '0% 2%',
                                textDecoration: 'none',
                              }}
                              id="outlined-multiline-flexible"
                              value={currentUrl}
                              multiline
                              maxRows={4}
                            />
                            <div
                              style={{ textAlign: 'center', marginLeft: '10%' }}
                            >
                              <hr style={{ width: '90%' }} />
                            </div>
                            <div className="container">
                              <div
                                className="row"
                                style={{
                                  textAlign: 'center',
                                  marginBottom: '3%',
                                }}
                              >
                                <Button
                                  className="col-md-6 copylink"
                                  onClick={copyToClipboard}
                                >
                                  <i
                                    className="fa-solid fa-copy"
                                    style={{ marginRight: '5px' }}
                                  ></i>
                                  Copy Link
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BooksSingle
