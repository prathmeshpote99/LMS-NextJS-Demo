import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { Button } from 'reactstrap'
import { ToastContainer } from 'react-toastify'

const ScoreModal = ({ score, handleViewResultCallback }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Modal centered={true} show={true} onHide={handleViewResultCallback}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <p className="mb-0" style={{ fontSize: '18px', fontWeight: '400' }}>
              YOU SCORED
            </p>
            <p
              style={{ fontSize: '120px' }}
              className={score <= 2 ? 'text-danger' : 'text-success'}
            >
              <strong>{score}</strong>
            </p>
            {score <= 2 ? (
              <p className="text-danger" style={{ fontSize: '18px' }}>
                <strong>You Failed</strong>
              </p>
            ) : (
              <p
                className="text-success"
                style={{ fontSize: '18px', fontWeight: '700' }}
              >
                <strong>You have passed</strong>
              </p>
            )}
            <Button
              className="rounded-0"
              color="dark"
              onClick={handleViewResultCallback}
            >
              View Result
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

const PracticeQuestion = ({
  selectedOptions,
  handleSetSelectedOptions,
  questionData,
  questionNumber,
  showAnswer,
  isSingleChoice,
}) => {
  const options = [
    { type: 'option1', value: questionData.aq_option1 },
    { type: 'option2', value: questionData.aq_option2 },
    { type: 'option3', value: questionData.aq_option3 },
    { type: 'option4', value: questionData.aq_option4 },
    { type: 'option5', value: questionData.aq_option5 },
  ]

  const toggleSelectedOptions = (option) => {
    // If showAnswer is true then don't allow to change the option
    if (showAnswer) return

    // If single directly replace the option with old one
    if (isSingleChoice) {
      handleSetSelectedOptions(questionData?.aq_id, [option])
      return
    }

    const isPresent = selectedOptions.includes(option)

    let newOptions = []
    if (!isPresent) {
      newOptions = [...selectedOptions, option]
    } else {
      newOptions = selectedOptions.filter((value) => value !== option)
    }
    handleSetSelectedOptions(questionData?.aq_id, newOptions)
  }

  const isOptionSelected = (option) => {
    const isPresent = selectedOptions?.includes(option)
    return isPresent
  }

  return (
    <div className="pastPaperBox bg-white mb-2 p-4 rounded-4">
      <div className="h6 font_medium mb-3">
        {questionNumber}. {questionData?.aq_title}{' '}
        {questionData?.pastPaper ? (
          <span className="font_bold">
            ({questionData.pastPaper.pp_body} {questionData.pastPaper.pp_year})
          </span>
        ) : null}
      </div>

      {options?.map((option) => {
        if (!option.value) return <></>

        // check if selected and correct
        let className = ''
        const isOptionCorrect = questionData?.aq_correntAns.includes(
          option.type,
        )
        if (isOptionSelected(option.value)) {
          if (isOptionCorrect) className = 'correctAnsBg'
          else className = 'inCorrectAnsBg'
        } else if (isOptionCorrect) {
          className = 'correctAnsBg'
        }

        return (
          <div
            className={`mt-2 p-2 border ${showAnswer ? className : ''}`}
            key={option.value}
          >
            <input
              type="radio"
              id={option.value}
              value={option}
              onClick={() => toggleSelectedOptions(option.value)}
              checked={isOptionSelected(option.value)}
            />
            <label className="ms-2 pt-2" htmlFor={option.value}>
              {option.value}
            </label>
          </div>
        )
      })}
    </div>
  )
}

const QuestionsMCQTest = ({
  questionsData,
  isSingleChoice,
  handleCloseModalCallback,
}) => {
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => {
    let newSelectedOptions = {}
    for (let i = 0; i < questionsData.length; i++) {
      newSelectedOptions[questionsData[i].aq_id] = []
    }

    setSelectedOptions(newSelectedOptions)
  }, [questionsData])

  // Keeps track of all selected options
  const [selectedOptions, setSelectedOptions] = useState({})

  const isAllQuestionsAttempted = () => {
    for (const key in selectedOptions) {
      if (selectedOptions[key].length === 0) {
        return false
      }
    }

    // Condition to check if all questions are attempted or not
    return true
  }

  const handleCheckAnswerClick = () => {
    // Check if all the questions are attempted or not
    const isAllAttempted = isAllQuestionsAttempted()
    if (!isAllAttempted) {
      toast.error('Please Attempt all Questions', { autoClose: 5000 })
      return
    }

    // Calculate the score
    const newScore = getScore()
    setScore(newScore)
    setIsModalOpen(true)
  }

  const handleViewResultCallback = () => {
    setShowAnswer(true)
    setIsScoreModalOpen(false)
    setIsModalOpen(false)
  }

  const handleSetSelectedOptions = (id, newValue) => {
    setSelectedOptions((state) => {
      return {
        ...state,
        [id]: newValue,
      }
    })
  }

  const isValidAnswer = (question) => {
    const userOptions = selectedOptions[question?.aq_id]
    if (question?.aq_correntAns.length !== userOptions.length) {
      return false
    }

    // check if all the aq_correntAns are same with options
    for (let i = 0; i < question?.aq_correntAns.length; i++) {
      const option = question?.aq_correntAns[i]
      let answer = ''
      if (option === 'option1') answer = question?.aq_option1
      else if (option === 'option2') answer = question?.aq_option2
      else if (option === 'option3') answer = question?.aq_option3
      else if (option === 'option4') answer = question?.aq_option4
      else if (option === 'option5') answer = question?.aq_option5

      // Check if the answer is present in the selected
      if (!userOptions.includes(answer)) {
        return false
      }
    }

    return true
  }

  const getScore = () => {
    let score = 0

    for (let i = 0; i < questionsData.length; i++) {
      // check if it is valid or not
      if (isValidAnswer(questionsData[i])) {
        score++
      }
    }

    return score
  }

  return (
    <>
      {/* Toast */}
      <ToastContainer position="top-right" />

      {questionsData?.map((questionData, i) => (
        <PracticeQuestion
          selectedOptions={selectedOptions[questionData?.aq_id]}
          handleSetSelectedOptions={handleSetSelectedOptions}
          questionData={questionData}
          questionNumber={i + 1}
          showAnswer={showAnswer}
          isSingleChoice={isSingleChoice}
          key={questionData?.aq_id}
        />
      ))}

      {isModalOpen && (
        <ScoreModal
          score={score}
          handleViewResultCallback={handleViewResultCallback}
        />
      )}

      {isScoreModalOpen ? (
        <ScoreModal
          score={getScore()}
          handleViewResultCallback={handleViewResultCallback}
        />
      ) : null}

      {questionsData?.length === 0 ? (
        <h3 className="text-center my-5">No system activity found</h3>
      ) : null}

      {questionsData?.length !== 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          {showAnswer ? (
            <Button
              className="mt-3 rounded-0"
              color="dark"
              onClick={handleCloseModalCallback}
            >
              Done
            </Button>
          ) : (
            <Button
              className="mt-3 rounded-0"
              color="dark"
              onClick={handleCheckAnswerClick}
            >
              Check Answers
            </Button>
          )}
        </div>
      ) : null}
    </>
  )
}

export default QuestionsMCQTest
