import AttentionForm from "@/components/Common/AttentionForm";
import ButtonLoader from "@/components/Common/ButtonLoader";
import EnrollOptionModal from "@/components/Common/EnrollOptionModal";
import FeedbackFormModal from "@/components/Common/FeedbackFormModal";
import PDfModal from "@/components/Common/PdfMoal";
import PdfReaderModal from "@/components/Common/PdfReaderModal";
import SignatureModal from "@/components/Common/SignatureModal";
import VideoModal from "@/components/Common/WatchModal";
import { getAllContentByTPAPI } from "@/helpers/backendHelpers/content";
import { getStudentById } from "@/helpers/backendHelpers/student";
import { getTeacherById } from "@/helpers/backendHelpers/teacher";
import {
  createCertificate,
  updateTrainingParticipants,
  updateTrainingParticipantsDash,
  uploadSignedForm,
} from "@/helpers/backendHelpers/trainingParticipants";
import jsPDF from "jspdf";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaClock, FaPaperPlane } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";
import { MdCancel, MdPictureAsPdf } from "react-icons/md";
import SVG from "react-inlinesvg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Analysis from "@/assets/images/analysis.png";
import author from "@/assets/images/course/author.png";
import comments from "@/assets/images/data/comments";
import fileSvg from "@/assets/images/file.svg";
import Trainingd from "@/assets/images/training.png";
import Webinar from "@/assets/images/webinar.png";
import attention_form from "@/assets/pdf/attention_form.pdf";
import {
  LoginAlert,
  checkIdWithEncryption,
  getAuthToken,
  getFullUserInfo,
  getUserInfo,
} from "@/helpers/authHelper";
import {
  createTrainingParticipants,
  getEnrolledTrainingProgram,
  getTrainingProgram,
} from "@/helpers/backendHelpers/tariningProgram";
import { IMAGE_URL } from "@/helpers/urlHelper";
import BrowseDocumentModel from "./BrowseDocumentUpload";
import "./TrainingPrograme.scss";

const TrainingProrgamSingle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trainingProgram, setTrainingProgram] = useState({});
  const [isBatchAssigned, setIsBatchAssigned] = useState(0);
  const [trainingParticipantId, setTrainingParticipantId] = useState(0);
  const [trainingParticipantDetails, setTrainingParticipantDetails] = useState(
    {}
  );
  const [trainingBatchDetails, setTrainingBatchDetails] = useState();
  const [error, setError] = useState("");
  const [content, setContent] = useState([]);
  const [pdfModal, setPdfModal] = useState(false);
  const [pdfReaderModal, setPdfReaderModal] = useState(false);
  const [feedbackFormModal, setFeedbackFormModal] = useState(false);
  const [attentionFormModal, setAttentionFormModal] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const navigate = useNavigate();
  const [videoModal, setVideoModal] = useState(false);
  const [enrollModal, setEnrollModal] = useState(false);
  const [docUploadModal, setDocUploadModal] = useState(false);
  const [enrollProgram, setEnrollProgram] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [signature, setSignature] = useState("");
  const [userName, setUserName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [selectedSignatureStyle, setSelectedSignatureStyle] =
    useState("Autography");
  const [pdfs, setPdf] = useState([]);
  const [pdfModalTitle, setPdfModalTitle] = useState("");
  const [showFooter, setShowFooter] = useState(false);
  const [decryptedId, setDecryptedId] = useState("");
  const userInfo = getUserInfo();
  const fullUserInfo = getFullUserInfo();
  const [isPhysicalTrainingModalOpen, setPhysicalTrainingModalOpen] =
    useState(false);
  const [isLiveTrainingModalOpen, setLiveTrainingModalOpen] = useState(false);
  const [isRecordedTrainingModalOpen, setRecordedTrainingModalOpen] =
    useState(false);

  const openPhysicalTrainingModal = () => {
    setPhysicalTrainingModalOpen(true);
  };

  const closePhysicalTrainingModal = () => {
    setPhysicalTrainingModalOpen(false);
  };

  const openLiveTrainingModal = () => {
    setLiveTrainingModalOpen(true);
  };

  const closeLiveTrainingModal = () => {
    setLiveTrainingModalOpen(false);
  };

  const openRecordedTrainingModal = () => {
    setRecordedTrainingModalOpen(true);
  };

  const closeRecordedTrainingModal = () => {
    setRecordedTrainingModalOpen(false);
  };

  // Get trainingProgram id  thourgh Params
  const { id } = useParams();
  useEffect(() => {
    if (userInfo) {
      setSignature(userInfo?.fullName);
    }
  }, []);

  const fetchAllDetailsAfterUpload = () => {
    let idFromRes = checkIdWithEncryption(id, setDecryptedId, navigate);
    if (idFromRes) {
      fetchTrainingProgram(idFromRes);
      enrollTrainingProgram(idFromRes);
      fetchContentByTP(idFromRes);
    }
  };

  useEffect(() => {
    let idFromRes = checkIdWithEncryption(id, setDecryptedId, navigate);
    if (idFromRes) {
      fetchTrainingProgram(idFromRes);
      enrollTrainingProgram(idFromRes);
      fetchContentByTP(idFromRes);
    }
  }, [id]);

  useEffect(() => {
    setUserName(userInfo?.fullName);
    if (userInfo?.userType === "Student") {
      let schoolName = fullUserInfo?.st_school?.sc_schoolName
        ? fullUserInfo?.st_school?.sc_schoolName
        : "";
      setSchoolName(schoolName);
    } else if (userInfo?.userType === "Teacher") {
      let schoolName = fullUserInfo?.tc_school?.sc_schoolName
        ? fullUserInfo?.tc_school?.sc_schoolName
        : "";
      setSchoolName(schoolName);
      setStaffId(fullUserInfo?.tc_staffId);
    }
  }, [fullUserInfo, userInfo]);

  const enrollTrainingProgram = async (id) => {
    try {
      let body = {
        tps_tp_id: parseInt(id),
        tps_userType: userInfo?.userType,
        tps_userId: userInfo?.id,
        tps_OldDBId: fullUserInfo?.tc_oldDBId ? fullUserInfo?.tc_oldDBId : "",
      };
      const enroll = await getEnrolledTrainingProgram(body);
      setEnrollProgram(enroll.data.found);
      setIsBatchAssigned(enroll.data?.trainingParticipants?.tb_id);
      setTrainingParticipantId(enroll.data?.trainingParticipants?.tps_id);
      setTrainingParticipantDetails(enroll.data?.trainingParticipants);
      setTrainingBatchDetails(
        enroll.data?.trainingParticipants?.tp_trainingBatch
      );
    } catch (error) {}
  };
  const fetchTrainingProgram = async (id) => {
    try {
      setIsLoading(true);
      const response = await getTrainingProgram(id);
      const { trainingProgram } = response.data;
      setTrainingProgram(trainingProgram);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsLoading(false);
      setTrainingProgram({});
    }
  };

  const fetchContentByTP = async (id) => {
    try {
      setIsLoading(true);
      const response = await getAllContentByTPAPI(id);
      const { content } = response.data;
      setContent(content);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsLoading(false);
      setTrainingProgram({});
    }
  };

  const addTrainingParticipants = async (opt) => {
    try {
      let body = {
        tps_tp_id: parseInt(decryptedId),
        tps_userType: userInfo?.userType,
        tps_userId: userInfo?.id,
        tps_trainingOption: opt,
        tps_OldDBId: fullUserInfo?.tc_oldDBId ? fullUserInfo?.tc_oldDBId : "",
      };
      setIsLoading(true);

      const response = await createTrainingParticipants(body);
      if (response.status) {
        enrollTrainingProgram(decryptedId);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsLoading(false);
      setTrainingProgram({});
    }
  };

  const submitAttentionFormWithSign = async (attentionForm) => {
    try {
      setIsLoading(true);
      const fileName = "signedForm.pdf";
      const signedFormName = new Blob([attentionForm], {
        type: "application/pdf",
      });
      signedFormName.name = fileName;
      const data = {
        tps_signFontFamily: selectedSignatureStyle,
        tps_signText: signature,
        tps_attentionFormDate: new Date(),
        tps_trainingStatus: 3,
        tps_signedForm: signedFormName,
      };

      const response = await updateTrainingParticipantsDash(
        data,
        trainingParticipantId
      );
      let message = response?.message || "Form Uploaded";
      if (response?.status) {
        toggleAttentionFormModal();
        toast.success("Form Uploaded Successfully", { autoClose: 3000 });
        enrollTrainingProgram(decryptedId);
      } else {
        toast.error("Something Went Wrong!");
      }
      setIsLoading(false);
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Error while profile update";
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    var userName = "";
    if (
      trainingParticipantDetails &&
      trainingParticipantDetails?.tps_userType === "Student"
    ) {
      const response = await getStudentById(userInfo?.id);
      if (response?.status) {
        const { student } = response.data;
        userName = student?.st_fullName;
        return userName;
      }
    } else if (
      trainingParticipantDetails &&
      trainingParticipantDetails?.tps_userType === "Teacher"
    ) {
      const response = await getTeacherById(userInfo?.id);
      if (response?.status) {
        const { teacher } = response.data;
        userName = teacher?.tc_fullName;
        return userName;
      }
    }
  };

  const downloadCertificate = async () => {
    setIsLoading(true);
    let date = moment(trainingParticipantDetails?.tps_examDate, "DD-MM-YYYY");
    let examDate = date.format("DD MMM YYYY");
    if (trainingParticipantDetails?.tps_certificate.length) {
      fetch(`${IMAGE_URL}/${trainingParticipantDetails?.tps_certificate}`, {
        method: "GET",
      })
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = `ICT_Certificate ${examDate}.pdf`;
          document.body.appendChild(a);
          a.click();
          setTimeout((_) => {
            window.URL.revokeObjectURL(url);
          }, 60000);
          a.remove();
        })
        .catch((err) => {
          setIsLoading(false);
          console.error("err: ", err);
        });
    } else {
      const moment = require("moment");
      const name = await getUserDetails();
      const pdf = new jsPDF("l", "pt", "a4");
      await pdf.html(`<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
          <title>certificate
  
          </title>
          <style>
              .input-1 {
                  position: absolute;
                  top: 8%;
                  right: 15%;
                  width: 70%;
                  border: none;
                  font-weight: bolder;
                  text-align: center;
                  display: flex;
                  justify-content: center;
                  font-size:25px;
              }
  
              .input-2 {
                  position: absolute;
                  top: 7%;
                  right: 0%;
                  left:0%;
                  width: 85%;
                  border: none;
                  font-weight: bolder;
                  text-align: center;
                  display: block;
                  justify-content: center;
                  margin-left:auto;
                  margin-right:auto;
              }
  
              .input-3 {
                  position: absolute;
                  top: 6%;
                  right: 0%;
                  left:0%;
                  width: 85%;
                  border: none;
                  font-weight: bolder;
                  text-align: center;
                  display: block;
                  justify-content: center;
                  margin-left:auto;
                  margin-right:auto;
                  font-size:25  px;
              }
              .border-none{
                  border:none;
              }
  
              input:focus {
                  outline: none;
              }
              .contant img{
                height:500px !important;
                width:1000px !important;
                position:relative !important;
              }
              div .img-fluid1{
                height:100px;
                width:300px;
              }
          </style>
      </head>
  
      <body>
          <div>
          <img style="height:590px;width:840px;position:relative;" src="${IMAGE_URL}/kt_certificate/certificate.png" alt="altttt" class="img-fluid1"></img>
          <h4 style="font-weight:bold;white-space:nowrap;position:absolute;top:45%;left:345px;width:70%;color:black;text-align:center;">${name}</h4>
          <h5 style="font-weight:bold;white-space:nowrap;position:absolute;top:68%;left:360px;width:100%;color:black;">${examDate}</h5>
          </div>
      </body>
  
      </html>`);

      pdf.save(`ICT_Certificate_${examDate}`);
      let res = await createCertificate(trainingParticipantDetails?.tps_id);
      if (res.status) {
        enrollTrainingProgram(decryptedId);
      } else {
        console.log("res");
      }
    }

    setIsLoading(false);
  };

  const downloadPdf = () => {
    let v = {
      title: "Demo Form",
      pdf: "/kt_book/bk_pdf/1663389089200.pdf",
    };
    fetch(attention_form, {
      method: "GET",
    })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `Information Communication Technology (ICT) Skills Acquisition for Teachers.pdf`;
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch((err) => {
        console.error("err: ", err);
      });
  };

  const handleChangeImage2 = (e, i) => {
    //
    let { name } = e.target;
    if (name === "pdf_document") {
      let file = e.target.files[0];
      if (e.target.files.length !== 0) {
        let fileURL = window.URL.createObjectURL(file);
        file.fileURL = fileURL;
        setPdf([file]);
      }
    }
  };

  const PDFupload = async () => {
    try {
      setIsLoading(true);
      const data = {
        tps_signedForm: pdfs[0],
      };
      const response = await uploadSignedForm(data, trainingParticipantId);
      let message = response?.message || "Form Uploaded";
      if (response?.status) {
        let body = {
          // 1 = default, 2 = Image Uploaded, 3 = Admin Approved Start Exam, 4 = Exam Passed,5 = Certificate Download
          tps_trainingStatus: 2,
        };
        const updateStatusRes = await updateTrainingParticipants(
          body,
          trainingParticipantId
        );
        if (updateStatusRes?.status) {
          alert("Form Uploaded Successfully");
          enrollTrainingProgram(decryptedId);
          toggleDocUploadModal();
        }
      }
      setIsLoading(false);
      // return setSuccess(message)
    } catch (error) {
      let message =
        error?.response?.data?.message ||
        error?.message ||
        "Error while profile update";
      setIsLoading(false);
      // return setError(message)
    }
  };

  // const downloadAttentionForm = async () => {
  //   setIsLoading(true)
  //   const fullName = await getUserDetails()
  //   const signatureFontFamily = trainingParticipantDetails?.tps_signFontFamily
  //   const singnatureText = trainingParticipantDetails?.tps_signText
  //   const element = await attentionFormFormate(
  //     fullName,
  //     staffId,
  //     schoolName,
  //     signatureFontFamily,
  //     singnatureText,
  //   )
  //   html2pdf()
  //     .set({ filename: `${Date.now()}.pdf` })
  //     .from(element)
  //     .save()
  //   setIsLoading(false)
  // }

  const downloadAttentionForm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${IMAGE_URL}/${trainingParticipantDetails?.tps_signedForm}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${Date.now()}.pdf`;
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
    setIsLoading(false);
  };
  const togglePdfModal = () => {
    setPdfModal(!pdfModal);
  };
  const togglePdfReaderModal = () => {
    setPdfReaderModal(!pdfReaderModal);
  };
  const toggleFeedbackFormModal = () => {
    setFeedbackFormModal(!feedbackFormModal);
  };

  const toggleAttentionFormModal = () => {
    setAttentionFormModal(!attentionFormModal);
  };

  const toggleEnrollModal = () => {
    const isLoggedIn = getAuthToken() ? true : false;
    if (!isLoggedIn) {
      LoginAlert(navigate);
    } else {
      setEnrollModal(!enrollModal);
    }
  };
  const toggleWatchModal = () => {
    setVideoModal(!videoModal);
  };

  const toggleSignatureModal = () => {
    setSignatureModal(!signatureModal);
  };

  const toggleDocUploadModal = () => {
    setDocUploadModal(!docUploadModal);
  };

  return (
    <section className="education-forum-single py-5">
      <ToastContainer position="top-right" />
      <PDfModal
        modalTitle={pdfModalTitle ? pdfModalTitle : "Signed Form"}
        isOpen={pdfModal}
        toggle={togglePdfModal}
        pdf={pdfFile}
        type="pdf"
        showFooter={showFooter}
        downloadAttentionForm={downloadAttentionForm}
        setShowFooter={setShowFooter}
        isLoading={isLoading}
      />
      <PdfReaderModal
        modalTitle={pdfModalTitle ? pdfModalTitle : "Signed Form"}
        isOpen={pdfReaderModal}
        toggle={togglePdfReaderModal}
        pdf={pdfFile}
        type="pdf"
        isLoading={isLoading}
      />
      <FeedbackFormModal
        modalTitle={"ICT Training Survey"}
        isOpen={feedbackFormModal}
        toggle={toggleFeedbackFormModal}
        pdf={pdfFile}
        type="pdf"
      />
      {trainingParticipantDetails?.tps_trainingStatus === 1 ? (
        <AttentionForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          modalTitle="Signed Form"
          attentionFormType="1"
          isOpen={attentionFormModal}
          toggle={toggleAttentionFormModal}
          signature={signature}
          selectedSignatureStyle={selectedSignatureStyle}
          fullName={userName}
          schoolName={schoolName}
          staffId={staffId}
          toggleSignatureModal={toggleSignatureModal}
          submitAttentionFormWithSign={submitAttentionFormWithSign}
        />
      ) : (
        <AttentionForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          modalTitle="Signed Form"
          attentionFormType="2"
          isOpen={attentionFormModal}
          toggle={toggleAttentionFormModal}
          signature={trainingParticipantDetails?.tps_signText}
          selectedSignatureStyle={
            trainingParticipantDetails?.tps_signFontFamily
          }
          fullName={userName}
          schoolName={schoolName}
          staffId={staffId}
          toggleSignatureModal={toggleSignatureModal}
          submitAttentionFormWithSign={submitAttentionFormWithSign}
          downloadAttentionForm={downloadAttentionForm}
        />
      )}

      <VideoModal
        openFromLink={true}
        isOpen={videoModal}
        toggle={toggleWatchModal}
        video={videoFile}
      />
      <SignatureModal
        isOpen={signatureModal}
        toggle={toggleSignatureModal}
        signature={signature}
        setSignature={setSignature}
        toggleAttentionFormModal={toggleAttentionFormModal}
        selectedSignatureStyle={selectedSignatureStyle}
        setSelectedSignatureStyle={setSelectedSignatureStyle}
      />
      <Modal
        isOpen={docUploadModal}
        size="lg"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="tutorModal"
        tabIndex="-1"
        toggle={toggleDocUploadModal}
      >
        <ModalHeader
          toggle={() => {
            toggleDocUploadModal();
            setPdf([]);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="rounded d-flex px-2 py-3 align-items-center justify-content-between flex-column">
            <h3 className="font-weight-bold font_size_32 letter_spacing font_bold color_gray text-center pt-4">
              Congratulations !
            </h3>
            <div className="font_size_20 py-3 font_medium color_gray text-center">
              You have successfully completed your coursework for{" "}
              <span className="font_size_20 py-3 font_medium color_blue text-capitalize">
                Demo Training
              </span>
            </div>
            <div className="font_size_20 py-3  color_light_gray text-center">
              Just a few steps to your certification. <br></br>
              You are required to download and complete the Attestation Form by
              clicking the link below.
            </div>
            <button
              className="cmn--btn py-2 text-white font_bold  rounded border_none text-decoration-none text-center linear_gradient px-4 mx-1"
              onClick={() => downloadPdf()}
            >
              Download Attention Form
            </button>
            <div className="font_size_20 py-3  color_light_gray text-center">
              Upload the form back on KATon using the upload link below.{" "}
              <br></br>
              You will be able to proceed with your certification examination
              after the form is duly submitted.
            </div>
            <div className="d-flex justify-content-center py-3 w-60">
              <div className="d-flex justify-content-center bgInput w-100">
                {pdfs.length > 0 ? (
                  <>
                    <div className="py-2 UploadField color_blue d-flex flex-column align-items-center justify-content-center w-100 rounded border-none mx-1">
                      <div className="position-relative">
                        <a href="#" target="_blank">
                          <MdPictureAsPdf fontSize={70} color="#00bde2" />
                        </a>
                        <MdCancel
                          className="pointer position-absolute right_-5 top_-5"
                          color="red"
                          fontSize={22}
                          onClick={() => setPdf([])}
                        />{" "}
                      </div>
                    </div>
                  </>
                ) : (
                  <label
                    for="formFileMultiple3"
                    class="py-2 UploadField color_blue d-flex flex-column align-items-center justify-content-center w-100 rounded border-none mx-1"
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <SVG src={fileSvg} width="50px" />
                      <div className="">Upload Signed Form</div>
                    </div>
                  </label>
                )}
                <input
                  accept=".png, .jpg, .pdf, .jpeg"
                  className="form-control"
                  type="file"
                  id="formFileMultiple3"
                  name="pdf_document"
                  hidden
                  // value={data.pdf}
                  onChange={(e) => handleChangeImage2(e)}
                />
              </div>
            </div>
            {pdfs.length !== 0 && (
              <button
                disabled={isLoading}
                className="cmn--btn py-2 text-white font_bold width50 rounded border-none linear_gradient mx-1"
                onClick={() => PDFupload()}
              >
                Submit
              </button>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              className="btn text-white linear_gradient text-decoration-none text-center border_none rounded py-1 mx-1"
              onClick={() => toggleDocUploadModal()}
            >
              Cancel
            </button>
          </div>
        </ModalFooter>
      </Modal>
      <EnrollOptionModal
        isOpen={enrollModal}
        toggle={toggleEnrollModal}
        addTrainingParticipants={addTrainingParticipants}
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <article className="education-forum-single-content pe-xl-4">
              <div className="education-forum-single-content-top">
                <h5 class="mt-3">{trainingProgram.tp_programTitle}</h5>
              </div>
              <div className="education-forum-author">
                <div className="author">
                  <img src={author} alt="author" />
                  <span>
                    Facilitator: <span className="text-base">Adam Green</span>
                  </span>
                </div>
                <div className="date">
                  <span className="icon text-base">
                    <FaClock />
                  </span>
                  <div className="content">
                    Last Update:{" "}
                    <span className="text-base">
                      {moment(trainingProgram.tp_createdAt).format(
                        "DD MMM, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs education-forum-tab">
                <li
                  data-bs-toggle="tab"
                  className="active"
                  data-bs-target="#content"
                >
                  <span>Content</span>
                </li>
                {/* <li data-bs-toggle="tab" data-bs-target="#description">
                  <span>Description</span>
                </li> */}
                <li data-bs-toggle="tab" data-bs-target="#benefits">
                  <span>Benefits</span>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="content">
                  {content.length > 0 &&
                    content.map((data, i) => {
                      return (
                        <div class="accordion" id="accordionExample">
                          <div class="accordion-item mb-2">
                            <h2 class="accordion-header" id={`heading${i}`}>
                              <button
                                class="accordion-button content-title collapsed shadow-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#header${i}`}
                                aria-controls={`header${i}`}
                                aria-expanded="false"
                                style={{ fontSize: "16px" }}
                              >
                                {data?.cm_contentTitle}
                              </button>
                            </h2>
                            <div
                              id={`header${i}`}
                              class="accordion-collapse collapse"
                              aria-labelledby={`heading${i}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <div className="training-content">
                                  <ol>
                                    <h6 className="mt-3 ms-3">
                                      {data?.cm_description &&
                                        data?.cm_description.length > 0 &&
                                        data?.cm_description.map((desc) => {
                                          return (
                                            <>
                                              <li>{desc}</li>
                                            </>
                                          );
                                        })}
                                    </h6>
                                  </ol>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="tab-pane fade" id="description">
                  <p>Description of program</p>
                </div>

                <div className="tab-pane fade" id="benefits">
                  {/* <h3 className="subtitle">Benefits</h3> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: trainingProgram.tp_benefitsOfProgram,
                    }}
                  ></p>
                </div>

                <div className="tab-pane fade" id="reviews">
                  <hr className="contact-hr" />
                  <div className="comments-list">
                    <ul className="comments-list-items">
                      {comments &&
                        comments.map(({ user, name, date, txt }, i) => (
                          <li key={i}>
                            <img src={user} alt={name} />
                            <div className="cont">
                              <div className="top">
                                <div>
                                  <h5 className="name">{name}</h5>
                                  <span className="date">{date}</span>
                                </div>
                                <Link to="#" className="cmn--btn">
                                  Reply
                                </Link>
                              </div>
                              <p>{txt}</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <hr className="contact-hr" />
                  <div className="leave-comments">
                    <div className="row g-3 mt-2">
                      <div className="col-12">
                        <textarea
                          className="form-control pt-3 ps-4"
                          placeholder="Comment"
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="cmn--btn">
                          Post a Comment <FaPaperPlane />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="col-lg-4">
            <aside>
              {isBatchAssigned != 0 && isBatchAssigned != null && (
                <div className="widget">
                  <h4>Online Training</h4>
                  <ul className="video-info">
                    <li>
                      <strong>Trainer :</strong>
                      <span>Demo</span>
                    </li>
                    <li>
                      <strong>Date :</strong>
                      <span>
                        {moment(trainingBatchDetails?.tb_dateTime).format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </li>
                    <li>
                      <strong>Time :</strong>
                      <span>
                        {moment(trainingBatchDetails?.tb_dateTime).format(
                          "HH:MM"
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-2">
                    <button
                      type="button"
                      className="enroll-btn cmn--btn-joinSession w-100"
                      // onClick={() => addTrainingParticipants()}
                    >
                      Join Live Session
                    </button>
                  </div>
                </div>
              )}

              {trainingParticipantDetails?.tps_trainingStatus > 1 &&
                trainingParticipantDetails?.tps_trainingStatus < 4 && (
                  <>
                    <div className="widget">
                      <h5 className="subtitle">Online Exam</h5>
                      {trainingProgram?.tp_trainingExam &&
                        trainingProgram?.tp_trainingExam.length > 0 && (
                          <ul className="video-info">
                            <li>
                              <strong>Exam Duration :</strong>
                              <span>
                                {
                                  trainingProgram?.tp_trainingExam[0]
                                    ?.te_duration
                                }
                              </span>
                            </li>
                            <li>
                              <strong>Total Marks :</strong>
                              <span>
                                {
                                  trainingProgram?.tp_trainingExam[0]
                                    ?.te_totalMarks
                                }
                              </span>
                            </li>
                            <li>
                              <strong>Passing Marks :</strong>
                              <span>
                                {
                                  trainingProgram?.tp_trainingExam[0]
                                    ?.te_passingMarks
                                }
                              </span>
                            </li>
                          </ul>
                        )}

                      <ul className="related-download-list">
                        <li>
                          <Link
                            to="#"
                            onClick={async () => {
                              // await downloadAttentionForm()
                              setPdfModalTitle("Signed Form");
                              togglePdfModal();
                              setShowFooter(true);
                              setPdfFile(
                                trainingParticipantDetails?.tps_signedForm
                              );
                            }}
                          >
                            <div className="icon">
                              <GrDocumentPdf />
                            </div>
                            <span>Signed Form</span>
                          </Link>
                        </li>
                      </ul>
                      <Link
                        to="#"
                        onClick={() => {
                          if (
                            trainingParticipantDetails?.tps_trainingStatus ==
                              2 ||
                            trainingParticipantDetails?.tps_trainingStatus === 3
                          ) {
                            window.open(
                              `/trainingExam/${userInfo?.id}/${trainingProgram?.tp_id}/${trainingParticipantId}`,
                              "Popup",
                              "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0,maximize=1"
                            );
                          }
                        }}
                        className="mt-4 enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
                      >
                        {(trainingParticipantDetails?.tps_trainingStatus ===
                          2 ||
                          trainingParticipantDetails?.tps_trainingStatus ==
                            3) &&
                          "Start Exam"}
                      </Link>
                    </div>
                  </>
                )}
              {trainingParticipantDetails?.tps_trainingStatus === 1 &&
              trainingParticipantDetails?.tps_trainingOption === 1 ? (
                <div className="widget">
                  <p className="d-flex fs-15 justify-content-center">
                    Note: Lets complete all recorded videos and then submit
                    attestation form
                  </p>

                  <Link
                    to={{
                      pathname: `/training-resources/${decryptedId}`,
                    }}
                    state={{
                      tp_id: trainingProgram?.tp_id,
                      userInfoId: userInfo?.id,
                      tps_id: trainingParticipantId,
                      trainingStatus:
                        trainingParticipantDetails?.tps_trainingStatus,
                    }}
                    className="enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
                  >
                    Training Resources
                  </Link>
                </div>
              ) : trainingParticipantDetails?.tps_trainingStatus === 1 ? (
                <div className="widget">
                  <h5 className="subtitle">Submit Form</h5>
                  <button
                    className="mt-4 enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
                    onClick={() => toggleSignatureModal()}
                  >
                    Digital Attestation
                  </button>
                  <BrowseDocumentModel
                    tpsId={trainingParticipantId}
                    refreshComponent={fetchAllDetailsAfterUpload}
                  />
                </div>
              ) : null}

              {/* {trainingParticipantDetails?.tps_trainingStatus === 1 && (
                <div className="widget">
                  <h5 className="subtitle">Submit Form</h5>
                  <button
                    className="mt-4 enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
                    onClick={() => toggleSignatureModal()}
                  >
                    Digital Attestation
                  </button>
                  <BrowseDocumentModel
                    tpsId={trainingParticipantId}
                    refreshComponent={fetchAllDetailsAfterUpload}
                  />
                </div>
              )} */}
              {trainingParticipantDetails?.tps_trainingStatus > 3 && (
                <div className="widget">
                  <h5 className="subtitle">Certification!</h5>
                  <ul className="related-download-list">
                    <li>
                      <strong>
                        {trainingParticipantDetails?.tps_trainingStatus === 4
                          ? "Great, you have passed Online MCQ Exam. Admin team will approve your certificate soon."
                          : "Congratulations, you have successfully completed ICT training program. Hit button to download your certificate."}
                      </strong>
                    </li>
                  </ul>

                  {trainingParticipantDetails?.tps_trainingStatus === 5 && (
                    <>
                      <button
                        disabled={isLoading}
                        onClick={() => downloadCertificate()}
                        className="mt-4 enroll-btn d-flex justify-content-center align-items-center cmn--btn w-100"
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          {isLoading && <ButtonLoader></ButtonLoader>}

                          <span>Download Certificate</span>
                        </div>
                      </button>

                      <button
                        onClick={() => toggleFeedbackFormModal()}
                        className="feedback-submit mt-4 enroll-btn d-flex justify-content-center align-items-center border-0 cmn--btn w-100"
                      >
                        Submit Your Feedback
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Choose Training Options */}

              <div className="mt-3 pt-2">
                {trainingParticipantDetails?.tps_trainingOption === 2 ||
                trainingParticipantDetails?.tps_trainingOption === 3 ? (
                  <>
                    <div className="widget mb-5">
                      <ul className="video-info">
                        <li>
                          <strong>Duration :</strong>
                          <span>{trainingProgram.tp_duration}</span>
                        </li>
                        <li>
                          <strong>Course level :</strong>
                          <span>Intermediate</span>
                        </li>
                        <li>
                          <strong>Language :</strong>
                          <span>English</span>
                        </li>
                      </ul>
                      {/* <p className="d-flex fs-15 justify-content-center">
                        Note: Lets complete all recorded videos and then submit
                        attestation form
                      </p> */}
                      <Link
                        to={{
                          pathname: `/training-resources/${decryptedId}`,
                        }}
                        state={{
                          tp_id: trainingProgram?.tp_id,
                          userInfoId: userInfo?.id,
                          tps_id: trainingParticipantId,
                          trainingStatus:
                            trainingParticipantDetails?.tps_trainingStatus,
                        }}
                        className="enroll-btn d-flex mt-3 justify-content-center align-items-center cmn--btn w-100"
                      >
                        Training Resources
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                  // <button
                  //   type="button"
                  //   className="enroll-btn cmn--btn w-100"
                  //   // onClick={() => addTrainingParticipants()}
                  //   onClick={() => toggleEnrollModal()}
                  // >
                  //   Choose Training Option
                  // </button>
                )}
              </div>
              {/*<div className="mb-2 p-4 bg-white library__item">
                <div className="library__item__inner rounded-3">
                  <img
                    className="mb-3 library__item__img"
                    src={Analysis}
                    alt=""
                  />
                  <h6 className="library__item__title">Physical Training</h6>
                </div>
              </div>
              <div className="mb-2 p-4 bg-white library__item">
                <div className="library__item__inners rounded-3">
                  <img
                    className="mb-3 library__item__img"
                    src={Webinar}
                    alt=""
                  />
                  <h6 className="library__item__title">Live Training</h6>
                </div>
              </div>
              <div className="mb-2 p-4 bg-white library__item">
                <div className="library__item__innerss rounded-3">
                  <img
                    className="mb-3 library__item__img"
                    src={Trainingd}
                    alt=""
                  />
                  <h6 className="library__item__title">Recorded Training</h6>
                </div>
              </div>*/}
              {!enrollProgram ? (
                <div className="training__div">
                  <ul className="training_ul">
                    <li className="mb-2 p-4 training_li bg-white library__item">
                      <input
                        // onClick={() => addTrainingParticipants(3)}
                        onClick={openPhysicalTrainingModal}
                        className="radio_input"
                        type="radio"
                        name="test"
                        id="cb1"
                      />
                      <label className="rounded-3 label1" for="cb1">
                        <img
                          className="training__img"
                          src={Analysis}
                          alt="training"
                        />
                        <h6 className="mt-3 library__item__title">
                          Physical Training
                        </h6>
                      </label>
                    </li>
                    <li className="mb-2 p-4 training_li bg-white library__item">
                      <input
                        // onClick={() => addTrainingParticipants(2)}
                        onClick={openLiveTrainingModal}
                        className="radio_input"
                        type="radio"
                        name="test"
                        id="cb2"
                      />
                      <label className="rounded-3 label2" for="cb2">
                        <img
                          className="training__img"
                          src={Webinar}
                          alt="training"
                        />
                        <h6 className="mt-3 library__item__title">
                          Live Training
                        </h6>
                      </label>
                    </li>
                    <li className="mb-2 p-4 training_li bg-white library__item">
                      <input
                        // onClick={() => addTrainingParticipants(1)}
                        onClick={openRecordedTrainingModal}
                        className="radio_input"
                        type="radio"
                        name="test"
                        id="cb3"
                      />
                      <label className="rounded-3 label3" for="cb3">
                        <img
                          className="training__img"
                          src={Trainingd}
                          alt="training"
                        />
                        <h6 className="mt-3 library__item__title">
                          Recorded Training
                        </h6>
                      </label>
                    </li>
                  </ul>
                </div>
              ) : null}
              {/* Modals for trainign options */}
              <Modal
                centered
                size="lg"
                scrollable
                isOpen={isPhysicalTrainingModalOpen}
                toggle={closePhysicalTrainingModal}
              >
                <ModalHeader>
                  <div className="training-modal-header-div">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        className="training__image"
                        src={Analysis}
                        alt="training"
                      />{" "}
                      <h5 className="training-modal-header-title">
                        Physical Training
                      </h5>
                      <Button
                        type="button"
                        className="close bg-transparent border-0"
                        style={{ color: "black", fontSize: "25px" }}
                        onClick={closePhysicalTrainingModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </Button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="mt-3 mb-3">
                    <p className="training_paragraph">
                      Physical training is an essential component of a healthy
                      lifestyle, encompassing a wide range of activities that
                      enhance one's physical fitness and overall well-being.
                      Whether it's hitting the gym to build muscle and increase
                      strength, lacing up your running shoes for a
                      heart-pounding jog, or even perfecting your downward dog
                      in a yoga class, physical training comes in many forms.
                      It's not just about looking great in those workout
                      clothes; it's about fostering resilience, boosting energy
                      levels, and nurturing a body that can tackle life's
                      challenges head-on. So, get ready to break a sweat, feel
                      the burn, and take your body to new heights through the
                      wonders of physical training.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                  <div>
                    <Button
                      className="rounded-0 mx-auto"
                      color="dark"
                      onClick={() => {
                        closePhysicalTrainingModal();
                        addTrainingParticipants(3);
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>

              <Modal
                centered
                size="lg"
                scrollable
                isOpen={isLiveTrainingModalOpen}
                toggle={closeLiveTrainingModal}
              >
                <ModalHeader>
                  <div className="training-modal-header-div">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        className="training__image"
                        src={Webinar}
                        alt="training"
                      />{" "}
                      <h5 className="training-modal-header-title">
                        Live Training
                      </h5>
                      <Button
                        type="button"
                        className="close bg-transparent border-0"
                        style={{ color: "black", fontSize: "25px" }}
                        onClick={closeLiveTrainingModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </Button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="mt-3 mb-3">
                    <p className="training_paragraph">
                      Live training for students is an engaging and interactive
                      educational experience that takes learning beyond the
                      confines of traditional classrooms. During these sessions,
                      students have the unique opportunity to connect with
                      expert instructors in real-time, fostering a dynamic
                      environment for knowledge exchange. Through live training,
                      students can ask questions, participate in discussions,
                      and gain hands-on experience in their chosen field, making
                      it an invaluable part of their educational journey.
                      Whether it's enhancing their academic skills or mastering
                      a new subject, live training offers students an immersive
                      and transformative learning experience that leaves them
                      better equipped for success.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                  <div>
                    <Button
                      className="rounded-0 mx-auto"
                      color="dark"
                      onClick={() => {
                        closeLiveTrainingModal();
                        addTrainingParticipants(2);
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>

              <Modal
                centered
                size="lg"
                scrollable
                isOpen={isRecordedTrainingModalOpen}
                toggle={closeRecordedTrainingModal}
              >
                <ModalHeader>
                  <div className="training-modal-header-div">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        className="training__image"
                        src={Trainingd}
                        alt="training"
                      />{" "}
                      <h5 className="training-modal-header-title">
                        Recorded Training
                      </h5>
                      <Button
                        type="button"
                        className="close bg-transparent border-0"
                        style={{ color: "black", fontSize: "25px" }}
                        onClick={closeRecordedTrainingModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </Button>
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="mt-3 mb-3">
                    <p className="training_paragraph">
                      Recorded training for students offers a flexible and
                      convenient way to access educational content. Whether
                      you're a busy college student juggling classes and work or
                      a lifelong learner seeking to expand your knowledge,
                      recorded training sessions provide an on-demand learning
                      experience. These pre-recorded video lessons cover a wide
                      range of subjects, from mathematics and science to
                      humanities and arts. With the ability to pause, rewind,
                      and replay, students can tailor their learning pace to
                      suit their needs. This modern approach to education allows
                      students to absorb information at their own speed while
                      accommodating their busy schedules.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                  <div>
                    <Button
                      className="rounded-0 mx-auto"
                      color="dark"
                      onClick={() => {
                        closeRecordedTrainingModal();
                        addTrainingParticipants(1);
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </ModalFooter>
              </Modal>
              {trainingProgram.tp_programDetailTemplate && (
                <div className="widget">
                  <h5 className="subtitle">Read More</h5>
                  <ul className="related-download-list">
                    <li>
                      <Link
                        to="#"
                        onClick={() => {
                          // setPdfModalTitle('Course Details')
                          // togglePdfModal()
                          // setPdfFile(trainingProgram.tp_programDetailTemplate)
                          setPdfModalTitle("Course Details");
                          togglePdfReaderModal();
                          setPdfFile(trainingProgram.tp_programDetailTemplate);
                        }}
                      >
                        <div className="icon">
                          <GrDocumentPdf />
                        </div>
                        <span>Course details</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingProrgamSingle;
