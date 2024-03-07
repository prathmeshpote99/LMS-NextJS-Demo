import ButtonLoader from "@/components/Common/ButtonLoader";
import SubmitLoader from "@/components/Common/SubmitLoader";
import {
  createComment,
  getCommentsByBlogId,
} from "@/helpers/backendHelpers/blog";
import { IMAGE_URL } from "@/helpers/urlHelper";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import default_icon from "../../assets/images/default_avatar.png";
import likeIcon from "../../assets/images/icons/Icon_heart.png";
import commentIcons from "../../assets/images/icons/iconslikes/cmt.png";
import Image from "next/image";

function BlogModal({ toggleModal, blogData, userInfo }) {
  const isOpen = blogData != null;
  const [blogDataState, setBlogDataState] = useState(blogData);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  // Fetch the modal data
  useEffect(() => {
    if (!blogData?.bl_id) return;

    const fetchData = async () => {
      setIsCommentLoading(true);
      try {
        let response = await getCommentsByBlogId(blogData?.bl_id);
        let { comment } = response.data;

        setBlogDataState((state) => {
          console.log(state);

          state.comment = comment;
          state.isFetchComments = true;
          return state;
        });
      } catch (error) {
        console.log("Error:", error);
      }

      setIsCommentLoading(false);
    };

    fetchData();
  }, [blogData?.bl_id]);

  const addComment = async () => {
    if (comment.length === 0) {
      return setShowError(true);
    }

    try {
      let userType = "";
      if (
        userInfo?.userType === "Student" ||
        userInfo?.userType === "Premium"
      ) {
        userType = "Student";
      } else if (
        userInfo?.userType === "Teacher" ||
        userInfo?.userType === "Freelance"
      ) {
        userType = "Teacher";
      }

      setShowError(false);
      setIsLoading(true);
      let body = {
        cmn_userId: userInfo?.id,
        cmn_userType: userType,
        bl_id: blogData?.bl_id,
        cmn_comment: comment,
        cmn_date: new Date(),
      };

      // Creating a comment
      await createComment(body);

      toast.success("Thank you for your comment", { autoClose: 5000 });

      const newComment = {
        cmn_comment: comment,
        cmn_userId: userInfo?.id,
        cmn_userType: userType,
        cmn_fullName: userInfo?.fullName,
        cmn_profilePic: userInfo?.profilePic,
        bl_id: blogData?.bl_id,
        cmn_date: new Date(),
      };

      setBlogDataState((state) => {
        return {
          ...state,
          comment: [...state.comment, newComment],
        };
      });

      setComment("");

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size="lg" centered={true}>
      {blogDataState && (
        <>
          <ModalHeader centered={true} toggle={toggleModal}>
            <b>{blogDataState?.bl_creatorName}'s Post</b>
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-md-1 d-flex justify-content-center">
                  <Image
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50px",
                    }}
                    src={
                      blogDataState?.bl_creatorPic
                        ? `${IMAGE_URL}/${blogDataState?.bl_creatorPic}`
                        : default_icon
                    }
                    alt=""
                    height={42}
                    width={42}
                  />
                </div>
                <div className="col-md-11 bpara">
                  <span className="btitle">
                    <b>{blogDataState?.bl_creatorName}</b>
                  </span>
                  <p className="mt-1 btext">
                    {blogDataState?.bl_desc}
                    <br />
                  </p>
                </div>
                <div className="container">
                  <div className="row mt-4">
                    <div className="col-md-1"></div>
                    <div className="col-md-7 d-flex">
                      <Image className="like-img" src={likeIcon} alt="" />
                      <p className="icon-txt">
                        {blogDataState?.bl_likeCount} Like
                      </p>
                      <div className="d-flex">
                        <Image className="like-img" src={commentIcons} alt="" />
                        <p className="icon-txt">Comment</p>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                      <span className="bdate">
                        {moment(blogDataState?.bl_createdAt).format(
                          "ddd, DD MMM YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="comment-section">
                <div
                  style={{
                    minHeight: "100px",
                  }}
                >
                  {isCommentLoading ? (
                    <div
                      style={
                        isCommentLoading
                          ? {
                              position: "relative",
                              opacity: "0.8",
                              minHeight: "100px",
                            }
                          : {}
                      }
                    >
                      <SubmitLoader />
                    </div>
                  ) : (
                    <>
                      <div className="container">
                        <div className="comments-list">
                          <ul className="comments-list-items">
                            {blogDataState?.comment &&
                            blogDataState?.comment.length > 0 ? (
                              blogDataState?.comment.map((comment) => {
                                return (
                                  <li key={comment.id}>
                                    <Image
                                      alt=""
                                      src={`${IMAGE_URL}/${comment?.cmn_profilePic}`}
                                      height={80}
                                      width={30}
                                    />
                                    <div className="cont">
                                      <div className="top">
                                        <div>
                                          <h5 className="name">
                                            {comment?.cmn_fullName}
                                          </h5>
                                          <span className="date">
                                            {moment(comment?.cmn_date).format(
                                              "DD MMM YYYY"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <p>{comment?.cmn_comment}</p>
                                    </div>
                                  </li>
                                );
                              })
                            ) : (
                              <>
                                {blogDataState?.showNoRecordsMsg && (
                                  <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{
                                      minHeight: "100px",
                                    }}
                                  >
                                    <h6>No comments yet</h6>
                                  </div>
                                )}
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="row mfooter">
              <div className="col-12">
                <div className="comment-input position-relative">
                  <input
                    rows="0"
                    onChange={(e) => {
                      setComment(e.target.value);
                      if (e.target.value.length > 0) {
                        setShowError(false);
                      } else {
                        setShowError(true);
                      }
                    }}
                    value={comment ? comment : ""}
                    className={`form-control cmtboxx`}
                    name="bookName"
                    placeholder={`What's on your mind?`}
                  />
                  <button
                    disabled={isLoading}
                    className="position-absolute comment-btn"
                    onClick={addComment}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isLoading && (
                        <ButtonLoader
                          height="1.2rem"
                          width="1.2rem"
                        ></ButtonLoader>
                      )}

                      <span>Post</span>
                    </div>
                  </button>
                </div>
              </div>
              {showError && (
                <p className="text-danger mt-2">Please add comment</p>
              )}
            </div>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}

export default BlogModal;
