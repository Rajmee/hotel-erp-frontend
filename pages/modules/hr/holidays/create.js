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


const AddHoliday = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

    const {http} = Axios();
    const router = useRouter();

    const [title, setTitle] = useState(""); 
    const [type, setType] = useState(""); 
    const [description, setDesc] = useState(""); 
    const [year, setYear] = useState(""); 
    const [date, setDate] = useState(""); 
    const [status, setStatus] = useState(""); 

    const options = [
      { value: '2022', label: '2022' },
      { value: '2023', label: '2023' },
      { value: '2024', label: '2024' }
    ];


    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/holidays`,{action: "create", title, type, description, year, date, status})
      .then((res)=>{
         notify("success", "successfully Added!");
         router.push('/modules/hr/holidays');
      }).catch((e)=>{

        const msg = e.response.data.response;

         if(typeof(e.response.data.response) == 'string'){
          notify("error", `${e.response.data.response}`);
         }
         else{
          if(msg.title){
            notify("error", `${msg.title.Title}`);
          }
          if(msg.type){
            notify("error", `${msg.type.Type}`);
          }
          if(msg.description){
            notify("error", `${msg.description.Description}`);
          }
          if(msg.year){
            notify("error", `${msg.year.Year}`);
          }
          if(msg.date){
            notify("error", `${msg.date.Date}`);
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
                  <h4 className="card-title">Add Holiday</h4>
                </div>

                <Form onSubmit={submitForm}>
                  <div className="card-body">

                    <TextInput label="Title Of Holiday" placeholder="Title Of Holiday" onChange={(e)=>setTitle(e.target.value)} />

                    <TextInput label="Type of Holiday" placeholder="Type of Holiday" onChange={(e)=>setType(e.target.value)} />

                    <TextInput label="Description" placeholder="Description" onChange={(e)=>setDesc(e.target.value)} />

                    <div className="mb-3 row">
                      <Label text="Select Year"/>
                      <div className="col-sm-9">
                        <Select2  options={options}  onChange={(department)=> setYear(department.value)}/>
                      </div>
                    </div>

                    <div className="mb-3 row">
                     <Label text="Date"/>
                      <div className="col-sm-9">
                        <input type="date" onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                      </div>
                    </div>

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
 
export default AddHoliday;