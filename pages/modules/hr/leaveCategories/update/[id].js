import React,{ useEffect, useState } from "react";
import Button from '../../../../../components/elements/Button';
import Form from '../../../../../components/elements/Form';
import Label from '../../../../../components/elements/Label';
import Option from '../../../../../components/elements/Option';
import RadioButton from '../../../../../components/elements/RadioButton';
import Select2 from '../../../../../components/elements/Select2';
import TextInput from '../../../../../components/elements/TextInput';
import MyComponent from '../../../../../components/elements/Select2';
import HeadSection from '../../../../../components/HeadSection';
import Axios from '../../../../utils/axios';
import { useRouter } from 'next/router';
import toast from "../../../../../components/Toast/index";

const EditLeave = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

    const {http} = Axios();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [status, setStatus] = useState();

    useEffect(() =>{
      const getLeave = async () =>{
        setLoading(true);
        const res = await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "getLeaveCategoryInfo",leave_id: id})
        setTitle(res.data.data.title);
        setDesc(res.data.data.description);
        setStatus(res.data.data.status);
        setLoading(false);
      }
      router.isReady && getLeave()
    },[id])

    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "editLeaveCategory", leave_id: id, title, description, status})
      .then((res)=>{
        notify("success", "successfully Updated Leave Category!");
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

    if (loading)
    return (
      <>
        <HeadSection title="Edit-Leave-Category" />
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );

    return ( 

      <>
      <div className="container-fluid ">
        <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body border-bottom">
                  <h4 className="card-title">Edit Leave-Category</h4>
                </div>

                <Form onSubmit={submitForm}>
                  <div className="card-body">

                    <TextInput label="Title Of Holiday" value={title} onChange={(e)=>setTitle(e.target.value)} />

                    <TextInput label="Description" value={description} onChange={(e)=>setDesc(e.target.value)} />

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
 
export default EditLeave;