import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import swal from "sweetalert";
import menu from "@/assets/images/data/menu";
import dashboard_header_menu, {
  dashboard_header_student_menu,
} from "@/assets/images/data/menu2";
import default_icon from "@/assets/images/default_avatar.png";
import logo from "@/assets/images/logo/MOE_Logoo.png";``
import { AuthContext, useLoading } from "../contexts/AuthContext";
import { getUserInfo, removeAuthInfo } from "@/helpers/authHelper";
import {
  logOutParent,
  logOutPublisher,
  logOutUser,
  logOutfTeacher,
} from "@/helpers/backendHelper";
import { IMAGE_URL } from "@/helpers/urlHelper";
import LanguageTranslator from "./LanguageTranslator";
import { useRouter } from "next/router";
import Image from "next/image";

const Header = (props) => {
  // const navigate = useNavigate()
  const { loading, setLoading } = useLoading();

  const router = useRouter();
  const userInfo = getUserInfo();

  const pathName = router.pathname;
  const isLoggedIn =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [menuOpen, setMenuOpen] = useState(false);
  const { setLogout } = useContext(AuthContext);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const [selectedprofileMenu, setSelectedProfileMenu] = useState("");
  const [newPathName, setNewPathName] = useState(pathName);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setNewPathName(pathName);
    if (pathName === "/") {
      setSelectedMenu("");
      setSelectedSubMenu("");
      setSelectedProfileMenu("");
    } else {
    }
  }, [pathName]);

  useEffect(() => {
    if (newPathName === "/") {
      setSelectedMenu("");
      setSelectedSubMenu("");
      setSelectedProfileMenu("");
    } else {
      const separatedPathName = newPathName.split("/").filter(Boolean);
      setSelectedMenu(separatedPathName[0]);
      if (separatedPathName) {
        setSelectedMenu(separatedPathName[0]);
        if (separatedPathName[1]) {
          setSelectedSubMenu(separatedPathName[1]);
        }
      }
    }
  }, [newPathName]);

  useEffect(() => {
    let pathUrl = window.location.href;
    if (pathUrl.match("/")) {
      return;
    }

    var Tawk_API = Tawk_API || {};

    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/635118c5daff0e1306d2fe52/1gfqchheg";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  const handleLogout = async () => {
    console.log("pathname1", pathName);
    const value = await swal("Are you sure you want to logout?", {
      buttons: {
        defeat: "Log out",
        cancel: "Cancel",
      },
    });

    if (value === "defeat") {
      if (userInfo === "Student") {
        logOutUser();
      } else if (userInfo === "Teacher") {
        logOutfTeacher();
      } else if (userInfo === "Parent") {
        logOutParent();
      } else if (userInfo === "Publisher") {
        logOutPublisher();
      }
      removeAuthInfo();
      setLogout();
      router.push("/auth/signin");
    }
  };

  const profilePicLocal =
    typeof window !== "undefined" ? localStorage.getItem("profilePic") : null;

  const setMainMenuValue = (mainMenuSlug) => {
    setSelectedMenu("");
    setSelectedSubMenu("");
    setSelectedProfileMenu("");
    setSelectedMenu(mainMenuSlug);
  };

  const setBothMenuValue = (mainMenuSlug, subMenuSlug) => {
    setSelectedMenu("");
    setSelectedSubMenu("");
    setSelectedProfileMenu("");
    setSelectedMenu(mainMenuSlug);
    setSelectedSubMenu(subMenuSlug);
  };

  const profileMenu = [
    {
      text: "Edit Profile",
      link: "/profile",
      profileMenuSlug: "profile",
    },
    {
      text: "Change Password",
      link: "/auth/change-pass",
      profileMenuSlug: "/auth/change-pass",
    },
  ];

  return (
    <>
      <div className="header-bottom bg--title">
        <div className="container">
          <div className="header-wrapper">
            <Link
              href="/"
              className="logo"
              onClick={() => {
                setSelectedMenu("");
                setSelectedSubMenu("");
                setSelectedProfileMenu("");
              }}
            >
              <Image src={logo} alt="" />
            </Link>
            <div
              className="nav-toggle d-lg-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {!menuOpen ? <FaBars /> : <GrClose />}
            </div>
            <ul
              className={`menu ms-auto ${menuOpen ? "show-mobile-menu" : ""}`}
            >
              {!isLoggedIn
                ? menu &&
                  menu.map(
                    (
                      {
                        text,
                        link,
                        sub_menu,
                        mainMenuSlug,
                        style,
                        clicked,
                        icon,
                      },
                      i
                    ) => (
                      <React.Fragment key={text}>
                        <li
                          style={{
                            ...style,
                            color: clicked ? "white" : "white",
                          }}
                        >
                          <Link
                            href={link}
                            onClick={() => {
                              setMainMenuValue(mainMenuSlug);
                            }}
                          >
                            {/* <span
                              className={
                                selectedMenu === mainMenuSlug ||
                                pathName.includes(mainMenuSlug)
                                  ? "selected-group"
                                  : ""
                              }
                            > */}
                            {icon && (
                              <Image
                                className="language-img"
                                src={icon}
                                alt=""
                                style={{ marginRight: "5px", height: "13px" }}
                              />
                            )}
                            {text}
                            {/* </span> */}
                            {sub_menu && <FaAngleDown />}
                          </Link>
                          {sub_menu && (
                            <ul className="submenu">
                              {sub_menu
                                .filter((n) => {
                                  if (
                                    (!userInfo && n.text === "Group") ||
                                    (userInfo &&
                                      userInfo?.userType !== "Student" &&
                                      n.text === "Group")
                                  ) {
                                    return false;
                                  }
                                  if (
                                    userInfo &&
                                    userInfo?.userType === "Teacher" &&
                                    n.text === "Self Assessment"
                                  ) {
                                    return false;
                                  }
                                  return true;
                                })
                                .map(
                                  ({ text, link, tabName, subMenuSlug }, i) => (
                                    <React.Fragment key={text}>
                                      <li>
                                        <Link
                                          className={
                                            selectedSubMenu === subMenuSlug
                                              ? "selected-group"
                                              : ""
                                          }
                                          href={link}
                                          state={{ tabName: tabName }}
                                          onClick={() => {
                                            setBothMenuValue(
                                              mainMenuSlug,
                                              subMenuSlug
                                            );
                                            handleMenuClick();
                                          }}
                                        >
                                          {text}
                                        </Link>
                                      </li>
                                    </React.Fragment>
                                  )
                                )}
                            </ul>
                          )}
                        </li>
                      </React.Fragment>
                    )
                  )
                : isLoggedIn && userInfo?.userType === "Teacher"
                ? dashboard_header_menu &&
                  dashboard_header_menu.map(
                    (
                      {
                        text,
                        link,
                        sub_menu,
                        joinUssub_menu,
                        mainMenuSlug,
                        style,
                        icon,
                        clicked,
                      },
                      i
                    ) => (
                      <React.Fragment key={text}>
                        <li
                          style={{
                            ...style,
                            color: clicked ? "white" : "white",
                          }}
                        >
                          <Link
                            href={link}
                            onClick={() => {
                              setMainMenuValue(mainMenuSlug);
                            }}
                          >
                            {/* <span
                              className={
                                selectedMenu === mainMenuSlug
                                  ? "selected-group"
                                  : ""
                              }
                            > */}
                            {icon && (
                              <Image
                                className="language-img"
                                src={icon}
                                alt=""
                                style={{ marginRight: "5px", height: "13px" }}
                              />
                            )}
                            {text}
                            {/* </span> */}
                            {sub_menu && <FaAngleDown />}
                            {!isLoggedIn
                              ? joinUssub_menu && <FaAngleDown />
                              : null}
                          </Link>
                          {sub_menu && (
                            <ul className="submenu">
                              {sub_menu
                                .filter((n) => {
                                  if (
                                    (!userInfo && n.text === "Group") ||
                                    (userInfo &&
                                      userInfo?.userType !== "Student" &&
                                      n.text === "Group")
                                  ) {
                                    return false;
                                  }
                                  if (
                                    userInfo &&
                                    userInfo?.userType === "Teacher" &&
                                    n.text === "Self Assessment"
                                  ) {
                                    return false;
                                  }
                                  return true;
                                })
                                .map(({ text, link, subMenuSlug }, i) => (
                                  <li key={text}>
                                    <Link
                                      className={
                                        selectedSubMenu === subMenuSlug
                                          ? "selected-group"
                                          : ""
                                      }
                                      href={link}
                                      onClick={() => {
                                        setBothMenuValue(
                                          mainMenuSlug,
                                          subMenuSlug
                                        );
                                        handleMenuClick();
                                      }}
                                    >
                                      {text}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                          {joinUssub_menu && (
                            <ul className="submenu">
                              {joinUssub_menu.map(({ text, link }, i) => (
                                <li key={text}>
                                  <Link href={link}>{text}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      </React.Fragment>
                    )
                  )
                : dashboard_header_student_menu &&
                  dashboard_header_student_menu.map(
                    (
                      {
                        text,
                        link,
                        sub_menu,
                        joinUssub_menu,
                        mainMenuSlug,
                        style,
                        icon,
                        clicked,
                      },
                      i
                    ) => (
                      <React.Fragment key={text}>
                        <li
                          style={{
                            ...style,
                            color: clicked ? "white" : "white",
                          }}
                        >
                          <Link
                            href={link}
                            onClick={() => {
                              setMainMenuValue(mainMenuSlug);
                            }}
                          >
                            {/* <span
                              className={
                                selectedMenu === mainMenuSlug
                                  ? "selected-group"
                                  : ""
                              }
                            > */}
                            {icon && (
                              <Image
                                className="language-img"
                                src={icon}
                                alt=""
                                style={{ marginRight: "5px", height: "13px" }}
                              />
                            )}
                            {text}
                            {/* </span> */}
                            {sub_menu && <FaAngleDown />}
                            {!isLoggedIn
                              ? joinUssub_menu && <FaAngleDown />
                              : null}
                          </Link>
                          {sub_menu && (
                            <ul className="submenu">
                              {sub_menu
                                .filter((n) => {
                                  if (
                                    (!userInfo && n.text === "Group") ||
                                    (userInfo &&
                                      userInfo?.userType !== "Student" &&
                                      n.text === "Group")
                                  ) {
                                    return false;
                                  }
                                  if (
                                    userInfo &&
                                    userInfo?.userType === "Teacher" &&
                                    n.text === "Self Assessment"
                                  ) {
                                    return false;
                                  }
                                  return true;
                                })
                                .map(({ text, link, subMenuSlug }, i) => (
                                  <li key={text}>
                                    <Link
                                      className={
                                        selectedSubMenu === subMenuSlug
                                          ? "selected-group"
                                          : ""
                                      }
                                      href={link}
                                      onClick={() => {
                                        setBothMenuValue(
                                          mainMenuSlug,
                                          subMenuSlug
                                        );
                                        handleMenuClick();
                                      }}
                                    >
                                      {text}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                          {joinUssub_menu && (
                            <ul className="submenu">
                              {joinUssub_menu.map(({ text, link }, i) => (
                                <li key={text}>
                                  <Link href={link}>{text}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      </React.Fragment>
                    )
                  )}

              {isLoggedIn && userInfo && menuOpen && (
                <li>
                  <div className="p-3 profile-mobile">
                    <Link href="/profile" className="p-0">
                      <Image
                        onClick={() => {
                          handleLogout();
                          handleMenuClick();
                        }}
                        style={{
                          // height: "42px",
                          // width: "42px",
                          borderRadius: "50%",
                        }}
                        src={
                          profilePicLocal &&
                          profilePicLocal != null &&
                          profilePicLocal !== "null"
                            ? `${IMAGE_URL}/${profilePicLocal}`
                            : default_icon
                        }
                        alt=""
                        width={42}
                        height={42}
                      />
                      <FaAngleDown />
                    </Link>
                  </div>
                  <ul className="submenu">
                    <li
                      onClick={() => {
                        setSelectedMenu("");
                        setSelectedSubMenu("");
                        handleMenuClick();
                      }}
                    >
                      {profileMenu.map(({ text, link, profileMenuSlug }, i) => {
                        return (
                          <Link
                            className={
                              selectedprofileMenu === profileMenuSlug ||
                              pathName.includes(profileMenuSlug)
                                ? "selected-group"
                                : ""
                            }
                            href={link}
                            onClick={() => {
                              setSelectedMenu("");
                              setSelectedSubMenu("");
                              setSelectedProfileMenu(profileMenuSlug);
                            }}
                          >
                            {text}
                          </Link>
                        );
                      })}
                      <Link href={"#"} onClick={() => handleLogout()}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <ul className="menu ms-2 ms-xl-4">
                <li>
                  <Link href="/profile" className="p-0">
                    <Image
                      style={{
                        // height: "42px",
                        // width: "42px",
                        borderRadius: "50%",
                      }}
                      src={
                        profilePicLocal &&
                        profilePicLocal != null &&
                        profilePicLocal !== "null"
                          ? `${IMAGE_URL}/${profilePicLocal}`
                          : default_icon
                      }
                      alt=""
                      width={42}
                      height={42}
                    />
                    <FaAngleDown />
                  </Link>
                  <ul className="submenu">
                    <li
                      onClick={() => {
                        setSelectedMenu("");
                        setSelectedSubMenu("");
                      }}
                    >
                      {profileMenu.map(({ text, link, profileMenuSlug }, i) => {
                        return (
                          <Link
                            className={
                              selectedprofileMenu === profileMenuSlug ||
                              pathName.includes(profileMenuSlug)
                                ? "selected-group"
                                : ""
                            }
                            href={link}
                            onClick={() => {
                              setSelectedMenu("");
                              setSelectedSubMenu("");
                              setSelectedProfileMenu(profileMenuSlug);
                            }}
                          >
                            {text}
                          </Link>
                        );
                      })}
                      <Link href={"#"} onClick={() => handleLogout()}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            {!isLoggedIn ? <LanguageTranslator /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
