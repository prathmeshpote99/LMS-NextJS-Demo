import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useState } from 'react'
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const EnrollOptionModal = ({
  list,
  modal,
  toggle,
  active,
  options,
  loader,
  isOpen,
  addTrainingParticipants,
}) => {
  const [state, setState] = useState('')
  const [itemSelected, setItemSelected] = useState('')
  const listOfOptions = [
    {
      description: [
        'Participants should ensure that they have received by email or SMS their default login password for KATon and have logged in and change their password. The login mails are usually sent to participant’s ges.gov.gh or personal email as may be expedient.',
        'Participant will require a computer (eg TM1 laptop) for this training.',
        'Participant in areas with connectivity challenges should download the KATon desktop application when at areas with modest connectivity',
        'After downloading the desktop application, log in and go to “Courses” and select the training on  “ICT Skills Acquisition for Teachers”',
        'Try to access the training resources that are in PDF and also play the training videos while still connected to internet.',
        'Go off the internet and test that you can access all the training materials. You can reconnect to internet and re-access any materials you were unable to access while offline.',
        'Participants should access the training materials and start the learning process. Study the PDF training content and watch the training videos. Then practice with your PC as you study.',
        'You can pause and repeat videos multiple times and make sure you have learned and practiced well.',
        'You can reach to standby training experts for learning guidance and enquiries via contact us on your KATon application or training@katechnologiesgh.com.',
        'At least 30 minutes of your training session after study should be dedicated to pre-examination protocols and examination; go ahead and download your training attestation form and reload it on the KATon application Then you can attempt the online examination (30 minutes).',
        'After the exam is finished, the result will be displayed immediately and you can complete a course feedback form.',
        'Your training certificate will be approved and advised to you on your KATon Access and email address. You can always generate the certificate on the fly whenever you need it with your KATon access.',
        'Thank you',
      ],
      name: 'Recorded Training',
      optionType: 1,
      _id: '6124acbc8823d34538c25c9d',
    },
    {
      description: [
        'Participants should ensure that they have received by email or SMS their default login password for KATon and have logged in and change their password. The login mails are usually sent to participant’s ges.gov.gh or personal email as may be expedient.',
        'This training will happen on Microsoft Teams. The Microsoft Team link will be shared at least 4-5 days before the training.',
        'Participant will require a computer (eg TM1 laptop) for this training. Microsoft Team is already installed on your TM1 laptop.',
        'The training will be in 2 Hours sessions for 3-4 consecutive working days from the date of commencement of your training at the same training time slot.',
        'Participants, in extreme cases, may request for a change in the assigned class or time slot minimum of three working days before the training start date.',
        'Each session will last a maximum of 2:00 hours facilitated by one of our expert trainers.  Make sure you are logged in and have registered minimum of 10 minutes to the commencement of your class.',
        'During this live class, you can learn and practice on your TM1 laptop.  Please make sure you have internet connection ready for the duration of the training.',
        'To further aid your study during and off the training time, participants in areas with connectivity challenges should download the KATon desktop application when at areas with modest connectivity.',
        'After downloading the desktop application, log in and go to “Courses” and select the training on “ICT Skills Acquisition for Teachers” ',
        'Try to access the training resources that are in PDF and also play the training videos while still connected to internet. ',
        'Try to access the training resources that are in PDF and also play the training videos while still connected to internet. ',
        'You can pause and repeat videos multiple times and make sure you have learned and practiced well.',
        'At least 30 minutes of the last training session is dedicated to pre-examination protocols and examination; go ahead and download your training attestation form and reload it on the KATon application. Then you can attempt the online examination (30 minutes).',
        'After the exam is finished, the result will be displayed immediately and you can complete a course feedback form.',
        'Your training certificate will be approved and advised to you on your KATon Access and email address. You can always generate the certificate on the fly whenever you need it with your KATon access.',
      ],
      name: 'Online Live Training ',
      optionType: 2,
      _id: '6124ad46f6ce0f1d0453b5dd',
    },
    {
      description: [
        'Welcome to the physical training option.',
        'Participants should ensure that they have received by email or SMS their default login password for KATon and have logged in and change their password. The login mails are usually sent to participant’s ges.gov.gh or personal email as may be expedient.',
        'This training venue and date as well as time will be communicated to each participants via SMS and email 3-5 days before the scheduled training date. ',
        'Participant will require a computer (eg TM1 laptop) for this training. Please ensure your laptop is well charged.',
        'The training will be in 2.5 Hours sessions for 2-3 days between Mondays to Fridays.',
        'Each session will last a maximum of 2:30 hours facilitated by one of our trained experts.',
        'During the class, you will be required to practice on your TM1 laptop.',
        'To further aid your study during and off the training time, participants in areas with connectivity challenges should download the KATon desktop application when at areas with modest connectivity ',
        'After downloading the desktop application, log in and go to “Courses” and select the training on  “ ICT Skills Acquisition for Teachers” ',
        'Try to access the training resources that are in PDF and also play the training videos while still connected to internet.',
        'Go off the internet and test that you can access all the training materials. You can reconnect to internet and re-access any materials you were unable to access while offline.',
        'You can pause and repeat videos multiple times and make sure you have learned and practiced well.',
        'At least 30 minutes of the last training session is dedicated to pre-examination protocols and examination; go ahead and download your training attestation form and reload it on the KATon application Then you can attempt the online examination (30 minutes).',
        'After the exam is finished, the result will be displayed immediately and you can complete a course feedback form.',
        'Your training certificate will be approved and advised to you on your KATon Access and email address. You can always generate the certificate on the fly whenever you need it with your KATon access.',
        'Please note that there is no feeding or transportation arrangement for this training.',
        'Thank you',
      ],
      name: 'Physical Training',
      optionType: 3,
      _id: '6124adfc5bcb5737b8c41ba6',
    },
  ]

  const setSelected = (v) => {
    setState(v)
  }

  const handleAccordionClick = (item) => {
    if (itemSelected !== item.name) {
      setItemSelected(item.name)
    } else {
      setItemSelected('')
    }
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        size="lg"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="tutorModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>
          <div className="py-2  border-bottom">
            <h5 className="font_size_20 font_medium color_gray px-3 py-2">
              Choose Training Option
            </h5>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="">
            {/* {isLoading === true ? ( */}
            {listOfOptions.map((item, i) => {
              return (
                <Accordion
                  className="accordionBG"
                  key={i}
                  expanded={itemSelected === item.name}
                  onChange={() => handleAccordionClick(item)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={() => setSelected(item.name)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="px-3 py-2 font_size_18 font_medium radio-checked-color font_capital">
                      {state === item.name ? (
                        <MdRadioButtonChecked
                          className="mx-2 font"
                          fontSize={25}
                        />
                      ) : (
                        <MdRadioButtonUnchecked
                          className="mx-2"
                          fontSize={25}
                        />
                      )}
                      {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="d-flex flex-column">
                    <Typography className="font_size_14 font_medium color_light_gray px-3 py-2 font_capital">
                      <ul>
                        {item?.description.map((sub, i) => {
                          return (
                            <li key={i}>
                              <div>{sub}</div>
                            </li>
                          )
                        })}
                      </ul>
                    </Typography>

                    <div className="">
                      <div className="d-flex justify-content-center pb-4">
                        <button
                          className="cmn--btn"
                          onClick={() => {
                            addTrainingParticipants(item?.optionType)
                            toggle()
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
              onClick={() => toggle()}
            >
              Cancel
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EnrollOptionModal
