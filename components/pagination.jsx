import { useEffect, useState } from 'react'
import Link from 'next/link'

const Pagination = ({
  limit,
  totalLimit,
  totalPosts,
  bookCount,
  paginate,
  currentPage,
  apiCurrentPage,
  setApiCurrentPage,
  handleNextBookChange,
  pageNumbers,
  handlePrevBookChange,
}) => {
  const [slicedPageNumbers, setSlicedPageNumbers] = useState([])
  const [selectedCurrentPageIndex, setSelectedCurrentPageIndex] = useState(0)

  // 1 = next , 2 = previous
  const offset = 10
  const totalPages = Math.ceil(bookCount / totalLimit)
  const hasNextPage = apiCurrentPage < totalPages
  const hasPreviousPage = apiCurrentPage === 1

  useEffect(() => {
    if (pageNumbers.length > 0) {
      setPageOffset(apiCurrentPage)
    }
  }, [pageNumbers])

  const setPageOffset = (apiCurrentPage) => {
    const startIndex = (apiCurrentPage - 1) * offset
    const endIndex = startIndex + offset
    const slicedPageNumbers = pageNumbers.slice(startIndex, endIndex)
    setSlicedPageNumbers(slicedPageNumbers)
  }

  const setSelectedPageNumber = (apiCurrentPage) => {
    const startIndex = apiCurrentPage * offset
    paginate(startIndex + 1)
  }

  const setSelectedPageNumberForPrev = (apiCurrentPage) => {
    const startIndex = apiCurrentPage * offset - offset
    paginate(startIndex + 1)
  }
  return (
    <nav>
      <ul className="pagination mb-0">
        <li className="page-item">
          <Link
            className={`page-link ${hasPreviousPage ? 'nextPageDisable' : ''}`}
            onClick={() => {
              if (!hasPreviousPage) {
                setPageOffset(apiCurrentPage - 1)
                handlePrevBookChange()
                setApiCurrentPage(apiCurrentPage - 1)
                setSelectedPageNumberForPrev(apiCurrentPage - 1)
              }
            }}
            href="#"
          >
            {'<<'}
          </Link>
        </li>
        <li className="page-item">
          <Link
            onClick={() => {
              paginate(currentPage - 1)
              setSelectedCurrentPageIndex(selectedCurrentPageIndex - 1)
            }}
            href="#"
            className={`page-link ${
              selectedCurrentPageIndex === 0 ? 'nextPageDisable' : ''
            }`}
          >
            {'<'}
          </Link>
        </li>
        {slicedPageNumbers.map((number, i) => (
          <>
            <li key={number} className="page-item">
              <Link
                onClick={() => {
                  paginate(number)
                  setSelectedCurrentPageIndex(i)
                }}
                href="#"
                className={`page-link pagination-btn ${
                  currentPage === number ? 'currentPageSelected' : ''
                }`}
              >
                {number}
              </Link>
            </li>
          </>
        ))}
        <li className="page-item">
          <Link
            className={`page-link ${
              selectedCurrentPageIndex === slicedPageNumbers.length - 1
                ? 'nextPageDisable'
                : ''
            }`}
            onClick={() => {
              paginate(currentPage + 1)
              setSelectedCurrentPageIndex(selectedCurrentPageIndex + 1)
            }}
            href="#"
          >
            {'>'}
          </Link>
        </li>
        <li className="page-item">
          <Link
            className={`page-link ${hasNextPage ? '' : 'nextPageDisable'}`}
            onClick={() => {
              if (hasNextPage) {
                handleNextBookChange(
                  '',
                  '',
                  '',
                  '',
                  '',
                  apiCurrentPage + 1,
                  totalLimit,
                )
                setApiCurrentPage(apiCurrentPage + 1)
                setSelectedPageNumber(apiCurrentPage)
              }
            }}
            href="#"
          >
            {'>>'}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
