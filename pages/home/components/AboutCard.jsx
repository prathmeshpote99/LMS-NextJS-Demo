import { BsArrowRightCircle } from 'react-icons/bs'
import Link from 'next/link'

const AboutCard = ({ icon, title, btnLink, text }) => {
  return (
    <div className="aboutCard">
      <div className="aboutCard__icon">{icon}</div>
      <div className="aboutCard__content">
        <h4 className="title">{title}</h4>
        <p>{text}</p>
        <Link href={btnLink}>
          Read More <BsArrowRightCircle />
        </Link>
      </div>
    </div>
  )
}

export default AboutCard
