import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/elements/Button";
import Form from "../../../../components/elements/Form";
import Label from "../../../../components/elements/Label";
import RadioButton from "../../../../components/elements/RadioButton";
import Select from "../../../../components/elements/Select";
import Select2 from "../../../../components/elements/Select2";
import TextInput from "../../../../components/elements/TextInput";
import HeadSection from "../../../../components/HeadSection";
import toast from "../../../../components/Toast/index";
import Axios from "../../../utils/axios";

export default function create() {

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const router = useRouter();

  const {http} = Axios();

  const [employee, setEmployee] = useState({
    department_id:null,
    designation_id:null,
    name:"",
    gender:"male",
    salary_type:"",
    salary_amount:"",
    address:"",
    description:"",
    mobile:"",
    email:"",
    status:1,
    is_user:false,
    role_id:null,
    roles:[],
    user_status:1,
    user_defined_password:false,
    password:"",
    country_id:null,
    state_id:null,
    city_id:null,
    countryData:[],
    stateData:[],
    cityData:[],
    getDept:[],
    getAllDesignation:[],

  });



  const handleChange =(e)=>{
    setEmployee(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }


  const dept_options = employee.getDept.data;

  const designation_options = employee.getAllDesignation.data;


  useEffect(()=>{
    let isMount = true;
    if(isMount){
      getDepartment();
      getDesignation();
      getRoles()
      getAllContries();
      getStateById();
      getCityById();
    }
    return () =>{
      isMount = false;
    }
  },[employee.country_id,employee.state_id]);

  async function getDepartment(){
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/departments`,{action: "getAllDepartments",})
    .then((res)=>{
      if(isSubscribed){

        setEmployee(prev=>({
          ...prev, 
          getDept:res.data,
        }))
      }
    });

    return ()=> isSubscribed=false;

  }

  async function getDesignation(){
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "getDesignations",})
    .then((res)=>{
      if(isSubscribed){

        setEmployee(prev=>({
          ...prev, 
          getAllDesignation:res.data,
        }))

      }
    });

    return ()=> isSubscribed=false;
  }

  async function getRoles(){
    let isSubscribed = true;

    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,{action: "getAllRoles",})
    .then((res)=>{
      if(isSubscribed){
        setEmployee(prev=>({
          ...prev, 
          roles:res.data.data,
        }))

      }
    });
    return ()=> isSubscribed=false;
  }

//get All countries data
const getAllContries =async()=>{
  let isSubscribed = true;
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "allCountries",})
  .then((res)=>{
    if(isSubscribed){
      setEmployee(prev=>({
        ...prev, 
        countryData:res.data.data,
      }))

    }
  });

  return ()=> isSubscribed=false;
}

const changeState = (e)=>{
  if(e.value){
    setEmployee(prev=>({
      ...prev, 
      country_id:e.value,
    }))

  }

}


const getStateById = async()=>{
  let isSubscribed = true;
  if(employee.country_id !== null){
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "getState",country_id:employee.country_id})
    .then((res)=>{
      if(isSubscribed){
        setEmployee(prev=>({
          ...prev, 
          stateData:res.data.data,
        }))

      }
    });
  }
  return ()=> isSubscribed=false;
}

const changeCity =(e)=>{
  if(e.value){
    setEmployee(prev=>({
      ...prev, 
      state_id:e.value,
    }))

  }
}

const getCityById = async()=>{
  let isSubscribed = true;
  if(employee.state_id !== null){
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "getCity",state_id:employee.state_id})
    .then((res)=>{
      if(isSubscribed){
        setEmployee(prev=>({
          ...prev, 
          cityData:res.data.data,
        }))

      }
    });
  }
  return ()=> isSubscribed=false;
}


  async function submitForm(e) {
    e.preventDefault();

    let body={...employee, action:"addEmployee"}

      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`, body)
      .then((res)=>{
          //console.log(res.data)
          notify("success", `${res.data.response}`);
          router.push('/modules/hr/employee')

      }).catch((e)=>{
        const msg = e.response?.data?.response;

         if(typeof(e.response?.data?.response) == 'string'){
          notify("error", `${e.response.data.response}`);
         }
         else{
          if(msg.department_id){
            notify("error", `${msg.department_id.Department_id}`);
          }
          if(msg.designation_id){
            notify("error", `${msg.designation_id.Designation_id}`);
          }
          if(msg.salary_type){
            notify("error", `${msg.salary_type.Salary_type}`);
          }
          if(msg.gender){
            notify("error", `${msg.gender.Gender}`);
          }
          if(msg.status){
            notify("error", `${msg.status.Status}`);
          }
          if(msg.role_id){
            notify("error", `${msg.role_id?.Role_id}`);
          }
          if(msg.country_id){
            notify("error", `${msg.country_id.Country_id}`);
          }
          if(msg.state_id){
            notify("error", `${msg.state_id.State_id}`);
          }
          if(msg.city_id){
            notify("error", `${msg.city_id.City_id}`);
          }
          if(msg.password){
            notify("error", `${msg.password.Password}`);
          }
          //console.log(e)
         }
      });



  }


  return (
    <>
      <HeadSection title="Add-Employee" />

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Employee</h4>
              </div>

              <Form onSubmit={submitForm}>
                <div className="card-body">

                  <div className="mb-3 row">
                    <Label text="Department" />
                    <div className="col-md-10">
                    <Select2
                        options={dept_options && dept_options.map(({ id, name }) => ({ value: id, label: name}))}
                        onChange={(e) =>setEmployee(prev=>({...prev, department_id:e.value}))}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <Label text="Designation"/>
                    <div className="col-md-10">
                    <Select2
                        options={designation_options && designation_options.map(({ id, name }) => ({ value: id, label: name}))}
                        onChange={(e) =>setEmployee(prev=>({...prev, designation_id:e.value}))}
                      />
                    </div>
                  </div>

                  <TextInput
                    type="text"
                    label="Name"
                    placeholder="Full Name Here"
                    name="name"
                    onChange={handleChange}
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Gender" />
                    <div className="col-md-10">
                      <ul className="action d-flex align-items-center mt-2">
                        <li>
                          <RadioButton
                            label="Male"
                            name="gender"
                            value="male"
                            checked={employee.gender == "male"}
                            onChange={handleChange}
                          />
                        </li>
                        <li>
                          <RadioButton
                            label="Female"
                            name="gender"
                            value="female"
                            checked={employee.gender == "female"}
                            onChange={handleChange}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <Label text="Salary Type" />
                    <div className="col-md-10">
                      <Select defaultValue="" name="salary_type" onChange={handleChange}>
                        <option value="" disabled>Select...</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                      </Select>
                    </div>
                  </div>

                  <TextInput
                    type="number"
                    label="Salary Amount"
                    name="salary_amount"
                    placeholder="Salary Amount"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    type="text"
                    label="Address"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Description" />
                    <div className="col-md-10">
                      <textarea className="form-control" placeholder="Description..."
                        name="description" onChange={handleChange} rows={5}
                      />
                    </div>
                  </div>

                  <TextInput
                    type="number"
                    label="Mobile"
                    name="mobile"
                    placeholder="017xx-xxx-xxx"
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Status" />
                    <div className="col-md-10">
                      <ul className="action d-flex mt-2">
                        <li>
                          <RadioButton
                            label="Yes"
                            value="1"
                            name="status"
                            checked={employee.status == "1"}
                            onChange={handleChange}
                          />
                        </li>
                        <li>
                          <RadioButton
                            label="No"
                            value="0"
                            name="status"
                            checked={employee.status == "0"}
                            onChange={handleChange}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr/>

                  <div className="mb-3 row">
                      <Label text="Is User?" />
                      <div className="col-md-10 form-check form-switch" style={{fontSize:'150%'}}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        name="is_user"
                        onChange={()=>setEmployee(prev=>({...prev, is_user:!(employee.is_user)}))} checked={employee.is_user}
                      />
                      </div>
                  </div>

                  <div className={`${employee.is_user?'':'d-none'}`}>

                    <div className="mb-3 row">
                      <Label text="Role" />
                      <div className="col-md-10">
                        <Select2 options={employee.roles && employee.roles.map(({ id, title }) => ({ value: id, label: title}))}
                        onChange={(e) =>setEmployee(prev=>({...prev, role_id:e.value}))}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="Country" />
                      <div className="col-md-10">
                        <Select2 options={employee.countryData.map(({ id, name }) => ({ value: id, label: name}))}  
                        onChange={changeState} required={true}
                        />
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <Label text="State" />
                      <div className="col-md-10">
                      <Select2 options={employee.stateData.map(({ id, name }) => ({ value: id, label: name}))} 
                        onChange={changeCity}
                      />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="City" />
                      <div className="col-md-10">
                      <Select2 options={employee.cityData.map(({ id, name }) => ({ value: id, label: name}))} 
                        onChange={(e) =>setEmployee(prev=>({...prev, city_id:e.value}))}
                      />
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <Label text="User Status" />
                      <div className="col-md-10">
                        <ul className="action d-flex align-items-center mt-2">
                          <li>
                            <RadioButton
                              label="active"
                              value="1"
                              name="user_status"
                              checked={employee.user_status == "1"}
                              onChange={handleChange}
                            />
                          </li>
                          <li>
                            <RadioButton
                              label="inactive"
                              value="0"
                              name="user_status"
                              checked={employee.user_status == "0"}
                              onChange={handleChange}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="User Define Password?" />
                      <div className="col-md-10 form-check form-switch" style={{fontSize:'150%'}}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="user_defined_password"
                        onChange={() =>setEmployee(prev=>({...prev, user_defined_password:!(employee.user_defined_password)}))}
                        checked={employee.user_defined_password}
                      />
                      </div>
                    </div>

                    <TextInput
                      type="password"
                      label="password"
                      name="password"
                      placeholder="Type 8-character password"
                      disabled={employee.user_defined_password}
                      onChange={handleChange}
                    />
                      


                  </div>                  

                </div>
                <div className="p-3 border-top">
                  <div className="text-end">
                    <Button className="btn-info">Save</Button>

                    <Button className="btn-dark">Cancel</Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}