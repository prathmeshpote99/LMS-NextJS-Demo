import { useState } from 'react'
import SweetPagination from 'sweetpagination'

function PaginatedItems({
  data,
  itemsPerPage,
  ItemName,
  getMyLibraryBooks,
  toggleDetails,
  handleNextBookChange,
  currentPage,
  setCurrentPage,
  limit,
}) {
  const [currentPageData, setCurrentPageData] = useState([])
  return (
    <>
      {currentPageData &&
        currentPageData.map((item, i) => (
          <ItemName
            toggleDetails={toggleDetails}
            getMyLibraryBooks={getMyLibraryBooks}
            key={i}
            {...item}
          />
        ))}
      <div className="pagination-items d-flex justify-content-end">
        <SweetPagination
          currentPageData={setCurrentPageData}
          getData={data}
          dataPerPage={itemsPerPage}
          navigation={true}
          getStyle={'pagination'}
        />
      </div>
    </>
  )
}

export default PaginatedItems
