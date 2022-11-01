import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Axios from "../../../../utils/axios";
import { getToken } from '../../../../utils/getdata';
const Edit = () => {
    const [isSSR, setIsSSR] = useState(true);
    const [message, setMessage] = useState('Not Updated Yet!');
    const router = useRouter();
    const { id } = router.query;

    //**Fetching Data For Editing Row */
    const userData = getToken();
    const response = userData.response && userData.response;
  //console.log(response)
  const token:any = {
    Authorization: `Bearer ${response}`
   }
        const header = {
            headers: token,
        };
        const body = {
        action: "getDepartmentInfo",
        department: id,
        };

        //const {http} = getToken();
        const {http} = Axios();
  
        // const fetcher1 =  await axios.post(
        //     'http://hotel.api/app/hrm/departments',
        //     body,
        //     config
        //   ).then((res) => res.data);
        const fetcher1 = async (url:string, bodyPart:any, head:any) => await http.post(url,body).then((res) => res.data);
        // const fetcher1 = async (url:string, bodyPart:any, head:any) => await axios.post(url,body,header).then((res) => res.data);

        //const { data, error } = useSWR('http://192.168.1.113:3000/listDepartment', fetcher1);
        const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/departments`, fetcher1);
    
        //data && console.log("Data: " + JSON.stringify(data);
        //console.log(data)
    
    //**End Fetching Data For Editing Row */

    const [department, setDepartment] = useState({
        department_name: data && data.data.name,
        department_description: data && data.data.description,
        department_status: data && data.data.status,
        department_created_by: data && data.data.created_by,
        department_created_at: data && data.data.created_at,

        // department_name: data && data[0].name,
        // department_description: data && data[0].description,
        // department_status: data && data[0].status,
        // department_created_by: data && data[0].created_by,
        // department_created_at: data && data[0].created_at,
    });

    useEffect(() => {
    
        //setIsSSR(false);
        department.department_name = data && data.data.name;
        department.department_description = data && data.data.description;
        department.department_status = data && data.data.status;
        department.department_created_by = data && data.data.created_by;
        department.department_created_at = data && data.data.created_at;

        // department.department_name = data && data[0].department_name;
        // department.department_description = data && data[0].department_description;
        // department.department_status = data && data[0].department_status;
        // department.department_created_by = data && data[0].created_by;
        // department.department_created_at = data && data[0].created_at;

      }, [data]);

    const changeHandler = (e:any) => {

        /**Hooking examples */
        // setDepartment({...department, department_name: e.target.value});
        //setDepartment({...department, [e.target.name]: e.target.value});
        // setDepartment({...department, department_description: e.target.value});
        /**End Hooking Example */

        e.target.name == 'department_status'?
        setDepartment({...department, [e.target.name]: e.target.checked})
        : setDepartment({...department, [e.target.name]: e.target.value});
     }

    const submitForm = async () =>{
        //setDepartment(department.department_name => e.target.value);
        
        // const fetcher = async (url:string) => await axios.post(url, {action:'editDepartment',data:department}, {
        //     headers: {
        //     'Content-Type': 'application/json', token
        //     }
        //   }
        // ).then((res) => res.data);
        // const { data, error } = useSWR(`hotel.api/app/hrm/departments`, fetcher);
        // if(data){
        //     setMessage('Item Updated...');
        // }
        const body2 = {
            action: "editDepartment",
            data: department,
            department_id: id
            };
        const fetcher2 = async (url:string, bodyPart:any, head:any) => await http.post(url,body2,header).then((res) => res.data);
        const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/departments`, fetcher2);
        //process.exit();
    }

    return (
        <div>
            <h2 className="text-center">Edit Department Form ID: {id}</h2>
            
            <form className="mx-auto my-4" style={{ maxWidth: '500px' }} /*onSubmit={checkValidation1}*/>



                <div className="form-floating mb-3">

                    <input
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text" placeholder="Department Name" maxlength="255" className="form-control" name="department_name" aria-describedby="emailHelp" value={department.department_name} onChange={changeHandler} />
                    <label htmlFor="Add Department">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text" placeholder="Department Description" maxlength="255" className="form-control" name="department_description" aria-describedby="emailHelp" value={department.department_description} onChange={changeHandler} />
                    <label htmlFor="Level">Description</label>
                </div>

                <div className="form-floating mb-3">
                    <input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text" placeholder="Created By" maxlength="255" className="form-control" name="department_created_by" aria-describedby="emailHelp" value={department.department_created_by} onChange={changeHandler} />
                    <label htmlFor="Level">Created By</label>
                </div>

                <div className="form-floating mb-3">
                    <input oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        type="text" placeholder="Created At" maxlength="255" className="form-control" name="department_created_at" aria-describedby="emailHelp" value={moment(department.department_created_at).format("YYYY-MM-DD")} onChange={changeHandler} />
                    <label htmlFor="Level">Created At</label>
                </div>
                <div className="form-control">
                    <label htmlFor="Status">Status (Active/inActive)</label>
                    <br></br>
                    <input
                        type="checkbox" checked={department.department_status} name="department_status" id="department_status" aria-describedby="emailHelp" onChange={changeHandler} />

                </div>
                <br></br>
                <button type="submit" className="
                                btn btn-info
                                font-weight-medium
                                rounded-pill
                                px-4
                              " onClick={submitForm}>Save</button>
            </form>
        </div>
    );
}
export default Edit;