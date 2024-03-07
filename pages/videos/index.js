import SubmitLoader from "@/components/Common/SubmitLoader";
import VideoModal from "@/components/Common/WatchModal";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  LoginAlert,
  getAuthToken,
  getFullUserInfo,
  getUserInfo,
} from "@/helpers/authHelper";
import { IMAGE_URL } from "@/helpers/urlHelper";
import Play from "@/assets/images/icons/Play.png";
import {
  getVideoSubjects,
  getVideosByLevel,
} from "@/helpers/backendHelpers/book";
import useDebounce from "@/hooks/useDebounce";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Image from "next/image";

function Videos() {
  const isLoggedIn = getAuthToken() ? true : false;
  const [videoModalData, setVideoModalData] = useState(null);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const debouncedBookSearch = useDebounce(bookSearch);
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const OwlCarousel = dynamic(
    () => {
      return import("react-owl-carousel");
    },
    { ssr: false } // This will load the component only on client side
  );

  const handleBookSearch = (e) => {
    setBookSearch(e.target.value);
  };

  const handleVideoModalOpen = (data) => {
    if (!isLoggedIn) {
      LoginAlert();
      return;
    }

    setVideoModalData(data);
  };

  const router = useRouter();
  const pathName = router.pathname;
  const loginAlert = async () => {
    const value = await swal("Please do login into your account", {
      buttons: {
        defeat: "Log in",
        cancel: "Cancel",
      },
    });
    switch (value) {
      case "defeat":
        router.push("/auth/signin", {
          state: {
            url: pathName,
          },
        });
        break;
      default:
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Also fetch subject
        const userInfo = getUserInfo();
        const fullUserInfo = getFullUserInfo();

        let level = "JHS";
        if (userInfo && userInfo?.userType === "Student") {
          level = fullUserInfo?.st_level;
        } else if (userInfo && userInfo?.userType === "Teacher") {
          level = fullUserInfo?.tc_level;
        }

        const subjectListResponse = await getVideoSubjects(
          level,
          userInfo?.userType
        );
        setSubjectList(subjectListResponse.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllVideosByLevel = async () => {
      setIsLoading(true);

      const userInfo = getUserInfo();
      const fullUserInfo = getFullUserInfo();

      let level = "JHS";
      if (userInfo && userInfo?.userType === "Student") {
        level = fullUserInfo?.st_level;
      } else if (userInfo && userInfo?.userType === "Teacher") {
        level = fullUserInfo?.tc_level;
      }

      try {
        const response = await getVideosByLevel(
          level,
          userInfo?.userType,
          selectedSubject,
          debouncedBookSearch,
          controller
        );
        setVideoData(response.data.videoData);

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchAllVideosByLevel();
    return () => controller.abort();
  }, [selectedSubject, debouncedBookSearch]);

  return (
    <>
      {videoModalData ? (
        <VideoModal
          toggle={() => setVideoModalData(null)}
          videoData={videoModalData}
        />
      ) : null}

      <section className={`py-5`}>
        <div className="container">
          <div className="books-section row g-3">
            <div className="books-sidebar col-lg-3">
              <div className="books-sidebar-inner">
                <div className="books-sidebar-widget">
                  <div className="books-sidebar-top books-sidebar-widget">
                    <h4 className="m-0">Subjects</h4>
                    <button
                      className="bg-transparent border-0"
                      type="button"
                      onClick={() => setSelectedSubject("")}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="books-sidebar-widget-tags">
                    {subjectList?.map((subject) => (
                      <button
                        className={`btn mt-2 col-md-8 ${
                          subject === selectedSubject
                            ? "btnAssReview"
                            : "btnAssReviewE"
                        }`}
                        onClick={() => {
                          if (subject === selectedSubject) {
                            setSelectedSubject("");
                          } else {
                            setSelectedSubject(subject);
                          }
                        }}
                        key={subject}
                      >
                        <b>{subject}</b>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`books-wrapper col-lg-9`}>
              <div className="books-wrapper-header sticky-pagination pb-3">
                <div className="filter-form-wrapper-book px-3">
                  <div className="mt-4 mb-2 col-md-9">
                    <h4 style={{ color: "black" }}>Videos Lessons</h4>
                  </div>

                  <div className="select--item col-md-3 mt-2">
                    <div className="inner">
                      <input
                        name="bookName"
                        type="text"
                        placeholder="Search Video..."
                        className="form--control"
                        value={bookSearch}
                        onChange={handleBookSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="books-wrapper-cont"
                style={
                  isLoading
                    ? {
                        position: "relative",
                        opacity: "0.8",
                        minHeight: "600px",
                      }
                    : {}
                }
              >
                {isLoading ? <SubmitLoader /> : <></>}

                {!isLoading &&
                  videoData?.map((data) => {
                    return (
                      <React.Fragment key={data.label}>
                        <label className="vLabel mb-2 ps-3">
                          <b>{data?.label}</b>
                        </label>
                        <OwlCarousel
                          items={3}
                          className="owl-theme mb-5"
                          loop={false}
                          margin={10}
                          center={false}
                          dots={false}
                          nav={true}
                          navText={["", ">"]}
                          responsive={{
                            0: {
                              items: 1, // Show 1 item on small screens (width < 600px)
                            },
                            600: {
                              items: 2, // Show 2 items on medium screens (600px <= width < 900px)
                            },
                            900: {
                              items: 3, // Show 3 items on large screens (width >= 900px)
                            },
                          }}
                        >
                          {data?.data.length > 0 ? (
                            <>
                              {data?.data.map((innerData, i) => {
                                return (
                                  <React.Fragment key={innerData.bk_id}>
                                    <div className="container-fluid video cursor-pointer">
                                      <div className="row">
                                        <div
                                          className="container-fluid px-5 img-div"
                                          key={i}
                                          onClick={() => {
                                            if (!isLoggedIn) {
                                              loginAlert();
                                            } else {
                                              handleVideoModalOpen(innerData);
                                            }
                                          }}
                                        >
                                          <div className="img-inner-div">
                                            <Image
                                              alt=""
                                              src={`${IMAGE_URL}/${innerData?.bk_preview}`}
                                              className="cursor-pointer video-image"
                                              fill
                                            />
                                            <div className="icons-divv">
                                              <Image
                                                className="play-icons"
                                                src={Play}
                                                alt=""
                                              />
                                              <p className="vDuration">
                                                {innerData.bk_videoDuration ||
                                                  ""}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <p className="mt-2 cursor-pointer video-title">
                                          {innerData?.bk_title}
                                        </p>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              <h5 className="my-3 text-center">
                                No videos found
                              </h5>
                            </>
                          )}
                        </OwlCarousel>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Videos;
