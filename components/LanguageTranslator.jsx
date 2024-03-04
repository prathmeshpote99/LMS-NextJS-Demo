import languages from '../assets/images/icons/languages.png'
import { useEffect, useRef } from 'react'

const LanguageTranslator = () => {
  const socialIconRef = useRef(null)

  useEffect(() => {
    if (!socialIconRef.current) return

    // Setting the html
    socialIconRef.current.innerHTML = `
      <select name="cars" id="cars" onchange="changeFunc(value);" className="notranslate" translate="no">
        <option className="notranslate" value="1" Selected>
          <a
            href="#"
            title="English"
            className="nturl"
            style="background-position: -0px -0px"
            ><span className="btn notranslate h7 "
              >English</span
          ></a
        ></option>
        <option className="notranslate" value="2">
          <a
            href="#"
            onclick="doGTranslate('en|fr');return false;"
            title="French"
            className="nturl"
            style="background-position: -100px -400px"
            ><span className="btn notranslate h7 "
              >French</span
          ></a
        ></option>
        <option className="notranslate" value="3">
          <a
            href="#"
            onclick="doGTranslate('en|pt');return false;"
            title="Portuguese"
            className="nturl"
            style="background-position: -500px -200px"
            ><span className="btn notranslate h7"
              >Portuguese</span
          ></a
        ></option>
      </select>
      `
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center">
      <img className="language-img" src={languages} alt="" />
      <li
        id="social-icons"
        className="d-flex bg-transparent justify-content-center align-items-center languages-select"
        ref={socialIconRef}
      ></li>
    </div>
  )
}

export default LanguageTranslator
