import { useState } from "react";
import Slider from "react-slick";
import banner_bg from "@/assets/images/banner/banner_bgdd.png";
import BannerContent from "./BannerContent";

const Banner = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <>
      <section className="banner-section overflow-hidden">
        <Slider
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
          // autoplay={true}
          fade={true}
          className="gallery-content"
        >
          <div>
            <div
              className="banner-item section-overlay"
              // style={{
              //   background: `url(${banner_bg}) no-repeat right`,
              // }}
            >
              <BannerContent
                title="Supporting the Transformation Agenda"
                subTitle="Experience round-the-clock interactive and quality live teaching and learning session on LMS at your comfort."
              />
            </div>
          </div>
        </Slider>
      </section>
    </>
  );
};

export default Banner;
