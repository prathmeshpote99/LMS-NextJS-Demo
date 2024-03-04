import { CgArrowLongRight } from 'react-icons/cg'
import { FaUserAlt } from 'react-icons/fa'
import { ImPriceTag } from 'react-icons/im'
import { Link } from 'react-router-dom'

const BlogCard = ({ className, img, title, text, id }) => {
  return (
    <div className={`post__item ${className}`}>
      <div className="post__item-img">
        <Link to={`/blog/${id}`}>
          <img src={img} alt="" />
        </Link>
      </div>
      <div className="post__item-content">
        <ul className="meta-post">
          <li>
            <FaUserAlt /> By Admin
          </li>
          <li>
            <ImPriceTag /> Virtual Class
          </li>
        </ul>
        <h5 className="title">
          <Link to={`/education-forum/${id}`}>{title}</Link>
        </h5>
        <p>{text}</p>
        <Link to={`/education-forum/${id}`} className="blog-link">
          <CgArrowLongRight />
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
