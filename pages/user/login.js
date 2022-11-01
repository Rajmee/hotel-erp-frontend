import React, { useState } from 'react';
import toast from "../../components/Toast/index";
import Axios from '../utils/axios';

export default function Login() {

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


    const {http,saveToken,user} = Axios();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  
    const submitForm = event =>{
      event.preventDefault()
      notify("info", "Checking...!");
      http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/auth/login`,{email:email, password:password}).then((res)=>{
        saveToken(res.data.data, res.data.response);
      })
      .catch((e)=>{
        const msg = e.response?.data?.response;

         if(typeof(msg) == 'string'){
          notify("error", `${e.response.data.response}`);
         }
         else{
          if(msg?.email){
            notify("error", `${msg.email.Email}`);
          }
          
         }
      });
    }



  return (
    <>
      <div className="main-wrapper">
        <div className="preloader">
          <svg className="tea lds-ripple" width={37} height={48} viewBox="0 0 37 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z" stroke="#2962FF" strokeWidth={2} />
            <path d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34" stroke="#2962FF" strokeWidth={2} />
            <path id="teabag" fill="#2962FF" fillRule="evenodd" clipRule="evenodd" d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z" />
            <path id="steamL" d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="#2962FF" />
            <path id="steamR" d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13" stroke="#2962FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="
          auth-wrapper
          d-flex
          no-block
          justify-content-center
          align-items-center
        " style={{"background":"url(../../assets/images/background/login-register.jpg) no-repeat center center","backgroundSize":"cover"}}>
          <div className="auth-box p-4 bg-white rounded">
            <div id="loginform">
              <div className="logo">
                <h3 className="box-title mb-3">Sign In</h3>
              </div>
              <div className="row">
                <div className="col-12">
                  <form className="form-horizontal mt-3 form-material" id="loginform" onSubmit={submitForm}>
                    <div className="form-group mb-3">
                      <div className>
                        <input className="form-control" type="text" required placeholder="Username" value={email} onChange={e=>setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className>
                        <input className="form-control" type="password" required placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="d-flex">
                        <div className="checkbox checkbox-info pt-0">
                          <input id="checkbox-signup" type="checkbox" className="material-inputs chk-col-indigo" />
                          <label htmlFor="checkbox-signup"> Remember me </label>
                        </div>
                        <div className="ms-auto">
                          <a href="javascript:void(0)" id="to-recover" className="
                            link
                            font-weight-medium
                            d-flex
                            align-items-center
                          "><i className="ri-lock-line fs-5 me-1" /> Forgot pwd?</a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-center mt-4 mb-3">
                      <div className="col-xs-12">
                        <button className="
                          btn btn-info
                          d-block
                          w-100
                          waves-effect waves-light
                        " type="submit">
                          Log In
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 mt-2 text-center">
                        <div className="social mb-3">
                          <a href="javascript:void(0)" className="btn btn-facebook" data-bs-toggle="tooltip" title="Login with Facebook">
                            <i aria-hidden="true" className="ri-facebook-box-fill fs-4" />
                          </a>
                          <a href="javascript:void(0)" className="btn btn-googleplus" data-bs-toggle="tooltip" title="Login with Google">
                            <i aria-hidden="true" className="ri-google-fill fs-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-0 mt-4">
                      <div className="col-sm-12 justify-content-center d-flex">
                        <p>
                          Don't have an account?
                          <a href="authentication-register1.html" className="text-info font-weight-medium ms-1">Sign Up</a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="recoverform">
              <div className="logo">
                <h3 className="font-weight-medium mb-3">Recover Password</h3>
                <span className="text-muted">Enter your Email and instructions will be sent to you!</span>
              </div>
              <div className="row mt-3 form-material">
                <form className="col-12" action="index.html">
                  <div className="form-group row">
                    <div className="col-12">
                      <input className="form-control" type="email" required placeholder="Username" />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <button className="btn d-block w-100 btn-primary text-uppercase" type="submit" name="action">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
