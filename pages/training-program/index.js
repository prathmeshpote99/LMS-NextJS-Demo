import SubmitLoader from "@/components/Common/SubmitLoader";
import { getUserInfo } from "@/helpers/authHelper";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { getTrainingPrograms } from "@/helpers/backendHelpers/tariningProgram";

const TrainingProgram = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const userInfo = getUserInfo();

  useEffect(() => {
    getAllTrainingProgram();
  }, []);

  const getAllTrainingProgram = async () => {
    // const userType = !userData ? 'Student' : userData.userType
    try {
      setIsLoading(true);
      let response = await getTrainingPrograms(userInfo?.userType);
      let { trainingPrograms } = response.data;
      setTrainingPrograms(trainingPrograms);
      if (trainingPrograms.length === 0) {
        setNoRecords(true);
      } else {
        setNoRecords(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div style={{ minHeight: "300px" }}>
        {isLoading ? (
          <div
            style={
              isLoading
                ? { position: "relative", opacity: "0.8", minHeight: "300px" }
                : {}
            }
          >
            <SubmitLoader />
          </div>
        ) : (
          <>
            {noRecords && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "300px" }}
              >
                <h1>No system activity found.</h1>
              </div>
            )}
            <section className={`training-program ${!noRecords && "py-5"}`}>
              <div className="container">
                <div className="row g-4">
                  {trainingPrograms.map((item, i) => (
                    <div className="col-lg-4 col-md-4 bg-white" key={i}>
                      <EventCard classes="short-event" {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default TrainingProgram;
