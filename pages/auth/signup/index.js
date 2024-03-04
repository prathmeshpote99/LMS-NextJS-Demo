import ButtonLoader from "@/components/Common/ButtonLoader";
import ContinueSubmitForm from "@/components/Common/ContinueSubmitForm";
import { Field, Form, Formik } from "formik";
import RegionDistrictCircuitDropDownAllSelectable from "@/helpers/RegionDistrictCircuitDropDownAllSelectable";
import {
  generateStudentOTPAPI,
  generateTeacherOTPAPI,
} from "@/helpers/backendHelpers/auth";
import { getCategories } from "@/helpers/backendHelpers/book";
import { getAllSchoolByArea } from "@/helpers/backendHelpers/student";
import { getAllRegion } from "@/helpers/backendHelpers/teacher";
import { defaultRDCSeparator } from "@/helpers/common";
import {
  certificateList,
  languages,
  levels,
  subjectsMaster,
  yearsOfExperience,
} from "@/helpers/dropdownVals";
import { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaEnvelope, FaPhone, FaPhoneAlt } from "react-icons/fa";
import OtpInput from "react-otp-input";
import Link from "next/link";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { AuthContext } from "@/contexts/AuthContext";
import {
  reSendOtpSMS,
  reSendOtpSMSStudent,
  signUpParent,
  signUpPublisher,
  signUpStudent,
  signUpTeacher,
  verifyOtpAPI,
  verifyStudentOtpAPI,
} from "@/helpers/backendHelper";
import PasswordInput from "../PasswordInput";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
  tc_fullName: Yup.string()
    .min(5, "Please enter minimum 5 characters")
    .required("Please enter fullname")
    .test("tc_fullName", "Special characters are not allowed", (value) => {
      return !/[*:;\/=\\$#%&%@()]/.test(value) && !/-/.test(value);
    }),
  // tc_region: Yup.string().required('Please Select Region'),
  tc_email: Yup.string().email("Invalid email").required("Please enter email"),
  tc_phoneNumber: Yup.string()
    .required("Please enter phone number")
    .matches(/^\d{9}$/, "Please enter 9 digit number,without adding 0"),
  tc_password: Yup.string()
    .min(6, "Password must be more than 6 characters")
    .required("Please enter password"),
  confirmPassword: Yup.string().when("tc_password", (tc_password, field) =>
    tc_password
      ? field
          .required("Please confirm password")
          .oneOf([Yup.ref("tc_password")], "Password does not match.")
      : field
  ),
  tc_level: Yup.string().required("Please enter level").nullable(),
  tc_experience: Yup.string().required("Please enter experience").nullable(),
  tc_languageSpoken: Yup.mixed().test(
    "invalidInput",
    "Please select languages",
    (value) => {
      if (value) {
        return value.length;
      } else {
        return false;
      }
    }
  ),
  tc_subject: Yup.mixed().test(
    "invalidInput",
    "Please select subjects",
    (value) => {
      if (value) {
        return value.length;
      } else {
        return false;
      }
    }
  ),
  tc_certificate: Yup.string()
    .required("Please enter certificate names")
    .nullable(),
  tc_briefProfile: Yup.string()
    .required("Please enter brief profile")
    .test("tc_briefProfile", "Special characters are not allowed", (value) => {
      return !/[*:;\/=\\$#%&%@()]/.test(value) && !/-/.test(value);
    })
    .nullable(),
  areaValue: Yup.mixed().test(
    "invalidInput",
    "Please select region-district",
    (value) => {
      return !!value;
    }
  ),
  tc_schoolId: Yup.string().required("Please select school").nullable(),
});

const SignupStudentSchema = Yup.object().shape({
  st_fullName: Yup.string()
    .min(5, "Please enter minimum 5 characters")
    .test("st_fullName", "Special characters are not allowed", (value) => {
      return !/[*:;\/=\\$#%&%@()]/.test(value) && !/-/.test(value);
    })
    .required("Please enter fullname"),
  st_email: Yup.string()
    .email("Invalid email address")
    .required("Please enter email"),
  // st_studentId: Yup.string().required('Please enter studentid'),
  st_password: Yup.string()
    .min(6, "Password must be more than 6 characters")
    .required("Please enter password"),
  st_phoneNumber: Yup.string()
    .required("Please enter phone number")
    .matches(/^\d{9}$/, "Please enter 9 digit number,without adding 0"),
  confirmPassword: Yup.string().when("st_password", (st_password, field) =>
    st_password
      ? field
          .required("Please confirm password")
          .oneOf([Yup.ref("st_password")], "Password does not match.")
      : field
  ),
  areaValue: Yup.mixed().test(
    "invalidInput",
    "Please select region-district",
    (value) => {
      return !!value;
    }
  ),
  st_schoolId: Yup.string().required("Please select school").nullable(),
  st_parentEmail: Yup.string().email("Invalid email address").notRequired(),
  st_class: Yup.string().required("Please enter class").nullable(),
  st_parentPhoneNumber: Yup.string()
    .required("Please enter parent phone number")
    .matches(/^\d{9}$/, "Please enter 9 digit number,without adding 0")
    .nullable(),
});

const SignupParentSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").notRequired(),
  phone: Yup.string()
    .required("Please enter phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  password: Yup.string()
    .min(4, "Password must be more than 6 characters")
    .required("Please enter password"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required("Please confirm password")
          .oneOf([Yup.ref("password")], "Password does not match.")
      : field
  ),
});

const SignupPublisherSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  email: Yup.string().email("Invalid email").notRequired(),
  phone: Yup.string()
    .required("Please enter your phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  password: Yup.string()
    .min(4, "Password must be more than 6 characters")
    .required("Please Enter Password"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required("Please confirm your password")
          .oneOf([Yup.ref("password")], "Password does not match.")
      : field
  ),
});

const SignUp = () => {
  const router = useRouter();
  const [regionList, setRegionList] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [registerStep, setRegisterStep] = useState(1);
  const [signUpUser, setSignUpUser] = useState(1);
  const [emailOtp, setEmailOtp] = useState(0);
  const [phoneOtp, setPhoneOtp] = useState(0);
  const [teacherData, setTeacherData] = useState({});
  const [studentData, setStudentData] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedLevel, setselectedLevel] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [schoolDropdownValues, setSchoolDropdownValues] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [continueSubmitModal, setContinueSubmitModal] = useState(false);
  const [submitUserType, setSubmitUserType] = useState(1);
  const [showError, setShowError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [disabledResendCode, setDisabledResendCode] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Teacher");

  const otpInput = {
    width: "100%",
    padding: "20px 0",
    borderRadius: "5px",
    // border: "none",
    margin: "0 5px",
  };

  // let location = useLocation()
  let name = router?.query?.tabName ? router?.query?.tabName : "Teacher";

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/my-library");
    } else {
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchAllArea();
    getAllCategories();
  }, []);

  const handleTeacherSignUp = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await signUpTeacher(data);
      if (response.status) {
        setSignUpUser(1);
        setRegisterStep(2);
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let errors = error?.response?.data?.error?.errors;

      const errorMessageFirstKey = Object.keys(errors)[0]; // Get the first key
      const errorMessage = errors[errorMessageFirstKey];

      const message =
        errorMessage || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };

  const handleStudentSignUp = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await signUpStudent(data);
      if (response.status) {
        setSignUpUser(2);
        setRegisterStep(2);
      }
      // router.push('/my-library')
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let errors = error?.response?.data?.error?.errors;

      const errorMessageFirstKey = Object.keys(errors)[0]; // Get the first key
      const errorMessage = errors[errorMessageFirstKey];

      const message =
        errorMessage || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };

  const fetchAllArea = async () => {
    try {
      const response = await getAllRegion();
      const { regions } = response.data;
      setRegionList(regions);
    } catch (error) {
      let finalMsg = error?.response?.data?.message?.replace(/,/g, "\n");
      const message =
        finalMsg || error?.message || "There was problem while sign up";
      console.log("error", message);
    }
  };

  const handleParentSignUp = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await signUpParent(data);
      router.push("/my-library");
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let errors = error?.response?.data?.error?.errors;

      const errorMessageFirstKey = Object.keys(errors)[0]; // Get the first key
      const errorMessage = errors[errorMessageFirstKey];

      const message =
        errorMessage || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };
  const handlePublisherSignUp = async (data) => {
    try {
      setIsSubmitLoading(true);
      const response = await signUpPublisher(data);
      router.push("/my-library");
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let errors = error?.response?.data?.error?.errors;

      const errorMessageFirstKey = Object.keys(errors)[0]; // Get the first key
      const errorMessage = errors[errorMessageFirstKey];

      const message =
        errorMessage || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };
  const handleEmailOtp = (e) => {
    setEmailOtp(e);
    if (e.length === 6) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  };
  const handlePhoneOtp = (e) => {
    setPhoneOtp(e);
    if (e.length === 6) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const verifyTeacherOtp = async (otpType) => {
    try {
      setIsSubmitLoading(true);
      // toast.success('Registration successful,Please Login')
      let body = {};
      body = {
        otp: otpType === 1 ? emailOtp : phoneOtp,
        email: teacherData?.tc_email,
        otpType,
      };
      const response = await verifyOtpAPI(body);
      if (response.status) {
        if (otpType === 1) {
          setRegisterStep(3);
          reSendTimer(0, 30);
        } else {
          toast.success("Registration successful,Please Login", {
            autoClose: 2000,
          });
          setTimeout(() => {
            router.push("/auth/signin");
          }, 2000);
        }
      } else {
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let finalMsg = error?.response?.data?.message?.replace(/,/g, "\n");
      const message =
        finalMsg || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };

  const verifyStudentOtp = async (otpType) => {
    try {
      setIsSubmitLoading(true);
      let body = {};
      body = {
        otp: otpType === 1 ? emailOtp : phoneOtp,
        email: studentData?.st_email,
        otpType,
      };
      const response = await verifyStudentOtpAPI(body);
      if (response.status) {
        if (otpType === 1) {
          setRegisterStep(3);
          reSendTimer(0, 30);
        } else {
          toast.success("Registration successful,Please Login", {
            autoClose: 2000,
          });
          setTimeout(() => {
            router.push("/auth/signin");
          }, 2000);
        }
      } else {
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let finalMsg = error?.response?.data?.message?.replace(/,/g, "\n");
      const message =
        finalMsg || error?.message || "There was problem while sign up";
      toast.error(message, {
        autoClose: 2000,
      });
    }
  };

  const reSend = async (type) => {
    try {
      setIsSubmitLoading(true);
      let body = {};
      let response = {};
      if (submitUserType === 1) {
        body = {
          email: teacherData?.tc_email,
          type: type,
        };
        response = await generateTeacherOTPAPI(body);
      } else if (submitUserType === 2) {
        body = {
          email: studentData?.st_email,
          type: type,
        };
        response = await generateStudentOTPAPI(body);
      }
      if (response.status) {
        toast.success("Otp Resend Successfully", {
          autoClose: 2000,
        });
      } else {
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let finalMsg = error?.response?.data?.message?.replace(/,/g, "\n");
      const message =
        finalMsg || error?.message || "There was problem while sign up";
      console.log("error", message);
    }
  };

  const reSendSMS = async () => {
    try {
      setIsSubmitLoading(true);
      let response = {};
      if (submitUserType === 1) {
        response = await reSendOtpSMS(teacherData?.tc_phoneNumber, 1);
      } else if (submitUserType === 2) {
        response = await reSendOtpSMSStudent(studentData?.st_phoneNumber, 1);
      }
      if (response.status) {
        toast.success("Otp Resend Successfully", {
          autoClose: 2000,
        });
      } else {
      }
      setIsSubmitLoading(false);
    } catch (error) {
      setIsSubmitLoading(false);
      let finalMsg = error?.response?.data?.message?.replace(/,/g, "\n");
      const message =
        finalMsg || error?.message || "There was problem while sign up";
      console.log("error", message);
    }
  };

  const fetchAllSchoolByArea = async (values, oldVal) => {
    if (values === "") {
      // setSchoolDropdownValues([])
      // if (userInfo.userType === 'Student') {
      //   setStudentForm({ ...studentForm, st_schoolId: '' })
      // } else if (userInfo.userType === 'Teacher') {
      //   setTeacherForm({ ...teacherForm, tc_schoolId: '' })
      // }
    } else {
      try {
        let [region, district, circuit] =
          (values + "" || "")?.split(defaultRDCSeparator) || [];
        region = region || "";
        district = district || "";
        circuit = circuit || "";

        const response = await getAllSchoolByArea(region, district, circuit);
        let { schools } = response.data || {};

        let dropdownVals = schools.map((school) => {
          return { value: school.sc_id, label: school.sc_schoolName };
        });

        dropdownVals = dropdownVals || [];
        setSchoolDropdownValues(dropdownVals);
        if (oldVal) {
          const defVal = dropdownVals.find((item) => item.value === oldVal);
          defVal && setSelectedSchool(defVal);
        }
      } catch (error) {
        let message =
          error?.response?.data?.message ||
          error?.message ||
          "There Was A Problem Fetching Schools";

        setSchoolDropdownValues([]);
      }
    }
  };

  const getAllCategories = async (filterCategory = "") => {
    try {
      let response = await getCategories();
      let { categories } = response.data;
      let vals = [];
      let mainCategoryArray = [];

      if (filterCategory) {
        let filteredData = categories.filter(
          (data) => data.categoryId === filterCategory
        );
        filteredData[0].category.map((data) => {
          vals.push({ name: data.CategoryName, value: data.CategoryName });
        });
      } else {
        categories.map((mainCategory) => {
          let val = [];
          let { category } = mainCategory;

          category.map((cat) => {
            val.push({ label: cat.CategoryName, value: cat.CategoryName });
          });
          mainCategoryArray.push({
            label: mainCategory.categoryName,
            options: val,
          });
        });
      }
      setCategoryList(mainCategoryArray);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleContinueSubmitting = () => {
    if (submitUserType === 1) {
      handleTeacherSignUp(teacherData);
    } else if (submitUserType === 2) {
      handleStudentSignUp(studentData);
    }
  };

  const toggleContinueSubmitModal = () => {
    setContinueSubmitModal(!continueSubmitModal);
  };

  useEffect(() => {
    if (registerStep >= 2) {
      if (seconds === 0) {
        setDisabledResendCode(false);
      } else {
        setDisabledResendCode(true);
      }
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, registerStep]);

  const reSendTimer = (min, sec) => {
    setMinutes(min);
    setSeconds(sec);
  };

  return (
    <>
      <ContinueSubmitForm
        isOpen={continueSubmitModal}
        modalTitle={"Confirm Account Details"}
        toggle={toggleContinueSubmitModal}
        handleContinueSubmitting={handleContinueSubmitting}
        teacherData={teacherData}
        studentData={studentData}
        submitUserType={submitUserType}
      />
      <ToastContainer position="top-right" />
      <section className="auth-section pt-100 pb-100">
        <div className="container">
          <div className="auth-wrapper bg-white">
            <>
              <div className="auth-top">
                <h3 className="px-5 border-0 mb-5">Sign Up</h3>
              </div>
              {registerStep === 1 && (
                <>
                  <ul className="nav nav-tabs auto-tab">
                    <li
                      // className="active"
                      className={`${name === "Teacher" && "active"}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Teacher"
                      onClick={() => setSelectedTab("Teacher")}
                    >
                      <span>Freelance Teacher</span>
                      <FaAngleDown />
                    </li>
                    <li
                      className={`${name === "Student" && "active"}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Student"
                      onClick={() => setSelectedTab("Student")}
                    >
                      <span>Premium Learner</span>
                      <FaAngleDown />
                    </li>
                    {/* <li
                      className={`${name === 'Parent' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Parent"
                    >
                      <span>Parent</span>
                      <FaAngleDown />
                    </li>
                    <li
                      className={`${name === 'Publisher' && 'active'}`}
                      data-bs-toggle="tab"
                      data-bs-target="#Publisher"
                    >
                      <span>Publisher</span>
                      <FaAngleDown />
                    </li> */}
                  </ul>
                  <div className="tab-content px-5">
                    <div
                      className={`tab-pane fade ${
                        name === "Teacher" && "show active"
                      }`}
                      id="Teacher"
                    >
                      {/* teacher sign up */}
                      <Formik
                        initialValues={{
                          tc_fullName: "",
                          tc_email: "",
                          tc_phoneNumber: "",
                          tc_password: "",
                          confirmPassword: "",
                          tc_countryCode: "+233",
                          tc_country: "Ghana",
                          tc_region: "",
                          // tc_alsoKnownAs: '',
                          tc_level: "",
                          tc_experience: "",
                          tc_languageSpoken: "",
                          tc_subject: "",
                          tc_certificate: "",
                          tc_briefProfile: "",
                          tc_schoolId: "",
                          areaValue: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, actions) => {
                          let tempTeacherData = {};
                          let [tc_region, tc_district, tc_circuit] =
                            (values?.areaValue + "" || "")?.split(
                              defaultRDCSeparator
                            ) || [];
                          let tc_languageSpoken = selectedLanguages.map(
                            (data) => data.value
                          );
                          let tc_subject = selectedSubjects.map(
                            (data) => data.value
                          );
                          tc_region = tc_region || null;
                          tc_district = tc_district || null;
                          tc_circuit = tc_circuit || null;
                          tempTeacherData["tc_region"] = tc_region;
                          tempTeacherData["tc_district"] = tc_district;
                          tempTeacherData["tc_circuit"] = tc_circuit;
                          tempTeacherData["tc_languageSpoken"] =
                            tc_languageSpoken.toString();
                          tempTeacherData["tc_subject"] = tc_subject.toString();

                          const teacherData = {
                            tc_fullName: values.tc_fullName,
                            tc_email: values.tc_email,
                            tc_phoneNumber: values.tc_phoneNumber,
                            tc_password: values.tc_password,
                            tc_country: values.tc_country,
                            tc_countryCode: values.tc_countryCode,
                            // tc_alsoKnownAs: values.tc_alsoKnownAs,
                            tc_level: values.tc_level,
                            tc_experience: values.tc_experience,
                            tc_certificate: values.tc_certificate,
                            tc_briefProfile: values.tc_briefProfile,
                            tc_region: tempTeacherData["tc_region"],
                            tc_district: tempTeacherData["tc_district"],
                            tc_circuit: tempTeacherData["tc_circuit"],
                            tc_languageSpoken:
                              tempTeacherData["tc_languageSpoken"],
                            tc_subject: tempTeacherData["tc_subject"],
                            tc_staffId: 0,
                            tc_schoolId: values.tc_schoolId,
                            tc_userType: 2,
                            isFirstTimeLogin: 1,
                          };
                          setSubmitUserType(1);
                          toggleContinueSubmitModal();
                          setTeacherData(teacherData);
                          // handleTeacherSignUp(teacherData)
                          actions.setSubmitting(false);
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          setFieldTouched,
                          setFieldValue,
                          handleChange,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.tc_fullName && touched.tc_fullName
                                    ? "form-err"
                                    : ""
                                }`}
                                name="tc_fullName"
                                placeholder="Full Name"
                              />
                              {/* <span className="icon">
                                <FaUser />
                              </span> */}
                              {errors.tc_fullName && touched.tc_fullName ? (
                                <div className="form-err-msg">
                                  {errors.tc_fullName}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.tc_email && touched.tc_email
                                    ? "form-err"
                                    : ""
                                }`}
                                name="tc_email"
                                placeholder="Email Address"
                              />
                              <span className="icon">
                                <FaEnvelope />
                              </span>
                              {errors.tc_email && touched.tc_email ? (
                                <div className="form-err-msg ">
                                  {errors.tc_email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-3">
                                  <Field
                                    className={`form-control common-input ${
                                      errors.tc_countryCode &&
                                      touched.tc_countryCode
                                        ? "form-err"
                                        : ""
                                    } pe-0`}
                                    as="select"
                                    name="tc_countryCode"
                                  >
                                    <option value="+233" selected>
                                      233
                                    </option>
                                    <option value="+91">91</option>
                                  </Field>
                                </div>
                                <div className="col-md-9">
                                  <Field
                                    className={`form-control common-input ${
                                      errors.tc_phoneNumber &&
                                      touched.tc_phoneNumber
                                        ? "form-err"
                                        : ""
                                    }`}
                                    name="tc_phoneNumber"
                                    placeholder="Phone Number"
                                    type="number"
                                  />
                                  <span className="icon">
                                    <FaPhoneAlt />
                                  </span>
                                  {errors.tc_phoneNumber &&
                                  touched.tc_phoneNumber ? (
                                    <div className="form-err-msg">
                                      {errors.tc_phoneNumber}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-6">
                                  <RegionDistrictCircuitDropDownAllSelectable
                                    isStyled={true}
                                    className="common-input no-border"
                                    showLabel={false}
                                    isRequired={true}
                                    fieldName="areaValue"
                                    hasTouched={touched.areaValue}
                                    hasErrors={errors.areaValue}
                                    areaValue={values.areaValue}
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    areaChange={fetchAllSchoolByArea}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <div className="input--group">
                                    <Select
                                      className="common-input no-border"
                                      name="tc_schoolId"
                                      placeholder="Select school"
                                      value={selectedSchool}
                                      onChange={(value) => {
                                        setSelectedSchool(value);
                                        setFieldValue(
                                          "tc_schoolId",
                                          value ? value.value : ""
                                        );
                                      }}
                                      onBlur={(evt) => {
                                        setFieldTouched(
                                          "tc_schoolId",
                                          true,
                                          true
                                        );
                                      }}
                                      options={schoolDropdownValues}
                                      isClearable
                                      invalid={
                                        touched.tc_schoolId &&
                                        errors.tc_schoolId
                                      }
                                    />
                                    {touched.tc_schoolId &&
                                      errors.tc_schoolId && (
                                        <div className="invalid-react-select-dropdown">
                                          {errors.tc_schoolId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-6">
                                  <Select
                                    className="common-input no-border"
                                    name="tc_level"
                                    placeholder="Select level"
                                    value={selectedLevel}
                                    onChange={(value) => {
                                      setselectedLevel(value);
                                      setFieldValue(
                                        "tc_level",
                                        value ? value.value : ""
                                      );
                                    }}
                                    onBlur={(evt) => {
                                      setFieldTouched("tc_level", true, true);
                                    }}
                                    options={levels}
                                    isClearable
                                    invalid={
                                      touched.tc_level && errors.tc_level
                                    }
                                  />
                                  {touched.tc_level && errors.tc_level && (
                                    <div className="invalid-react-select-dropdown">
                                      {errors.tc_level}
                                    </div>
                                  )}
                                </div>
                                <div className="col-md-6">
                                  <Select
                                    className="common-input no-border"
                                    name="tc_experience"
                                    placeholder="Years of experience"
                                    value={selectedExperience}
                                    onChange={(value) => {
                                      setSelectedExperience(value);
                                      setFieldValue(
                                        "tc_experience",
                                        value ? value.value : ""
                                      );
                                    }}
                                    onBlur={(evt) => {
                                      setFieldTouched(
                                        "tc_experience",
                                        true,
                                        true
                                      );
                                    }}
                                    options={yearsOfExperience}
                                    isClearable
                                    invalid={
                                      touched.tc_experience &&
                                      errors.tc_experience
                                    }
                                  />
                                  {touched.tc_experience &&
                                    errors.tc_experience && (
                                      <div className="invalid-react-select-dropdown">
                                        {errors.tc_experience}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-6">
                                  <Select
                                    className="common-input no-border"
                                    isMulti
                                    name="tc_languageSpoken"
                                    placeholder="Select languages"
                                    value={selectedLanguages}
                                    onChange={(value) => {
                                      setSelectedLanguages(value);
                                      setFieldValue(
                                        "tc_languageSpoken",
                                        value ? value : ""
                                      );
                                    }}
                                    onBlur={(evt) => {
                                      setFieldTouched(
                                        "tc_languageSpoken",
                                        true,
                                        true
                                      );
                                    }}
                                    options={languages}
                                    isClearable
                                    invalid={
                                      touched.tc_languageSpoken &&
                                      errors.tc_languageSpoken
                                    }
                                  />
                                  {touched.tc_languageSpoken &&
                                    errors.tc_languageSpoken && (
                                      <div className="invalid-react-select-dropdown">
                                        {errors.tc_languageSpoken}
                                      </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                  <Select
                                    className="common-input no-border"
                                    name="tc_certificate"
                                    placeholder="Select certificates"
                                    value={selectedCertificate}
                                    onChange={(value) => {
                                      setSelectedCertificate(value);
                                      setFieldValue(
                                        "tc_certificate",
                                        value ? value.value : ""
                                      );
                                    }}
                                    onBlur={(evt) => {
                                      setFieldTouched(
                                        "tc_certificate",
                                        true,
                                        true
                                      );
                                    }}
                                    options={certificateList}
                                    isClearable
                                    invalid={
                                      touched.tc_certificate &&
                                      errors.tc_certificate
                                    }
                                  />
                                  {touched.tc_certificate &&
                                    errors.tc_certificate && (
                                      <div className="invalid-react-select-dropdown">
                                        {errors.tc_certificate}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="input--group">
                              <div className="ro">
                                <div className="col-md-12">
                                  <Select
                                    className="common-input no-border"
                                    isMulti
                                    name="tc_subject"
                                    placeholder="Select subjects"
                                    value={selectedSubjects}
                                    onChange={(value) => {
                                      setSelectedSubjects(value);
                                      setFieldValue(
                                        "tc_subject",
                                        value ? value : ""
                                      );
                                    }}
                                    onBlur={(evt) => {
                                      setFieldTouched("tc_subject", true, true);
                                    }}
                                    options={subjectsMaster}
                                    isClearable
                                    invalid={
                                      touched.tc_subject && errors.tc_subject
                                    }
                                  />
                                  {touched.tc_subject && errors.tc_subject && (
                                    <div className="invalid-react-select-dropdown">
                                      {errors.tc_subject}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.tc_alsoKnownAs &&
                                  touched.tc_alsoKnownAs
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="tc_alsoKnownAs"
                                placeholder="Nick Name (AKA)"
                              />
                              {errors.tc_alsoKnownAs &&
                              touched.tc_alsoKnownAs ? (
                                <div className="form-err-msg">
                                  {errors.tc_alsoKnownAs}
                                </div>
                              ) : null}
                            </div> */}

                            {/* <div className="input--group">
                              <div className="row">
                                <div className="col">
                                  <Field
                                    className={`form-control ${
                                      errors.tc_country && touched.tc_country
                                        ? 'form-err'
                                        : ''
                                    } pe-0`}
                                    as="select"
                                    name="tc_country"
                                  >
                                    <option value="ghana" selected>
                                      Ghana
                                    </option>
                                  </Field>
                                </div>
                                <div className="col">
                                  <Field
                                    className={`form-control ${
                                      errors.tc_region && touched.tc_region
                                        ? 'form-err'
                                        : ''
                                    } pe-0`}
                                    as="select"
                                    name="tc_region"
                                  >
                                    <option value="" disabled>
                                      Select Region
                                    </option>
                                    {regionList &&
                                      regionList.length > 0 &&
                                      regionList.map((data) => {
                                        return (
                                          <>
                                            <option value={data.ar_region}>
                                              {data.ar_region}
                                            </option>
                                          </>
                                        )
                                      })}
                                  </Field>
                                  {errors.region && touched.region ? (
                                    <div className="form-err-msg">
                                      {errors.region}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div> */}
                            <div className="input--group">
                              <PasswordInput
                                isStyled={true}
                                className="common-input"
                                errors={errors.tc_password}
                                touched={touched.tc_password}
                                placeholder="Enter password"
                                name="tc_password"
                              />
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                isStyled={true}
                                className="common-input"
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm password"
                                name="confirmPassword"
                              />
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.tc_briefProfile &&
                                  touched.tc_briefProfile
                                    ? "form-err"
                                    : ""
                                }`}
                                component="textarea"
                                name="tc_briefProfile"
                                value={values.tc_briefProfile}
                                // type="number"
                                onChange={handleChange}
                                placeholder="Brief Profile"
                              />
                              {/* <span className="icon">
                                <FaUser />
                              </span> */}
                              {errors.tc_briefProfile &&
                              touched.tc_briefProfile ? (
                                <div className="form-err-msg">
                                  {errors.tc_briefProfile}
                                </div>
                              ) : null}
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        name === "Student" && "show active"
                      }`}
                      id="Student"
                    >
                      {/* student sign up */}
                      <Formik
                        initialValues={{
                          st_fullName: "",
                          st_email: "",
                          // st_studentId: '',
                          st_password: "",
                          confirmPassword: "",
                          areaValue: "",
                          st_schoolId: "",
                          st_class: "",
                          st_parentName: "",
                          st_parentPhoneNumber: "",
                          st_parentCountryCode: "+233",
                          st_parentEmail: "",
                          st_countryCode: "+233",
                        }}
                        validationSchema={SignupStudentSchema}
                        onSubmit={(values, actions) => {
                          let studentValues = values;
                          let [st_region, st_district, st_circuit] =
                            (values?.areaValue + "" || "")?.split(
                              defaultRDCSeparator
                            ) || [];
                          st_region = st_region || null;
                          st_district = st_district || null;
                          st_circuit = st_circuit || null;

                          const studentData = {
                            st_fullName: values.st_fullName,
                            st_email: values.st_email,
                            // st_studentId: values.st_studentId,
                            st_phoneNumber: values.st_phoneNumber,
                            st_countryCode: values.st_countryCode,
                            st_password: values.st_password,
                            st_schoolId: values.st_schoolId,
                            st_studentType: 2,
                            st_userType: 2,
                            st_schoolId: values.st_schoolId,
                            st_class: values.st_class,
                            st_parentName: values.st_parentName,
                            st_parentPhoneNumber: values.st_parentPhoneNumber,
                            st_parentCountryCode: values.st_parentCountryCode,
                            st_parentEmail: values.st_parentEmail,
                            st_region: st_region,
                            st_district: st_district,
                            st_circuit: st_circuit,
                            isFirstTimeLogin: 1,
                          };
                          setSubmitUserType(2);
                          toggleContinueSubmitModal();
                          // handleStudentSignUp(studentData)
                          setStudentData(studentData);
                          actions.setSubmitting(false);
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
                          setFieldTouched,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.st_fullName && touched.st_fullName
                                    ? "form-err"
                                    : ""
                                }`}
                                name="st_fullName"
                                placeholder="Full Name"
                              />
                              {/* <span className="icon">
                                <FaUser />
                              </span> */}
                              {errors.st_fullName && touched.st_fullName ? (
                                <div className="form-err-msg">
                                  {errors.st_fullName}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.st_email && touched.st_email
                                    ? "form-err"
                                    : ""
                                }`}
                                name="st_email"
                                placeholder="Email Address"
                                value={values.st_email}
                                onChange={handleChange}
                              />
                              <span className="icon">
                                <FaEnvelope />
                              </span>
                              {errors.st_email && touched.st_email ? (
                                <div className="form-err-msg">
                                  {errors.st_email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-3">
                                  <Field
                                    className={`form-control common-input ${
                                      errors.st_countryCode &&
                                      touched.st_countryCode
                                        ? "form-err"
                                        : ""
                                    } pe-0`}
                                    as="select"
                                    name="st_countryCode"
                                  >
                                    <option value="+233" selected>
                                      233
                                    </option>
                                    <option value="+91">91</option>
                                  </Field>
                                </div>
                                <div className="col-md-9">
                                  <Field
                                    className={`form-control common-input ${
                                      errors.st_phoneNumber &&
                                      touched.st_phoneNumber
                                        ? "form-err"
                                        : ""
                                    }`}
                                    name="st_phoneNumber"
                                    value={values.st_phoneNumber}
                                    placeholder="Phone Number"
                                    type="number"
                                  />
                                  <span className="icon">
                                    <FaPhoneAlt />
                                  </span>
                                  {errors.st_phoneNumber &&
                                  touched.st_phoneNumber ? (
                                    <div className="form-err-msg">
                                      {errors.st_phoneNumber}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            {/* <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.st_studentId && touched.st_studentId
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="st_studentId"
                                placeholder="Enter studentId"
                                type="text"
                              />
                             
                              {errors.st_studentId && touched.st_studentId ? (
                                <div className="form-err-msg">
                                  {errors.st_studentId}
                                </div>
                              ) : null}
                            </div> */}
                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-6">
                                  <RegionDistrictCircuitDropDownAllSelectable
                                    isStyled={true}
                                    className="common-input no-border"
                                    showLabel={false}
                                    isRequired={true}
                                    fieldName="areaValue"
                                    hasTouched={touched.areaValue}
                                    hasErrors={errors.areaValue}
                                    areaValue={values.areaValue}
                                    setFieldValue={setFieldValue}
                                    setFieldTouched={setFieldTouched}
                                    areaChange={fetchAllSchoolByArea}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <div className="input--group">
                                    <Select
                                      className="common-input no-border"
                                      name="st_schoolId"
                                      placeholder="Select school"
                                      value={selectedSchool}
                                      onChange={(value) => {
                                        setSelectedSchool(value);
                                        setFieldValue(
                                          "st_schoolId",
                                          value ? value.value : ""
                                        );
                                      }}
                                      onBlur={(evt) => {
                                        setFieldTouched(
                                          "st_schoolId",
                                          true,
                                          true
                                        );
                                      }}
                                      options={schoolDropdownValues}
                                      isClearable
                                      invalid={
                                        touched.st_schoolId &&
                                        errors.st_schoolId
                                      }
                                    />
                                    {touched.st_schoolId &&
                                      errors.st_schoolId && (
                                        <div className="invalid-react-select-dropdown">
                                          {errors.st_schoolId}
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-md-12">
                                <Select
                                  className="common-input no-border"
                                  name="st_class"
                                  placeholder="Select Class/Grade"
                                  value={selectedClass}
                                  onChange={(value) => {
                                    setSelectedClass(value);
                                    setFieldValue(
                                      "st_class",
                                      value ? value.value : ""
                                    );
                                  }}
                                  onBlur={(evt) => {
                                    setFieldTouched("st_class", true, true);
                                  }}
                                  options={categoryList}
                                  isClearable
                                  invalid={touched.st_class && errors.st_class}
                                />
                                {touched.st_class && errors.st_class && (
                                  <div className="invalid-react-select-dropdown">
                                    {errors.st_class}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                isStyled={true}
                                className="common-input"
                                errors={errors.st_password}
                                touched={touched.st_password}
                                placeholder="Password"
                                name="st_password"
                              />
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                isStyled={true}
                                className="common-input"
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                              />
                            </div>
                            <h5 className="mb-4">Parent Info</h5>
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.st_parentName && touched.st_parentName
                                    ? "form-err"
                                    : ""
                                }`}
                                name="st_parentName"
                                value={values.st_parentName}
                                onChange={handleChange}
                                placeholder="Parent Name"
                              />
                              {/* <span className="icon">
                      <FaUser />
                    </span> */}
                              {errors.st_parentName && touched.st_parentName ? (
                                <div className="form-err-msg">
                                  {errors.st_parentName}
                                </div>
                              ) : null}
                            </div>

                            <div className="input--group">
                              <div className="row">
                                <div className="col-md-3">
                                  <Field
                                    className={`form-control common-input ${
                                      errors.st_parentCountryCode &&
                                      touched.st_parentCountryCode
                                        ? "form-err"
                                        : ""
                                    } pe-0`}
                                    as="select"
                                    name="st_parentCountryCode"
                                  >
                                    <option value="+233" selected>
                                      233
                                    </option>
                                    <option value="+91">91</option>
                                  </Field>
                                </div>
                                <div className="col-md-9">
                                  <Field
                                    // type="select"
                                    className={`form-control common-input ${
                                      errors.st_parentPhoneNumber &&
                                      touched.st_parentPhoneNumber
                                        ? "form-err"
                                        : ""
                                    }`}
                                    name="st_parentPhoneNumber"
                                    value={values.st_parentPhoneNumber}
                                    type="number"
                                    onChange={handleChange}
                                    placeholder="Parent Phone"
                                  />
                                  <span className="icon">
                                    <FaPhone />
                                  </span>
                                  {errors.st_parentPhoneNumber &&
                                  touched.st_parentPhoneNumber ? (
                                    <div className="form-err-msg">
                                      {errors.st_parentPhoneNumber}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control common-input ${
                                  errors.st_parentEmail &&
                                  touched.st_parentEmail
                                    ? "form-err"
                                    : ""
                                }`}
                                name="st_parentEmail"
                                value={values.st_parentEmail}
                                onChange={handleChange}
                                placeholder="Parent Email"
                              />
                              <span className="icon">
                                <FaEnvelope />
                              </span>
                              {errors.st_parentEmail &&
                              touched.st_parentEmail ? (
                                <div className="form-err-msg">
                                  {errors.st_parentEmail}
                                </div>
                              ) : null}
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    {/* <div
                      className={`tab-pane fade  ${
                        name === 'Parent' && 'show active'
                      }`}
                      id="Parent"
                    >
                      <Formik
                        initialValues={{
                          name: '',
                          email: '',
                          phone: '',
                          password: '',
                          confirmPassword: '',
                        }}
                        validationSchema={SignupParentSchema}
                        onSubmit={(values, actions) => {
                          const parentData = {
                            pt_fullName: values.name,
                            pt_email: values.email,
                            pt_phoneNumber: values.email,
                            pt_password: values.password,
                          }
                          handleParentSignUp(parentData)

                          actions.setSubmitting(false)
                          // setToken('user-in')
                          // router.push('/my-library')
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.name && touched.name ? 'form-err' : ''
                                }`}
                                name="name"
                                placeholder="Enter name"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.name && touched.name ? (
                                <div className="form-err-msg">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaEnvelope />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.phone && touched.phone
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="phone"
                                placeholder="Enter Phone Number"
                                type="number"
                              />
                              <span className="icon">
                                <FaPhoneAlt />
                              </span>
                              {errors.phone && touched.phone ? (
                                <div className="form-err-msg">
                                  {errors.phone}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                              />
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div> */}
                    {/* <div
                      className={`tab-pane fade ${
                        name === 'Publisher' && 'show active'
                      }`}
                      id="Publisher"
                    >
                      <Formik
                        initialValues={{
                          name: '',
                          email: '',
                          phone: '',
                          password: '',
                          confirmPassword: '',
                        }}
                        validationSchema={SignupPublisherSchema}
                        onSubmit={(values, actions) => {
                          const publisherData = {
                            pb_fullName: values.name,
                            pb_email: values.email,
                            pb_phoneNumber: values.email,
                            pb_password: values.password,
                          }
                          handlePublisherSignUp(publisherData)
                          // JSON.stringify(values, null, 2)
                          actions.setSubmitting(false)
                          // setToken('user-in')
                          // router.push('/my-library')
                        }}
                      >
                        {({
                          errors,
                          touched,
                          isSubmitting,
                          handleSubmit,
                          handleChange,
                          values,
                        }) => (
                          <Form
                            className="mt-4 pt-2"
                            autoComplete="off"
                            onSubmit={handleSubmit}
                          >
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.name && touched.name ? 'form-err' : ''
                                }`}
                                name="name"
                                placeholder="Enter name"
                              />
                              <span className="icon">
                                <FaUser />
                              </span>
                              {errors.name && touched.name ? (
                                <div className="form-err-msg">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="email"
                                placeholder="Enter email"
                              />
                              <span className="icon">
                                <FaEnvelope />
                              </span>
                              {errors.email && touched.email ? (
                                <div className="form-err-msg">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <Field
                                className={`form-control ${
                                  errors.phone && touched.phone
                                    ? 'form-err'
                                    : ''
                                }`}
                                name="phone"
                                placeholder="Enter Phone Number"
                                type="number"
                              />
                              <span className="icon">
                                <FaPhoneAlt />
                              </span>
                              {errors.phone && touched.phone ? (
                                <div className="form-err-msg">
                                  {errors.phone}
                                </div>
                              ) : null}
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.password}
                                touched={touched.password}
                                placeholder="Enter Password"
                                name="password"
                              />
                            </div>
                            <div className="input--group">
                              <PasswordInput
                                errors={errors.confirmPassword}
                                touched={touched.confirmPassword}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                              />
                            </div>
                            <button
                              disabled={isSubmitLoading}
                              className="cmn--btn  w-100 form-control"
                              type="submit"
                            >
                              <div className="d-flex align-items-center justify-content-center">
                                {isSubmitLoading && (
                                  <ButtonLoader></ButtonLoader>
                                )}

                                <span>Submit</span>
                              </div>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div> */}
                  </div>
                </>
              )}
              {registerStep === 2 && (
                <>
                  <h3 className="text-center mb-3">Email Verification</h3>
                  <br />
                  {signUpUser === 1 && (
                    <h6>
                      Enter the 6 digit code sent to your email : &nbsp;
                      {teacherData?.tc_email}
                    </h6>
                  )}
                  {signUpUser === 2 && (
                    <h6>
                      Enter the 6 digit code sent to your email : &nbsp;
                      {studentData?.st_email}
                    </h6>
                  )}
                  <br />

                  <div className="input--group">
                    <OtpInput
                      value={emailOtp}
                      inputStyle={otpInput}
                      onChange={handleEmailOtp}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    {showError && (
                      <p className="text-danger mt-3">Please enter code</p>
                    )}
                  </div>

                  <button
                    disabled={isSubmitLoading}
                    className="cmn--btn  w-100 form-control"
                    type="submit"
                    onClick={() => {
                      if (signUpUser === 1) {
                        if (emailOtp && emailOtp.length === 6) {
                          verifyTeacherOtp(1);
                        } else {
                          return setShowError(true);
                        }
                      } else if (signUpUser === 2) {
                        if (emailOtp && emailOtp.length === 6) {
                          verifyStudentOtp(1);
                        } else {
                          return setShowError(true);
                        }
                      }
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                      <span>Submit</span>
                    </div>
                  </button>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    {seconds > 0 && (
                      <>
                        <p className="mb-0 me-4 mt-0">
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      </>
                    )}
                    <h6
                      className={`d-flex justify-content-end cursor-pointer ${
                        disabledResendCode ? "disable-color" : ""
                      }`}
                      onClick={() => {
                        if (!disabledResendCode) {
                          reSendTimer(0, 30);
                          reSend(1);
                        }
                      }}
                    >
                      Resend Code
                    </h6>
                  </div>
                </>
              )}

              {registerStep === 3 && (
                <>
                  <h3 className="text-center mb-3">
                    Phone Number Verification
                  </h3>
                  <br />
                  {signUpUser === 1 && (
                    <h6>
                      Enter the 6 digit code sent to your phone Number : &nbsp;
                      {teacherData?.tc_phoneNumber}
                    </h6>
                  )}
                  {signUpUser === 2 && (
                    <h6>
                      Enter the 6 digit code sent to your phone Number : &nbsp;
                      {studentData?.st_phoneNumber}
                    </h6>
                  )}

                  <br />
                  <div className="input--group">
                    <OtpInput
                      value={phoneOtp}
                      inputStyle={otpInput}
                      onChange={handlePhoneOtp}
                      numInputs={6}
                      separator={<span> </span>}
                    />
                    {showError && (
                      <p className="text-danger mt-3">Please enter code</p>
                    )}
                  </div>

                  <button
                    // disabled={isSubmitting}
                    disabled={isSubmitLoading}
                    className="cmn--btn  w-100 form-control"
                    type="submit"
                    onClick={() => {
                      if (signUpUser === 1) {
                        if (phoneOtp && phoneOtp.length === 6) {
                          verifyTeacherOtp(2);
                        } else {
                          return setShowError(true);
                        }
                      } else if (signUpUser === 2) {
                        if (phoneOtp && phoneOtp.length === 6) {
                          verifyStudentOtp(2);
                        } else {
                          return setShowError(true);
                        }
                      }
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      {isSubmitLoading && <ButtonLoader></ButtonLoader>}

                      <span>Submit</span>
                    </div>
                  </button>
                  <div className="d-flex justify-content-end align-items-center mt-3">
                    {seconds > 0 && (
                      <>
                        <p className="mb-0 me-4 mt-0">
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      </>
                    )}
                    <h6
                      className={`d-flex justify-content-end cursor-pointer  ${
                        disabledResendCode ? "disable-color" : ""
                      }`}
                      onClick={() => {
                        if (!disabledResendCode) {
                          reSendTimer(0, 30);
                          reSend(2);
                        }
                      }}
                    >
                      Resend Code
                    </h6>
                  </div>
                </>
              )}
              {registerStep === 1 && (
                <div className="signup-option text-center mt-4">
                  Already have Account?{" "}
                  <Link href="/auth/signin" state={{ tabName: selectedTab }}>
                    Sign In
                  </Link>
                </div>
              )}
            </>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
