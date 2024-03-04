import { FaSearch } from 'react-icons/fa'

const Search = () => {
  return (
    <div className="widget">
      <h5 className="subtitle">Search</h5>
      <div className="input--group">
        <input
          className="form-control"
          type="text"
          placeholder="Find Your Course"
        />
        <button className="icon border-0" type="submit">
          <FaSearch />
        </button>
      </div>
    </div>
  )
}

export default Search
