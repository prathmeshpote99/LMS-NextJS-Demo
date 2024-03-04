import CategoryList from './CategoryList'
import RelatedPost from './RelatedPost'
import './Sidebar.scss'
const Sidebar = () => {
  return (
    <aside>
      <CategoryList />
      <RelatedPost />
    </aside>
  )
}

export default Sidebar
