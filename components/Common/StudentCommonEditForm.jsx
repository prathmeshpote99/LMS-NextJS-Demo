import { Field, Form, Formik } from "formik";
import RegionDistrictCircuitDropDownAllSelectable from "@/helpers/RegionDistrictCircuitDropDownAllSelectable";
import { getUserInfo } from "@/helpers/authHelper";
import { getCategories } from "@/helpers/backendHelpers/book";
import {
  getAllSchoolByArea,
  getProfile,
  updateProfilePicture,
} from "@/helpers/backendHelpers/student";
import {
  getTeacherProfile,
  updateProfilePictureTeacher,
} from "@/helpers/backendHelpers/teacher";
import { defaultRDCSeparator } from "@/helpers/common";
import {
  certificateList,
  divisions,
  languages,
  levels,
  yearsOfExperience,
} from "@/helpers/dropdownVals";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import ImageUploading from "react-images-uploading";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import default_icon from "@/assets/images/default_avatar.png";
import { IMAGE_URL } from "@/helpers/urlHelper";
import ButtonLoader from "./ButtonLoader";
import SubmitLoader from "./SubmitLoader";
import Image from "next/image";

const StudentCommonEditForm = (props) => {
  const {
    isOpen,
    pdf,
    type,
    toggle,
    modalTitle,
    callFrom,
    submitFlag,
    teacherFormik,
    teacherForm,
    setTeacherForm,
    formik,
    studentForm,
    setStudentForm,
    selectedLanguages,
    setSelectedLanguages,
    isSubmitLoading,
    setIsSubmitLoading,
    isSubmitButtonLoading,
    setIsSubmitButtonLoading,
    handleFormValueChange,
  } = props;

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDivsion, setSelectedDivsion] = useState("");
  const [schoolDropdownValues, setSchoolDropdownValues] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedBloodGroup, setselectedBloodGroup] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [selectedLevel, setselectedLevel] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const userInfo = getUserInfo();

  const maxNumber = 1;

  useEffect(() => {
    getAllCategories();
    if (userInfo?.userType === "Student" || userInfo?.userType === "Premium") {
      fetchStudentForEdit();
    } else if (
      userInfo?.userType === "Teacher" ||
      userInfo?.userType === "Freelance"
    ) {
      fetchTeacherForEdit();
    }
  }, []);

  const onChange = async (imageList, addUpdateIndex) => {
    try {
      setIsSubmitLoading(true);
      setIsSubmitButtonLoading(true);
      let studentData = studentForm.st_profilePic;
      studentData.st_profilePic = imageList[0]?.file;
      const response = await updateProfilePicture(studentData);
      fetchStudentForEdit();
      typeof window !== "undefined"
        ? localStorage.setItem(
            "profilePic",
            response.data.student[1][0].st_profilePic
          )
        : null;
      window.dispatchEvent(new Event("storage"));
      let message = "Profile pic uploaded successfully";
      setImages(imageList);
      setIsSubmitLoading(true);
      setIsSubmitButtonLoading(false);
      toast.success(message, {
        autoClose: 5000,
      });
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "There was a problem updating profile picture";
      setIsSubmitLoading(true);
      setIsSubmitButtonLoading(false);
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };

  const fetchStudentForEdit = async () => {
    try {
      setIsLoading(true);
      let response = await getProfile();
      let { studentProfile } = response.data || {};
      let { st_region, st_district, st_circuit } = studentProfile;
      let studentData = {};
      let areaValue = "";
      if (st_region || st_district || st_circuit) {
        areaValue = `${st_region || ""}${defaultRDCSeparator}${
          st_district || ""
        }${defaultRDCSeparator}${st_circuit || ""}`;

        studentProfile["areaValue"] = areaValue;
        studentData["areaValue"] = areaValue;
      } else {
        studentProfile["areaValue"] = "";
        studentData["areaValue"] = "";
      }
      studentProfile["st_profilePic_old"] = studentProfile["st_profilePic"];
      studentProfile["st_profilePic"] = { fileName: "", file: {} };
      studentProfile["st_parentName"] = studentProfile["st_parentName"]
        ? studentProfile["st_parentName"]
        : "";
      studentProfile["st_class"] = studentProfile["st_class"]
        ? studentProfile["st_class"]
        : "";
      studentProfile["st_division"] = studentProfile["st_division"];
      studentProfile["st_division"] = studentProfile["st_division"]
        ? studentProfile["st_division"]
        : "";
      studentProfile["st_phoneNumber"] = studentProfile["st_phoneNumber"]
        ? studentProfile["st_phoneNumber"]
        : "";

      studentData["st_fullName"] = studentProfile["st_fullName"];
      studentData["st_email"] = studentProfile["st_email"];
      studentData["st_altEmail"] = studentProfile["st_altEmail"];
      studentData["st_studentId"] = studentProfile["st_studentId"];
      studentData["st_countryCode"] = studentProfile["st_countryCode"];
      studentData["st_parentCountryCode"] =
        studentProfile["st_parentCountryCode"];

      studentData["st_phoneNumber"] = studentProfile["st_phoneNumber"];
      studentData["st_level"] = studentProfile["st_level"] || "";
      studentData["st_class"] = studentProfile["st_class"];
      studentData["st_division"] = studentProfile["st_division"];
      studentData["st_profilePic_old"] = studentProfile["st_profilePic_old"];
      studentData["st_profilePic"] = { fileName: "", file: {} };
      studentData["st_parentName"] = studentProfile["st_parentName"]
        ? studentProfile["st_parentName"]
        : ""
        ? studentProfile["st_parentName"]
        : "";
      studentData["st_class"] = studentProfile["st_class"]
        ? studentProfile["st_class"]
        : "";
      studentData["st_division"] = studentProfile["st_division"]
        ? studentProfile["st_division"]
        : "";
      studentData["st_phoneNumber"] = studentProfile["st_phoneNumber"]
        ? studentProfile["st_phoneNumber"]
        : "";
      studentData["st_parentPhoneNumber"] = studentProfile[
        "st_parentPhoneNumber"
      ]
        ? studentProfile["st_parentPhoneNumber"]
        : "";
      studentData["st_parentEmail"] = studentProfile["st_parentEmail"]
        ? studentProfile["st_parentEmail"]
        : "";

      fetchAllSchoolByArea(areaValue, studentProfile["st_schoolId"]);

      if (studentProfile.st_division) {
        setSelectedDivsion({
          label: studentProfile.st_division,
          value: studentProfile.st_division,
        });
      }
      if (studentProfile.st_class) {
        setSelectedClass({
          label: studentProfile.st_class,
          value: studentProfile.st_class,
        });
      }
      if (studentProfile.st_level) {
        setselectedLevel({
          label: studentProfile.st_level,
          value: studentProfile.st_level,
        });
      }
      setSelectedSchool({
        label: "",
        value: "",
      });
      setStudentForm(studentProfile);
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Error while fetching profile details";

      console.log(message);
      setIsLoading(false);
    }
  };

  const fetchAllSchoolByArea = async (values, oldVal) => {
    if (values === "") {
      setSchoolDropdownValues([]);
      if (userInfo.userType === "Student" || userInfo.userType === "Premium") {
        setStudentForm({ ...studentForm, st_schoolId: "" });
      } else if (
        userInfo.userType === "Teacher" ||
        userInfo.userType === "Freelance"
      ) {
        setTeacherForm({ ...teacherForm, tc_schoolId: "" });
      }
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
        console.log(message);
        setSchoolDropdownValues([]);
      }
    }
  };

  const onChangeTeacher = async (imageList, addUpdateIndex) => {
    try {
      setIsSubmitLoading(true);
      setIsSubmitButtonLoading(true);
      let teacherData = teacherForm.tc_profilePic;
      teacherData.tc_profilePic = imageList[0]?.file;
      const response = await updateProfilePictureTeacher(teacherData);
      fetchTeacherForEdit();
      typeof window !== "undefined"
        ? localStorage.setItem(
            "profilePic",
            response.data.teacher.tc_profilePic
          )
        : null;
      window.dispatchEvent(new Event("storage"));
      let message = "Profile pic uploaded successfully";
      setImages(imageList);
      setIsSubmitLoading(true);
      setIsSubmitButtonLoading(false);
      toast.success(message, {
        autoClose: 5000,
      });
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "There was a problem updating profile picture";
      setIsSubmitLoading(false);
      setIsSubmitButtonLoading(false);
      toast.error(message, {
        autoClose: 5000,
      });
    }
  };

  const fetchTeacherForEdit = async () => {
    try {
      setIsLoading(true);
      let response = await getTeacherProfile();
      let { teacherProfile } = response.data || {};

      let teacherData = {};

      teacherProfile["tc_profilePic_old"] = teacherProfile["tc_profilePic"];
      teacherProfile["tc_profilePic"] = { fileName: "", file: {} };
      typeof window !== "undefined"
        ? localStorage.setItem(
            "profilePic",
            teacherProfile["tc_profilePic_old"]
          )
        : null;

      let { tc_region, tc_district, tc_circuit } = teacherProfile;
      let areaValue = "";
      if (tc_region || tc_district || tc_circuit) {
        areaValue = `${tc_region || ""}${defaultRDCSeparator}${
          tc_district || ""
        }${defaultRDCSeparator}${tc_circuit || ""}`;
        teacherProfile["areaValue"] = areaValue;
        teacherData["areaValue"] = areaValue;
      } else {
        teacherProfile["areaValue"] = "";
        teacherData["areaValue"] = "";
      }
      teacherData["tc_schoolId"] = teacherProfile["tc_schoolId"];
      fetchAllSchoolByArea(areaValue, teacherData["tc_schoolId"]);
      if (teacherProfile.tc_bloodGroup) {
        setselectedBloodGroup({
          label: teacherProfile.tc_bloodGroup,
          value: teacherProfile.tc_bloodGroup,
        });
      }
      let langFromRes = teacherProfile["tc_languageSpoken"];
      let tempLang = [];
      if (langFromRes && langFromRes.length > 0) {
        tempLang = languages?.filter((master) => {
          return langFromRes?.find((subRes) => {
            return subRes === master.value;
          });
        });
        setSelectedLanguages(tempLang);
      }
      if (teacherProfile.tc_experience) {
        setSelectedExperience({
          label: teacherProfile.tc_experience,
          value: teacherProfile.tc_experience,
        });
      }
      if (teacherProfile.tc_level) {
        setselectedLevel({
          label: teacherProfile.tc_level,
          value: teacherProfile.tc_level,
        });
      }
      if (teacherProfile.tc_certificate) {
        setSelectedCertificate({
          label: teacherProfile.tc_certificate,
          value: teacherProfile.tc_certificate,
        });
      }
      teacherData["tc_profilePic_old"] = teacherProfile["tc_profilePic_old"];
      teacherData["tc_fullName"] = teacherProfile["tc_fullName"];
      teacherData["tc_email"] = teacherProfile["tc_email"];
      teacherData["tc_phoneNumber"] = teacherProfile["tc_phoneNumber"];
      teacherData["tc_altEmail"] = teacherProfile["tc_altEmail"];
      teacherData["tc_countryCode"] = teacherProfile["tc_countryCode"];

      teacherData["tc_certificate"] = teacherProfile["tc_certificate"];

      teacherData["tc_experience"] = teacherProfile["tc_experience"];

      teacherData["tc_level"] = teacherProfile["tc_level"];
      teacherData["tc_languageSpoken"] = teacherProfile["tc_languageSpoken"];
      teacherData["tc_briefProfile"] = teacherProfile["tc_briefProfile"];
      teacherData["tc_briefProfile"] = teacherProfile["tc_briefProfile"];
      teacherData["tc_profilePic"] = { fileName: "", file: {} };
      if (userInfo?.userType === "Teacher") {
        teacherData["tc_staffId"] = teacherProfile["tc_staffId"];
        teacherData["tc_alsoKnownAs"] = teacherProfile["tc_alsoKnownAs"];
      }
      setTeacherForm(teacherData);
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Error while fetching profile details";
      console.log(message);
      setIsLoading(false);
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

  const getLevelFromClass = (givenClass, categoryList) => {
    for (let i = 0; i < categoryList.length; i++) {
      // check if the options contain the class
      for (let j = 0; j < categoryList[i].options.length; j++) {
        if (categoryList[i].options[j].value === givenClass) {
          // returning the level in which the class is present
          return categoryList[i].label;
        }
      }
    }
    return "";
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <>
        {(userInfo?.userType === "Student" ||
          userInfo?.userType === "Premium") && (
          <Formik enableReinitialize={true}>
            <Form
              style={
                isLoading
                  ? {
                      position: "relative",
                      opacity: "0.8",
                      minHeight: "600px",
                    }
                  : {}
              }
              className="profile-form my-4 py-2"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit(e);
                return false;
              }}
            >
              {isLoading ? (
                <SubmitLoader />
              ) : (
                <>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <>
                        {imageList.length === 0 && (
                          <>
                            <div className="update-image-container">
                              <Image
                                src={
                                  studentForm?.st_profilePic_old
                                    ? `${IMAGE_URL}/${studentForm?.st_profilePic_old}`
                                    : default_icon
                                }
                                alt={studentForm?.st_fullName}
                                width={42}
                                height={42}
                              />
                              <label
                                className="upload-icon"
                                onClick={onImageUpload}
                              >
                                <FaCamera />
                              </label>
                            </div>
                          </>
                        )}
                        <div className="upload__image-wrapper">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <Image src={image["data_url"]} alt="" />
                              <button
                                onClick={() => onImageRemove(index)}
                                className="remove-btn"
                              >
                                <GrClose />
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </ImageUploading>
                  <label htmlFor="" className="form-label">
                    Full name <span className="text-danger">*</span>
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_fullName && formik.touched.st_fullName
                          ? "form-err"
                          : ""
                      }`}
                      name="st_fullName"
                      type="text"
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="First Middle Last"
                      invalid={
                        formik.touched.st_fullName && formik.errors.st_fullName
                      }
                      value={formik.values.st_fullName}
                    />

                    {formik.errors.st_fullName && formik.touched.st_fullName ? (
                      <div className="form-err-msg">
                        {formik.errors.st_fullName}
                      </div>
                    ) : null}
                  </div>
                  <label htmlFor="" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_email && formik.touched.st_email
                          ? "form-err"
                          : ""
                      }`}
                      disabled
                      name="st_email"
                      value={formik.values.st_email}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter Email"
                    />
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    {formik.errors.st_email && formik.touched.st_email ? (
                      <div className="form-err-msg">
                        {formik.errors.st_email}
                      </div>
                    ) : null}
                  </div>
                  <label htmlFor="" className="form-label">
                    Alternative Email
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_altEmail && formik.touched.st_altEmail
                          ? "form-err"
                          : ""
                      }`}
                      name="st_altEmail"
                      value={formik.values.st_altEmail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter alternative email"
                    />
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    {formik.errors.st_altEmail && formik.touched.st_altEmail ? (
                      <div className="form-err-msg">
                        {formik.errors.st_altEmail}
                      </div>
                    ) : null}
                  </div>
                  <label htmlFor="" className="form-label">
                    Student Id
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_studentId &&
                        formik.touched.st_studentId
                          ? "form-err"
                          : ""
                      }`}
                      name="st_studentId"
                      type="text"
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder="Enter student id"
                      invalid={
                        formik.touched.st_studentId &&
                        formik.errors.st_studentId
                      }
                      value={formik.values.st_studentId}
                    />

                    {formik.errors.st_studentId &&
                    formik.touched.st_studentId ? (
                      <div className="form-err-msg">
                        {formik.errors.st_studentId}
                      </div>
                    ) : null}
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <label htmlFor="" className="form-label">
                        Country Code
                      </label>
                      <Field
                        className={`form-control common-input select-country ${
                          formik.errors.st_countryCode &&
                          formik.touched.st_countryCode
                            ? "form-err"
                            : ""
                        } pe-0`}
                        as="select"
                        name="st_countryCode"
                        value={formik.values.st_countryCode}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleFormValueChange(e);
                        }}
                        placeholder="Enter Country Code"
                      >
                        <option value="233">233</option>
                        <option value="91">91</option>
                      </Field>
                    </div>
                    <div className="col-md-9">
                      <label htmlFor="" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Field
                          // type="select"
                          className={`form-control common-input ${
                            formik.errors.st_phoneNumber &&
                            formik.touched.st_phoneNumber
                              ? "form-err"
                              : ""
                          }`}
                          name="st_phoneNumber"
                          value={formik.values.st_phoneNumber}
                          type="number"
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleFormValueChange(e);
                          }}
                          placeholder="Enter Phone"
                        />
                        <span className="icon">
                          <FaPhone />
                        </span>
                        {formik.errors.st_phoneNumber &&
                        formik.touched.st_phoneNumber ? (
                          <div className="form-err-msg">
                            {formik.errors.st_phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Class/Grade <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="st_class"
                          placeholder="Select Class"
                          value={selectedClass}
                          onChange={(value) => {
                            const studentLevel = getLevelFromClass(
                              value.value,
                              categoryList
                            );
                            setselectedLevel(studentLevel);
                            handleFormValueChange(value);
                            setSelectedClass(value);
                            formik.setFieldValue(
                              "st_class",
                              value ? value.value : ""
                            );

                            formik.setFieldValue("st_level", studentLevel);
                          }}
                          onBlur={(evt) => {
                            formik.setFieldTouched("st_class", true, true);
                          }}
                          options={categoryList}
                          isClearable
                          invalid={
                            formik.touched.st_class && formik.errors.st_class
                          }
                        />
                        {formik.touched.st_class && formik.errors.st_class && (
                          <div className="invalid-react-select-dropdown">
                            {formik.errors.st_class}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Division <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="st_division"
                          placeholder="Select Division"
                          value={selectedDivsion}
                          onChange={(value) => {
                            handleFormValueChange(value);
                            setSelectedDivsion(value);
                            formik.setFieldValue(
                              "st_division",
                              value ? value.value : ""
                            );
                          }}
                          onBlur={(evt) => {
                            formik.setFieldTouched("st_division", true, true);
                          }}
                          options={divisions}
                          isClearable
                          invalid={
                            formik.touched.st_division &&
                            formik.errors.st_division
                          }
                        />
                        {formik.touched.st_division &&
                          formik.errors.st_division && (
                            <div className="invalid-react-select-dropdown">
                              {formik.errors.st_division}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="input--group">
                        <RegionDistrictCircuitDropDownAllSelectable
                          isStyled={true}
                          className="common-input no-border"
                          isRequired={true}
                          fieldName="areaValue"
                          hasTouched={formik.touched.areaValue}
                          hasErrors={formik.errors.areaValue}
                          areaValue={formik.values.areaValue}
                          setFieldValue={formik.setFieldValue}
                          setFieldTouched={formik.setFieldTouched}
                          areaChange={fetchAllSchoolByArea}
                          handleFormValueChange={handleFormValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-12">
                      <label htmlFor="" className="form-label">
                        School Name <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="st_schoolId"
                          placeholder="Select School"
                          value={selectedSchool}
                          onChange={(value) => {
                            handleFormValueChange(value);
                            setSelectedSchool(value);
                            formik.setFieldValue(
                              "st_schoolId",
                              value ? value.value : ""
                            );
                          }}
                          onBlur={(evt) => {
                            formik.setFieldTouched("st_schoolId", true, true);
                          }}
                          options={schoolDropdownValues}
                          isClearable
                          invalid={
                            formik.touched.st_schoolId &&
                            formik.errors.st_schoolId
                          }
                        />
                        {formik.touched.st_schoolId &&
                          formik.errors.st_schoolId && (
                            <div className="invalid-react-select-dropdown">
                              {formik.errors.st_schoolId}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <h5 className="mb-4">Parent Info</h5>
                  <label htmlFor="" className="form-label">
                    Parent name
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_parentName &&
                        formik.touched.st_parentName
                          ? "form-err"
                          : ""
                      }`}
                      name="st_parentName"
                      value={formik.values.st_parentName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter parent name"
                    />
                    {formik.errors.st_parentName &&
                    formik.touched.st_parentName ? (
                      <div className="form-err-msg">
                        {formik.errors.st_parentName}
                      </div>
                    ) : null}
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <label htmlFor="" className="form-label">
                        Country Code
                      </label>
                      <Field
                        className={`form-control common-input select-country ${
                          formik.errors.st_parentCountryCode &&
                          formik.touched.st_parentCountryCode
                            ? "form-err"
                            : ""
                        } pe-0`}
                        as="select"
                        name="st_parentCountryCode"
                        value={formik.values.st_parentCountryCode}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleFormValueChange(e);
                        }}
                        placeholder="Enter Country Code"
                      >
                        <option value="233">233</option>
                        <option value="91">91</option>
                      </Field>
                    </div>
                    <div className="col-md-9">
                      <label htmlFor="" className="form-label">
                        Parent mobile number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Field
                          // type="select"
                          className={`form-control common-input ${
                            formik.errors.st_parentPhoneNumber &&
                            formik.touched.st_parentPhoneNumber
                              ? "form-err"
                              : ""
                          }`}
                          name="st_parentPhoneNumber"
                          value={formik.values.st_parentPhoneNumber}
                          type="number"
                          onChange={(e) => {
                            formik.handleChange(e);
                            handleFormValueChange(e);
                          }}
                          placeholder="Enter parent phone"
                        />
                        <span className="icon">
                          <FaPhone />
                        </span>
                        {formik.errors.st_parentPhoneNumber &&
                        formik.touched.st_parentPhoneNumber ? (
                          <div className="form-err-msg">
                            {formik.errors.st_parentPhoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <label htmlFor="" className="form-label">
                    Parent Email
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        formik.errors.st_parentEmail &&
                        formik.touched.st_parentEmail
                          ? "form-err"
                          : ""
                      }`}
                      name="st_parentEmail"
                      value={formik.values.st_parentEmail}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter Parent Email"
                    />
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    {formik.errors.st_parentEmail &&
                    formik.touched.st_parentEmail ? (
                      <div className="form-err-msg">
                        {formik.errors.st_parentEmail}
                      </div>
                    ) : null}
                  </div>
                  {callFrom === 2 && (
                    <button
                      disabled={isSubmitLoading}
                      className="cmn--btnn  w-100 form-control"
                      type="submit"
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        {isSubmitButtonLoading && <ButtonLoader></ButtonLoader>}

                        <span>Submit</span>
                      </div>
                    </button>
                  )}
                </>
              )}
            </Form>
          </Formik>
        )}
        {(userInfo?.userType === "Teacher" ||
          userInfo?.userType === "Freelance") && (
          <Formik enableReinitialize={true}>
            <Form
              style={
                isLoading
                  ? {
                      position: "relative",
                      opacity: "0.8",
                      minHeight: "600px",
                    }
                  : {}
              }
              className="profile-form my-4 py-2"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                teacherFormik.handleSubmit(e);
                return false;
              }}
            >
              {isLoading ? (
                <SubmitLoader />
              ) : (
                <>
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChangeTeacher}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      <>
                        {imageList.length === 0 && (
                          <>
                            <div className="update-image-container">
                              <Image
                                src={
                                  teacherForm?.tc_profilePic_old
                                    ? `${IMAGE_URL}/${teacherForm?.tc_profilePic_old}`
                                    : default_icon
                                }
                                alt={teacherForm?.tc_fullName}
                                width={100}
                                height={100}
                              />
                              <label
                                className="upload-icon"
                                onClick={onImageUpload}
                              >
                                <FaCamera />
                              </label>
                            </div>
                          </>
                        )}
                        <div className="upload__image-wrapper">
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <Image src={image["data_url"]} alt="" />
                              <button
                                onClick={() => onImageRemove(index)}
                                className="remove-btn"
                              >
                                <GrClose />
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </ImageUploading>
                  {/* <Row>
                    <Col md={12} sm={12} lg={6}> */}
                  <label htmlFor="" className="form-label">
                    Full name <span className="text-danger">*</span>
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        teacherFormik.errors.tc_fullName &&
                        teacherFormik.touched.tc_fullName
                          ? "form-err"
                          : ""
                      }`}
                      name="tc_fullName"
                      type="text"
                      onChange={(e) => {
                        teacherFormik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      onBlur={teacherFormik.handleBlur}
                      placeholder="First Middle Last"
                      invalid={
                        teacherFormik.touched.tc_fullName &&
                        teacherFormik.errors.tc_fullName
                      }
                      value={teacherFormik.values.tc_fullName}
                    />
                    {teacherFormik.errors.tc_fullName &&
                    teacherFormik.touched.tc_fullName ? (
                      <div className="form-err-msg">
                        {teacherFormik.errors.tc_fullName}
                      </div>
                    ) : null}
                  </div>
                  <label htmlFor="" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        teacherFormik.errors.tc_email &&
                        teacherFormik.touched.tc_email
                          ? "form-err"
                          : ""
                      }`}
                      name="tc_email"
                      disabled={true}
                      value={teacherFormik.values.tc_email}
                      onChange={(e) => {
                        teacherFormik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter Email"
                    />
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    {teacherFormik.errors.tc_email &&
                    teacherFormik.touched.tc_email ? (
                      <div className="form-err-msg">
                        {teacherFormik.errors.tc_email}
                      </div>
                    ) : null}
                  </div>

                  <label htmlFor="" className="form-label">
                    Alternative Email{" "}
                    {userInfo?.userType === "Teacher" && (
                      <span className="text-danger">*</span>
                    )}
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        teacherFormik.errors.tc_altEmail &&
                        teacherFormik.touched.tc_altEmail
                          ? "form-err"
                          : ""
                      }`}
                      name="tc_altEmail"
                      value={teacherFormik.values.tc_altEmail}
                      onChange={(e) => {
                        teacherFormik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter your NTC email address"
                    />
                    <span className="icon">
                      <FaEnvelope />
                    </span>
                    {teacherFormik.errors.tc_altEmail &&
                    teacherFormik.touched.tc_altEmail ? (
                      <div className="form-err-msg">
                        {teacherFormik.errors.tc_altEmail}
                      </div>
                    ) : null}
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <label htmlFor="" className="form-label">
                        Country Code
                      </label>
                      <Field
                        className={`form-control common-input select-country ${
                          teacherFormik.errors.tc_countryCode &&
                          teacherFormik.touched.tc_countryCode
                            ? "form-err"
                            : ""
                        } pe-0`}
                        as="select"
                        name="tc_countryCode"
                        value={teacherFormik.values.tc_countryCode}
                        onChange={(e) => {
                          teacherFormik.handleChange(e);
                          handleFormValueChange(e);
                        }}
                        placeholder="Enter Country Code"
                      >
                        <option value="233">233</option>
                        <option value="91">91</option>
                      </Field>
                    </div>
                    <div className="col-md-9">
                      <label htmlFor="" className="form-label">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Field
                          // type="select"
                          className={`form-control common-input ${
                            teacherFormik.errors.tc_phoneNumber &&
                            teacherFormik.touched.tc_phoneNumber
                              ? "form-err"
                              : ""
                          }`}
                          name="tc_phoneNumber"
                          value={teacherFormik.values.tc_phoneNumber}
                          type="number"
                          onChange={(e) => {
                            teacherFormik.handleChange(e);
                            handleFormValueChange(e);
                          }}
                          placeholder="Enter Phone"
                        />
                        <span className="icon">
                          <FaPhone />
                        </span>
                        {teacherFormik.errors.tc_phoneNumber &&
                        teacherFormik.touched.tc_phoneNumber ? (
                          <div className="form-err-msg">
                            {teacherFormik.errors.tc_phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {userInfo?.userType === "Teacher" && (
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          Also Known As
                        </label>
                        <div className="input--group">
                          <Field
                            className={`form-control common-input ${
                              teacherFormik.errors.tc_alsoKnownAs &&
                              teacherFormik.touched.tc_alsoKnownAs
                                ? "form-err"
                                : ""
                            }`}
                            name="tc_alsoKnownAs"
                            type="text"
                            onChange={(e) => {
                              teacherFormik.handleChange(e);
                              handleFormValueChange(e);
                            }}
                            onBlur={teacherFormik.handleBlur}
                            placeholder="Enter also known as"
                            invalid={
                              teacherFormik.touched.tc_alsoKnownAs &&
                              teacherFormik.errors.tc_alsoKnownAs
                            }
                            value={teacherFormik.values.tc_alsoKnownAs}
                          />
                          {teacherFormik.errors.tc_alsoKnownAs &&
                          teacherFormik.touched.tc_alsoKnownAs ? (
                            <div className="form-err-msg">
                              {teacherFormik.errors.tc_alsoKnownAs}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                          Staff Id <span className="text-danger">*</span>
                        </label>
                        <div className="input--group">
                          <Field
                            className={`form-control common-input ${
                              teacherFormik.errors.tc_staffId &&
                              teacherFormik.touched.tc_staffId
                                ? "form-err"
                                : ""
                            }`}
                            name="tc_staffId"
                            value={teacherFormik.values.tc_staffId}
                            onChange={(e) => {
                              teacherFormik.handleChange(e);
                              handleFormValueChange(e);
                            }}
                            placeholder="Enter Staff Id"
                          />
                          {teacherFormik.errors.tc_staffId &&
                          teacherFormik.touched.tc_staffId ? (
                            <div className="form-err-msg">
                              {teacherFormik.errors.tc_staffId}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Level <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="tc_level"
                          placeholder="Select Level"
                          value={selectedLevel}
                          onChange={(value) => {
                            handleFormValueChange(value);
                            setselectedLevel(value);
                            teacherFormik.setFieldValue(
                              "tc_level",
                              value ? value.value : ""
                            );
                          }}
                          onBlur={(evt) => {
                            teacherFormik.setFieldTouched(
                              "tc_level",
                              true,
                              true
                            );
                          }}
                          options={levels}
                          isClearable
                          invalid={
                            teacherFormik.touched.tc_level &&
                            teacherFormik.errors.tc_level
                          }
                        />
                        {teacherFormik.touched.tc_level &&
                          teacherFormik.errors.tc_level && (
                            <div className="invalid-react-select-dropdown">
                              {teacherFormik.errors.tc_level}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="" className="form-label">
                        Years Of Experience{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="tc_experience"
                          placeholder="Years Of Experience"
                          value={selectedExperience}
                          onChange={(value) => {
                            handleFormValueChange(value);
                            setSelectedExperience(value);
                            teacherFormik.setFieldValue(
                              "tc_experience",
                              value ? value.value : ""
                            );
                          }}
                          onBlur={(evt) => {
                            teacherFormik.setFieldTouched(
                              "tc_experience",
                              true,
                              true
                            );
                          }}
                          options={yearsOfExperience}
                          isClearable
                          invalid={
                            teacherFormik.touched.tc_experience &&
                            teacherFormik.errors.tc_experience
                          }
                        />
                        {teacherFormik.touched.tc_experience &&
                          teacherFormik.errors.tc_experience && (
                            <div className="invalid-react-select-dropdown">
                              {teacherFormik.errors.tc_experience}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <label htmlFor="" className="form-label">
                        Certificates <span className="text-danger">*</span>
                      </label>
                      <div className="input--group">
                        <Select
                          className="common-input no-border"
                          name="tc_certificate"
                          placeholder="Select Certificates"
                          value={selectedCertificate}
                          onChange={(value) => {
                            handleFormValueChange(value);
                            setSelectedCertificate(value);
                            teacherFormik.setFieldValue(
                              "tc_certificate",
                              value ? value.value : ""
                            );
                          }}
                          onBlur={(evt) => {
                            teacherFormik.setFieldTouched(
                              "tc_certificate",
                              true,
                              true
                            );
                          }}
                          options={certificateList}
                          isClearable
                          invalid={
                            teacherFormik.touched.tc_certificate &&
                            teacherFormik.errors.tc_certificate
                          }
                        />
                        {teacherFormik.touched.tc_certificate &&
                          teacherFormik.errors.tc_certificate && (
                            <div className="invalid-react-select-dropdown">
                              {teacherFormik.errors.tc_certificate}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="input--group">
                        <RegionDistrictCircuitDropDownAllSelectable
                          isStyled={true}
                          className="common-input no-border"
                          isRequired={true}
                          fieldName="areaValue"
                          hasTouched={teacherFormik.touched.areaValue}
                          hasErrors={teacherFormik.errors.areaValue}
                          areaValue={teacherFormik.values.areaValue}
                          setFieldValue={teacherFormik.setFieldValue}
                          setFieldTouched={teacherFormik.setFieldTouched}
                          areaChange={fetchAllSchoolByArea}
                          handleFormValueChange={handleFormValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="input--group">
                        <label htmlFor="" className="form-label">
                          School Name <span className="text-danger">*</span>
                        </label>
                        <div className="input--group">
                          <Select
                            className="common-input no-border"
                            name="tc_schoolId"
                            placeholder="Select School"
                            value={selectedSchool}
                            onChange={(value) => {
                              handleFormValueChange(value);
                              setSelectedSchool(value);
                              teacherFormik.setFieldValue(
                                "tc_schoolId",
                                value ? value.value : ""
                              );
                            }}
                            onBlur={(evt) => {
                              teacherFormik.setFieldTouched(
                                "tc_schoolId",
                                true,
                                true
                              );
                            }}
                            options={schoolDropdownValues}
                            isClearable
                            invalid={
                              teacherFormik.touched.tc_schoolId &&
                              teacherFormik.errors.tc_schoolId
                            }
                          />
                          {teacherFormik.touched.tc_schoolId &&
                            teacherFormik.errors.tc_schoolId && (
                              <div className="invalid-react-select-dropdown">
                                {teacherFormik.errors.tc_schoolId}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="input--group">
                        <label htmlFor="" className="form-label">
                          Languages Spoken{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="input--group">
                          <Select
                            isMulti
                            className="common-input no-border"
                            name="tc_languageSpoken"
                            placeholder="Select Languages"
                            value={selectedLanguages}
                            onChange={(value) => {
                              handleFormValueChange(value);
                              setSelectedLanguages(value);
                              teacherFormik.setFieldValue(
                                "tc_languageSpoken",
                                value ? value : ""
                              );
                            }}
                            onBlur={(evt) => {
                              teacherFormik.setFieldTouched(
                                "tc_languageSpoken",
                                true,
                                true
                              );
                            }}
                            options={languages}
                            isClearable
                            invalid={
                              teacherFormik.touched.tc_languageSpoken &&
                              teacherFormik.errors.tc_languageSpoken
                            }
                          />
                          {teacherFormik.touched.tc_languageSpoken &&
                            teacherFormik.errors.tc_languageSpoken && (
                              <div className="invalid-react-select-dropdown">
                                {teacherFormik.errors.tc_languageSpoken}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="" className="form-label">
                    Brief Profile <span className="text-danger">*</span>
                  </label>
                  <div className="input--group">
                    <Field
                      className={`form-control common-input ${
                        teacherFormik.errors.tc_briefProfile &&
                        teacherFormik.touched.tc_briefProfile
                          ? "form-err"
                          : ""
                      }`}
                      component="textarea"
                      name="tc_briefProfile"
                      value={teacherFormik.values.tc_briefProfile}
                      onChange={(e) => {
                        teacherFormik.handleChange(e);
                        handleFormValueChange(e);
                      }}
                      placeholder="Enter brief profile"
                    />
                    {teacherFormik.errors.tc_briefProfile &&
                    teacherFormik.touched.tc_briefProfile ? (
                      <div className="form-err-msg">
                        {teacherFormik.errors.tc_briefProfile}
                      </div>
                    ) : null}
                  </div>
                  {callFrom === 2 && (
                    <button
                      disabled={isSubmitLoading}
                      className="cmn--btn  w-100 form-control"
                      type="submit"
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        {isSubmitButtonLoading && <ButtonLoader></ButtonLoader>}

                        <span>Submit</span>
                      </div>
                    </button>
                  )}
                </>
              )}
            </Form>
          </Formik>
        )}
      </>
    </>
  );
};

StudentCommonEditForm.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default StudentCommonEditForm;
