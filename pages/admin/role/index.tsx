import { useEffect, useState } from "react";
import Textarea from "react-expanding-textarea";
import { Button } from "../../../components";
import { Form, Label, Select2, TextInput } from "../../../components/";
//import {getToken} from '../../utils/getdata';
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../utils/axios";
// import CheckTree from './treeview';
import CheckboxTree from "react-checkbox-tree";
import { ListToTree } from "../../utils/totree";
const options = [
  { value: "hr", label: "HR", name: "module_id" },
  { value: "accounts", label: "Accounts", name: "module_id" },
  { value: "admin", label: "Admin", name: "module_id" },
  { value: "developer", label: "Developer", name: "module_id" },
];

const AddRole = () => {
  const [value, setValue]: any = useState([]);
  const [role_status, setStatus] = useState<boolean>(false);
  const [roles, setRoles] = useState<any>([]);
  const [rolelist, setRolelist] = useState([]);
  const [permissions, setPermissions] = useState([]);
  /**For Tree Operation State */
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  /**For Tree Operation State */

  //const {http} = getToken();
  const notify = (msg: any) => toast(msg);
  const { http } = Axios();

  /**Role Form Submission */
  async function submitFormRole(e: any) {
    e.preventDefault();
    const body = {
      action: "createAccessRole",
      title: value.title,
      description: value.description,
      status: Number(role_status),
    };
    //console.log(checked);
    const res = await http.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
    );
    notify("Role Created Successfully!");
  }

  /**Permission Form Submission */
  async function submitFormPermission(e: any) {
    e.preventDefault();
    const body = {
      action: "createRolePermission",
      role_id: value.role,
      permissions_id: checked,
    };
    const res = await http.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
    );
    notify("Permissions Created Successfully!");
  }

  /**Getting Roles */
  const getRoles = async () => {
    const body: any = {
      action: "getAllRoles",
    };
    await http
      .post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
        body
      )
      .then((result) => {
        setRoles(result.data.data);
      });
  };
  /**Getting Permissions */
  const getPermissions = async () => {
    const body: any = {
      action: "getAllPermissions",
    };
    await http
      .post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
        body
      )
      .then((result) => {
        setPermissions(result.data);
      });
  };

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      getRoles();
      getPermissions();
    }
    return () => {
      isMount = false;
    };
    //console.log(permissions);
  }, []);

  //console.log(rolelist);

  const changeHandler = (e: any) => {
    // console.log(e)
    //e.name == "module_id" || e.name == "access_permission" ? setValue({...value, [e.name]: e.value}):
    e.name == "role"
      ? setValue({ ...value, [e.name]: e.value })
      : setValue({ ...value, [e.target.name]: e.target.value });
  };
  // const changeRoleListHandler = (e:any) =>{
  //   setRolelist(e)
  // }
  //console.log(rolelist)
  const role_list = roles?.map((item: any, index: any) => ({
    value: item.id,
    label: item.title,
    name: "role",
  }));

  //console.log(roles)
  //Permission List mapping
  // console.log(permissions.data);
  const treenode = ListToTree(permissions.data);

  // permissions.data && permissions.data.map((item:any, index:any)=>{
  //   console.log(item);
  // })
  //End Permission List Mapping
  return (
    <>
      <ToastContainer position="top-center" draggable closeOnClick />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Role</h4>
              </div>

              <Form onSubmit={submitFormRole}>
                <div className="card-body">
                  <TextInput
                    label="Title"
                    placeholder="Title"
                    onChange={changeHandler}
                    name="title"
                    type="text"
                  />
                  <div className="mb-3 row">
                    <Label text="Description" />
                    <div className="col-md-10">
                      <Textarea
                        className="textarea form-control"
                        // defaultValue="Write Descriptions..."
                        id="my-textarea"
                        onChange={changeHandler}
                        placeholder="Enter additional notes..."
                        name="description"
                      />
                    </div>
                  </div>
                  {/* <TextInput label="Created By" placeholder="Title" onChange={changeHandler} name="created_by" type="number" /> */}
                  <div className="mb-3 row">
                    <Label text="Active/In Active" />
                    <div className="col-md-10">
                      <Switch
                        onChange={() => setStatus(!role_status)}
                        checked={role_status}
                      />
                    </div>
                  </div>
                  <div className="p-3 border-top"></div>
                  <div className="text-end">
                    <Button className="btn-info">Save</Button>

                    <Button className="btn-dark">Cancel</Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Permissions</h4>
              </div>

              <Form onSubmit={submitFormPermission}>
                <div className="card-body">
                  <h4 className="card-title">Set Permission</h4>

                  <div className="mb-3 row">
                    <Label text="Select Role" />
                    <div className="col-md-10">
                      <Select2
                        options={role_list}
                        onChange={changeHandler}
                        name="role_list"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <Label text="Set Permissions" />
                    <div className="col-md-10 col-lg-3 col-sm-6">
                      <CheckboxTree
                        iconsClass="fa5"
                        nodes={treenode}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked) => setChecked(checked)}
                        onExpand={(expanded) => setExpanded(expanded)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 border-top"></div>
                <div className="text-end">
                  <Button className="btn-info">Save</Button>

                  <Button className="btn-dark">Cancel</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;
