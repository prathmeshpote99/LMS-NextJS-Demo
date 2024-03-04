import React, { useState } from 'react'
import {
  FaBars,
  FaFacebook,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
} from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { SiGooglemaps } from 'react-icons/si'
import menu from './assets/images/data/menu'

import logo from './assets/images/logo.png'
import katon_logo from './assets/images/katon_logo.png'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-evenly justify-content-lg-between">
            <ul className="contact-links">
              <li>
                <a href="/#">
                  <SiGooglemaps />
                  <span>Tel: +65 6694 0020</span>
                </a>
              </li>
              <li>
                <a href="/#">
                  <IoMdMail />
                  <span>youremail@gmail.cp,</span>
                </a>
              </li>
              <li>
                <a href="/#">
                  <FaPhoneAlt />
                  <span>38 Irrawaddy Rd, Campala, Africa 329563</span>
                </a>
              </li>
            </ul>
            <ul className="header-social-icons">
              <li>
                <a href="/#">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/kat.ongh?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-bottom bg--title">
        <div className="container">
          <div className="header-wrapper">
            <a href="/#" className="logo">
              <img src={katon_logo} alt="" />
            </a>
            <div
              className="nav-toggle d-lg-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </div>
            <ul className={`menu ${menuOpen ? 'show-mobile-menu' : ''}`}>
              {menu &&
                menu.map(({ text, link }, i) => (
                  <li key={i}>
                    <a href="/#">{text}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
