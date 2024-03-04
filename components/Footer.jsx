import { FaInstagram, FaPhoneAlt } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router-dom'
import footer__bg from '../assets/images/banner/EM_s.png'
import ISO_Mark from '../assets/images/logo/ISO.png'
import footer_logo from '../assets/images/logo/KATON_LOGO_WHITE.png'

const Footer = () => {
  return (
    <>
      <footer
        className="section-overlay"
        style={{
          background: `url(${footer__bg}) no-repeat center center / cover`,
        }}
      >
        <div className="container">
          <div className="footer-wrapper">
            <div className="footer-widget widget-about">
              <Link to="/" className="footer-logo">
                <img src={footer_logo} alt="" />
              </Link>
            </div>
            <div className="footer-widget widget-links">
              <Link to="/fcontact_us">
                <h6 className="subtitle">Contact Us</h6>
              </Link>
              <ul className="adress">
                <li>
                  <span className="map-icon">
                    <IoMdMail />
                  </span>
                  <a
                    href="mailto:info@lmsgh.net"
                    target="_blank"
                    rel="noreferrer"
                  >
                    info@lmsgh.net
                  </a>
                </li>
                <li>
                  <span className="map-icon">
                    <FaPhoneAlt />
                  </span>
                  <a href="tel:0800790555" target="_blank" rel="noreferrer">
                    Toll Free: 0800790555
                    <br />
                    <a
                      href="tel:+253509803458"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="tel">Mobile: +233 509803458</span>
                    </a>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-widget widget-links">
              <a
                href="https://katcare.net/#contact"
                target="_blank"
                rel="noreferrer"
              >
                <h6 className="subtitle">KATCare</h6>
              </a>
            </div>
            <div className="footer-widget widget-links">
              <Link to="/faq">
                <h6 className="subtitle">FAQ</h6>
              </Link>
            </div>
            <div className="footer-widget widget-links">
              <Link to="/terms-of-use">
                <h6 className="subtitle">T&C</h6>
              </Link>
            </div>
            <div className="footer-widget widget-address">
              <Link to="/privacy-policy">
                <h6 className="subtitle">Privacy Policy</h6>
              </Link>
              <div className="follow-us-of">
                {/* <h6 className="f-subtitle">Follow us on</h6> */}
                <ul className="footer-social">
                  <li>
                    <a
                      href="https://www.facebook.com/katongh"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/kat.ongh?igshid=YmMyMTA2M2Y="
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/kat.ongh?igshid=YmMyMTA2M2Y="
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <img className="iso_mark" src={ISO_Mark} alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        {/* &copy; Powered by TLMS GLOBAL {new Date().getFullYear()}. All rights Reserved. */}
        Powered by <b>TLMS GLOBAL</b>. All rights Reserved.
      </div>
    </>
  )
}

export default Footer
