import ButtonLoader from "@/components/Common/ButtonLoader";
import EmojiPicker from "@/components/Common/EmojiPicker";
import SubmitLoader from "@/components/Common/SubmitLoader";
import { Field, Form, Formik } from "formik";
import { getAuthToken, getUserInfo } from "@/helpers/authHelper";
import {
  createBlogAPI,
  getAllBlogWithPagination,
  getCommentsByBlogId,
  likeBlogAPI,
} from "@/helpers/backendHelpers/blog";
import { IMAGE_URL } from "@/helpers/urlHelper";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { SlHeart } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import swal from "sweetalert";
import * as Yup from "yup";
import default_icon from "@/assets/images/default_avatar.png";
import icon_img from "@/assets/images/icons/Icon_img.png";
import grinning from "@/assets/images/icons/grinning.png";
import BlogModal from "../BlogModal";
import { useRouter } from "next/router";
import Image from "next/image";

const Blog = (args) => {
  const isLoggedIn = getAuthToken() ? true : false;

  const [creatorType, setCreatorType] = useState("");
  const [error, setError] = useState("");
  const [blogList, setBlogList] = useState([]);
  const [blogModal, setBlogModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [blogForm, setBlogForm] = useState({
    bl_title: "",
    bl_desc: "",
    bl_image: { fileName: "", file: {} },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [temp, setTemp] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [modalBlogData, setModalBlogData] = useState(null);
  const [modall, setModall] = useState(false);
  const [selectedBlogData, setSelectedBlogData] = useState(null);

  const toggleB = async (blogData) => {
    setModall(!modall);

    if (blogData) {
      setModalBlogData(blogData);

      if (blogData && !blogData.isFetchComments) {
        setIsCommentLoading(true);

        try {
          let response = await getCommentsByBlogId(blogData.bl_id);
          if (response?.status) {
            let { comment } = response.data;
            let updatedBlogList = blogList.map((blog) => {
              if (blog.bl_id === blogData.bl_id) {
                blog.bl_comment = comment;
                blog.isFetchComments = true;
              }
              return blog;
            });
            setBlogList(updatedBlogList);
          } else {
            console.log("Error while fetching comments");
          }
        } catch (error) {
          console.log("Error:", error);
        }

        setIsCommentLoading(false);
      }
    }
  };

  const profilePicLocal =
    typeof window !== "undefined" ? localStorage.getItem("profilePic") : null;

  const userInfo = getUserInfo();
  // const navigate = useNavigate();
  const router = useRouter();
  // const location = useLocation();
  const pathName = router.pathname;
  const lastItemRef = useRef();

  const getAllBlogs = async (creatorType, pageNumber) => {
    try {
      setIsLoading(true);
      let response = await getAllBlogWithPagination(creatorType, pageNumber);
      let { blog } = response.data;
      setBlogList(blog);
      setIsLoading(false);
      if (blog.length === 0) {
        setNoRecords(true);
      } else {
        setNoRecords(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    getAllBlogs(creatorType, 1);
  }, [creatorType]);

  const getAllBlogsWithPagination = async (creatorType) => {
    try {
      let response = await getAllBlogWithPagination(
        creatorType,
        pageNumber + 1
      );
      let { blog } = response.data;
      setPageNumber(pageNumber + 1);
      setBlogList((prevList) => [...prevList, ...blog]);
    } catch (error) {
      setError(error);
    }
  };

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

  const toggleBlogModal = () => {
    const isLoggedIn = getAuthToken() ? true : false;
    if (!isLoggedIn) {
      loginAlert();
    } else {
      setBlogModal(!blogModal);
    }
  };

  const handleReset = () => {
    setCreatorType("");
    setPageNumber(1);
    getAllBlogs("", 1);
  };

  const createBlog = async (values) => {
    try {
      // setIsLoading(true)
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
      setIsSubmitLoading(true);
      let body = {
        bl_title: values?.bl_title,
        bl_desc: values?.bl_desc,
        bl_image: blogForm.bl_image.file,
        bl_creation_type: userType,
        bl_creatorId: userInfo?.id,
      };
      let response = await createBlogAPI(body);
      if (response?.status) {
        toggleBlogModal();
        toast.success("Blog added sucessfully.", { autoClose: 5000 });
        getAllBlogs(creatorType);
        setBlogForm({
          bl_title: "",
          bl_desc: "",
          bl_image: { fileName: "", file: {} },
        });
      } else {
        alert("Something Went Wrong.");
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setError(error);
      alert(error);
      setIsLoading(false);
      setIsSubmitLoading(false);
    }
  };

  const likeBlog = async (id, index, likeCount) => {
    setTemp(!temp);
    const isLoggedIn = getAuthToken() ? true : false;
    if (!isLoggedIn) {
      loginAlert();
    } else {
      try {
        blogList[index].isLiked = true;
        blogList[index].bl_likeCount = likeCount + 1;
        let response = await likeBlogAPI(id);
        let { blog } = response.data;
        if (response?.status) {
          // getAllBlogs(creatorType)
        }
      } catch (error) {
        setError(error);
      }
    }
  };

  const hideShowComments = async (index, bl_id) => {
    const isLoggedIn = getAuthToken() ? true : false;
    if (!isLoggedIn) {
      loginAlert();
    } else {
      let tempBlog = blogList;
      tempBlog = tempBlog.map((data, i) => {
        data.showComments = false;
        return data;
      });
      tempBlog[index].showComments = !tempBlog[index].showComments;
      if (tempBlog[index].isFetchComments) {
      } else {
        setIsCommentLoading(true);
        let response = await getCommentsByBlogId(bl_id);
        if (response?.status) {
          let { comment } = response.data;
          tempBlog[index].bl_comment = comment;
          tempBlog[index].isFetchComments = true;

          if (comment.length === 0) {
            tempBlog[index].showNoRecordsMsg = true;
          } else {
            tempBlog[index].showNoRecordsMsg = false;
          }
        } else {
          console.log("Error while fetching comments");
        }
        setIsCommentLoading(false);
      }
      setBlogList(tempBlog);
      setTemp(!temp);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <section className="py-5">
        <Modal
          isOpen={blogModal}
          size="md"
          role="dialog"
          autoFocus={true}
          centered={true}
          className="tutorModal"
          tabIndex="-1"
          toggle={toggleBlogModal}
        >
          <div className="container">
            <div className="section-heading text-center w-100">
              <ModalHeader toggle={toggleBlogModal}>Create a Post</ModalHeader>
            </div>
          </div>

          <ModalBody>
            <Formik
              initialValues={{
                bl_title: "",
                bl_desc: "",
                bl_image: "",
              }}
              validationSchema={Yup.object({
                bl_title: Yup.string()
                  .required("Please Enter Blog Title")
                  .nullable(),
                bl_desc: Yup.string()
                  .required("Please Enter Description")
                  .nullable(),
                bl_image: Yup.mixed()
                  .optional()
                  .test("fileFormat", "Unsupported Format", (value) => {
                    if (!blogForm?.["bl_image"]?.file?.type)
                      return blogForm["bl_image"].fileName === "" || false;
                    return ["image/jpg", "image/png", "image/jpeg"].includes(
                      blogForm?.["bl_image"].file.type
                    );
                  })
                  .nullable(),
              })}
              onSubmit={async (values) => {
                createBlog(values);
              }}
            >
              {({
                errors,
                touched,
                isSubmitting,
                handleSubmit,
                handleChange,
                setFieldValue,
                setFieldTouched,
                isLoggedIn,
                values,
              }) => (
                <Form
                  autoComplete="off"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    return false;
                  }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-2 d-flex justify-content-center align-items-center">
                        <Image
                          className="profile-img-blog"
                          src={
                            profilePicLocal
                              ? `${IMAGE_URL}/${profilePicLocal}`
                              : default_icon
                          }
                          alt=""
                          height={42}
                          width={42}
                        />
                      </div>
                      <div className="col-md-10 user-name">
                        <h3 className="mt-2">
                          <b>{userInfo?.fullName}</b>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 input--group">
                    <Field
                      className={`form-control ${
                        errors.bl_title && touched.bl_title ? "form-err" : ""
                      }`}
                      name="bl_title"
                      placeholder="Enter Blog Title"
                    />
                    {errors.bl_title && touched.bl_title ? (
                      <div className="form-err-msg">{errors.bl_title}</div>
                    ) : null}
                  </div>
                  <div className=" input--group">
                    <Field
                      className={`form-control ${
                        errors.bl_desc && touched.bl_desc ? "form-err" : ""
                      }`}
                      component="textarea"
                      rows="4"
                      name="bl_desc"
                      type="text"
                      placeholder="What's on your mind?"
                    />
                    <EmojiPicker
                      handleEmojiClick={(emoji) => {
                        setFieldValue("bl_desc", values.bl_desc + emoji);
                      }}
                    />
                    {errors.bl_desc && touched.bl_desc ? (
                      <div className="form-err-msg">{errors.bl_desc}</div>
                    ) : null}
                  </div>
                  <div className="input--group">
                    <Input
                      name="bl_image"
                      type="file"
                      accept=".png, .jpg"
                      placeholder="Add your pictures here."
                      onChange={(e) => {
                        let tempForm = blogForm;
                        tempForm["bl_image"]["fileName"] = e.target.value;
                        tempForm["bl_image"]["file"] = e.target.files[0];
                        setBlogForm(tempForm);
                      }}
                      invalid={!!touched.bl_image && !!errors.bl_image}
                      defaultValue={blogForm.bl_image?.fileName}
                    />
                    <span
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "14px",
                        right: "20px",
                      }}
                      // onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                      <Image src={`${icon_img}`} alt="" />
                    </span>
                    {errors.bl_image && touched.bl_image ? (
                      <div className="form-err-msg">{errors.bl_image}</div>
                    ) : null}
                  </div>
                  <button
                    disabled={isSubmitLoading}
                    className="cmn--btn bg-black text-white w-100"
                    type="submit"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                      <span>Create</span>
                    </div>
                  </button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
        <div className="container">
          <div className="books-section row g-3">
            <div className="col-lg-12 blog-main-section">
              <div className="blog-box d-flex justify-content-between mb-4">
                <div className="container">
                  <div className="row">
                    <div className="col-md-1">
                      <div className="name d-flex justify-content-center align-items-center">
                        <Image
                          className="profile-img-blogg"
                          src={
                            profilePicLocal && userInfo
                              ? `${IMAGE_URL}/${profilePicLocal}`
                              : default_icon
                          }
                          alt=""
                          height={42}
                          width={42}
                        />
                      </div>
                    </div>
                    <div className="col-md-11">
                      <textarea
                        onClick={() => {
                          toggleBlogModal();
                        }}
                        readOnly
                        style={{ marginLeft: "1%" }}
                        placeholder="Type here..."
                        className="form-control"
                        cols="30"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="row mt-3 col-sm-12">
                    <div className="col-md-1"></div>
                    <div className="col-md-3 col-sm-6 d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          toggleBlogModal();
                        }}
                        className="feeling checkResultBtnn"
                      >
                        <Image src={icon_img} alt="" />
                        <span style={{ marginLeft: "5px" }}>
                          <b>Pictures/Videos</b>
                        </span>
                      </button>
                    </div>
                    <div className="col-md-3 col-sm-6 d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          toggleBlogModal();
                        }}
                        className="feeling checkResultBtnn"
                      >
                        <Image src={grinning} alt="" />
                        {/* <i className="fa-solid fa-face-grin-wide fa-xl" /> */}
                        <span style={{ marginLeft: "5px" }}>
                          <b>Feeling/activity</b>
                        </span>
                      </button>
                    </div>
                    <div className="col-md-3"></div>
                    <div
                      className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        className="checkResultBtn"
                        onClick={() => {
                          toggleBlogModal();
                        }}
                      >
                        <b>Create</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="new_conects" style={{ color: "GrayText" }}>
                New Connects
              </h5>
              <div style={{ minHeight: "300px" }}>
                {isLoading ? (
                  <div
                    style={
                      isLoading
                        ? {
                            position: "relative",
                            opacity: "0.8",
                            minHeight: "300px",
                          }
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
                    {blogList &&
                      blogList.length > 0 &&
                      blogList.map((data, i) => {
                        return (
                          <>
                            <div
                              ref={
                                i === blogList.length - 1 ? lastItemRef : null
                              }
                              className="blog-box single-blog mt-3"
                            >
                              <div className="container">
                                <div className="row">
                                  <div className="col-md-1 d-flex teacher-list align-items-center justify-content-center">
                                    <Image
                                      src={
                                        data?.bl_creatorPic
                                          ? `${IMAGE_URL}/${data?.bl_creatorPic}`
                                          : default_icon
                                      }
                                      alt=""
                                      srcset=""
                                      height={42}
                                      width={42}
                                    />
                                  </div>
                                  <div className="col-md-11">
                                    <p className="subtitles mt-2">
                                      <b>{data?.bl_creatorName}</b>
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-1"></div>
                                  <div className="col-md-11">
                                    <p className="mt-3 blog-desc">
                                      {data?.bl_desc}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="container">
                                <div className="row g-2 g-sm-4 mt-2 mb-2">
                                  <div className="col-12">
                                    <div className="img-container">
                                      {data?.bl_image &&
                                        data?.bl_image != null && (
                                          <Image
                                            className="w-100 blog-img"
                                            src={`${IMAGE_URL}/${data?.bl_image}`}
                                            alt=""
                                            height={700}
                                            width={100}
                                          />
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container">
                                <div className="row g-2 g-sm-4 mt-2">
                                  <div className="container mt-4">
                                    <div className="row">
                                      <div className="mb-2 d-flex justify-content-start align-items-center col-md-4">
                                        <span className="col-md-6 me-3 d-flex icon justify-content-center">
                                          <SlHeart
                                            style={{
                                              color: data?.isLiked
                                                ? "#ff0000"
                                                : "",
                                            }}
                                            className="cursor-pointer"
                                            onClick={() => {
                                              if (!data?.isLiked) {
                                                likeBlog(
                                                  data?.bl_id,
                                                  i,
                                                  data?.bl_likeCount
                                                );
                                              }
                                            }}
                                          />{" "}
                                          <p className="m-0 ms-2">
                                            {data?.bl_likeCount > 0
                                              ? data?.bl_likeCount + " "
                                              : " "}
                                            Like
                                          </p>
                                        </span>
                                        <span
                                          className="col-md-6 d-flex align-items-center justify-content-center icon cursor-pointer"
                                          onClick={() => {
                                            if (!isLoggedIn) {
                                              loginAlert();
                                            } else {
                                              setSelectedBlogData(data);
                                            }
                                          }}
                                        >
                                          <BiMessageRounded />{" "}
                                          &nbsp;&nbsp;Comments
                                        </span>
                                      </div>
                                      <div className="col-md-8">
                                        <span className="blog-date d-flex align-items-center icon icon-color justify-content-end">
                                          <p className="m-0 ms-2">
                                            {moment(data?.bl_createdAt).format(
                                              "DD MMM YYYY"
                                            )}
                                          </p>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div></div>
                            </div>
                          </>
                        );
                      })}
                  </>
                )}
              </div>

              {/* Modal */}
              {selectedBlogData ? (
                <BlogModal
                  toggleModal={() => setSelectedBlogData(null)}
                  blogData={selectedBlogData}
                  userInfo={userInfo}
                />
              ) : null}

              {blogList.length >= 10 && !isLoading && (
                <button
                  className="cmn--btn text-center d-flex m-auto mt-3"
                  type="button"
                  onClick={() => getAllBlogsWithPagination(creatorType)}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
