import join__data from '@/assets/images/data/join-us'
import join__bg from '@/assets/images/join/join-bg.png'

const WhoJoin = () => {
  return (
    <section
      className="who-can-join-section mt-5 section-overlay"
      style={{
        background: `url(${join__bg}) no-repeat center center / cover`,
      }}
    >
      <div className="text-center btn-upper">
        <a href="/auth/signup">
          <span className="cmn--btn btn-lg">Start, Here and Now </span>
        </a>
      </div>
      <div className="container py-5">
        <div className="row gy-4 gx-0 join-wrapper">
          {join__data &&
            join__data.map(({ img, title }, i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <div className="join__item">
                  <img src={img} alt="" />
                  <div>{title}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default WhoJoin
