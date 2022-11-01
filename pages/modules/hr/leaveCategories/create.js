import React,{ useState } from "react";
import Button from '../../../../components/elements/Button';
import Form from '../../../../components/elements/Form';
import Label from '../../../../components/elements/Label';
import Option from '../../../../components/elements/Option';
import RadioButton from '../../../../components/elements/RadioButton';
import Select2 from '../../../../components/elements/Select2';
import TextInput from '../../../../components/elements/TextInput';
import MyComponent from '../../../../components/elements/Select2';
import Axios from '../../../utils/axios';
import { useRouter } from 'next/router';
import toast from "../../../../components/Toast/index";


const AddLeaveCategory = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

    const {http} = Axios();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [status, setStatus] = useState("");


    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "createLeaveCategory", title, description, status})
      .then((res)=>{
         notify("success", "successfully Added!");
         router.push('/modules/hr/leaveCategories'); 
      }).catch((e)=>{

        const msg = e.response.data.response;

         if(typeof(e.response.data.response) == 'string'){
          notify("error", `${e.response.data.response}`);
         }
         else{
          if(msg.title){
            notify("error", `${msg.title.Title}`);
          }
          if(msg.description){
            notify("error", `${msg.description.Description}`);
          }
         }
      });
     }

    return ( 

      <>
      <div className="container-fluid ">
        <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Add Leave-Category</h4>
                </div>

                <Form onSubmit={submitForm}>
                  <div className="card-body">

                    <TextInput label="Title Of Leave Category" placeholder="Title Of Leave Category" onChange={(e)=>setTitle(e.target.value)} />

                    <TextInput label="Description" placeholder="Description" onChange={(e)=>setDesc(e.target.value)} />

                    <div className="mb-3 row">
                   <div className="offset-sm-3 col-sm-9">
                     <div className="form-check mr-sm-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkbox2"
                            onChange={(e) => setStatus(e.target.value)}
                            />
                          <label className="form-check-label" htmlFor="checkbox2">Status!</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-top">
                    <div className="text-end">
                      <Button className="btn-info">
                        Save
                      </Button>
                      <Button className="btn-dark">
                        Cancel
                      </Button>
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
 
export default AddLeaveCategory;