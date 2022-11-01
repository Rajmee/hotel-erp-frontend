import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "../pages/utils/axios";

export default function NavBar() {
  const { token, user, logout } = Axios();
  const [active, setActive] = useState(false);

  const logoutHandle = () => {
    if (token != undefined) {
      logout();
    }
  };

  useEffect(() => {
    var isMount = true;

    if (user) {
      if (isMount) {
        setActive(true);
      }
    }

    return () => {
      isMount = false;
    };
  }, [user, active]);

  return (
    <>
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header">
            <a
              className="nav-toggler waves-effect waves-light d-block d-md-none"
              href="#;"
            >
              <i className="ri-close-line fs-6 ri-menu-2-line"></i>
            </a>
            <Link href="/">
              <a className="navbar-brand">
                <b className="logo-icon">
                  <img
                    src="/assets/images/logo-icon.png"
                    alt="homepage"
                    className="dark-logo"
                  />

                  <img
                    src="/assets/images/logo-light-icon.png"
                    alt="homepage"
                    className="light-logo"
                  />
                </b>

                <span className="logo-text">
                  <img
                    src="/assets/images/logo-text.png"
                    alt="homepage"
                    className="dark-logo"
                  />

                  <img
                    src="/assets/images/logo-light-text.png"
                    className="light-logo"
                    alt="homepage"
                  />
                </span>
              </a>
            </Link>

            <a
              href="#;"
              className="topbartoggler d-block d-md-none waves-effect waves-light"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i data-feather="more-horizontal" className="feather-sm"></i>
            </a>
          </div>

          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link sidebartoggler d-none d-md-block waves-effect waves-dark"
                >
                  <i data-feather="menu" className="feather-sm"></i>
                </a>
              </li>
            </ul>

            <ul className="navbar-nav justify-content-end">
              <li className="nav-item ">
                <Link href="/modules/roomManagement/RoomDashboard">
                  <a className="nav-link" href="#">
                    <Button type="button" className="btn btn-sm btn-info">
                      Room Dashboard
                    </Button>
                  </a>
                </Link>
              </li>

              <li className="nav-item d-none d-md-block search-box">
                <a
                  className="nav-link d-none d-md-block waves-effect waves-dark"
                  href="#"
                >
                  <i data-feather="search"></i>
                </a>
                <form className="app-search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search & enter"
                  />
                  <a className="srh-btn">
                    <i data-feather="x" className="feather-sm"></i>
                  </a>
                </form>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="bell"></i>
                  <div className="notify">
                    <span className="heartbit"></span>{" "}
                    <span className="point"></span>
                  </div>
                </a>
                <div
                  className="
                  dropdown-menu dropdown-menu-end
                  mailbox
                  dropdown-menu-animate-up
                "
                >
                  <ul className="list-style-none">
                    <li>
                      <div className="border-bottom rounded-top py-3 px-4">
                        <div className="mb-0 font-weight-medium fs-4">
                          Notifications
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="message-center notifications position-relative"
                        style={{ height: "230px" }}
                      >
                        <a
                          href="#"
                          className="
                          message-item
                          d-flex
                          align-items-center
                          border-bottom
                          px-3
                          py-2
                        "
                        >
                          <span className="btn btn-light-danger text-danger btn-circle">
                            <i
                              data-feather="link"
                              className="feather-sm fill-white"
                            ></i>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Luanch Admin
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                          fw-normal
                          text-muted
                          mt-1
                        "
                            >
                              Just see the my new admin!
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:30 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span
                            className="
                        btn btn-light-success
                        text-success
                        btn-circle
                      "
                          >
                            <i
                              data-feather="calendar"
                              className="feather-sm fill-white"
                            ></i>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Event today
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                          fw-normal
                          text-muted
                          mt-1
                        "
                            >
                              Just a reminder that you have event
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:10 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span className="btn btn-light-info text-info btn-circle">
                            <i
                              data-feather="settings"
                              className="feather-sm fill-white"
                            ></i>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Settings
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                          fw-normal
                          text-muted
                          mt-1
                        "
                            >
                              You can customize this template as you want
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:08 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span
                            className="
                        btn btn-light-primary
                        text-primary
                        btn-circle
                      "
                          >
                            <i
                              data-feather="users"
                              className="feather-sm fill-white"
                            ></i>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Pavan kumar
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                          fw-normal
                          text-muted
                          mt-1
                        "
                            >
                              Just see the my admin!
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:02 AM
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li>
                      <a
                        className="nav-link border-top text-center text-dark pt-3"
                        href="#;"
                      >
                        <strong>Check all notifications</strong>
                        <i
                          data-feather="chevron-right"
                          className="feather-sm"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  id="2"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="inbox"></i>
                  <div className="notify">
                    <span className="heartbit"></span>{" "}
                    <span className="point"></span>
                  </div>
                </a>
                <div
                  className="
              dropdown-menu
              mailbox
              dropdown-menu-end dropdown-menu-animate-up
            "
                  aria-labelledby="2"
                >
                  <ul className="list-style-none">
                    <li>
                      <div className="border-bottom rounded-top py-3 px-4">
                        <div className="mb-0 font-weight-medium fs-4">
                          You have 4 new messages
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="message-center message-body position-relative"
                        style={{ height: "230px" }}
                      >
                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span className="user-img position-relative d-inline-block">
                            <img
                              src="/assets/images/users/1.jpg"
                              alt="user"
                              height={30}
                              width={30}
                              className="rounded-circle w-100"
                            />
                            <span className="profile-status rounded-circle online"></span>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Pavan kumar
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                          fw-normal
                          text-muted
                          mt-1
                        "
                            >
                              Just see the my admin!
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:30 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span className="user-img position-relative d-inline-block">
                            <img
                              src="../../assets/images/users/2.jpg"
                              alt="user"
                              className="rounded-circle w-100"
                            />
                            <span className="profile-status rounded-circle busy"></span>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Sonu Nigam
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                        "
                            >
                              I've sung a song! See you at
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:10 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span className="user-img position-relative d-inline-block">
                            <img
                              src="/assets/images/users/3.jpg"
                              alt="user"
                              className="rounded-circle w-100"
                            />
                            <span className="profile-status rounded-circle away"></span>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Arijit Sinh
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                        "
                            >
                              I am a singer!
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:08 AM
                            </span>
                          </div>
                        </a>

                        <a
                          href="#"
                          className="
                      message-item
                      d-flex
                      align-items-center
                      border-bottom
                      px-3
                      py-2
                    "
                        >
                          <span className="user-img position-relative d-inline-block">
                            <img
                              src="/assets/images/users/4.jpg"
                              alt="user"
                              className="rounded-circle w-100"
                            />
                            <span className="profile-status rounded-circle offline"></span>
                          </span>
                          <div className="w-75 d-inline-block v-middle ps-3">
                            <h5 className="message-title mb-0 mt-1 fs-3 fw-bold">
                              Pavan kumar
                            </h5>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          time
                          text-truncate
                        "
                            >
                              Just see the my admin!
                            </span>
                            <span
                              className="
                          fs-2
                          text-nowrap
                          d-block
                          subtext
                          text-muted
                        "
                            >
                              9:02 AM
                            </span>
                          </div>
                        </a>
                      </div>
                    </li>
                    <li>
                      <a
                        className="nav-link border-top text-center text-dark pt-3"
                        href="#;"
                      >
                        <b>See all e-Mails</b>
                        <i
                          data-feather="chevron-right"
                          className="feather-sm"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item dropdown mega-dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="grid"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-animate-up">
                  <div className="mega-dropdown-menu row">
                    <div className="col-lg-3 col-xlg-2 mb-4">
                      <h4 className="mb-3">CAROUSEL</h4>

                      <div
                        id="carouselExampleControls"
                        className="carousel slide carousel-dark"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <img
                              className="d-block img-fluid"
                              src="/assets/images/big/img1.jpg"
                              alt="First slide"
                            />
                          </div>
                          <div className="carousel-item">
                            <img
                              className="d-block img-fluid"
                              src="/assets/images/big/img2.jpg"
                              alt="Second slide"
                            />
                          </div>
                          <div className="carousel-item">
                            <img
                              className="d-block img-fluid"
                              src="/assets/images/big/img3.jpg"
                              alt="Third slide"
                            />
                          </div>
                        </div>
                        <a
                          className="carousel-control-prev"
                          href="#carouselExampleControls"
                          role="button"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </a>
                        <a
                          className="carousel-control-next"
                          href="#carouselExampleControls"
                          role="button"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <h4 className="mb-3">ACCORDION</h4>

                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingOne"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Accordion Item #1
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingTwo"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              Accordion Item #2
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid.
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="flush-headingThree"
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              Accordion Item #3
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod
                              high life accusamus terry richardson ad squid.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                      <h4 className="mb-3">CONTACT US</h4>

                      <form>
                        <div className="mb-3 form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputname1"
                            placeholder="Enter Name"
                          />
                          <label>Enter Name</label>
                        </div>
                        <div className="mb-3 form-floating">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                          <label>Enter Email address</label>
                        </div>
                        <div className="mb-3 form-floating">
                          <textarea
                            className="form-control"
                            id="exampleTextarea"
                            placeholder="Message"
                          ></textarea>
                          <label>Enter Message</label>
                        </div>
                        <button
                          type="submit"
                          className="btn px-4 rounded-pill btn-info"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                    <div className="col-lg-3 col-xlg-4 mb-4">
                      <h4 className="mb-3">List style</h4>

                      <ul className="list-style-none">
                        <li>
                          <a href="#" className="font-weight-medium">
                            <i
                              data-feather="check-circle"
                              className="feather-sm text-success me-2"
                            ></i>
                            You can give link
                          </a>
                        </li>
                        <li>
                          <a href="#" className="font-weight-medium">
                            <i
                              data-feather="check-circle"
                              className="feather-sm text-success me-2"
                            ></i>
                            Give link
                          </a>
                        </li>
                        <li>
                          <a href="#" className="font-weight-medium">
                            <i
                              data-feather="check-circle"
                              className="feather-sm text-success me-2"
                            ></i>
                            Another Give link
                          </a>
                        </li>
                        <li>
                          <a href="#" className="font-weight-medium">
                            <i
                              data-feather="check-circle"
                              className="feather-sm text-success me-2"
                            ></i>
                            Forth link
                          </a>
                        </li>
                        <li>
                          <a href="#" className="font-weight-medium">
                            <i
                              data-feather="check-circle"
                              className="feather-sm text-success me-2"
                            ></i>
                            Another fifth link
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="
              nav-link
              dropdown-toggle
              text-muted
              waves-effect waves-dark
            "
                  href=""
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="flag-icon flag-icon-us"></i>
                </a>
                <div
                  className="
              dropdown-menu dropdown-menu-end dropdown-menu-animate-up
            "
                >
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-in"></i> India
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-fr"></i> French
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-cn"></i> China
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-de"></i> Dutch
                  </a>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/images/users/1.jpg"
                    alt="user"
                    width="30"
                    className="profile-pic rounded-circle"
                  />
                </a>
                <div
                  className="
              dropdown-menu dropdown-menu-end
              user-dd
              animated
              flipInY
            "
                >
                  <div
                    className="
                d-flex
                no-block
                align-items-center
                p-3
                bg-primary
                text-white
                mb-2
              "
                  >
                    <div className="">
                      <img
                        src="/assets/images/users/1.jpg"
                        alt="user"
                        className="rounded-circle"
                        width="60"
                      />
                    </div>
                    <div className="ms-2">
                      <h4 className="mb-0 text-white">{user?.name}</h4>
                      <p className="mb-0">{user?.email}</p>
                    </div>
                  </div>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="user"
                      className="feather-sm text-info me-1 ms-1"
                    ></i>
                    My Profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="credit-card"
                      className="feather-sm text-primary me-1 ms-1"
                    ></i>
                    My Balance
                  </a>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="mail"
                      className="feather-sm text-success me-1 ms-1"
                    ></i>
                    Inbox
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i
                      data-feather="settings"
                      className="feather-sm text-warning me-1 ms-1"
                    ></i>
                    Account Setting
                  </a>
                  <div className="dropdown-divider"></div>
                  {!active && (
                    <Link href="/user/login">
                      <a
                        className="dropdown-item"
                        style={{ display: active ? "block" : "none" }}
                        href="#"
                      >
                        <i
                          data-feather="log-in"
                          className="feather-sm text-danger me-1 ms-1"
                        ></i>
                        Login
                      </a>
                    </Link>
                  )}
                  {active && (
                    <Link href="#">
                      <button
                        type="button"
                        className="dropdown-item"
                        style={{ display: active ? "block" : "none" }}
                        onClick={logoutHandle}
                      >
                        <i
                          data-feather="log-out"
                          className="feather-sm text-danger me-1 ms-1"
                        ></i>
                        Logout
                      </button>
                    </Link>
                  )}

                  <div className="dropdown-divider"></div>
                  <div className="pl-4 p-2">
                    <a
                      href="#"
                      className="btn d-block w-100 btn-primary rounded-pill"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
