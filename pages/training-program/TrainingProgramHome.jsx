import { getUserInfo } from '@/helpers/authHelper'
import { useEffect, useState } from 'react'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'
import { getTrainingPrograms } from '@/helpers/backendHelpers/tariningProgram'

const TrainingProgram = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [trainingPrograms, setTrainingPrograms] = useState([])
  const [error, setError] = useState('')
  const userInfo = getUserInfo()

  useEffect(() => {
    getAllTrainingProgram()
  }, [])

  const getAllTrainingProgram = async () => {
    try {
      setIsLoading(true)
      let response = await getTrainingPrograms(userInfo?.userType)
      let { trainingPrograms } = response.data
      setTrainingPrograms(trainingPrograms)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      setIsLoading(false)
    }
  }
  console.log('trainingPrograms12', trainingPrograms)
  return (
    <>
      {trainingPrograms && trainingPrograms.length > 0 && (
        <section className="team-section pt-100 pb-100">
          <div className="container">
            <div className="row g-4">
              <SectionHeader
                className="mb-0"
                title="Upskilling for Facilitators And Teams"
                subtitle=""
              />
              {trainingPrograms.map((item, i) => (
                <div className="col-lg-4 col-md-4" key={i}>
                  <EventCard classes="short-event" {...item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default TrainingProgram
