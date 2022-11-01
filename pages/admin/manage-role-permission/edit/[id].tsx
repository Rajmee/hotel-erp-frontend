import { useEffect, useState } from 'react';
import { Button, Form, Label, Select2 } from '../../../../components';
//import {getToken} from '../../utils/getdata';
import { toast, ToastContainer } from 'react-toastify';
import Axios from "../../../utils/axios";
// import CheckTree from './treeview';
import { useRouter } from 'next/router';
import CheckboxTree from 'react-checkbox-tree';
import { ListToTree } from '../../../utils/totree';


const EditRole = () => {
  const [value, setValue]:any = useState([]);
  const [role_status, setStatus] = useState<boolean>(false);
  const [roles, setRoles] = useState<any>([]);
  const [rolelist, setRolelist] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roleID, setroleID] = useState<any>([]);
  const [checkedPermission, setCheckedPermission] = useState([]);
  const [checkedData, setCheckedData] = useState<string>([]);
  /**For Tree Operation State */
  const [checked, setChecked]= useState([]);
  const [expanded, setExpanded]= useState([]);

  const router = useRouter();
  const { id } = router.query;      //Page slug

 /**For Tree Operation State */


  //const {http} = getToken();
  const notify = (msg:any) => toast(msg);
  const {http} = Axios();

    /**Permission Form Submission */
    async function submitFormPermission(e:any){
      e.preventDefault();
      if(!!value.role_id){
        const body = {
          action: "updateRolePermission",
          role_id: value.role,
          permissions_id: checkedData
        }
        const res = await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
        body
        ).then(()=>notify('Permissions Created Successfully!'));
      }
      else{
        const body = {
          action: "updateRolePermission",
          role_id: Number(id),
          permissions_id: checkedData
        }
        const res = await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
        body
        ).then(()=>notify('Permissions Created Successfully!'));
      }
    }

    /**Getting Roles */
    const getRoles = async () =>{
      const body:any = {
        action: "getAllRoles",
      }
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
        body
      ).then(result=>{
        setRoles(result.data.data)
      });
    }
     /**Getting Permissions */
    const getPermissions = async () =>{
      const body:any = {
        action: "getAllPermissions"
      }
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
      ).then(result=>{
        setPermissions(result.data)
      })
    }

    /**Get Checked Permissions Data */
    const getPermissionsData = async () => {
        const body:any = {
            action: "getPermissionByRoleID",
            role_id: {id}
        }
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
      ).then(result=>{
        setCheckedPermission(result.data.data)
        // console.log(result.data.data);
      })
    }

    /**Getting role-permission by ID */
    const getRolePermissionsByID = async() => {
        const body:any = {
            action: "getRoleById",
            role_id: {id}
        }
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
      ).then(result=>{
        setroleID(result.data.data.value)  //var j = {0: "1", 1: "2", 2: "3", 3: "4"}; Object.values(j)->["1", "2", "3", "4"]
      })
    }

    useEffect(()=>{
      let isMount = true;
      if(isMount){
        getRoles();
        getPermissions();
        getRolePermissionsByID();
        getPermissionsData();
      }
      return ()=>{
        isMount = false;
      }
      //console.log(permissions);
    },[]);

    //console.log(checkedPermission);

  const changeHandler = (e:any) => {
    // console.log(e)
    //e.name == "module_id" || e.name == "access_permission" ? setValue({...value, [e.name]: e.value}):
    e.name == "role" ? setValue({...value, [e.name]: e.value}) : setValue({...value, [e.target.name]: e.target.value});
  }
  // const changeRoleListHandler = (e:any) =>{
  //   setRolelist(e)
  // }
  //console.log(rolelist)
  //let checkedDataArr = [];

  useEffect(() => {
    let isMount = true;
    if(isMount){
      checkedPermission && checkedPermission.map((item:any, index:any) => {
        setCheckedData(prevData => [...prevData, JSON.stringify(item.permission_id)])    //To avoid infinite loop duing cycle render
        //setTheArray(oldArray => [...oldArray, newElement]);
        //setTheArray([...theArray, newElement]);
        //checkedDataArr.push(item.permission_id);
        //console.log(checkedDataArr);
      });
    }
    return () =>  isMount = false;
  },[checkedPermission])

  const role_list = roles?.map((item:any, index:any) => ({ value: item.id, label: item.title, name: "role" }));

  //console.log(roles)
  //Permission List mapping
  // console.log(permissions.data);
  const treenode = ListToTree(permissions.data);
  //console.log(roleID);

  // permissions.data && permissions.data.map((item:any, index:any)=>{
  //   console.log(item);
  // })
  //End Permission List Mapping
  return (
        <>
        <ToastContainer position="top-center"
                draggable
                closeOnClick
                />
       <div className="container-fluid ">
        <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Edit Role-Permission For {roleID}</h4>
                </div>

                  <Form onSubmit={submitFormPermission}>
                  <div className="card-body">
                    <h4 className="card-title">Set Permissions</h4>
                  </div>
                  <div className="mb-3 row">
                      <Label text="Select Role"/>
                      <div className="col-sm-8">
                        <Select2 options={role_list} placeholder={roleID} defaultValue={roleID} onChange={changeHandler} name="role_list" />
                      </div>
                    </div>
                    <div className="mb-3 row col-lg-11 d-flex">
                      <Label text="Set Permissions"/>
                      <div className="col-sm-8">
                         <CheckboxTree
                            iconsClass="fa5"
                            nodes={treenode}
                            checked={checkedData}
                            expanded={expanded}
                            showExpandAll
                            onCheck={checked => setCheckedData(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                          />
                      </div>
                    </div>
                    <div className="p-3 border-top"></div>
                    <div className="text-end">
                      <Button className="btn-info">
                        Save
                      </Button>

                      <Button className="btn-dark">
                        Cancel
                      </Button>
                    </div>
                </Form>
              </div>
            </div>
        </div>
    </div>
        </>
    );
};

export default EditRole;