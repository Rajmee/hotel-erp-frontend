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

const EditHoliday = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

    const {http} = Axios();
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    const [title, setTitle] = useState(""); 
    const [type, setType] = useState(""); 
    const [description, setDesc] = useState(""); 
    const [year, setYear] = useState(""); 
    const [date, setDate] = useState(""); 
    const [status, setStatus] = useState(""); 

    useEffect(() =>{
      const getHoliday = async () =>{
        setLoading(true);
        const res = await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/holidays`,{action: "getHolidayInfo",holiday_id: id})
        setTitle(res.data.data.title);
        setType(res.data.data.type);
        setDesc(res.data.data.description);
        setYear(res.data.data.year);
        setDate(res.data.data.date);
        setStatus(res.data.data.status);
        setLoading(false);
      }
      getHoliday()
    },[id])

    const options = [
      { value: '2022', label: '2022' },
      { value: '2023', label: '2023' },
      { value: '2024', label: '2024' }
    ];

    const selected_options = { value: year, label: year } ;


    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/holidays`,{action: "editHoliday", holiday_id: id, title, type, description, year, date, status})
      .then((res)=>{
        notify("success", "successfully Updated holiday!");
         router.push('/modules/hr/holidays');
      });
    }

    if (loading)
    return (
      <>
        <HeadSection title="Edit-Holiday" />
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
                  <h4 className="card-title">Edit Holiday</h4>
                </div>

                <Form onSubmit={submitForm}>
                  <div className="card-body">

                    <TextInput label="Title Of Holiday" value={title} onChange={(e)=>setTitle(e.target.value)} />

                    <TextInput label="Type of Holiday" value={type} onChange={(e)=>setType(e.target.value)} />

                    <TextInput label="Description" value={description} onChange={(e)=>setDesc(e.target.value)} />

                    <div className="mb-3 row">
                      <Label text="Select Year"/>
                      <div className="col-sm-9">
                        <Select2  options={options} value={selected_options} onChange={(options)=> setYear(options.value)}/>
                      </div>
                    </div>

                    <div className="mb-3 row">
                     <Label text="Date"/>
                      <div className="col-sm-9">
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
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
 
export default EditHoliday;