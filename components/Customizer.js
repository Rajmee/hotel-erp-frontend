import React from "react";

export default function Customizer() {
  return (
    <>
      <aside className="customizer">
        <a href="#" className="service-panel-toggle">
          <i data-feather="settings" className="feather-sm fa fa-spin" />
        </a>
        <div className="customizer-body">
          <ul className="nav customizer-tab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                <i className="ri-tools-fill fs-6" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                href="#chat"
                role="tab"
                aria-controls="chat"
                aria-selected="false"
              >
                <i className="ri-message-3-line fs-6" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                <i className="ri-timer-line fs-6" />
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            {/* Tab 1 */}
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="p-3 border-bottom">
                {/* Sidebar */}
                <h5 className="font-weight-medium mb-2 mt-2">
                  Layout Settings
                </h5>
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="theme-view"
                    className="form-check-input"
                    id="theme-view"
                  />
                  <label className="form-check-label" htmlFor="theme-view">
                    <span>Dark Theme</span>
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="sidebartoggler form-check-input"
                    name="collapssidebar"
                    id="collapssidebar"
                  />
                  <label className="form-check-label" htmlFor="collapssidebar">
                    <span>Collapse Sidebar</span>
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    name="sidebar-position"
                    className="form-check-input"
                    id="sidebar-position"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="sidebar-position"
                  >
                    <span>Fixed Sidebar</span>
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    name="header-position"
                    className="form-check-input"
                    id="header-position"
                  />
                  <label className="form-check-label" htmlFor="header-position">
                    <span>Fixed Header</span>
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    name="boxed-layout"
                    className="form-check-input"
                    id="boxed-layout"
                  />
                  <label className="form-check-label" htmlFor="boxed-layout">
                    <span>Boxed Layout</span>
                  </label>
                </div>
              </div>
              <div className="p-3 border-bottom">
                {/* Logo BG */}
                <h5 className="font-weight-medium mb-2 mt-2">
                  Logo Backgrounds
                </h5>
                <ul className="theme-color m-0 p-0">
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin1"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin2"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin3"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin4"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin5"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-logobg="skin6"
                    />
                  </li>
                </ul>
                {/* Logo BG */}
              </div>
              <div className="p-3 border-bottom">
                {/* Navbar BG */}
                <h5 className="font-weight-medium mb-2 mt-2">
                  Navbar Backgrounds
                </h5>
                <ul className="theme-color m-0 p-0">
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin1"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin2"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin3"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin4"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin5"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-navbarbg="skin6"
                    />
                  </li>
                </ul>
                {/* Navbar BG */}
              </div>
              <div className="p-3 border-bottom">
                {/* Logo BG */}
                <h5 className="font-weight-medium mb-2 mt-2">
                  Sidebar Backgrounds
                </h5>
                <ul className="theme-color m-0 p-0">
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin1"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin2"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin3"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin4"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin5"
                    />
                  </li>
                  <li className="theme-item list-inline-item me-1">
                    <a
                      href="#"
                      className="theme-link rounded-circle d-block"
                      data-sidebarbg="skin6"
                    />
                  </li>
                </ul>
                {/* Logo BG */}
              </div>
            </div>
            {/* End Tab 1 */}
            {/* Tab 2 */}
            <div
              className="tab-pane fade"
              id="chat"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <ul className="mailbox list-style-none mt-3">
                <li>
                  <div className="message-center chat-scroll position-relative">
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_1"
                      data-user-id={1}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/1.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle online" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:30 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_2"
                      data-user-id={2}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/2.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle busy" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Sonu Nigam</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          I've sung a song! See you at
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:10 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_3"
                      data-user-id={3}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/3.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle away" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Arijit Sinh</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          I am a singer!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:08 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_4"
                      data-user-id={4}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/4.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle offline" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Nirav Joshi</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:02 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_5"
                      data-user-id={5}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/5.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle offline" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Sunil Joshi</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:02 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_6"
                      data-user-id={6}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/6.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle offline" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">
                          Akshay Kumar
                        </h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:02 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_7"
                      data-user-id={7}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/7.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle offline" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:02 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                    {/* Message */}
                    <a
                      href="#"
                      className="message-item d-flex align-items-center border-bottom px-3 py-2"
                      id="chat_user_8"
                      data-user-id={8}
                    >
                      <span className="user-img position-relative d-inline-block">
                        <img
                          src="../../assets/images/users/8.jpg"
                          alt="user"
                          className="rounded-circle w-100"
                        />
                        <span className="profile-status rounded-circle offline" />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-2">
                        <h5 className="message-title mb-0 mt-1">
                          Varun Dhavan
                        </h5>
                        <span className="fs-2 text-nowrap d-block text-muted text-truncate">
                          Just see the my admin!
                        </span>
                        <span className="fs-2 text-nowrap d-block text-muted">
                          9:02 AM
                        </span>
                      </div>
                    </a>
                    {/* Message */}
                  </div>
                </li>
              </ul>
            </div>
            {/* End Tab 2 */}
            {/* Tab 3 */}
            <div
              className="tab-pane fade p-3"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <h6 className="mt-3 mb-3">Activity Timeline</h6>
              <div className="steamline">
                <div className="sl-item">
                  <div className="sl-left bg-success">
                    <i data-feather="user" className="feather-sm fill-white" />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Meeting today <span className="sl-date"> 5pm</span>
                    </div>
                    <div className="desc">you can write anything</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left bg-info">
                    <i className="fas fa-image" />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Send documents to Clark
                    </div>
                    <div className="desc">Lorem Ipsum is simply</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left">
                    <img
                      className="rounded-circle"
                      alt="user"
                      src="../../assets/images/users/2.jpg"
                    />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Go to the Doctor{" "}
                      <span className="sl-date">5 minutes ago</span>
                    </div>
                    <div className="desc">Contrary to popular belief</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left">
                    <img
                      className="rounded-circle"
                      alt="user"
                      src="../../assets/images/users/1.jpg"
                    />
                  </div>
                  <div className="sl-right">
                    <div>
                      <a href="#">Stephen</a>
                      <span className="sl-date">5 minutes ago</span>
                    </div>
                    <div className="desc">Approve meeting with tiger</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left bg-primary">
                    <i data-feather="user" className="feather-sm fill-white" />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Meeting today <span className="sl-date"> 5pm</span>
                    </div>
                    <div className="desc">you can write anything</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left bg-info">
                    <i className="fas fa-image" />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Send documents to Clark
                    </div>
                    <div className="desc">Lorem Ipsum is simply</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left">
                    <img
                      className="rounded-circle"
                      alt="user"
                      src="../../assets/images/users/4.jpg"
                    />
                  </div>
                  <div className="sl-right">
                    <div className="font-weight-medium">
                      Go to the Doctor{" "}
                      <span className="sl-date">5 minutes ago</span>
                    </div>
                    <div className="desc">Contrary to popular belief</div>
                  </div>
                </div>
                <div className="sl-item">
                  <div className="sl-left">
                    <img
                      className="rounded-circle"
                      alt="user"
                      src="../../assets/images/users/6.jpg"
                    />
                  </div>
                  <div className="sl-right">
                    <div>
                      <a href="#">Stephen</a>
                      <span className="sl-date">5 minutes ago</span>
                    </div>
                    <div className="desc">Approve meeting with tiger</div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Tab 3 */}
          </div>
        </div>
      </aside>
    </>
  );
}
