import { getFullUserInfo } from 'helpers/authHelper'
import { getPracticeQuestions } from 'helpers/backendHelpers/allQuestions'
import { useEffect, useState } from 'react'
import QuestionsMCQTest from './QuestionsMCQTest'
import SubmitLoader from './SubmitLoader'

const PracticeQuestionsContent = ({
  bookData,
  type,
  handleCloseModalCallback,
  isSingleChoice,
}) => {
  const [questionsData, setQuestionsData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const userInfo = getFullUserInfo()
        const response = await getPracticeQuestions(
          userInfo?.st_class,
          bookData?.bk_subCategory,
          bookData?.bk_topic,
          type,
          5,
        )

        setQuestionsData(response.data)

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }

    fetchQuestions()
  }, [bookData?.bk_subCategory, bookData?.bk_topic, type])

  return (
    <div>
      {isLoading || questionsData === null ? (
        <div
          style={
            isLoading
              ? {
                  position: 'relative',
                  opacity: '0.8',
                  minHeight: '300px',
                }
              : {}
          }
        >
          <SubmitLoader />
        </div>
      ) : (
        <QuestionsMCQTest
          questionsData={questionsData}
          isSingleChoice={isSingleChoice}
          handleCloseModalCallback={handleCloseModalCallback}
        />
      )}
    </div>
  )
}

export default PracticeQuestionsContent
