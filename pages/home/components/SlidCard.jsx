import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
// import './StudentExpe.css'

const SlidCard = () => {
  const [value, setValue] = React.useState(5);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <GrNext color="black" />,
    prevArrow: <GrPrevious color="black" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="containr-fluid pt-70 pb-100 bg-section-light">
      <div className="container">
        <div className="section-header">
          <h3>
            <b>Students Experience</b>
          </h3>
        </div>
        <div>
          <Slider {...settings}>
            <div className="card expeCard">
              <Typography
                className="card-text p-3 typography "
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "It is easy to access and has very useful content to improve the
                understanding of students"
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Pentecost Senior High</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
            <div className="card expeCard">
              <Typography
                className="p-3 typography"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "It is easy to access and has very useful content to improve the
                understanding of studets."
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Accra Senior High</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
            <div className="card expeCard">
              <Typography
                className="p-3 typography"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "I like everything about it, especially how it's been able to
                make learning interesing and effective"
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Abomosu Stem</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
            <div className="card expeCard">
              <Typography
                className="p-3 typography"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "It is easy to access and has very useful content to improve the
                understanding of students"
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Pentecost Senior High</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
            <div className="card expeCard">
              <Typography
                className="p-3 typography"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "It is easy to access and has very useful content to improve the
                understanding of students"
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Pentecost Senior High</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
            <div className="card expeCard">
              <Typography
                className="p-3 typography"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                "It is easy to access and has very useful content to improve the
                understanding of students"
              </Typography>
              <div className="mt-2 mb-3" style={{ textAlign: "right" }}>
                <Typography variant="body2" color="black" component="span">
                  <small className="name">
                    <b>Pentecost Senior High</b>
                  </small>
                  <Box
                    sx={{
                      "& > legend": { mt: 2 },
                    }}
                  ></Box>
                  <Rating
                    readOnly
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <svg
                    style={{
                      height: "3%",
                      width: "6%",
                      marginTop: "-15px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="ghana"
                  >
                    <path fill="#ffda44" d="M0 85.337h512v341.326H0z"></path>
                    <path fill="#d80027" d="M0 85.337h512v113.775H0z"></path>
                    <path fill="#496e2d" d="M0 312.888h512v113.775H0z"></path>
                    <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                  </svg>
                </Typography>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SlidCard;
