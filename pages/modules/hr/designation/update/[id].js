import { useEffect, useState } from "react";
import Button from '../../../../../components/elements/Button';
import Form from '../../../../../components/elements/Form';
import Label from '../../../../../components/elements/Label';
import Option from '../../../../../components/elements/Option';
import RadioButton from '../../../../../components/elements/RadioButton';
import Select2 from '../../../../../components/elements/Select2';
import TextInput from '../../../../../components/elements/TextInput';
import MyComponent from '../../../../../components/elements/Select2';
import HeadSection from '../../../../../components/HeadSection';
import { useRouter } from 'next/router';
import Axios from '../../../../utils/axios';
import TablePlaceholder from '../../../../../components/placeholder/TablePlaceholder';

function EditDesignation({designation})
{
    const {http} = Axios();
    const [loading, setLoading] = useState(true);

    const [name, setTitle] = useState(""); 
    const [description, setDesc] = useState(""); 
    const [status, setStatus] = useState(""); 

    const router = useRouter();
    const { id } = router.query;

    useEffect(() =>{
      const getDesignation = async () =>{
        setLoading(true);
        const res = await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "getDesignationInfo",designation_id: id})
        setTitle(res.data.data.name);
        setDesc(res.data.data.description);
        setStatus(res.data.data.status);
        setLoading(false);
      }
      getDesignation()
    },[id])

    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "editDesignations", designation_id: id, name, description, status})
      .then((res)=>{
         router.push('/modules/hr/designation');
      });
    }

    if (loading)
    return (
      <>
        <HeadSection title="Edit-Designations" />
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
    

    return(
      <>
      <HeadSection title="Edit-Designations"  />
      <div className="container-fluid ">
      <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body border-bottom">
                <h4 className="card-title">Edit Designation</h4>
              </div>

              <Form onSubmit={submitForm}>
                <div className="card-body">

                  <TextInput label="Title Of Designation" placeholder="Title Of Designation" value={name} required onChange={(e)=>setTitle(e.target.value)} />

                  <TextInput label="Description" placeholder="Description" value={description} onChange={(e)=>setDesc(e.target.value)} />

                  {/* <div className="mb-3 row">
                    <div className="offset-sm-3 col-sm-9">
                      <div className="form-check mr-sm-2">
                          <input
                              type="checkbox"
                              className="form-check-input"
                              id="checkbox2"
                              checked={status == 1 ? true : false}
                              onChange={(e) => setStatus(e.target.value)}
                              />
                            <label className="form-check-label" htmlFor="checkbox2">Status!</label>
                        </div>
                      </div>
                  </div> */}

                  

                </div>
                <div className="p-3 border-top">
                  <div className="text-end">
                    <Button className="btn-info">
                      Update
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
    )
}

export default EditDesignation;