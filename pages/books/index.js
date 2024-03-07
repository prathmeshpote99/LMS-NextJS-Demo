import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Modal } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@/components/pagination";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import bookImage from "@/assets/images/finalBook.jpg";
import shareB from "@/assets/images/icons/bShare.png";
import offline from "@/assets/images/icons/offline_icon.png";
import SubmitLoader from "@/components/Common/SubmitLoader";
import {
  getAuthToken,
  getFullUserInfo,
  getUserInfo,
} from "@/helpers/authHelper";
import {
  filterBookByBookTitle,
  filterBooks,
  getBookSubjects,
  getBooks,
} from "@/helpers/backendHelpers/book";
import { IMAGE_URL } from "@/helpers/urlHelper";
// import "./Books.scss";
import BooksSingle from "./BooksSingle";
import { useRouter } from "next/router";
import Image from "next/image";

const SignupSchema = Yup.object().shape({
  mainCategory: Yup.string().optional(),
  bookName: Yup.string().optional(),
  category: Yup.string().optional(),
  subcategory: Yup.string().optional(),
  topic: Yup.string().optional(),
});
const Books = () => {
  const [isFree, setIsFree] = useState("");
  const [resource, setResource] = useState("0");
  const [isFreeBool, setIsFreeBool] = useState("");
  const [subject, setSubject] = useState([]);
  const [freezedBooks, setFreezedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksForSearch, setBooksForSearch] = useState("");
  const [booksSearchItem, setBooksSearchItem] = useState([]);

  const [subCategoryListForSidebar, setSubCategoryListForSidebar] = useState(
    []
  );
  const [searchBookName, setSearchBookName] = useState("");
  const [error, setError] = useState("");
  const [noBooks, setNoBooks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState("");
  const [selectedSubCategoryDropdown, setSelectedSubCategoryDropdown] =
    useState("");

  const userInfo = getUserInfo();
  const fullUserInfo = getFullUserInfo();
  const isLoggedIn = getAuthToken() ? true : false;
  const [showDetails, setShowDetails] = useState(false);
  const [currentModalBookData, setCurrentModalBookData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiCurrentPage, setApiCurrentPage] = useState(1);

  const [bookCount, setBookCount] = useState(0);
  const [limit, setLimit] = useState(200);
  const [temp, setTemp] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [perPageLimit, setPerPageLimit] = useState(20);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [showMassage, setShowMassage] = useState(false);
  const [open, setOpen] = useState(false);
  //   const currentUrl = window.location.href;
  const [selectedBookImage, setSelectedBookImage] = useState("");
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBookSubject, setSelectedBookSubject] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    width: "40%",
    maxWidth: "300",
    backgroundColor: "white",
    border: "1px solid #888",
    padding: "20",

    "@media (max-width: 767px)": {
      width: "90%",
      height: "90%",
      padding: 0,
      overflowY: "scoll",
    },
  };

  const handleOpen = (bookImage, bookTitle, bookSubject) => {
    setSelectedBookImage(bookImage);
    setSelectedBookTitle(bookTitle);
    setSelectedBookSubject(bookSubject);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const copyToClipboard = () => {
  //     navigator.clipboard.writeText(currentUrl);
  //   };

  const ref = useRef();
  const handleSubjectChange = (e) => {
    var updatedList = [];
    if (e.target.checked) {
      updatedList = [e.target.value];
    }

    setSubject(updatedList);
    handleFilterChange(
      selectedCategory,
      selectedSubCategory,
      updatedList,
      isFreeBool,
      resource
    );
  };

  //   const location = useLocation();
  const router = useRouter();
  const pathName = router.pathname;
  //   const navigate = useNavigate();

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

  const handleReset = () => {
    setCurrentPage(1);
    setApiCurrentPage(1);
    setBooks([]);
    setFreezedBooks([]);
    setIsFree("");
    setSelectedCategory("");
    setSelectedSubCategory("");
    setSelectedCategoryDropdown("");
    setSelectedSubCategoryDropdown("");
    setSelectedTopic("");
    setSearchBookName("");
    setNoBooks(false);
    setSubject([]);
    setIsReset(!isReset);
    setResource("0");
    unCheck();
  };
  const unCheck = () => {
    var x = document.getElementsByClassName("subjects");
    let i = 0;
    for (i = 0; i <= x.length; i++) {
      x[i].checked = false;
    }
  };

  const setInitialState = () => {
    setSelectedCategory("");
    setSearchBookName("");
    setSubject([]);
    setIsFree("");
    setIsFreeBool("");
  };

  useEffect(() => {
    setInitialState();
    getAllBooks();
    // setResource('0')

    // Fetching all sub-categories
    const getAllSubCategories = async () => {
      try {
        const filterCategory = fullUserInfo?.st_level || fullUserInfo?.tc_level;
        let subjectList = await getBookSubjects(
          filterCategory,
          userInfo?.userType
        );
        subjectList = subjectList.data;
        setSubCategoryListForSidebar(subjectList);
      } catch (error) {
        setError(error);
      }
    };
    getAllSubCategories();
  }, [isReset]);

  useEffect(() => {
    // 0 = All, 1 = pdf, 2 = video, 3 = epub
    let filterdBooks;
    setCurrentPage(1);
    setApiCurrentPage(1);
    if (!resource && subject.length === 0 && !isFree) {
    } else {
      setBooks([]);
    }
    if (booksForSearch.length > 0) {
      if (subject.length > 0) {
        if (isFree) {
          if (resource && resource > 0) {
            if (isFree === "free") {
              if (resource === 1) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_pdf != null &&
                    data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 2) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_video != null &&
                    data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 3) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_epub != null &&
                    data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              }
            } else if (isFree === "paid") {
              if (resource === 1) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_pdf != null &&
                    !data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 2) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_video != null &&
                    !data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 3) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_epub != null &&
                    !data.bk_isFree &&
                    subject?.includes(data.bk_subCategory)
                );
              }
            } else {
              if (resource === 1) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_pdf != null &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 2) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_video != null &&
                    subject?.includes(data.bk_subCategory)
                );
              } else if (resource === 3) {
                filterdBooks = booksForSearch.filter(
                  (data) =>
                    data.bk_epub != null &&
                    subject?.includes(data.bk_subCategory)
                );
              }
            }
          } else {
            if (isFree === "free") {
              filterdBooks = booksForSearch.filter(
                (data) =>
                  data.bk_isFree && subject?.includes(data.bk_subCategory)
              );
            } else if (isFree === "paid") {
              filterdBooks = booksForSearch.filter(
                (data) =>
                  !data.bk_isFree && subject?.includes(data.bk_subCategory)
              );
            }
          }
        } else {
          if (resource === 0) {
            // getAllBooks()
            filterdBooks = booksForSearch.filter((data) =>
              subject?.includes(data.bk_subCategory)
            );
          } else if (resource === 1) {
            filterdBooks = booksForSearch.filter(
              (data) =>
                data.bk_pdf != null && subject?.includes(data.bk_subCategory)
            );
          } else if (resource === 2) {
            filterdBooks = booksForSearch.filter(
              (data) =>
                data.bk_video != null && subject?.includes(data.bk_subCategory)
            );
          } else if (resource === 3) {
            filterdBooks = booksForSearch.filter(
              (data) =>
                data.bk_epub != null && subject?.includes(data.bk_subCategory)
            );
          }
        }
      } else {
        if (isFree) {
          if (resource && resource > 0) {
            if (isFree === "free") {
              if (resource === 1) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_pdf != null && data.bk_isFree
                );
              } else if (resource === 2) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_video != null && data.bk_isFree
                );
              } else if (resource === 3) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_epub != null && data.bk_isFree
                );
              }
            } else if (isFree === "paid") {
              if (resource === 1) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_pdf != null && !data.bk_isFree
                );
              } else if (resource === 2) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_video != null && !data.bk_isFree
                );
              } else if (resource === 3) {
                filterdBooks = booksForSearch.filter(
                  (data) => data.bk_epub != null && !data.bk_isFree
                );
              }
            }
          } else {
            if (isFree === "free") {
              filterdBooks = booksForSearch.filter((data) => data.bk_isFree);
            } else if (isFree === "paid") {
              filterdBooks = booksForSearch.filter((data) => !data.bk_isFree);
            }
          }
        } else {
          if (resource === 0) {
            getAllBooks();
          } else if (resource === 1) {
            filterdBooks = booksForSearch.filter((data) => data.bk_pdf != null);
          } else if (resource === 2) {
            filterdBooks = booksForSearch.filter(
              (data) => data.bk_video != null
            );
          } else if (resource === 3) {
            filterdBooks = booksForSearch.filter(
              (data) => data.bk_epub != null
            );
          } else {
          }
        }
      }
    }

    if (!resource && subject.length === 0 && !isFree) {
    } else {
      setBooks(filterdBooks);
    }
    setBooksSearchItem(filterdBooks);
    setCurrentBooks(filterdBooks);

    if (filterdBooks?.length === 0) {
      setNoBooks(true);
    } else {
      setBookCount(filterdBooks?.length);
      setNoBooks(false);
    }

    if (userInfo?.userType === "student" || filterdBooks?.length < 1) {
      setShowMassage(true);
    }
    if (userInfo?.userType === "Teacher" || filterdBooks?.length < 1) {
      setShowMassage(true);
    } else {
      setShowMassage(false);
    }
  }, [resource, isFree, subject]);

  const getAllBooks = async () => {
    try {
      const fullUserInfo = getFullUserInfo();
      const level = fullUserInfo?.st_level || fullUserInfo?.tc_level;
      // console.log(fullUserInfo)
      let response = {};
      setIsLoading(true);
      if (userInfo) {
        if (
          userInfo?.userType === "Student" ||
          userInfo?.userType === "Premium"
        ) {
          response = await getBooks("Student", currentPage, limit, level);
        } else if (
          userInfo?.userType === "Teacher" ||
          userInfo?.userType === "Freelance"
        ) {
          response = await getBooks("Teacher", currentPage, limit, level);
        }
      } else {
        response = await getBooks("Student", currentPage, limit, "JHS");
      }
      let { books } = response.data;
      let { rows, count } = books;
      const totalPages = Math.ceil(count / limit);
      const hasNextPage = apiCurrentPage < totalPages;
      setFreezedBooks(rows);
      setBookCount(count);
      setBooks(rows);
      // setCurrentPage(1)
      setBooksForSearch(rows);
      setCurrentBooks(rows);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (books?.length > 0) {
      setPageNumbers([]);
      let pageNumbers = [];
      for (let i = 1; i <= Math.ceil(books?.length / perPageLimit); i++) {
        pageNumbers.push(i);
      }
      setPageNumbers(pageNumbers);
    }
  }, [books, perPageLimit]);

  const handleBookSearch = (e) => {
    const bookName = e.target.value;
    setSearchBookName(bookName);
    handleFilterChange(
      selectedCategory,
      selectedSubCategory,
      subject,
      isFreeBool,
      resource,
      bookName
    );
  };

  const handleFilterChange = async (
    category = "",
    subCategory = "",
    subject = [],
    isFree = "",
    resource = "",
    bookName = ""
  ) => {
    try {
      const student_level =
        fullUserInfo?.st_level || fullUserInfo?.tc_level || "JHS";

      setIsLoading(true);
      let response = await filterBooks(
        student_level,
        category,
        subCategory,
        subject,
        isFree,
        resource,
        userInfo?.userType,
        isLoggedIn,
        currentPage,
        limit,
        bookName
      );

      let { books } = response.data || {};
      let { rows, count } = books;
      let pageCount = Math.ceil(count / limit);

      setBooks(rows);
      setBookCount(pageCount);
      setFreezedBooks(rows);

      if (rows.length === 0) {
        setNoBooks(true);
      } else {
        setNoBooks(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleNextBookChange = async (
    category,
    subCategory,
    topic,
    subject,
    searchBookName,
    page,
    limit
  ) => {
    try {
      setIsLoading(true);
      let response = await filterBookByBookTitle(
        category,
        subCategory,
        topic,
        subject,
        searchBookName,
        page,
        limit
      );
      let { books } = response.data || {};
      let { rows, count } = books;
      // const totalPages = Math.ceil(count / limit)
      // const hasNextPage = apiCurrentPage < totalPages
      setBookCount(count);
      setBooks((prevList) => [...prevList, ...rows]);
      setBooksForSearch((prevList) => [...prevList, ...rows]);
      setFreezedBooks(rows);
      if (rows.length === 0) {
        setNoBooks(true);
      } else {
        setNoBooks(false);
      }
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "There was a problem creating freelance teacher";
      setBooks([]);
      setError(message);
      setIsLoading(false);
    }
  };

  const handlePrevBookChange = () => {
    const indexOfLastPost = apiCurrentPage * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    let oldBooks = books;
    oldBooks = books.splice(indexOfFirstPost, limit);
    setBooks(books);
    setBooksForSearch((prevList) => [...prevList, ...books]);
    paginate(1);
  };

  const toggleDetails = (bookData) => {
    setCurrentModalBookData(bookData);
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    setTemp((state) => state + 1);
  }, [resource]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (books && books.length > 0) {
      const indexOfLastPost = currentPage * perPageLimit;
      const indexOfFirstPost = indexOfLastPost - perPageLimit;
      const currentBooks = books?.slice(indexOfFirstPost, indexOfLastPost);
      setCurrentBooks(currentBooks);
    } else {
      setCurrentBooks([]);
    }
  }, [currentPage, books, perPageLimit]);

  return (
    <>
      {showDetails ? (
        <BooksSingle
          book={currentModalBookData}
          toggleDetails={toggleDetails}
        />
      ) : (
        <section className={`py-5`}>
          <div className="container">
            <div className="books-section row g-3">
              <div className="books-sidebar col-lg-3">
                <div className="books-sidebar-inner">
                  <div className="books-sidebar-top books-sidebar-widget">
                    <div className="container">
                      <div className="row">
                        <h5 className="col-md-8 mt-2 subtitle">Subjects</h5>
                        <button
                          className="col-md-4 border-0 bg-transparent"
                          type="button"
                          onClick={handleReset}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="books-sidebar-widget">
                    <div className="mt-2 books-sidebar-widget-tags" ref={ref}>
                      {subCategoryListForSidebar &&
                        subCategoryListForSidebar.map((item, i) => (
                          <label key={i}>
                            <input
                              className="subjects"
                              type="radio"
                              name="subject"
                              value={item}
                              onChange={(e) => {
                                handleSubjectChange(e);
                              }}
                            />
                            <span className="name">{item}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`books-wrapper col-lg-9`}>
                <div className="books-wrapper-header sticky-pagination pb-3">
                  <Formik
                    initialValues={{
                      bookName: "",
                      category: "",
                      subcategory: "",
                      topic: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, actions) => {
                      // handleSearchSubmit(values)
                      // actions.setSubmitting(false);
                    }}
                  >
                    {({
                      errors,
                      touched,
                      isSubmitting,
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      handleBlur,
                    }) => (
                      <Form autoComplete="off" onSubmit={handleSubmit}>
                        <div className="filter-form-wrapper-book">
                          {currentBooks && currentBooks.length > 0 && (
                            <div className="mt-4 px-2 col-md-9">
                              <Pagination
                                apiCurrentPage={apiCurrentPage}
                                currentPage={currentPage}
                                totalLimit={limit}
                                totalPosts={books?.length}
                                paginate={paginate}
                                setApiCurrentPage={setApiCurrentPage}
                                handleNextBookChange={handleNextBookChange}
                                pageNumbers={pageNumbers}
                                handlePrevBookChange={handlePrevBookChange}
                                bookCount={bookCount}
                              />
                            </div>
                          )}
                          <div className="select--item col-md-3 mt-2">
                            <div className="inner">
                              <Field
                                className={`form--control ${
                                  errors.name && touched.name ? "form-err" : ""
                                }`}
                                name="bookName"
                                placeholder={`${
                                  errors.bookName && touched.bookName
                                    ? "Search Name Must"
                                    : "Search here"
                                }`}
                                value={searchBookName}
                                onInput={handleBookSearch}
                              />
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
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
                  <div className="py-2 px-2">
                    {noBooks ? (
                      <div
                        className="mt-2 library__item-img"
                        style={{
                          textAlign: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <Image src={bookImage} alt="Book Library" />
                        No system activity found.
                      </div>
                    ) : null}
                    <div className="row g-3 g-md-4 g-lg-3 g-xl-4 mt-1">
                      {currentBooks &&
                        currentBooks.length > 0 &&
                        currentBooks.map((data) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-lg-6 col-xl-3">
                              <div className="bg-white library__item">
                                <div className="library__item-img">
                                  <Image
                                    className="cursor-pointer"
                                    src={`${IMAGE_URL}/${data?.bk_preview}`}
                                    width={50}
                                    height={150}
                                    // fill
                                    alt=""
                                    onClick={() => {
                                      if (!isLoggedIn) {
                                        loginAlert();
                                      } else {
                                        // toggleDetails(data);
                                      }
                                    }}
                                  />
                                </div>
                                <div className="row">
                                  <div className="container text-center cursor-pointer">
                                    {/* <Image
                                  className="book-page-icons"
                                  src={pages}
                                  alt=""
                                  /> */}
                                    <Tooltip
                                      title="Share"
                                      arrow
                                      placement="right-start"
                                    >
                                      <Image
                                        onClick={() => {
                                          if (!isLoggedIn) {
                                            loginAlert();
                                          } else {
                                            // handleOpen(
                                            //   data?.bk_preview,
                                            //   data?.bk_title,
                                            //   data?.bk_subCategory
                                            // );
                                          }
                                        }}
                                        className="book-page-iconss"
                                        src={shareB}
                                        alt=""
                                      />
                                    </Tooltip>
                                  </div>
                                </div>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-title"
                                  aria-describedby="modal-description"
                                >
                                  <Box sx={style}>
                                    <div
                                      className="head"
                                      style={{
                                        textAlign: "right",
                                        backgroundColor: "#000",
                                        height: "7vh",
                                      }}
                                    >
                                      <Button
                                        className="mt-2"
                                        varient="contained"
                                        color="primary"
                                        onClick={handleClose}
                                      >
                                        <i
                                          style={{ color: "white" }}
                                          className="fa-solid fa-xmark"
                                        ></i>
                                      </Button>
                                    </div>
                                    <Typography varient="h6" id="modal-title">
                                      <div
                                        className="row mt-5"
                                        style={{
                                          width: "95%",
                                          height: "25vh",
                                          marginLeft: "5%",
                                        }}
                                      >
                                        <div className="col-md-4">
                                          <Image
                                            // style={{
                                            //   height: "90%",
                                            //   width: "90%",
                                            // }}
                                            fill
                                            src={`${IMAGE_URL}/${selectedBookImage}`}
                                            alt=""
                                          />
                                        </div>
                                        <div className="mt-2 col-md-8">
                                          <h6>E-Book</h6>
                                          <h6 className="mt-2 title">
                                            Subject:{" "}
                                            <span className="text-secondary">
                                              {selectedBookSubject}
                                            </span>
                                          </h6>
                                          <h6 className="mt-2 title">
                                            Topic:{" "}
                                            <span className="text-secondary">
                                              {selectedBookTitle}
                                            </span>
                                          </h6>
                                        </div>
                                      </div>
                                    </Typography>
                                    <div
                                      className="mt-5"
                                      style={{ textAlign: "center" }}
                                    >
                                      <TextField
                                        style={{
                                          width: "80%",
                                          marginBottom: "0%",
                                          border: "1px solid black",
                                          padding: "0% 2%",
                                          textDecoration: "none",
                                        }}
                                        id="outlined-multiline-flexible"
                                        // value={currentUrl}
                                        multiline
                                        maxRows={4}
                                      />
                                      <div
                                        style={{
                                          textAlign: "center",
                                          marginLeft: "10%",
                                        }}
                                      >
                                        <hr style={{ width: "90%" }} />
                                      </div>
                                      <div className="container">
                                        <div
                                          className="row"
                                          style={{
                                            textAlign: "center",
                                            marginBottom: "3%",
                                          }}
                                        >
                                          <Button
                                            className="col-md-6 copylink"
                                            // onClick={copyToClipboard}
                                          >
                                            <i
                                              className="fa-solid fa-copy"
                                              style={{ marginRight: "5px" }}
                                            ></i>{" "}
                                            Copy Link
                                          </Button>

                                          {userInfo?.userType === "Teacher" ? (
                                            <Button
                                              className="col-md-6 copylink1"
                                              //   onClick={copyToClipboard}
                                            >
                                              <i
                                                className="fa-solid fa-copy"
                                                style={{ marginRight: "5px" }}
                                              ></i>{" "}
                                              Share to LMS &nbsp;
                                              <Image src={offline} alt="" />
                                              &nbsp; Tuition
                                            </Button>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Box>
                                </Modal>
                                <div
                                  className="library__item-cont cursor-pointer d-flex justify-content-center text-center"
                                  onClick={() => {
                                    if (!isLoggedIn) {
                                      loginAlert();
                                    } else {
                                      // toggleDetails(data);
                                    }
                                  }}
                                >
                                  {data?.bk_title}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Books;
