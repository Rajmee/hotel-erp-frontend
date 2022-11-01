import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";
import Button from '../../../../../components/elements/Button';
import Form from "../../../../../components/elements/Form";
import Label from "../../../../../components/elements/Label";
import RadioButton from "../../../../../components/elements/RadioButton";
import Select from "../../../../../components/elements/Select";
import Select2 from "../../../../../components/elements/Select2";
import TextInput from "../../../../../components/elements/TextInput";
import HeadSection from "../../../../../components/HeadSection";
import toast from "../../../../../components/Toast/index";
import Axios from "../../../../utils/axios";


export default function UpdateEmployee() {


  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const router = useRouter();
  const {
    isReady,
    query: {
      id,
    }
  } = router;


  const {http} = Axios();
  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState({
    department_id:null,
    designation_id:null,
    name:"",
    gender:"",
    salary_type:"",
    salary_amount:"",
    address:"",
    description:"",
    mobile:"",
    email:"",
    status:1,
    is_user:false,
    role_id:"",
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
    getEmpDetails:{}

  });

  const handleChange =(e)=>{
    
    setEmployee(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  const dept_options = employee.getDept.data;
  const designation_options = employee.getAllDesignation.data;

  const selected_desig_options = {value:employee.getEmpDetails?.designation?.id, label:employee.getEmpDetails?.designation?.name};
  const selected_dept_options = {value:employee.getEmpDetails?.department?.id, label:employee.getEmpDetails?.department?.name};
  const selected_role_options = {value:employee.getEmpDetails?.user?.role?.id || "", label:employee.getEmpDetails?.user?.role?.title || "select..."};

  const selected_country_options = {value:employee.getEmpDetails?.user?.country?.id || "", label:employee.getEmpDetails?.user?.country?.name || 'select...'};
  const selected_state_options = {value:employee.getEmpDetails?.user?.state?.id || "", label:employee.getEmpDetails?.user?.state?.name || 'select...'};
  const selected_city_options = {value:employee.getEmpDetails?.user?.city?.id || "", label:employee.getEmpDetails?.user?.city?.name || 'select...'};



  
  useEffect(()=>{
      getDepartment();
      getDesignation();
      getRoles();
      getAllContries();

  },[]);


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

  const getUser=()=>{
    let isSubscribed = true;
    if(employee.getEmpDetails?.user_id){
      if(isSubscribed){

        setEmployee(prev=>({
          ...prev, 
          is_user:true,
        }))
      }
    }
    return ()=> isSubscribed=false;
  }

  useEffect(()=>{
    getUser()
  },[employee.getEmpDetails?.user_id])


  const employeeDetails= useCallback(async()=>{
    if(!isReady){
      //console.log('fetching...')
      return;
    }

    let isSubscribed = true;
    setLoading(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`,{action: "getEmployeeInfo", employee_id:id })
    .then((res)=>{
      if(isSubscribed){
        console.log(res.data.data);

        setEmployee(prev=>({
          ...prev, 
          getEmpDetails:res.data?.data,
          department_id:res.data.data?.department?.id,
          designation_id:res.data.data?.designation?.id,
          name:res.data.data.name,
          gender:res.data.data.gender,
          salary_type:res.data.data.salary_type,
          salary_amount:res.data.data.salary_amount,
          address:res.data.data.address,
          description:res.data.data.description,
          mobile:res.data.data.mobile,
          email:res.data.data.email,
  
          role_id:res.data?.data?.user?.role?.id,
          country_id:res.data?.data?.user?.country?.id,
          state_id:res.data?.data?.user?.state?.id,
          city_id:res.data?.data?.user?.city?.id,

        }))

        setLoading(false);
      }
    })
    .catch((err)=>{
      //console.log('Something went wrong !')
      setLoading(false);
    });

    return ()=> isSubscribed=false;

  },[isReady,id]);



  useEffect(()=>{
    employeeDetails();
  },[employeeDetails])

//get All countries data
const getAllContries =async()=>{
  let isSubscribed=true;
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "allCountries",})
  .then((res)=>{
    if(isSubscribed){
      setEmployee(prev=>({
        ...prev, 
        countryData:res.data.data,
      }))
    }
  })
  .catch((err)=>{
    //console.log('error country')
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

useEffect(()=>{
  getStateById()
},[employee?.country_id])

const getStateById = async()=>{
  let isSubscribed=true;
  if(employee?.country_id !== null){
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "getState",country_id:employee?.country_id})
    .then((res)=>{
      if(isSubscribed){
        setEmployee(prev=>({
          ...prev, 
          stateData:res.data.data,
        }))

      }
    })
    .catch((err)=>{
      console.log('error state')
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
  let isSubscribed=true;
  if(employee.state_id !== null){
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`,{action: "getCity",state_id:employee?.state_id})
    .then((res)=>{
      if(isSubscribed){
        setEmployee(prev=>({
          ...prev, 
          cityData:res.data.data,
        }))

      }
    })
    .catch((err)=>{
      //console.log('error city')
    });
  }
  return ()=> isSubscribed=false;
}

useEffect(()=>{
  getCityById()
},[employee?.state_id]);

//console.log(selected_dept_options && selected_dept_options)


  async function submitForm(e) {
    e.preventDefault();

    let body={...employee, action:"updateEmployeeInfo", employee_id:id}

    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`, body)
      .then((res)=>{
          notify("success", `${res.data.response}`);
          router.push('/modules/hr/employee')

      }).catch((e)=>{
        const msg = e.response?.data?.response;

         if(typeof(e.response?.data?.response) == 'string'){
          notify("error", `${e.response?.data?.response}`);
         }
         else{
          if(msg?.department_id){
            notify("error", `${msg.department_id.Department_id}`);
          }
          if(msg?.designation_id){
            notify("error", `${msg.designation_id.Designation_id}`);
          }
          if(msg?.salary_type){
            notify("error", `${msg.salary_type.Salary_type}`);
          }
          if(msg?.gender){
            notify("error", `${msg.gender.Gender}`);
          }
          if(msg?.status){
            notify("error", `${msg.status.Status}`);
          }
          if(msg?.role_id){
            notify("error", `${msg.role_id?.Role_id}`);
          }
          if(msg?.country_id){
            notify("error", `${msg.country_id.Country_id}`);
          }
          if(msg?.state_id){
            notify("error", `${msg.state_id.State_id}`);
          }
          if(msg?.city_id){
            notify("error", `${msg.city_id.City_id}`);
          }
          if(msg?.password){
            notify("error", `${msg.password.Password}`);
          }
          console.log(e)

         }
      });

  }



  return (
    <>
      <HeadSection title="Update-Employee" />

      <div className="container-fluid ">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Update Employee</h4>
              </div>

              <Form onSubmit={submitForm}>
                <div className="card-body">
                {
                  loading && 
                  <div className="mb-3 row">
                    <Label text="Department" />
                    <div className="col-md-10">
                      <Select2
                        options={dept_options?.map(({ id, name }) => ({ value: id, label: name}))}
                        defaultValue={{value:"", label:"loading..."}}
                        onChange={(e) =>setEmployee(prev=>({...prev, department_id:e.value}))}
                      />
                    </div>
                  </div>
                }

                { !loading &&
                  <div className="mb-3 row">
                    <Label text="Department" />
                    <div className="col-md-10">
                      <Select2
                        options={dept_options?.map(({ id, name }) => ({ value: id, label: name}))}
                        defaultValue={selected_dept_options}
                        onChange={(e) =>setEmployee(prev=>({...prev, department_id:e.value}))}
                      />
                    </div>
                  </div>
                }

                { loading &&
                  <div className="mb-3 row">
                    <Label text="Designation"/>
                    <div className="col-md-10">
                      <Select2
                        options={designation_options?.map(({ id, name }) => ({ value: id, label: name}))}
                        defaultValue={{value:"", label:"loading..."}}
                        onChange={(e) =>setEmployee(prev=>({...prev, designation_id:e.value}))}
                      />
                    </div>
                  </div>
                }
                { !loading &&
                  <div className="mb-3 row">
                    <Label text="Designation"/>
                    <div className="col-md-10">
                      <Select2
                        options={designation_options?.map(({ id, name }) => ({ value: id, label: name}))}
                        defaultValue={selected_desig_options}
                        onChange={(e) =>setEmployee(prev=>({...prev, designation_id:e.value}))}
                      />
                    </div>
                  </div>
                }


                  <TextInput
                    type="text"
                    label="Name"
                    value={employee.name}
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
                    <Select value={employee?.salary_type || ""} name="salary_type" onChange={handleChange}>
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
                    value={employee.salary_amount}
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    type="text"
                    label="Address"
                    name="address"
                    placeholder="Address"
                    value={employee.address}
                    onChange={handleChange}
                    required
                  />

                  <div className="mb-3 row">
                    <Label text="Description" />
                    <div className="col-md-10">
                      <textarea className="form-control" placeholder="Description..."
                        name="description" value={employee.description} 
                        onChange={handleChange}
                        rows={5}
                      />
                    </div>
                  </div>

                  <TextInput
                    type="number"
                    label="Mobile"
                    name="mobile"
                    placeholder="017xx-xxx-xxx"
                    value={employee.mobile}
                    onChange={handleChange}
                    required
                  />

                  <TextInput
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />


                  {/* Checking Is User or Not */}
                  <div className="mb-3 row">
                      <Label text="Is User?" />
                      <div className="col-md-10 form-check form-switch" style={{fontSize:'150%'}}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        name="is_user"
                        onChange={()=>setEmployee(prev=>({...prev, is_user:!(employee.is_user)}))}
                        checked={employee.is_user}
                      />
                      </div>
                  </div>

                  <div className={`${employee.is_user?'':'d-none'}`}>

                    <div className="mb-3 row">
                      <Label text="Role" />
                      <div className="col-md-10">
                      {
                          loading && <Select2 defaultValue={{value:"", label:"loading..."}} 
                          options={employee.roles && employee.roles.map(({ id, title }) => ({ value: id, label: title}))}  
                          onChange={(e) =>setEmployee(prev=>({...prev, role_id:e.value}))}
                          />
                        }
                        {
                          !loading && <Select2  defaultValue={selected_role_options} 
                          options={employee.roles && employee.roles.map(({ id, title }) => ({ value: id, label: title}))}  
                          onChange={(e) =>setEmployee(prev=>({...prev, role_id:e.value}))}
                          />
                        }
                        
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="Country" />
                      <div className="col-md-10">
                        {
                          loading && <Select2 defaultValue={{value:"", label:"loading..."}} options={employee.countryData.map(({ id, name }) => ({ value: id, label: name}))}  onChange={changeState}/>
                        }
                        {
                          !loading && <Select2 defaultValue={selected_country_options} options={employee.countryData.map(({ id, name }) => ({ value: id, label: name}))}  onChange={changeState}/>
                        }

                      </div>
                    </div>


                    <div className="mb-3 row">
                      <Label text="State" />
                      <div className="col-md-10">
                        {
                          loading &&  <Select2 defaultValue={{value:"", label:"loading..."}} options={employee.stateData.map(({ id, name }) => ({ value: id, label: name}))} onChange={changeCity}/>
                        }
                        {
                          !loading &&  <Select2 defaultValue={selected_state_options} options={employee.stateData.map(({ id, name }) => ({ value: id, label: name}))} onChange={changeCity}/>
                        }
                     
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <Label text="City" />
                      <div className="col-md-10">
                        {
                          loading && <Select2 defaultValue={{value:"", label:"loading..."}} options={employee.cityData.map(({ id, name }) => ({ value: id, label: name}))} onChange={(e) =>setEmployee(prev=>({...prev, city_id:e.value}))}/>
                        }
                        {
                          !loading && <Select2 defaultValue={selected_city_options} options={employee.cityData.map(({ id, name }) => ({ value: id, label: name}))} onChange={(e) =>setEmployee(prev=>({...prev, city_id:e.value}))}/>
                        }
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