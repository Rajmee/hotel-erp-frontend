import { useEffect, useState } from "react";
import Textarea from "react-expanding-textarea";
import Switch from "react-switch";
import { Button } from "../../../components";
import { Form, Label, Select2, TextInput } from "../../../components/";
import Axios from "../../utils/axios";

const data1 = [
  {
    id: 1,
    parentId: null,
    label: "My parent node",
    items: [
      {
        id: 5,
        label: "My file",
        parentId: 2,
      },
    ],
  },
  {
    id: 2,
    parentId: 1,
    label: "My child node",
  },
  {
    id: 3,
    parentId: null,
    label: "My parent node",
    items: [
      {
        id: 7,
        label: "My file",
        parentId: 2,
      },
    ],
  },
  {
    id: 4,
    parentId: 2,
    label: "My child node",
  },
];

const option = [
  { value: "hrm", label: "HRM", name: "module_id" },
  { value: "account", label: "ACCOUNTS", name: "module_id" },
  { value: "inv", label: "INVENTORY", name: "module_id" },
  { value: "booking", label: "BOOKING", name: "module_id" },
  { value: "rbm", label: "MANAGE ROOM", name: "module_id" },
  { value: "pms", label: "PURCHASE", name: "module_id" },
  { value: "psm", label: "PAYMENT", name: "module_id" },
  { value: "lms", label: "MANAGE LOCKER", name: "module_id" },
  { value: "tms", label: "MANAGE TRANSPORT", name: "module_id" },
  { value: "rms", label: "MANAGE RESTAURANT", name: "module_id" },
  { value: "drm", label: "DUTY ROSTER", name: "module_id" },
  { value: "rsm", label: "MANAGE RESERVATION", name: "module_id" },
  { value: "hkm", label: "MANAGE HOUSEKEEPING", name: "module_id" },
];
const options = [
  { value: "hrm", label: "Departments", name: "module" },
  { value: "delete_employee", label: "Delete Employee", name: "module" },
  { value: "create_department", label: "Create Department", name: "module" },
  { value: "edit_department", label: "Edit Department", name: "module" },
];

const data2 = [
  {
    id: "qylsjNj9En-bcUJ7T5meb",
    label: "Root 1",
    parentId: null,
  },
  {
    id: "j0sxlI_1ZLcQYC-09kRAY",
    label: "Root 2",
    parentId: null,
  },
  {
    id: "OSim2lYNgFkfAQhV7eN26",
    label: "Root 3",
    parentId: null,
  },
  {
    id: "6nnl5uA6bjMew4Doaz_rT",
    items: [
      {
        id: "7rISritLjbF0PU9aFOgqx",
        label: "File 1",
        parentId: "6nnl5uA6bjMew4Doaz_rT",
      },
      {
        id: "IGMC7bfsceMa88iu7vDm4",
        label: "File 2",
        parentId: "6nnl5uA6bjMew4Doaz_rT",
      },
      {
        id: "K8DGG-ka-suIem_A5NESx",
        label: "File 3",
        parentId: "6nnl5uA6bjMew4Doaz_rT",
      },
    ],
    label: "Child 1",
    parentId: "qylsjNj9En-bcUJ7T5meb",
  },
  {
    id: "TNHDvNs14IQZHdEKB5eh8",
    label: "Child 2",
    parentId: "j0sxlI_1ZLcQYC-09kRAY",
  },
  {
    id: "gTKqKh-isBHAYE7JZtvHd",
    label: "Child 3",
    parentId: "j0sxlI_1ZLcQYC-09kRAY",
  },
  {
    id: "tzejrJnz3OvNM67Fct_G-",
    label: "Child 4",
    parentId: "OSim2lYNgFkfAQhV7eN26",
  },
  {
    id: "7qOZklF6nquGB6fcTAzru",
    label: "Child Child 1",
    parentId: "6nnl5uA6bjMew4Doaz_rT",
  },
  {
    id: "rYEjIr5BIL5jUY5CX9zgX",
    items: [
      {
        id: "mwJ3egD5gHlHe7S9WXvms",
        label: "File 3",
        parentId: "rYEjIr5BIL5jUY5CX9zgX",
      },
      {
        id: "27aKyD5Dc03S_F8DiOg8q",
        label: "File 4",
        parentId: "rYEjIr5BIL5jUY5CX9zgX",
      },
      {
        id: "ZAb5-U1h4AzUTEhQZys2v",
        label: "File 5",
        parentId: "rYEjIr5BIL5jUY5CX9zgX",
      },
    ],
    label: "Child Child 2",
    parentId: "TNHDvNs14IQZHdEKB5eh8",
  },
  {
    id: "d-2u5sMEUccQDJLJvOk-9",
    label: "Child Child 3",
    parentId: "gTKqKh-isBHAYE7JZtvHd",
  },
];

const AddPermission = () => {
  const [value, setValue]: any = useState([]);
  const [permission_status, setStatus] = useState<boolean>(false);
  const [head, setHead] = useState<boolean>(false);
  const [disableList, setDisableList] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<any>([]);

  const { http } = Axios();

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

  async function submitForm(e: any) {
    e.preventDefault();
    //console.dir(value)
    let body: any = {};
    if (head) {
      body = {
        action: "createAccessPermission",
        title: value.title,
        access_code: value.access_code,
        module: value.module_id,
        description: value.description,
        parent_id: null,
        status: Number(permission_status),
      };
    } else {
      let tmodule: string = value.module_id;
      tmodule = tmodule.toUpperCase();
      body = {
        action: "createAccessPermission",
        title: value.title,
        access_code: value.access_code,
        module: tmodule,
        description: value.description,
        parent_id: value.access_id, //module_id => parent_id
        status: Number(permission_status),
      };
    }

    await http.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`,
      body
    );
  }

  const changeHandleSelectBox = () => {
    setDisableList(!disableList);
    // ()=>setHead(!head)
    setHead(!head);
    //console.log(disableList)
  };

  const changeHandler = (e: any) => {
    //console.log(e)
    e.name == "module_id" || e.name == "access_id"
      ? setValue({ ...value, [e.name]: e.value })
      : setValue({ ...value, [e.target.name]: e.target.value });

    //Set Parent ID
    //e.name == "module"? setValue({...value, ["module_name"]: e.label}) : "";
  };

  const changeTreeHandler = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    getPermissions();
    //console.log(permissions);
  }, []);
  // permissions.filter(item => item.parent_id == null)
  // .map(item => console.log(item))
  //const years = [ 1993, 2000, 2015, 2020];

  /**Subtree for select box */

  interface Type {
    categoryID: number;
    level: string;
  }
  const arr: Type[] = [];
  //console.log(permissions.data);
  let checkData;
  if (permissions.data) {
    checkData = Object.entries(permissions.data); //creating to obj array
  }
  // checkData && console.log(checkData[0][1]);
  const cateSubcatTree = async (
    parent_id: any = null,
    sub_mark: string = ""
  ) => {
    var category: any;
    if (checkData && parent_id == null)
      category = checkData.filter((item) => item[1].parent_id == null);
    else if (checkData && parent_id !== null)
      category = checkData.filter((item) => item[1].parent_id == parent_id);
    category &&
      category.map((item: any, index: any) => {
        //console.log(item[1]);
        const categoryType: Type = {
          value: item[1].id,
          label: sub_mark + item[1].title,
          name: "access_id",
        };
        arr.push(categoryType);
        cateSubcatTree(item[1].id, sub_mark + "--");
      });
  };
  cateSubcatTree();
  //console.log(arr);

  /**Subtree for select box End */

  // const dataset = checkData.filter(item => item.parent_id == null);

  //console.log(dataset); // [ 2015, 2020 ]

  const access =
    permissions.data?.map((item: any, index: any) => ({
      value: item.id,
      label: item.title,
      name: "access_id",
    })) || {};

  //console.log((access));
  //console.log(access)
  // const access = permissions.data.map((item:any, index:any) => {

  // })

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add Permission</h4>
              </div>

              <Form onSubmit={submitForm}>
                <div className="card-body">
                  <TextInput
                    label="Access Title"
                    placeholder="Access Title"
                    onChange={changeHandler}
                    name="title"
                    type="text"
                  />
                  <TextInput
                    label="Access Code"
                    placeholder="Access Title"
                    onChange={changeHandler}
                    name="access_code"
                    type="text"
                  />
                  <div className="mb-3 row">
                    <Label text="Module" />
                    <div className="col-sm-9">
                      <Select2
                        options={option}
                        onChange={changeHandler}
                        name="module_id"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <Label text="Head" />
                    <div className="col-sm-9">
                      <Switch
                        onChange={changeHandleSelectBox}
                        checked={head}
                        name="parent_node"
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <Label text="Access" />
                    <div className="col-sm-9">
                      <Select2
                        isDisabled={disableList}
                        options={arr}
                        onChange={changeHandler}
                        name="access"
                      />
                      {/* <Tree
                        animations
                        nodes={data2}
                        onOpenClose={function noRefCheck(){}}
                        onSelect={changeTreeHandler}
                        theme="light"
                        /> */}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <Label text="Description" />
                    <div className="col-sm-9">
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
                  <div className="mb-3 row">
                    <Label text="Active/In Active" />
                    <div className="col-sm-9">
                      <Switch
                        onChange={() => {
                          setStatus(!permission_status);
                        }}
                        checked={permission_status}
                        name="permission_status"
                      />
                      {/* <Switch onChange={()=>setStatus(!permission_status)} checked={permission_status}} /> */}
                    </div>
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
};

export default AddPermission;
