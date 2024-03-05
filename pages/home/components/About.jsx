import { useContext } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs'
import Link from 'next/link'
import about_bg from '@/assets/images/about-bg.png'
import aboutCardData from '@/assets/images/data/about'
import { AuthContext } from '@/contexts/AuthContext'
import AboutCard from './AboutCard'

const About = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <section
        className="about-section pt-100 pb-100 mb-5"
        style={{
          background: `url(${about_bg}) no-repeat center center /cover`,
        }}
      >
        <div className="container">
          <div className="about-content ms-auto">

            <h2 className="title">Complete Resource Center</h2>
            <p>
              Get Access To Past Questions From WAEC, JAMB, NECO and GCE. Buy
              E-books And Other Resourceful Learning Materials. Use Connect To
              Communicate With Other Learners As Well As Facilitators. Have All
              Your Resource Materials Saved And Always Available For Referral.
            </p>
            {isLoggedIn ? (
              <Link href="/about" className="cmn--btn">
                Read More <BsArrowRightCircle />
              </Link>
            ) : (
              <Link href="/auth/signin" className="cmn--btn">
                Sign In <BsArrowRightCircle />
              </Link>
            )}
          </div>
        </div>
      </section>
      <div className="about-card-wrapper">
        <div className="container">
          <div className="row g-4 gx-xxl-5">
            {aboutCardData &&
              aboutCardData.map(({ icon, title, btnLink, text }, i) => (
                <div className="col-lg-6" key={i}>
                  <AboutCard
                    icon={icon}
                    title={title}
                    text={text}
                    btnLink={btnLink}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default About
