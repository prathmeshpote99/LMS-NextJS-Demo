import { useState } from 'react'
import { AiFillCaretRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const CategoryItem = ({ title, link, sub_category }) => {
  const [subCate, setSubCate] = useState(false)

  return (
    <li>
      <Link to={link} onClick={() => setSubCate(!subCate)}>
        <span>{title}</span>
        {sub_category && (
          <span className={subCate && 'icon-rotate'}>
            <AiFillCaretRight />
          </span>
        )}
      </Link>
      {sub_category ? (
        <ul className={`${!subCate && 'd-none'} sub-cate`}>
          {sub_category.map(({ title, link }, i) => (
            <li key={i}>
              <Link to={link}>{title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </li>
  )
}

export default CategoryItem
