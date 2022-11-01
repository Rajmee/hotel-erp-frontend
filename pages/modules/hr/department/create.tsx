import { useRouter } from "next/router";
import { useState } from "react";
import Textarea from "react-expanding-textarea";
import { useForm } from "react-hook-form";
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../../../components";
import Label from "../../../../components/elements/Label";
import TextInput from "../../../../components/elements/TextInput";
import Axios from "../../../utils/axios";

const AddDepartment = () => {
  const router = useRouter();
  const [department_name, setDepartment] = useState<string>("");
  const [message, setMessage] = useState<string>("Not Department Added yet!");
  const [department_description, setDescription] = useState<string>("");
  const [department_status, setStatus] = useState<boolean>(false);
  const { http } = Axios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notify = (msg: any) => toast(msg);

  const body = {
    action: "create",
    name: department_name,
    description: department_description,
    status: Number(department_status),
  };

  async function submitForm(e: any) {
    e.preventDefault();
    try {
      await http
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/departments`, {
          body,
        })
        .then((data): any => {
          if (!data) {
            setMessage("Someting went wrong!");
            notify("Something Went Wrong!");
            //return;
          }
          setMessage("Department Added!");
          notify("Department Added!");
        });
    } catch (e) {
      setMessage("Someting went wrong!");
      notify("Someting went wrong!");
    }
  }

  return (
    <>
      <ToastContainer position="top-center" draggable closeOnClick />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Add New Department</h4>
                <div className="card-body">
                  <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
                    <div className="mb-3 row">
                      <TextInput
                        label="Department Name"
                        placeholder="Department Name"
                        value={department_name}
                        required
                        onChange={(e) => setDepartment(e?.target.value)}
                      />
                      <div className="mb-3 row">
                        <Label text="Description" />
                        <div className="col-sm-9">
                          <Textarea
                            className="textarea form-control"
                            // defaultValue="Write Descriptions..."
                            id="my-textarea"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter additional notes..."
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <Label text="Active/In Active" />
                        <div className="col-sm-9">
                          <Switch
                            onChange={() => setStatus(!department_status)}
                            checked={department_status}
                          />
                        </div>
                      </div>

                      <div className="p-3 border-top">
                        <div className="text-end">
                          <button
                            type="submit"
                            className="
                                                    btn btn-info
                                                    font-weight-medium
                                                    rounded-pill
                                                    px-4
                                                "
                            onClick={submitForm}
                          >
                            Add
                          </button>
                          <Button
                            className="btn-dark"
                            onClick={() => router.push("/")}
                          >
                            Cancle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddDepartment;
