import Link from "next/link";


const Show = () => {
    return ( 
        <div>
             <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header bg-info">
                  <h4 className="mb-0 text-white">View Department Details</h4>
                </div>
                <form className="form-horizontal">
                  <div className="form-body">
                    <div className="card-body">
                      <h4 className="card-title mb-0">Department’s Basic Info</h4>
                    </div>
                    <div className="card-body border-top">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row py-3">
                            <label
                              className="
                                control-label
                                text-end
                                col-md-4
                                font-weight-medium
                              "
                              > Name:</label>
                            <div className="col-md-8">
                              <p className="form-control-static">John</p>
                            </div>
                          </div>

                          <div className="form-group row py-3">
                            <label
                              className="
                                control-label
                                text-end
                                col-md-4
                                font-weight-medium">Description:</label>
                            <div className="col-md-8">
                              <p className="form-control-static">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            </div>
                          </div>
                        </div>
                    
                        <div className="col-md-6">
                          <div className="form-group row py-3">
                            <label style={{fontSize: 17}}
                              className="
                                control-label
                                text-end
                                col-md-4
                                font-weight-medium">Status:</label>
                            <div className="col-md-4">
                              <p style={{ fontSize: 17, textAlign: "center", fontWeight: "bold", color: "white", background: "green", padding: "5px" }} className="form-control-static">Active</p>
                            </div>
                          </div>

                          <div className="form-group row py-3">
                            <label style={{fontSize: 17}}
                              className="
                                control-label
                                text-end
                                col-md-4
                                font-weight-medium">Created By:</label>
                            <div className="col-md-4">
                              <p style={{ fontSize: 17 }} className="form-control-static">Hemel Raihan</p>
                            </div>
                          </div>

                          <div className="form-group row py-3">
                            <label style={{fontSize: 17}}
                              className="
                                control-label
                                text-end
                                col-md-4
                                font-weight-medium">Created At:</label>
                            <div className="col-md-4">
                              <p style={{ fontSize: 17}} className="form-control-static">Today</p>
                            </div>
                          </div>
                        </div>
                       
                      </div>
                  
                      
                    </div>
                    <div className="card-body">
                      <h4 className="card-title mb-0">Employees of the Departments</h4>
                    </div>
                    <div className="card-body border-top">
                    <table id="zero_config" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hemel</td>
              <td>Software Developer</td>
              <td>Active</td>
              <td>Admin</td>
              <td>22 May 2022</td>
              <td>
              <Link href="" ><a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit feather-sm"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </a></Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link href="" ><a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 feather-sm"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </a></Link>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
                    </div>
                    <hr />
                    <div className="form-actions">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-offset-3 col-md-9">
                                <button type="submit" className="btn btn-danger">
                                  <i
                                    data-feather="edit-3"
                                    className="feather-sm"
                                  ></i>
                                  Edit
                                </button>
                                <button type="button" className="btn btn-dark">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default Show;