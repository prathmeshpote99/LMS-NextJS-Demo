import { useState } from 'react'
import { BsCalendarWeek, BsPeople } from 'react-icons/bs'
import { FaPaperPlane } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Link from 'next/link'
import comments from '../../assets/images/data/comments'
import contact_social from '../../assets/images/data/contact_social'
import img1 from '../../assets/images/event/2.png'
import img2 from '../../assets/images/event/3.png'
import Sidebar from '../../components/sidebar/Sidebar'
import './BlogSingle.scss'

const BlogSingle = () => {
  const { img, date, title, txt } = useParams()
  const [remember, setRemember] = useState(true)

  return (
    <section className="pt-100 pb-100">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="training-programe-details">
              <div className="top-img">
                <img src={img} alt="" />

                <div className="event-meta d-flex align-items-center mb-4">
                  <span>
                    <BsPeople /> Admin
                  </span>
                  <span className="d-flex align-items-center">
                    <BsCalendarWeek /> {date}
                  </span>
                </div>
              </div>
              <h3 className="title">{title}</h3>
              <p>{txt}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut
                enim ad minim ven iam quis nostrud xerci tation ulla mco laboris
                nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tem incid idunt ut labore
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut
                enim ad minim ven iam quis nostrud xerci tation ulla mco laboris
                nisi ut
              </p>
              <ul className="visual-list mb-4">
                <li>
                  <h6>Visual Learning with theory</h6>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tem incid idunt ut labore et dolore magna aliqua.
                    Ut enim ad minim ven iam quis nostrud
                  </div>
                </li>
                <li>
                  <h6>Layton Basic Logical Program</h6>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tem incid idunt ut labore et dolore magna aliqua.
                    Ut enim ad minim ven iam quis nostrud
                  </div>
                </li>
                <li>
                  <h6>Error resolution and implementation</h6>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tem incid idunt ut labore et dolore magna aliqua.
                    Ut enim ad minim ven iam quis nostrud
                  </div>
                </li>
              </ul>
              <div className="row g-2 g-sm-4 mb-4">
                <div className="col-6">
                  <img className="w-100" src={img1} alt="" />
                </div>
                <div className="col-6">
                  <img className="w-100" src={img2} alt="" />
                </div>
              </div>
              <p className="mt-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tem incid idunt ut labore et dolore magna aliqua. Ut
                enim ad minim ven iam quis nostrud xerci tation ulla mco laboris
                nisi ut Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tem incid idunt ut labore
              </p>
              <div className="tags-area">
                <div className="tags">
                  <h6>Tags</h6>
                  <ul>
                    <li>
                      <Link to="#">Admission</Link>
                    </li>
                    <li>
                      <Link to="#">Research</Link>
                    </li>
                  </ul>
                </div>
                <div className="share">
                  <h6>Share</h6>
                  <ul className="contact-social">
                    {contact_social &&
                      contact_social.map(({ id, icon, link }, i) => (
                        <li key={i}>
                          <Link to={link} key={i}>
                            {icon}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <hr className="contact-hr" />
              <div className="comments-list">
                <h3 className="comment-title">02 Comments</h3>
                <ul className="comments-list-items">
                  {comments &&
                    comments.map(({ user, name, date, txt }, i) => (
                      <li key={i}>
                        <img src={user} alt={name} />
                        <div className="cont">
                          <div className="top">
                            <div>
                              <h5 className="name">{name}</h5>
                              <span className="date">{date}</span>
                            </div>
                            <Link to="#" className="cmn--btn">
                              Reply
                            </Link>
                          </div>
                          <p>{txt}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <hr className="contact-hr" />
              <div className="leave-comments">
                <h3 className="comment-title">Leave a Reply</h3>
                <div>Your email address will not be published.</div>
                <div className="row g-3 mt-2">
                  <div className="col-12">
                    <textarea
                      className="form-control pt-3 ps-4"
                      placeholder="Comment"
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Save my name, email, and website in this browser for the
                        next time I comment.
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="cmn--btn">
                      Post a Comment <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSingle
