const BannerContent = (props) => {
  return (
    <div className="container">
      <div className="banner-content">
        <h1 className="title">{props.title}</h1>
        <p className="txt">{props.subTitle}</p>
      </div>
    </div>
  )
}

export default BannerContent
