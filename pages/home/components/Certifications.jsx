import certification_img from "@/assets/images/banner/Frame.png";
import Image from "next/image";

const Certifications = () => {
  return (
    <section>
      <div className="section-header certification_title mt-5">
        {" "}
        <h3>
          <b>Partners & Certifications</b>
        </h3>
      </div>
      <div className="container" style={{ textAlign: "center" }}>
        <Image className="img-fluid" src={certification_img} alt="" />
      </div>
    </section>
  );
};

export default Certifications;
