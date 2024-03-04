const PageHeader = ({
  title,
  img,
  parentTitle,
  parentTitleLink,
  currentPageMenu,
}) => {
  return (
    <section
      className="page-header"
      style={{ background: `url(${img}) no-repeat center center / cover` }}
    >
      <div className="container">
        <h1 className="title">{title}</h1>
      </div>
    </section>
  )
}

export default PageHeader
