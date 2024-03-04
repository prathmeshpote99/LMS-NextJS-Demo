import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'

const FeedbackFormModal = (props) => {
  const { isOpen, toggle, pdf, type, modalTitle } = props
  const [form, setForm] = useState({})

  const handleInputChange = (e) => {
    let filteredForm = {
      ...form,
      [e.target.name]: e.target.value,
    }

    filteredForm = Object.fromEntries(
      Object.entries(filteredForm).filter(([_, value]) => value !== undefined),
    )

    setForm(filteredForm)
  }

  const submitFeedbackForm = () => {}
  if (!pdf) return <> </>
  return (
    <>
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
          {type === 'pdf'
            ? modalTitle
              ? modalTitle
              : 'Read PDF'
            : 'Read ePub'}
        </ModalHeader>
        <ModalBody className="scrollable-modal">
          <section
            id="pdf-section"
            className="d-flex flex-column align-items-center feedback-form"
          >
            <div className="w-100 p-3">
              <div className="rounded box_shadow p-3 my-2 font_bold">
                <b>
                  {' '}
                  Dear Teacher, <br></br> Thank you for your participation in
                  the ICT training for teachers in Ghana. This survey is
                  intended to seek your evaluation of the training and areas for
                  improvement. Kindly take few minutes of your time to complete
                  this short survey. Please tick the option(s) that best
                  reflect(s)your opinion. Participants are assured of utmost
                  confidentiality. Thank you.
                </b>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>How Did You Get To Know About The Training?</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="knowAboutTraining"
                        value="Email From GES/KA Technologies"
                      />
                      <span>Email From GES/KA Technologies</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="knowAboutTraining"
                        value="SMS From KA Technologies"
                      />
                      <span> SMS From KA Technologies</span>
                    </Label>
                    <Label className="me-2rem" check>
                      <Input
                        type="radio"
                        name="knowAboutTraining"
                        value="Calls From KA Technologies"
                      />
                      <span>Calls From KA Technologies</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="knowAboutTraining"
                        value="From Colleague Teachers"
                      />
                      <span>From Colleague Teachers</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="knowAboutTraining"
                        value="From Union Executives"
                      />
                      <span> From Union Executives</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>What Is The Name Of Your District?</b>
                </div>
                <FormGroup>
                  <Input
                    type="text"
                    name="nameOfDistrict"
                    className="mt-2"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>What Type Of Device Did You Use For The ICT Training?</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="typeOfDevice"
                        value="TM1 Laptop"
                      />
                      <span>TM1 Laptop</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="typeOfDevice"
                        value="Other(S) Device"
                      />
                      <span>Other(S) Device</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>

              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>How Would You Rate Your ICT Skills Before The Training?</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="skillBeforeTraining"
                        value="1"
                      />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="skillBeforeTraining"
                        value="2"
                      />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="skillBeforeTraining"
                        value="3"
                      />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="skillBeforeTraining"
                        value="4"
                      />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="skillBeforeTraining"
                        value="5"
                      />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>I Acquired New Skills From The Training</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="aquireNewSkill" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="aquireNewSkill" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="aquireNewSkill" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="aquireNewSkill" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="aquireNewSkill" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>Training Resources Were Readily Accessible On KATon</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="readilyAccessible" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="readilyAccessible" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="readilyAccessible" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="readilyAccessible" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="readilyAccessible" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>The Training Content Was Too Basic</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasTooBasic" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasTooBasic" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasTooBasic" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasTooBasic" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasTooBasic" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>Facilitators Took Time To Explain Key Topics</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="facilitatorsTookTime"
                        value="1"
                      />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="facilitatorsTookTime"
                        value="2"
                      />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="facilitatorsTookTime"
                        value="3"
                      />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="facilitatorsTookTime"
                        value="4"
                      />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="facilitatorsTookTime"
                        value="5"
                      />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>Which Of The Following Age Categories Apply To You?</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="ageCategoriesApply" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="ageCategoriesApply" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="ageCategoriesApply" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="ageCategoriesApply" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="ageCategoriesApply" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>What Is The Name Of Your School?</b>
                </div>
                <FormGroup>
                  <Input type="text" name="nameOfSchool" className="mt-2" />{' '}
                </FormGroup>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>The ICT Training Content Was Very Useful</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasUseful" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasUseful" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasUseful" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasUseful" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="contentWasUseful" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>
                    Materials On The KATon Platform Are Useful For Teaching
                    Needs In School
                  </b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="materialsAreUseful" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="materialsAreUseful" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="materialsAreUseful" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="materialsAreUseful" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="materialsAreUseful" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>
                    Do You Have Any Additional Feedback For The Training Team?
                  </b>
                </div>
                <FormGroup>
                  <Input
                    onChange={handleInputChange}
                    type="text"
                    name="feedbackForTraining"
                    className="mt-2"
                  />{' '}
                </FormGroup>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>Facilitation For The Training Was Excellent</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="trainingWasExecellent"
                        value="1"
                      />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="trainingWasExecellent"
                        value="2"
                      />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="trainingWasExecellent"
                        value="3"
                      />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="trainingWasExecellent"
                        value="4"
                      />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="trainingWasExecellent"
                        value="5"
                      />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>The KATon Platform Is User Friendly</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="katonIsUserFriendly"
                        value="1"
                      />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="katonIsUserFriendly"
                        value="2"
                      />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="katonIsUserFriendly"
                        value="3"
                      />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="katonIsUserFriendly"
                        value="4"
                      />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input
                        type="radio"
                        name="katonIsUserFriendly"
                        value="5"
                      />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
              <div className="rounded box_shadow p-3 my-2">
                <div className="font_size_14 font_bold color_light_black  font_capital">
                  <b>How Would You Rate Your ICT Skills After The Training?</b>
                </div>
                <div className="d-flex flex-wrap">
                  <FormGroup check onClick={handleInputChange}>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="rateIctSkills" value="1" />{' '}
                      <span>1</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="rateIctSkills" value="2" />
                      <span>2</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="rateIctSkills" value="3" />
                      <span>3</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="rateIctSkills" value="4" />
                      <span>4</span>
                    </Label>
                    <Label className="me-2rem mt-2" check>
                      <Input type="radio" name="rateIctSkills" value="5" />
                      <span>5</span>
                    </Label>
                  </FormGroup>
                </div>
              </div>
            </div>
          </section>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              onClick={toggle}
              // type="button"
              className="cancel--btn viewAllBtn rounded py-2"
            >
              Cancel
            </button>
            <button
              // disabled={disable}
              className="cmn--btn viewAllBtn rounded py-2 mx-2"
              onClick={() => {
                submitFeedbackForm()
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <span>Submit</span>
              </div>
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

FeedbackFormModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default FeedbackFormModal
