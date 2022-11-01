export default function form() {


  return (

    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-3 pb-3 border-bottom">Basic Form</h4>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="tb-fname"
                        placeholder="Enter Name here"
                      />
                      <label htmlFor="tb-fname">Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="tb-email"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="tb-email">Email address</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="tb-pwd"
                        placeholder="Password"
                      />
                      <label htmlFor="tb-pwd">Password</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="tb-cpwd"
                        placeholder="Password"
                      />
                      <label htmlFor="tb-cpwd">Confirm Password</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-md-flex align-items-center mt-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="ms-auto mt-3 mt-md-0">
                        <button
                          type="submit"
                          className="
                                btn btn-info
                                font-weight-medium
                                rounded-pill
                                px-4
                              "
                        >
                          <div className="d-flex align-items-center">
                            <i
                              data-feather="send"
                              className="feather-sm fill-white me-2"
                            ></i>
                            Submit
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
