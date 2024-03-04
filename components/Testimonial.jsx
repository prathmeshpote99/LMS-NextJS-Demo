import { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'
import testimonial from '../assets/images/data/testimonial'
import prevImage from '../assets/images/slider/left.png'
import nextImage from '../assets/images/slider/right.png'

const Testimonial = () => {
  const [index, setIndex] = useState(0)
  const { text, rating, title } = testimonial[index]

  const handleIndex = (e) => {
    if (index === 0) {
      setIndex(1)
    } else if (index === testimonial.length - 1) {
      setIndex(testimonial.length - 2)
    } else {
      setIndex(e)
    }
  }
  const handleIndexNext = (e) => {
    if (index === testimonial.length - 1) {
      setIndex(0)
    } else {
      setIndex(e)
    }
  }
  const handleIndexPrev = (e) => {
    if (index === 0) {
      setIndex(testimonial.length - 1)
    } else {
      setIndex(e)
    }
  }

  return (
    <section className="testimonial-section pt-100 pb-100 bg-white">
      <div className="container">
        <h2 className="testimonial-title mb-3">Testimonials</h2>
        <div className="testimonial-wrapper"></div>
        <div className="row gy-4">
          <div className="col-lg-4">
            {testimonial &&
              testimonial.map((client, i) => (
                <div
                  className={`avatar__item ${index === i && 'active'}`}
                  key={i}
                  onClick={() => handleIndex(i)}
                >
                  <div className="avatar__item-img">
                    <img src={client.img} alt="" />
                  </div>
                  <div className="avatar__item-content">
                    <h5 className="avatar__item-title">{client.name}</h5>
                    <span className="designation">{client.designation}</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-lg-8">
            <div className="testimonial-area">
              <h4 className="title">{title}</h4>
              <div>{text && text.map((txt, i) => <p key={i}>{txt}</p>)}</div>
              <div className="rating">
                {rating >= 1 ? (
                  <BsStarFill />
                ) : (
                  <BsStarFill className="invalid-rating" />
                )}
                {rating >= 2 ? (
                  <BsStarFill />
                ) : (
                  <BsStarFill className="invalid-rating" />
                )}
                {rating >= 3 ? (
                  <BsStarFill />
                ) : (
                  <BsStarFill className="invalid-rating" />
                )}
                {rating >= 4 ? (
                  <BsStarFill />
                ) : (
                  <BsStarFill className="invalid-rating" />
                )}
                {rating >= 5 ? (
                  <BsStarFill />
                ) : (
                  <BsStarFill className="invalid-rating" />
                )}

                <ul className="nav--btns d-flex flex-wrap">
                  <li
                    className="bg-white"
                    onClick={() => handleIndexPrev(index - 1)}
                  >
                    <img src={prevImage} alt="" />
                  </li>
                  <li
                    className="bg-white"
                    onClick={() => handleIndexNext(index + 1)}
                  >
                    <img src={nextImage} alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
