import alarm from '@/assets/images/training/alarm.png'
import tModule3_Img from '@/assets/images/training/education.png'
import tModule4_Img from '@/assets/images/training/empower.png'
import tModule1_Img from '@/assets/images/training/ict.png'
import tModule2_Img from '@/assets/images/training/learning.png'
import icon_img from '@/assets/images/training/online-education.png'
import icon_img2 from '@/assets/images/training/online-education1.png'
import rectangle from '@/assets/images/training/rectangle.png'
import Image from 'next/image'


const TrainingModule = () => {
  return (
    <>
      <section className="containr-fluid pt-70 pb-100">
        <div className="container">
          <div className="section-header">
            <h3>
              <b>Training Module</b>
            </h3>
          </div>
          <div className="row module mt-4">
            <div className="iCol col-sm-3 mb-3">
              <div className="card tCard">
                <Image
                  className="card-img-top img-fluid imG"
                  src={tModule1_Img}
                  alt="Card cap"
                />
                <Image
                  className="card-img-top img-fluid icon_imG"
                  src={icon_img}
                  alt="Card cap"
                  priority
                />
                <div className="blackline_div"></div>
                <div className="card-block">
                  <div className="inner_div" style={{ textAlign: 'right' }}>
                    <Image className="alarm" src={alarm} alt="" />
                    <span style={{ marginLeft: '8%', color: 'white' }}>
                      2 Hours
                    </span>
                  </div>
                  <p className="card-text cParagraph">
                    Information Communicatipon Technology (ICT) Skills
                    Application For Teachers.
                  </p>
                </div>
              </div>
            </div>
            <div className="iCol col-sm-3 mb-3">
              <div className="card tCard">
                <Image
                  className="card-img-top img-fluid imG"
                  src={tModule2_Img}
                  alt="Card  cap"
                />
                <Image
                  className="card-img-top img-fluid icon_imG2"
                  src={icon_img2}
                  alt="Card cap"
                  priority
                />
                <div className="blackline_div"></div>
                <div className="card-block">
                  <div className="inner_div" style={{ textAlign: 'right' }}>
                    <Image className="alarm" src={alarm} alt="" />
                    <span style={{ marginLeft: '8%', color: 'white' }}>
                      1 Hr 30 min
                    </span>
                  </div>
                  <p className="card-text cParagraph">
                    21st Century Learning Design.
                  </p>
                </div>
              </div>
            </div>
            <div className="iCol col-sm-3 mb-3">
              <div className="card tCard">
                <Image
                  className="card-img-top img-fluid imG"
                  src={tModule3_Img}
                  alt="Card cap"
                />
                <Image
                  className="card-img-top img-fluid icon_imG2"
                  src={icon_img2}
                  alt="Card  cap"
                  priority
                />
                <Image className="icon_imGR" src={rectangle} alt="Card cap" />
                <p className="new">NEW</p>
                <div className="blackline_div"></div>
                <div className="card-block">
                  <div className="inner_div" style={{ textAlign: 'right' }}>
                    <Image className="alarm" src={alarm} alt="" />
                    <span style={{ marginLeft: '8%', color: 'white' }}>
                      1 Hr 30 min
                    </span>
                  </div>
                  <p className="card-text cParagraph">
                    Microsoft Educator Academy.
                  </p>
                </div>
              </div>
            </div>
            <div className="iCol col-sm-3 mb-3">
              <div className="card tCard">
                <Image
                  className="card-img-top img-fluid imG"
                  src={tModule4_Img}
                  alt="Card cap"
                />
                <Image
                  className="card-img-top img-fluid icon_imG"
                  src={icon_img}
                  alt="Card cap"
                  priority
                />
                <Image className="icon_imGR" src={rectangle} alt="Card cap" />
                <p className="new">NEW</p>
                <div className="blackline_div"></div>
                <div className="card-block">
                  <div className="inner_div" style={{ textAlign: 'right' }}>
                    <Image className="alarm" src={alarm} alt="" />
                    <span style={{ marginLeft: '8%', color: 'white' }}>
                      1 Hr 30 min
                    </span>
                  </div>
                  <p className="card-text cParagraph">
                    Empower every student with an inclusive classroom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TrainingModule
