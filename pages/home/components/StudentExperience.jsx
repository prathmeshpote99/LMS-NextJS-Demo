import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  carouselItem: {
    [theme.breakpoints.up('md')]: {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  card: {
    height: '100%',
  },
  carouselControl: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  controlButton: {
    margin: theme.spacing(0, 1),
    minWidth: 0,
  },
}))

function StudentExperience() {
  const classes = useStyles()
  const [value, setValue] = React.useState(5)

  return (
    <>
      <div
        className="container-fluid"
        style={{
          backgroundColor: '#eeebe1',
          height: '50vh',
          paddingBottom: '20%',
        }}
      >
        <Container
          style={{ marginBottom: '7%' }}
          maxWidth="lg"
          className={classes.container}
        >
          <Typography
            style={{ color: 'black', paddingTop: '3%' }}
            variant="h4"
            className={classes.title}
          >
            <b className="mt-5">Students Experience</b>
          </Typography>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner row w-100 mx-auto">
              <div
                className={`carousel-item row ${classes.carouselItem} active`}
              >
                <Button
                  className={`classes.controlButton col-md-1`}
                  // variant="outlined"
                  color="secondary"
                  startIcon={<ChevronLeft />}
                  href="javascript:void(0)"
                  title="Previous"
                />
                <Card
                  style={{ backgroundColor: 'white' }}
                  className={`classes.card col-md-3`}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "It is easy to access and has very useful content to
                      improve the understanding of students"
                    </Typography>
                    <div className="mt-4" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small>
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
                  </CardContent>
                </Card>
                <Card
                  style={{ backgroundColor: 'white', marginLeft: '1%' }}
                  className={`classes.card col-md-3`}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "It aids in teaching and learning and it discourage
                      laziness"
                    </Typography>
                    <div className="mt-4" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small>
                          <b>Accra High School</b>
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
                            height: '4%',
                            width: '8%',
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
                  </CardContent>
                </Card>
                <Card
                  style={{ backgroundColor: 'white', marginLeft: '1%' }}
                  className={`classes.card col-md-3`}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      "I like everythig about it, especially how it's been able
                      to make learning interesting and effective"
                    </Typography>
                    <div className="mt-4" style={{ textAlign: 'right' }}>
                      <Typography variant="body2" color="black" component="p">
                        <small>
                          <b>Abomosu Stem</b>
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
                  </CardContent>
                </Card>
                <Button
                  className={`classes.controlButton col-md-1`}
                  // variant="outlined"
                  color="secondary"
                  endIcon={<ChevronRight />}
                  href="javascript:void(0)"
                  title="Next"
                />
              </div>

              {/* Repeat the above code for the remaining carousel items */}
            </div>
            {/* <Container>
              <Grid
                container
                justify="center"
                className={classes.carouselControl}
              >
                <Button
                  className={classes.controlButton}
                  variant="outlined"
                  color="secondary"
                  startIcon={<ChevronLeft />}
                  href="javascript:void(0)"
                  title="Previous"
                />
                <Button
                  className={classes.controlButton}
                  variant="outlined"
                  color="secondary"
                  endIcon={<ChevronRight />}
                  href="javascript:void(0)"
                  title="Next"
                />
              </Grid>
            </Container> */}
          </div>
        </Container>
      </div>
    </>
  )
}

export default StudentExperience
