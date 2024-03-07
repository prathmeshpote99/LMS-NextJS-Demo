import Link from 'next/link'
import { IMAGE_URL } from '../../helpers/urlHelper'

const BookItem = ({
  bk_preview,
  bk_title,
  bk_id,
  isInLibrary,
  bk_price,
  bk_isFree,
  toggleDetails,
}) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-6 col-xl-3">
      <div className="bg-white library__item">
        <div className="library__item-img">
          <img
            className="cursor-pointer"
            src={`${IMAGE_URL}/${bk_preview}`}
            alt=""
            onClick={() => toggleDetails(bk_id)}
          />
        </div>
        <div
          className="library__item-cont cursor-pointer"
          onClick={() => toggleDetails(bk_id)}
        >
          {bk_title}
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div className="text-base">
            {bk_isFree ? (
              <span className="text-green">Free</span>
            ) : (
              `$${bk_price}`
            )}
          </div>
          <Link
            to={`#`}
            className="details-btn"
            onClick={() => toggleDetails(bk_id)}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BookItem
