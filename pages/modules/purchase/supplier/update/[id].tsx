import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Textarea from "react-expanding-textarea";
import countryList from "react-select-country-list";
import Switch from "react-switch";
import {
  Button,
  Form,
  Label,
  Select2,
  TextInput,
} from "../../../../../components";
import Axios from "../../../../utils/axios";

const Update = (props: any) => {
  const router = useRouter();
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState([]);
  const [country, setCountry] = useState();
  const options = useMemo(() => countryList().getData(), []);

  //console.log(options);

  const { http } = Axios();
  //const { id } = router.query;
  const getSupplierByID = async () => {
    try {
      let body: any = {};
      body = {
        action: "getSupplierByID",
        id: { id },
      };
      await http
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, body)
        .then((result) => {
          setValue(result.data.data[0]); //var j = {0: "1", 1: "2", 2: "3", 3: "4"}; Object.values(j)->["1", "2", "3", "4"]
        });
    } catch (error) {
      console.log(error);
    }
  };

  const supplier_type = [
    { value: "regular", label: "Regular", name: "supplier_type" },
    { value: "company", label: "Company", name: "supplier_type" },
    { value: "temporary", label: "Temporary", name: "supplier_type" },
  ];

  const setInitialValue = () => {
    try {
      setStatus(!!status);
    } catch (error) {
      console.log(error);
    }
  };
  const changeHandler = (e: any) => {
    //console.log(e);
    e.name == "supplier_type"
      ? setValue({ ...value, [e.name]: e.value })
      : setValue({ ...value, [e.target.name]: e.target.value });
  };
  const submitForm = async () => {
    //e.preventDefault();
    let body: any = {};
    let countryName = "";

    if (!country) {
      countryName = value?.country_name;
    } else {
      countryName = country;
    }

    body = {
      action: "updateSupplier",
      id: Number(id),
      name: value.name,
      country_name: countryName,
      type: value.supplier_type,
      default_bank_account: value.bank_acc_number,
      bank_name: value.bank_name,
      tax_id: value.tax_id,
      address: value.supplier_address,
      contact_number: value.contact_number,
      description: value.description,
      status: Number(status),
    };
    console.log(body);
    await http.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`,
      body
    );
  };

  const {
    query: { id },
  } = router;

  useEffect(() => {
    getSupplierByID();
  }, []);
  //console.log(value);
  const handleCountry = (e: any) => {
    setCountry(e.value);
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-body border-bottom">
              <h4 className="card-title">Update Supplier Details</h4>
            </div>

            <Form onSubmit={submitForm}>
              <div className="card-body">
                <TextInput
                  label="Name"
                  value={value?.name}
                  placeholder="Name"
                  onChange={changeHandler}
                  type="text"
                />
                <div className="mb-3 row">
                  <Label text="Country" />
                  <div className="col-sm-9">
                    <Select2
                      options={options}
                      placeholder={value?.country_name}
                      onChange={handleCountry}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <Label text="Type" />
                  <div className="col-sm-9">
                    <Select2
                      options={supplier_type}
                      placeholder={value?.type}
                      onChange={changeHandler}
                      name="supplier_type"
                    />
                  </div>
                </div>

                <TextInput
                  label="Bank Acc"
                  value={value?.bank_acc_number}
                  placeholder="Bank Acc"
                  onChange={changeHandler}
                  name="bank_acc_number"
                  type="text"
                />
                <TextInput
                  label="Bank Name"
                  value={value?.bank_name}
                  placeholder="Bank Name"
                  onChange={changeHandler}
                  name="bank_name"
                  type="text"
                />
                <TextInput
                  label="Tax ID"
                  value={value?.tax_id}
                  placeholder="Tax ID"
                  onChange={changeHandler}
                  name="tax_id"
                  type="text"
                />
                <TextInput
                  label="Address"
                  value={value?.address}
                  placeholder="Address"
                  onChange={changeHandler}
                  name="supplier_address"
                  type="text"
                />
                <TextInput
                  label="Cell Number"
                  value={value?.contact_number}
                  placeholder="Cell Number"
                  onChange={changeHandler}
                  name="contact_number"
                  type="text"
                />
                <div className="mb-3 row">
                  <Label text="Description" />
                  <div className="col-sm-9">
                    <Textarea
                      className="textarea form-control"
                      defaultValue={value?.desciption}
                      id="my-textarea"
                      onChange={changeHandler}
                      placeholder={value?.description}
                      name="description"
                    />
                  </div>
                </div>
                {/* <TextInput label="Created By" placeholder="Title" onChange={changeHandler} name="created_by" type="number" /> */}
                <div className="mb-3 row">
                  <Label text="Active/In Active" />
                  <div className="col-sm-9">
                    <Switch
                      onChange={() => setStatus(!status)}
                      checked={status}
                    />
                  </div>
                </div>
                <div className="p-3 border-top">
                  <div className="text-end">
                    <Button className="btn-info">Save</Button>

                    <Button className="btn-dark">Cancel</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
