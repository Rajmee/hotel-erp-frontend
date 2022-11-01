import { HeadSection } from "../../../../components";
import { Form } from "../../../../components";
import {TextInput} from "../../../../components";
import {Label} from "../../../../components";
import {Button} from "../../../../components";
import {Select2} from "../../../../components";
import Axios from "../../../utils/axios";
import Switch from "react-switch";
import { useState, useMemo } from "react";
import Textarea from 'react-expanding-textarea';
import countryList from 'react-select-country-list';



const create = () => {
    /** State controlling  */
    const [status, setStatus] = useState([]);
    const [value, setValue] = useState([]);
    const [country, setCountry] = useState({value:"",label:""});
    const options = useMemo(() => countryList().getData(), []);
    

    /** State controlling  */

    const {http} = Axios();
    


    const supplier_type = [
        { value: 'regular', label: 'Regular', name:'supplier_type' },
        { value: 'company', label: 'Company', name:'supplier_type' },
        { value: 'temporary', label: 'Temporary', name:'supplier_type'},
    ];


    /**Submission Form Control */
    const submitForm = async(e:any) =>{
        e.preventDefault();
        let body:any = {}
        body = {
            action: "createSupplier",
            name: value.name,
            country_name: country.label,
            type: value.supplier_type,
            default_bank_account: value.bank_acc_number,
            bank_name: value.bank_name,
            // tax_id: value.tax_id,
            address: value.supplier_address,
            contact_number: value.contact_number,
            description:value.description,
            opening_balance: value.opening_balance,
            // status: Number(status)
            status: 1
          }
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`,
        body
      );
    
    }
  

    /**Change Handler Control */
    const changeHandler = (e:any) => {
        e.name == "supplier_type" ? setValue({...value, [e.name]: e.value}) : setValue({...value, [e.target.name]: e.target.value});
    }

  return (
    <>
    <HeadSection title="Create Supplier" />
    <div className="container-fluid ">
          <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body border-bottom">
                    <h4 className="card-title">Add New Supplier</h4>
                  </div>

                  <Form onSubmit={submitForm}>
                  <div className="card-body">
                    <TextInput label="Name" required placeholder="Supplier Name" onChange={changeHandler} name="name" type="text" />
                    <div className="mb-3 row">
                      <Label text="Country"/>
                      <div className="col-sm-10 col-md-10 col-lg-10">
                        <Select2 options={options} onChange={e=>setCountry({value:e.value, label:e.label})} />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <Label text="Type"/>
                      <div className="col-sm-10 col-md-10 col-lg-10">
                        <Select2 options={supplier_type} onChange={changeHandler} name="supplier_type" />
                      </div>
                    </div>

                    <TextInput label="Bank Acc" required placeholder="i.e: AMX-355-222-111" onChange={changeHandler} name="bank_acc_number" type="text" />
                    <TextInput label="Bank Name" required placeholder="i.e: American Bank LTD." onChange={changeHandler} name="bank_name" type="text" />
                    <TextInput label="Address" required placeholder="Supplier Address" onChange={changeHandler} name="supplier_address" type="text" />
                    <TextInput label="Contact Info" required placeholder="Contact Number" onChange={changeHandler} name="contact_number" type="text" />
                    <div className="mb-3 row">
                      <Label text="Description"/>
                      <div className="col-sm-10 col-md-10 col-lg-10">
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
                    <TextInput label="Opening Balance" required placeholder="Opening Balance" onChange={changeHandler} name="opening_balance" type="number" />
                    {/* <TextInput label="Created By" placeholder="Title" onChange={changeHandler} name="created_by" type="number" /> */}
                    {/*<div className="mb-3 row">
                      <Label text="In-Active"/>
                        <div className="col-sm-9">
                           <Switch onChange={()=>setStatus(!status)} checked={status}/>
                        </div>
                     </div>*/}
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
                  </div>
                  </Form>

                </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default create
