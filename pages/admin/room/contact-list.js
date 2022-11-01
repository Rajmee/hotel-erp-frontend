import React from 'react'

export default function ContactList() {
  return (
    <>

      <div className="row page-titles">
            <div className="col-md-5 col-12 align-self-center">
              <h3 className="text-themecolor mb-0">Contacts</h3>
            </div>
            <div className="
                  col-md-7 col-12
                  align-self-center
                  d-none d-md-flex
                  justify-content-end
                ">
              <ol className="breadcrumb mb-0 p-0 bg-transparent">
                <li className="breadcrumb-item">
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li className="breadcrumb-item active d-flex align-items-center">
                  Contacts
                </li>
              </ol>
            </div>
      </div>
      
      <div className="widget-content searchable-container list">
        <div className="card card-body">
          <div className="row">
            <div className="col-md-4 col-xl-2">
              <form>
                <input type="text" className="form-control product-search" id="input-search" placeholder="Search Contacts..." />
              </form>
            </div>
            <div className="
                  col-md-8 col-xl-10
                  text-end
                  d-flex
                  justify-content-md-end justify-content-center
                  mt-3 mt-md-0
                ">
              <div className="action-btn show-btn" style={{display: 'none'}}>
                <a href="javascript:void(0)" className="
                      delete-multiple
                      btn-light-danger btn
                      me-2
                      text-danger
                      d-flex
                      align-items-center
                      font-weight-medium
                    ">
                  <i data-feather="trash-2" className="feather-sm fill-white me-1" />
                  Delete All Row</a>
              </div>
              <a href="javascript:void(0)" id="btn-add-contact" className="btn btn-info">
                <i data-feather="users" className="feather-sm fill-white me-1">
                </i>
                Add Contact</a>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div className="modal fade" id="addContactModal" tabIndex={-1} role="dialog" aria-labelledby="addContactModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center">
                <h5 className="modal-title">Contact</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <form id="addContactModalTitle">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 contact-name">
                            <input type="text" id="c-name" className="form-control" placeholder="Name" />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 contact-email">
                            <input type="text" id="c-email" className="form-control" placeholder="Email" />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 contact-occupation">
                            <input type="text" id="c-occupation" className="form-control" placeholder="Occupation" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 contact-phone">
                            <input type="text" id="c-phone" className="form-control" placeholder="Phone" />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3 contact-location">
                            <input type="text" id="c-location" className="form-control" placeholder="Location" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button id="btn-add" className="btn btn-success rounded-pill px-4">
                  Add
                </button>
                <button id="btn-edit" className="btn btn-success rounded-pill px-4">
                  Save
                </button>
                <button className="btn btn-danger rounded-pill px-4" data-bs-dismiss="modal">
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-body">
          <div className="table-responsive">
            <table className="table search-table v-middle">
              <thead className="header-item">
                <tr><th>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input secondary" id="contact-check-all" />
                        <label className="form-check-label" htmlFor="contact-check-all" />
                        <span className="new-control-indicator" />
                      </div>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr></thead>
              <tbody>
                {/* row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input contact-chkbox primary" id="checkbox1" />
                        <label className="form-check-label" htmlFor="checkbox1" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="
                            round
                            rounded-circle
                            text-white
                            d-inline-block
                            text-center
                            bg-info
                          ">EA</span>
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6 className="user-name mb-0 font-weight-medium" data-name="Emma Adams">
                            Emma Adams
                          </h6>
                          <small className="user-work text-muted" data-occupation="Web Developer">Web Developer</small>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="adams@mail.com">adams@mail.com</span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Boston, USA">Boston, USA</span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+1 (070) 123-4567">+91 (070) 123-4567</span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-info edit"><i data-feather="eye" className="feather-sm fill-white" /></a>
                      <a href="javascript:void(0)" className="text-dark delete ms-2"><i data-feather="trash-2" className="feather-sm fill-white" /></a>
                    </div>
                  </td>
                </tr>
                {/* /.row */}
     
              </tbody>
            </table>
          </div>
        </div>
      </div>
   
        <div className="modal fade" id="Sharemodel" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form>
                <div className="modal-header d-flex align-items-center">
                  <h5 className="modal-title" id="exampleModalLabel">
                    <i className="ri-share-fill me-2 align-middle" /> Share With
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <button type="button" className="btn btn-info">
                      <i data-feather="user" className="feather-sm fil-white" />
                    </button>
                    <input type="text" className="form-control" placeholder="Enter Name Here" aria-label="Username" />
                  </div>
                  <div className="row">
                    <div className="col-3 text-center">
                      <a href="#Whatsapp" className="text-success">
                        <i className="display-6 ri-whatsapp-fill" /><br /><span className="text-muted">Whatsapp</span>
                      </a>
                    </div>
                    <div className="col-3 text-center">
                      <a href="#Facebook" className="text-info">
                        <i className="display-6 ri-facebook-fill" /><br /><span className="text-muted">Facebook</span>
                      </a>
                    </div>
                    <div className="col-3 text-center">
                      <a href="#Instagram" className="text-danger">
                        <i className="display-6 ri-instagram-fill" /><br /><span className="text-muted">Instagram</span>
                      </a>
                    </div>
                    <div className="col-3 text-center">
                      <a href="#Skype" className="text-cyan">
                        <i className="display-6 ri-skype-fill" /><br /><span className="text-muted">Skype</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="ri-send-plane-fill align-middle" /> Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

    </>
  )
}
