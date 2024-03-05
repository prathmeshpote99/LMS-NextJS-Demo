import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

export const InvalidTokenMessage = () => {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(false)
  useEffect(() => {
    const invalidToken = router.query.invalidToken
    setShowMessage(!!invalidToken)
  }, [router.query])

  const handleLogin = () => {
    setShowMessage(false)

    const { invalidToken, ...query } = router.query
    router.push({
      pathname: router.pathname,
      query,
    })
  }

  if (!showMessage) return <></>

  const isOpen = true
  return (
    <Modal
      isOpen={isOpen}
      size="md"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="tutorModal"
      tabIndex="-1"
      toggle={handleLogin}
    >
      <ModalHeader toggle={handleLogin}>Security Alert</ModalHeader>
      <ModalBody>
        <div className="container mt-3 mb-2">
          <div className="row text-center">
            <p>
              We've noticed alterations in your account information.
              <br />
              As a security measure, please log in again to your account.
            </p>
          </div>
          <div className="row d-flex justify-content-center mt-4">
            <button
              className="cmn--btn w-25 py-2 text-white font_bold rounded border_none text-decoration-none text-center linear_gradient px-4 mx-1"
              onClick={handleLogin}
            >
              Ok
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
