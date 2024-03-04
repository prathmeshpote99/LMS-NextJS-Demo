import category_list from '../../assets/images/data/category'
import CategoryItem from './CategoryItem'
const CategoryList = () => {
  return (
    <div className="widget">
      <h5 className="subtitle">Category List</h5>
      <ul className="list">
        {category_list &&
          category_list.map((item, i) => <CategoryItem key={i} {...item} />)}
      </ul>
    </div>
  )
}

export default CategoryList
