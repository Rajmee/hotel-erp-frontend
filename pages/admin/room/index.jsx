import React from "react";
import Layout from "../../../components/Layout";


export default function index() {
  return (

   
    <>
      <div className="row page-titles">
        <div className="col-md-5 col-12 align-self-center">
          <h3 className="text-themecolor mb-0">Dashboard 2</h3>
        </div>
        <div className="col-md-7 col-12 align-self-center d-none d-md-flex justify-content-end">
          <ol className="breadcrumb mb-0 p-0 bg-transparent">
            <li className="breadcrumb-item">
              <a href="javascript:void(0)">Home</a>
            </li>
            <li className="breadcrumb-item active d-flex align-items-center">
              Dashboard 2
            </li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="d-md-flex">
                <div>
                  <h4 className="card-title">
                    <span className="lstick d-inline-block align-middle" />
                    Projects of the Month
                  </h4>
                </div>
                <div className="ms-auto">
                  <select className="form-select">
                    <option selected>January 2021</option>
                    <option value={1}>February 2021</option>
                    <option value={2}>March 2021</option>
                    <option value={3}>April 2021</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table v-middle no-wrap mb-0">
                  <thead>
                    <tr>
                      <th className="border-0" colSpan={2}>
                        Assigned
                      </th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ width: "50px" }}>
                        <span>
                          <img
                            src="../../assets/images/users/1.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">Sunil Joshi</h6>
                        <small className="text-muted">Web Designer</small>
                      </td>
                      <td>Elite Admin</td>
                      <td>
                        <span className="badge bg-success rounded-pill">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr className="active">
                      <td>
                        <span>
                          <img
                            src="../../assets/images/users/2.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">Andrew</h6>
                        <small className="text-muted">Project Manager</small>
                      </td>
                      <td>Real Homes</td>
                      <td>
                        <span className="badge bg-info rounded-pill">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <img
                            src="../../assets/images/users/3.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">
                          Bhavesh patel
                        </h6>
                        <small className="text-muted">Developer</small>
                      </td>
                      <td>MedicalPro Theme</td>
                      <td>
                        <span className="badge bg-primary rounded-pill">
                          High
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <img
                            src="../../assets/images/users/4.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">Nirav Joshi</h6>
                        <small className="text-muted">Frontend Eng</small>
                      </td>
                      <td>Elite Admin</td>
                      <td>
                        <span className="badge bg-danger rounded-pill">
                          Low
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <img
                            src="../../assets/images/users/5.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">Micheal Doe</h6>
                        <small className="text-muted">Content Writer</small>
                      </td>
                      <td>Helping Hands</td>
                      <td>
                        <span className="badge bg-success rounded-pill">
                          High
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>
                          <img
                            src="../../assets/images/users/6.jpg"
                            alt="user"
                            width={50}
                            className="rounded-circle"
                          />
                        </span>
                      </td>
                      <td>
                        <h6 className="mb-0 font-weight-medium">Johnathan</h6>
                        <small className="text-muted">Graphic</small>
                      </td>
                      <td>Digital Agency</td>
                      <td>
                        <span className="badge bg-info rounded-pill">High</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------------------- */}
        {/* Activity widget find scss into widget folder*/}
        {/* -------------------------------------------------------------- */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <h4 className="card-title">
                  <span className="lstick d-inline-block align-middle" />
                  Activity
                </h4>
                <div className="dropdown ms-auto">
                  <a
                    href="#"
                    className="icon-options-vertical link"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="activity-box table-responsive scrollable"
              style={{ height: "514px" }}
            >
              <div className="card-body">
                {/* Activity item*/}
                <div className="activity-item mb-4 d-flex">
                  <div className="me-3">
                    <img
                      src="../../assets/images/users/2.jpg"
                      alt="user"
                      width={50}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mt-2">
                    <h5 className="mb-0 font-weight-medium">
                      Mark Freeman
                      <span className="text-muted fs-3 ms-2">
                        | &nbsp; 6:30 PM
                      </span>
                    </h5>
                    <h6 className="text-muted">uploaded this file</h6>
                    <div className="row">
                      <div className="col-4">
                        <img
                          src="../../assets/images/icon/zip.png"
                          alt="user"
                        />
                      </div>
                      <div className="col-8 d-flex align-items-center">
                        <div>
                          <h5 className="mb-0 font-weight-medium">
                            Homepage.zip
                          </h5>
                          <h6>54 MB</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Activity item*/}
                {/* Activity item*/}
                <div className="activity-item mb-4 d-flex">
                  <div className="me-3">
                    <img
                      src="../../assets/images/users/3.jpg"
                      alt="user"
                      width={50}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mt-2">
                    <h5 className="mb-1 font-weight-medium">
                      Emma Smith
                      <span className="text-muted fs-3 ms-2">
                        | &nbsp; 6:30 PM
                      </span>
                    </h5>
                    <h6 className="text-muted">
                      joined projectname, and invited
                      <a href="javascript:void(0)">
                        @maxcage, @maxcage, @maxcage,
                        <br />
                        @maxcage, @maxcage,+3
                      </a>
                    </h6>
                    <span className="image-list mt-2">
                      <a
                        href="javascript:void(0)"
                        className="align-middle position-relative"
                      >
                        <img
                          src="../../assets/images/users/1.jpg"
                          className="rounded-circle"
                          alt="user"
                          width={40}
                        />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="align-middle position-relative"
                      >
                        <img
                          src="../../assets/images/users/4.jpg"
                          className="rounded-circle"
                          alt="user"
                          width={40}
                        />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="align-middle position-relative"
                      >
                        <span
                          className="round rounded-circle text-white d-inline-block text-center bg-warning"
                          style={{ height: "40px", width: "40px" }}
                        >
                          C
                        </span>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="align-middle position-relative"
                      >
                        <span
                          className="round rounded-circle text-white d-inline-block text-center bg-danger"
                          style={{ height: "40px", width: "40px" }}
                        >
                          S
                        </span>
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="align-middle position-relative"
                      >
                        +3
                      </a>
                    </span>
                  </div>
                </div>
                {/* Activity item*/}
                {/* Activity item*/}
                <div className="activity-item mb-4 d-flex">
                  <div className="me-3">
                    <img
                      src="../../assets/images/users/4.jpg"
                      alt="user"
                      width={50}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mt-2">
                    <h5 className="mb-0 font-weight-medium">
                      David R. Jones
                      <span className="text-muted fs-3 ms-2">
                        | &nbsp; 6:30 PM
                      </span>
                    </h5>
                    <h6 className="text-muted">uploaded this file</h6>
                    <span>
                      <a href="javascript:void(0)" className="me-2">
                        <img
                          src="../../assets/images/big/img1.jpg"
                          alt="user"
                          width={60}
                        />
                      </a>
                      <a href="javascript:void(0)" className="me-2">
                        <img
                          src="../../assets/images/big/img2.jpg"
                          alt="user"
                          width={60}
                        />
                      </a>
                    </span>
                  </div>
                </div>
                {/* Activity item*/}
                {/* Activity item*/}
                <div className="activity-item d-flex mb-2">
                  <div className="me-3">
                    <img
                      src="../../assets/images/users/6.jpg"
                      alt="user"
                      width={50}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="mt-2">
                    <h5 className="mb-1 font-weight-medium">
                      David R. Jones
                      <span className="text-muted fs-3 ms-2">
                        | &nbsp; 6:30 PM
                      </span>
                    </h5>
                    <h6 className="text-muted">
                      Commented on
                      <a href="javascript:void(0)">Test Project</a>
                    </h6>
                    <p className="mb-0">
                      It has survived not only five centuries, but also the leap
                      into
                    </p>
                  </div>
                </div>
                {/* Activity item*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

 
  );
}
