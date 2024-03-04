import { Field } from 'formik'
import { useState } from 'react'
import { BsEyeSlashFill, BsFillEyeFill } from 'react-icons/bs'

const PasswordInput = ({
  errors,
  touched,
  placeholder,
  name,
  isStyled,
  className,
}) => {
  const [visible, setVisible] = useState(true)

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
    }
  }

  return (
    <>
      <Field
        className={`form-control ${isStyled ? className : ''} ${
          errors && touched ? 'form-err' : ''
        }`}
        type={visible ? 'password' : 'text'}
        name={name}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <span
        className="icon"
        style={{ cursor: `pointer` }}
        onClick={() => setVisible(!visible)}
      >
        {visible ? <BsFillEyeFill /> : <BsEyeSlashFill />}
      </span>
      {errors && touched ? <div className="form-err-msg">{errors}</div> : null}
    </>
  )
}

export default PasswordInput
