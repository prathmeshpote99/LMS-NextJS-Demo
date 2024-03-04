import Footer from './Footer'
import PageHeader from './PageHeader'

import { Outlet } from 'react-router-dom'

const Layout = ({
  pageTitle,
  parentTitle,
  img,
  children,
  parentTitleLink,
  currentPageMenu,
}) => {
  return (
    <>
      {/* <Header /> */}
      {pageTitle && (
        <PageHeader
          img={img}
          title={pageTitle}
          parentTitle={parentTitle}
          parentTitleLink={parentTitleLink}
          currentPageMenu={currentPageMenu}
        />
      )}
      {children}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
