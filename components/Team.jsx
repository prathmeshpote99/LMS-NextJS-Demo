import { Link } from 'react-router-dom'
import team__data from '../assets/images/data/team'
import SectionHeader from './SectionHeader'

const Team = ({ classes }) => {
  return (
    <section className={`training-program pt-100 pb-100 `}>
      <div className="container">
        <SectionHeader title="Recommended by Experienced Facilitators" />
        {/* team_card */}
        <div className=" row row-cols-4 ">
          {team__data &&
            team__data.map(({ title, designation, img }, i) => (
              <div className="team__card-img">
                <Link to="/#">
                  <img src={img} alt="" />
                </Link>
                <div className="team__card-content">
                  <h6>{title}</h6>
                  <span>{designation}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Team
