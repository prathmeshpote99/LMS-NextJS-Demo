import feature_bg from "@/assets/images/banner/Comp.png";
import feature from "@/assets/images/banner/ConnectTranspt.png";
import Image from "next/image";
// import sneek from "./SneakPeek.module.css";

const Feature = () => {
  return (
    <>
      <div className="feature-section">
        <div
          className="feature-bg section-overlay"
          // style={{
          //   background: `url(${feature_bg}) no-repeat center center / cover`,
          // }}
        ></div>
        <div className="container position-relative mb-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="feature-content pt-100 pb-100">
                <h3 className="title pt-5 mt-5">
                  <b>Product Sneak Peek</b>
                </h3>
                <ul className="product_list feature_area">
                  <li>
                    <span className="title_peek">
                      <b>Library -</b>
                      <span style={{ color: "white", textAlign: "justify" }}>
                        Access a wealth of educational materials ranging from
                        syndicated videos, languages, course materials, and
                        Edu-social programs to support you.
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="title_peek">
                      <b>Practice -</b>
                      <span style={{ color: "white", textAlign: "justify" }}>
                        Teachers can evaluate students' progress in the
                        assignment section. Likewise, students have access to a
                        wide pool of past questions and self-assessments to
                        build their confidence in their ability to tackle
                        different types of questions.
                      </span>
                    </span>
                  </li>

                  <li>
                    <span className="title_peek">
                      <b>LMS Connect -</b>
                      <span style={{ color: "white", textAlign: "justify" }}>
                        Facilitates prompt assistance for academics from
                        teachers while fostering social connections among
                        students.
                      </span>
                    </span>
                  </li>
                  <li>
                    <span className="title_peek">
                      <b>Offline Tution -</b>
                      <span style={{ color: "white", textAlign: "justify" }}>
                        LMS offline tuition makes education balanced and equal
                        for all students without internet access where knowledge
                        is still impacted to them.
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div>
                <Image
                  className="pt-5"
                  src={feature}
                  alt=""
                  style={{ width: "80%", height: "80%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feature;
