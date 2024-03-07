import Learning from "../pages/360-degree-learning/Learning";
import About from "../pages/about/About";
import ChangePass from "../pages/auth/ChangePass";
import Reset from "../pages/auth/reset";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
// import ContactUs from '../pages/contact/ContactUs'
import EducationForum from "../pages/education-forum/EducationForum";
import EducationForumSingle from "../pages/education-forum/EducationForumSingle";

// Dashboard
import about_bg from "../assets/images/about-page-bg.png";
import contact_bg from "../assets/images/contact-bg.png";
import education_forum_bg from "../assets/images/training-program.png";
import who_can_join_banner from "../assets/images/who-can-join/who_can_join_banner.jpg";
import Books from "../pages/books";
import BooksSingle from "../pages/books/BooksSingle";
// import BlogSingle from '../pages/blog/BlogSingle'
import Home from "../pages/home/Home";
import Practice from "../pages/practice/Practice";
import PastPaper from "../pages/pastPaper/PastPaper";
import PastPaperSingle from "../pages/pastPaper/PastPaperSingle";
import AssignmentResult from "../pages/assignmentResult/AssignmentResult";
import McqTest from "../pages/practice/McqTest";
import TrainingExam from "../pages/trainingExam/TrainingExam";
import SelfAssessmentTest from "../pages/selfAssessment/SelfAssessmentTest";
// import PdfReader from '../pages/pdfReader/PdfReader'
// McqTest
import Library from "../pages/library/Library";
import Messages from "../pages/messages/Messages";
import LibraryBookDetail from "../pages/library/LibraryBookDetail";
import OrderHistory from "../pages/order-history/OrderHistory";
import Privacy from "../pages/privacy/Privacy";
import Profile from "../pages/profile/Profile";
import TrainingProgram from "../pages/training-program/index";
import TrainingProrgamSingle from "../pages/training-program/TrainingProrgamSingle";
import WhoCanJoin from "../pages/who-can-join/WhoCanJoin";
import Terms from "../pages/privacy/Terms";
import LiveClass from "../pages/live-class/LiveClass";
import LiveClassEnd from "../pages/liveClassEnd/liveClassEnd";
import LiveClassSingle from "../pages/live-class/LiveClassSingle";
import LiveClassRoom from "../pages/live-class/LiveClassRoom";
import SelfAssessment from "../pages/selfAssessment/SelfAssessment";
import EPub from "../pages/EPub/EPub";
import TrainingResources from "../pages/trainingResources/TrainingResources";
import Blog from "../pages/connect/blog/index";
import Group from "../pages/group/Group";
import notFound from "../pages/not-found-page/notFound";
import videos from "../pages/videos/index";
import ContactForm from "pages/contactus/ContactForm";
import banner_bgd from "../assets/images/banner/banner_bgd.png";
import CompC from "../assets/images/banner/CompC.png";
import Faq from "pages/FAQ/Faq";
import { getUserInfo } from "helpers/authHelper";

const userInfo = getUserInfo();

// TODO: Comment to check
const authProtectedRoutes = [
  {
    path: "/profile",
    component: Profile,
    isLayout: true,
  },
  {
    path: "/epub/:name",
    component: EPub,
    isLayout: false,
  },
  {
    path: "/my-library",
    component: Library,
    isLayout: true,
  },
  {
    path: "/my-library/:id",
    component: LibraryBookDetail,
    isLayout: true,
  },
  {
    path: "/order-history",
    component: OrderHistory,
    isLayout: true,
  },
  {
    path: "/messages",
    component: Messages,
    isLayout: true,
  },
];
// All 'img' object nodes is for hero area background image and 'pageTitle' is for hero area page title
const publicRoutes = [
  { path: "/", component: Home, isLayout: false },
  {
    // path: "/library",
    path: "/books",
    component: Books,
    isLayout: true,
  },
  {
    path: "/videos",
    component: videos,
    isLayout: true,
  },
  {
    path: "/connect/blog",
    pageTitle: "Connect",
    currentPageMenu: "Connect",
    component: Blog,
    isLayout: true,
    img: CompC,
  },
  // {
  //   path: '/group',
  //   component: Group,
  //   isLayout: true,
  // },
  {
    path: "/group1",
    component: Group,
    isLayout: true,
  },

  {
    path: "/library/:id",
    component: BooksSingle,
    isLayout: true,
  },
  {
    path: "/about",
    component: About,
    isLayout: true,
    pageTitle: "About Us",
    img: about_bg,
  },
  {
    path: "/practice/assignment",
    component: Practice,
    isLayout: true,
    pageTitle:
      userInfo?.userType === "Teacher" ? "Assignment Review" : "Assignments",
    currentPageMenu: "Listing",
    img: CompC,
  },
  {
    path: "/practice/pastQuestion",
    component: PastPaper,
    isLayout: true,
    pageTitle: "Past Questions",
    currentPageMenu: "Listing",
    img: CompC,
  },
  {
    path: "/practice/pastQuestion/:id",
    component: PastPaperSingle,
    isLayout: true,
    currentPageMenu: "Details",
    pageTitle: "Past Questions",
    parentTitle: "Listing",
    parentTitleLink: "/pastQuestion",
    // img: about_bg,
  },
  {
    path: "/training-resources/:id",
    component: TrainingResources,
    isLayout: true,
    pageTitle: "Training Resources",
    currentPageMenu: "Listing",
    // img: about_bg,
  },
  {
    path: "/practice/selfAssessment",
    component: SelfAssessment,
    isLayout: true,
    pageTitle: "Self Assessment",
    currentPageMenu: "Listing",
    img: banner_bgd,
  },
  {
    path: "/training-resources",
    component: TrainingResources,
    isLayout: true,
    pageTitle: "Training Resources",
    currentPageMenu: "Listing",
    // img: about_bg,
  },
  {
    path: "/practice/practiceResult/:id",
    component: AssignmentResult,
    isLayout: true,
    pageTitle: "Assignment Result",
    parentTitle: "Listing",
    parentTitleLink: "/practice",
    currentPageMenu: "Assignment Result",
    // img: about_bg,
  },
  {
    path: "/mcqTest/:st_id/:asn_id",
    component: McqTest,
    isLayout: false,
    // pageTitle: 'Mcq Test',
    // img: about_bg,
  },
  {
    path: "/trainingExam/:st_id/:tp_id/:tps_id",
    component: TrainingExam,
    isLayout: false,
    // pageTitle: 'Mcq Test',
    // img: about_bg,
  },
  {
    path: "/selfAssessmentTest/:sa_id/:st_id",
    component: SelfAssessmentTest,
    isLayout: false,
    // pageTitle: 'Mcq Test',
    // img: about_bg,
  },
  // {
  //   path: '/pdfReader',
  //   component: PdfReader,
  //   isLayout: false,
  //   // pageTitle: 'Mcq Test',
  //   // img: about_bg,
  // },
  {
    path: "/education-forum",
    component: EducationForum,
    isLayout: true,
    pageTitle: "Connect ",
    currentPageMenu: "Listing",
    img: education_forum_bg,
  },
  {
    path: "/education-forum/:id",
    component: EducationForumSingle,
    isLayout: true,
    pageTitle: "Connect ",
    parentTitle: "Listing",
    parentTitleLink: "/education-forum",
    currentPageMenu: "Details",
    img: education_forum_bg,
  },
  {
    path: "/training-program",
    component: TrainingProgram,
    isLayout: true,
    pageTitle: "Upskilling For Facilitators And Teams",
    currentPageMenu: "Listing",
    img: education_forum_bg,
  },
  {
    path: "/training-program/:id",
    component: TrainingProrgamSingle,
    isLayout: true,
    pageTitle: "Training",
    currentPageMenu: "Details",
    parentTitle: "Listing",
    parentTitleLink: "/training-program",
    img: education_forum_bg,
  },
  {
    path: "/live-class",
    component: LiveClass,
    isLayout: true,
    pageTitle: "Live Class",
    currentPageMenu: "Listing",
    img: education_forum_bg,
  },
  {
    path: "/live-class-end/:id",
    component: LiveClassEnd,
    isLayout: false,
    pageTitle: "Live Class End",
    currentPageMenu: "Listing",
    img: education_forum_bg,
  },
  {
    path: "/live-class-room/:roomUrl",
    component: LiveClassRoom,
    isLayout: false,
    // pageTitle: 'Online Classes',
    // img: education_forum_bg,
  },
  {
    path: "/live-class/:id",
    component: LiveClassSingle,
    isLayout: true,
    pageTitle: "Live Class",
    currentPageMenu: "Details",
    parentTitle: "Listing",
    parentTitleLink: "/live-class",
    img: education_forum_bg,
  },
  {
    path: "/fcontact_us",
    component: ContactForm,
    isLayout: true,
    // pageTitle: 'Contact Us',
    // img: contact_bg,
  },

  {
    path: "/360-degree-learning",
    component: Learning,
    isLayout: true,
    pageTitle: "Education Hub",
    img: education_forum_bg,
  },
  {
    path: "/who-can-join",
    component: WhoCanJoin,
    isLayout: true,
    pageTitle: "Who can Join Us?",
    img: who_can_join_banner,
  },
  {
    path: "/terms-of-use",
    component: Terms,
    isLayout: true,
    // img: education_forum_bg,
    pageTitle: "Terms and Conditions",
  },
  {
    path: "/privacy-policy",
    component: Privacy,
    isLayout: true,
    // img: education_forum_bg,
    pageTitle: "Privacy Policy",
  },
  {
    path: "/faq",
    component: Faq,
    isLayout: true,
    pageTitle: "FREQUENTLY ASKED QUESTIONS",
  },
  // {
  //   path: '/connect/group',
  //   component: Group,
  //   isLayout: true,
  // },
  {
    path: "/not-found",
    component: notFound,
    // isLayout: true,
    pageTitle: "Not found",
    currentPageMenu: "not found",
    img: contact_bg,
  },
  { path: "/auth/reset", component: Reset, isLayout: true },
  { path: "/auth/signin", component: SignIn, isLayout: true },
  { path: "/auth/signup", component: SignUp, isLayout: true },
  { path: "/auth/change-pass", component: ChangePass, isLayout: true },
];

export { publicRoutes, authProtectedRoutes };
