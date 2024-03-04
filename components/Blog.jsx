import React from 'react'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import blog__data from '../assets/images/data/blog'
import prevImage from '../assets/images/slider/left.png'
import nextImage from '../assets/images/slider/right.png'
import BlogCard from './BlogCard'
import SectionHeader from './SectionHeader'

const Blog = () => {
  const [swiper, setSwiper] = React.useState(null)

  const nexto = () => {
    swiper.slideNext()
  }
  const prev = () => {
    swiper.slidePrev()
  }
  return (
    <>
      <section className="blog-section pt-100 pb-100">
        <div className="container">
          <SectionHeader subtitle="Education Forum" title="Latest Posts" />
          <Swiper
            onSwiper={(s) => {
              setSwiper(s)
            }}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {blog__data &&
              blog__data.map((blog, i) => (
                <SwiperSlide key={i}>
                  <BlogCard {...blog} key={i} />
                </SwiperSlide>
              ))}
          </Swiper>
          <ul className="nav--btns d-flex flex-wrap justify-content-end">
            <li onClick={prev}>
              <img src={prevImage} alt="" />
            </li>
            <li onClick={nexto}>
              <img src={nextImage} alt="" />
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Blog
