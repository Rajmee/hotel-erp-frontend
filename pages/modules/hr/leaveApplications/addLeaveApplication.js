import React,{ useState, useEffect } from "react";
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
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import format  from 'date-fns/format';

const AddLeaveApplication = () => {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selectionn",
    },
  ]);

  var startDate = format(dates[0].startDate,"MM/dd/yyyy");
  var endDate = format(dates[0].endDate,"MM/dd/yyyy");

  //console.log(format(dates[0].startDate,"MM/dd/yyyy")+" To "+ format(dates[0].endDate,"MM/dd/yyyy"));

    const {http} = Axios();
    const router = useRouter();
    const [date, setDate] = useState([]);
    const [subject, setSubject] = useState("");
    const [leave_category, setLeavecategory] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDesc] = useState("");
    const [getLeaveCategories, setLeaveCategories] = useState("");
    const leaveCategory_options = getLeaveCategories.data;

    const options = [
      { value: 'Single Day', label: 'Single Day' },
      { value: 'Half Day', label: 'Half Day' },
      { value: 'Multiple Day', label: 'Multiple Day' }
    ];

    useEffect(()=>{
      const controller = new AbortController();
        async function getLeavecategories(){
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "getAllLeaveCategories",})
            .then((res)=>{
              setLeaveCategories(res.data);
            });
          }
          getLeavecategories()
          return ()=> controller.abort();
    },[leave_category])

    async function submitForm(e) {
      e.preventDefault();
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "createLeaveApplication", subject, description, leave_category, duration, date, startDate, endDate})
      .then((res)=>{
         notify("success", "successfully Added!");
         router.push('/modules/hr/leaveApplications/myApplications'); 
      }).catch((e)=>{

        const msg = e.response.data.response;

         if(typeof(e.response.data.response) == 'string'){
          notify("error", `${e.response.data.response}`);
         }
         else{
          if(msg.subject){
            notify("error", `${msg.subject.subject}`);
          }
          if(msg.leave_category){
            notify("error", `${msg.leave_category.leave_category}`);
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
                  <h4 className="card-title">Add Leave-Application</h4>
                </div>

                <Form onSubmit={submitForm}>
                  <div className="card-body">

                    <TextInput label="Subject Of Leave Application" placeholder="Subject Of Leave Application" onChange={(e)=>setSubject(e.target.value)} />

                    <div className="mb-3 row">
                        <Label text="Select Leave Category"/>
                        <div className="col-sm-9">
                        <Select2
                            options={leaveCategory_options?.map(({ id, title }) => ({ value: id, label: title}))}
                            onChange={(e) =>
                              setLeavecategory(e.value)
                            }
                        />
                        </div>
                    </div>

                    <TextInput label="Description" placeholder="Description" onChange={(e)=>setDesc(e.target.value)} />

                    <div className="mb-3 row">
                      <Label text="Select Duration"/>
                      <div className="col-sm-9">
                        <Select2  options={options}  onChange={(options)=> setDuration(options.value)}/>
                      </div>
                    </div>
                    
                    <div className={`${(duration == 'Single Day') ? '' : (duration == 'Half Day') ? '' : 'd-none'}`}>
                      <div className="mb-3 row">
                      <Label text="Date"/>
                        <div className="col-sm-2">
                          <input type="date" onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                        </div>
                      </div>
                    </div>

                    <div className={`${(duration == 'Multiple Day') ? '' : 'd-none'}`}>
                    <div className="mb-3 row">
                    <Label text="Select Date Range"/>
                    <div className="col-sm-9">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selectionn])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
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
 
export default AddLeaveApplication;