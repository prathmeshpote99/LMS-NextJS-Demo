const SectionHeader = ({
  className,
  subtitle,
  title,
  leftalign,
  text,
  redBorder = true,
}) => {
  const style = {
    marginBottom: '95px',
  }

  return (
    <div
      style={style}
      className={`section-header mb-5 ${leftalign ? 'text-start ms-0' : ''} ${
        className && className
      }`}
    >
      {subtitle && <h5 className="subtitle">{subtitle}</h5>}
      <h3 className={`${redBorder && 'title'}`}>{title}</h3>
      {text && <p className="mt-3">{text}</p>}
    </div>
  )
}

export default SectionHeader
