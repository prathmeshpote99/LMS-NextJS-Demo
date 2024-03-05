import { Box, Typography } from '@material-ui/core'
import { Rating } from '@mui/material'
import React from 'react'


const StudentExpe = () => {
  const [value, setValue] = React.useState(5)
  return (
    <>
      <div className="mt-5 experience">
        <h3 className="headingT">Students Experience</h3>
        <div className="container-fluid text-center my-3 mt-4">
          <div className="row mx-auto my-auto container-fluid">
            <div
              id="recipeCarousel"
              className="carousel slide w-100 row"
              data-ride="carousel"
            >
              <a
                className="carousel-control-prev w-auto col-md-1"
                href="#recipeCarousel"
                role="button"
                data-slide="prev"
              >
                <i
                  className="fa-solid fa-chevron-left fa-2xl"
                  style={{ color: '#000000' }}
                ></i>

                <span className="sr-only">Previous</span>
              </a>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 Cback">
                    <Typography
                      className="p-3 typography"
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "It is easy to access and has very useful content to
                      improve the understanding of students"
                    </Typography>
                    <div className="mt-2 mb-3" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small className="name">
                          <b>Pentecost Senior High</b>
                        </small>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        ></Box>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                          }}
                        />
                        <svg
                          style={{
                            height: '3%',
                            width: '6%',
                            marginTop: '-15px',
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="ghana"
                        >
                          <path
                            fill="#ffda44"
                            d="M0 85.337h512v341.326H0z"
                          ></path>
                          <path
                            fill="#d80027"
                            d="M0 85.337h512v113.775H0z"
                          ></path>
                          <path
                            fill="#496e2d"
                            d="M0 312.888h512v113.775H0z"
                          ></path>
                          <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                        </svg>
                      </Typography>
                    </div>
                  </div>
                  <div className="col-md-4 Cbacks">
                    <Typography
                      className="p-3 typography"
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "It is easy to access and has very useful content to
                      improve the understanding of students"
                    </Typography>
                    <div className="mt-2 mb-3" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small className="name">
                          <b>Pentecost Senior High</b>
                        </small>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        ></Box>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                          }}
                        />
                        <svg
                          style={{
                            height: '3%',
                            width: '6%',
                            marginTop: '-15px',
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="ghana"
                        >
                          <path
                            fill="#ffda44"
                            d="M0 85.337h512v341.326H0z"
                          ></path>
                          <path
                            fill="#d80027"
                            d="M0 85.337h512v113.775H0z"
                          ></path>
                          <path
                            fill="#496e2d"
                            d="M0 312.888h512v113.775H0z"
                          ></path>
                          <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                        </svg>
                      </Typography>
                    </div>
                  </div>
                  <div className="col-md-4 Cbacks">
                    <Typography
                      className="p-3 typography"
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "It is easy to access and has very useful content to
                      improve the understanding of students"
                    </Typography>
                    <div className="mt-2 mb-3" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small className="name">
                          <b>Pentecost Senior High</b>
                        </small>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        ></Box>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue)
                          }}
                        />
                        <svg
                          style={{
                            height: '3%',
                            width: '6%',
                            marginTop: '-15px',
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="ghana"
                        >
                          <path
                            fill="#ffda44"
                            d="M0 85.337h512v341.326H0z"
                          ></path>
                          <path
                            fill="#d80027"
                            d="M0 85.337h512v113.775H0z"
                          ></path>
                          <path
                            fill="#496e2d"
                            d="M0 312.888h512v113.775H0z"
                          ></path>
                          <path d="m255.883 199.111 14.119 43.458 40.366 3.2-36.969 26.861 19.453 40.259-36.969-26.859-36.97 26.859 14.123-43.459-36.969-26.861h45.696z"></path>
                        </svg>
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-next w-auto col-md-1"
                href="#recipeCarousel"
                role="button"
                data-slide="next"
              >
                <i
                  className="fa-solid fa-chevron-right fa-2xl"
                  style={{ color: '#000000' }}
                ></i>

                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentExpe
