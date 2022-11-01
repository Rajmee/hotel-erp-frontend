import Link from 'next/link';
import { config } from 'process';
import React, { useMemo, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import EditIcon from '../../../components/elements/EditIcon';
import toast from "../../../components/Toast/index";
import Axios from '../../utils/axios';
import {Select2} from "../../../components"; 

export default function ListView() {

    const {http} = Axios();

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

  
const [showVerificationModal, setShowVerificationModal] = useState(false);
const [configValue, setConfigValue] = useState({});
const [password, setPassword] = useState("");
 
 
 


  const handleExit = () => setShowUpdateModal(false);

 
    //Config data list
  let [itemList, setItemList] = useState([
    {
      
      config_name:"Hotel Name",
      config_value:"" ,
      is_show:false
    },
    {
    
      config_name:"Address",
      config_value:"" ,
      is_show:false
    },
    {
    
      config_name:"Sales Contact Number",
      config_value:"" ,
      is_show:false
    },
    {
     
      config_name:"Sales Contact Email",
      config_value:"" ,
      is_show:false
    },
    {
      
      config_name:"Hotel's Logo",
      config_value:"",
      is_show:false 
    },
   

  
  ]);


  React.useEffect(() => {
    const timeout = setTimeout(() => {
          fetchItemList();
         
    });
    return () => clearTimeout(timeout);
}, []);

 
  const fetchItemList = async () => { 

      itemList.map((obj)=>{
        // console.log(obj);
        http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/settings/general`,{
        action: "configDataInfo",name:obj.config_name
      })
      .then((res)=>{ 
        
        let config_data = res.data.data;
      
        setItemList(current =>
          current.map(obj => { 
            if (obj.config_name === config_data.config_name) {
              return {...obj,
                config_value: config_data.config_value};
            }
            return obj;
          }),
        );
        
      })
    .catch((err)=>{
      console.log("Server Error ~!")
    }); 
      }); 
  };

 
  

const handleExitVerification = () => setShowVerificationModal(false);
const handleOpenVerificationExit = () => setShowVerificationModal(false);

const handleOpenVerification = () =>{
  setPassword("");
  setShowVerificationModal(true);
} 

const changeHandlePassword =(e)=>{
  setPassword(e.target.value)
}
const changeHandler =(e)=>{ 
  setConfigValue(prev=>({
    ...prev, [e.target.name]:e.target.value
  }))
}
const handleOpen = (name) =>{

    setItemList(current =>
      current.map(obj => {
        
        if (obj.config_name === name) {
          setConfigValue(prev=>({
            ...prev,
             config_value:obj.config_value,
             config_name:obj.config_name
          }))
          
          return {...obj,
            is_show: true};
        }
        if (obj.config_name !== name) {
          return {...obj,
            is_show: false  };    
        }
        return obj;
      }),
    );
  } 
  const verification = async(e) =>{ 
 
  if(password === ''){
    notify("error", "Password Is Required");
    return false;
  }
  let body = {
    action: "userVerifiaction",
    password:password
  }
 
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/settings/general`,body )
  .then((res)=>{
    console.log(res.data.data.user==="varified");
    if(res.data.data.user==="verified"){ 
      notify("success", `${res.data.response}`);
      updateForm();
    }else{
      notify("error", "Some Problem Occure");
    }
  }).catch((e)=>{ 
    const msg = e.response?.data?.response;
    if(typeof(msg) == 'string'){
    notify("error", `${e.response.data.response}`);
    }
    else{
      notify("error", "Invalid Password");
    }
  });
}
 
const updateForm=async()=> {
  let value = configValue.config_value  
  if(!value){
    notify("error", "Data are not updated");
    return false;
  }
 
  let body = {
    action: "updateOrCreateConfigData",
    config_name: configValue.config_name,
    config_value: value
  }
  
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/settings/general`,body)
  .then((res)=>{
      notify("success", "Successfully Updated!");
      
      setItemList(current =>
        current.map(obj => { 
          if(obj.id !=0){
            if(body.config_name === obj.config_name){
              return {...obj,
                config_value: body.config_value,
                is_show: false
              };
            }else{
              return {...obj,
                is_show: false};
            }

          }
          return obj;
        }),
      );
      handleOpenVerificationExit();
  })
  .catch((e)=>{
    const msg = e.response?.data?.response;
     if(typeof(msg) == 'string'){
      notify("error", `${msg}`);
     }
     else{
      if(msg?.facility){
        notify("error", `${msg.facility.Facility}`);
      }
     }
  });

  // fetchItemList();

  // return ()=>isSubscribed=false;
}

  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="card shadow">

                  <div className="d-flex border-bottom title-part-padding align-items-center">
                    <div>
                      <h4 class="card-title mb-0">Information</h4>
                    </div>
                    <div class="ms-auto flex-shrink-0"> 
                      <Modal dialogClassName="modal-lg" show={showVerificationModal} onHide={handleExitVerification}>
                        <Modal.Header closeButton>
                          <Modal.Title>Verification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group controlId="formBasicName">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" placeholder="Enter Password" name="password" onChange={changeHandlePassword} required />
                            </Form.Group>
                            <Button variant="primary" className="shadow mt-3 rounded" onClick={()=>verification()} > Submit </Button>
                          </Form>
                        </Modal.Body>
                      </Modal> 
                    </div>
                  </div>


                  <div className="card-body">

                    <table class="table">
                          <thead>
                            <tr>
                              <th>Setting</th>
                              <th>Setting Value</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>

                            {
                              itemList.map((item, index) => {
                                return (
                                  <tr   key={`${index}`}>
                                      <td
                                      >
                                        {item.config_name}
                                      </td>
                                      <td>
                                      {(() => {
                                          if (item.is_show ){
                                            if(item.config_name === "Hotel's Logo"){

                                              return (
                                              <p>
                                                Image Upload System Not Implemented 
                                              </p> 
                                               
                                              )
                                            }else{
                                              if(item.config_name === "Sales Contact Number"){ 
                                                return ( 
                                                  <Form.Control 
                                                  type="number" 
                                                  placeholder="017xx-xxx-xxx"
                                                  name="config_value"
                                                  defaultValue={item.config_value}
                                                  onChange={changeHandler}
                                                  required /> 
                                                )
                                              }
                                              else if(item.config_name === "Sales Contact Email"){ 
                                                return ( 
                                                  <Form.Control 
                                                  type="email" 
                                                  placeholder="example@gmail.com" 
                                                  name="config_value"
                                                  defaultValue={item.config_value}
                                                  onChange={changeHandler}
                                                  required /> 
                                                )
                                              }else{
                                                return ( 
                                                  <Form.Control 
                                                  type="text" 
                                                  placeholder="Enter Value" 
                                                  name="config_value"
                                                  defaultValue={item.config_value}
                                                  onChange={changeHandler}
                                                  required /> 
                                                )
                                              }

                                            }
                                             
                                          }else{
                                            return (
                                              <p>{item.config_value === "" ? "Not Set Yet": item.config_value}</p> 
                                            )
                                          }
                                      })()} 
                                      </td>

                                      <td>

                                      <ul className="action ">
                                          { item.is_show ?
                                          
                               
                                            <Button className="btn-info mr-3" onClick={()=>handleOpenVerification()}>
                                             Save
                                           </Button>
                                            :
                                            <li>
                                            <Link href="#">
                                                <a onClick={()=>handleOpen(item.config_name)}>
                                                    <EditIcon />
                                                </a>
                                              </Link>
                                            </li>
                                          }
                                      </ul> 

                                      </td>
                                  </tr>
                                );
                              })
                            }
                        </tbody>
                    </table>
                     
                  </div>

                </div>
            </div>
        </div>
    </div>
  )
}