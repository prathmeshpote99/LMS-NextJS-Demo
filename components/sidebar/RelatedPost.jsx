import { FaTag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import related_posts from '../../assets/images/data/related_post'

const RelatedPost = () => {
  return (
    <div className="widget">
      <h5 className="subtitle">Related Post</h5>
      <ul className="related-posts">
        {related_posts &&
          related_posts.map(({ id, img, title, tags }, i) => (
            <li key={i}>
              <Link to={`/education-forum/${id}`}>
                <img src={img} alt={title} />
                <div className="content">
                  <h5>{title}</h5>
                  <span>
                    <FaTag /> {tags}
                  </span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default RelatedPost
