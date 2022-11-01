import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import RadioButton from "../../../components/elements/RadioButton";
import Select2 from "../../../components/elements/Select2";
import HeadSection from "../../../components/HeadSection";
import toast from "../../../components/Toast/index";
import Axios from "../../utils/axios";


export default function create() {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const router = useRouter();

  const { http } = Axios();

  //calender open
  const [dobOpen,setDobOpen] = useState(false);
  const [anniversaryOpen,setAnniversaryOpen] = useState(false);
  const [checkinOpen,setCheckinOpen] = useState(false);
  const [checkoutOpen,setCheckoutOpen] = useState(false);

  //Form validation
  const [validated, setValidated] = useState(false);

  const [customer, setCustomer] = useState({
    mobile: "",
    contact_type: "",
    title: "",
    fName: "",
    lName: "",
    gender: "male",
    birth_date: null,
    anniversary_date: null,
    nationality: "",

    country_id: "",
    state_id: "",
    city_id: "",
    countryData: [],
    stateData: [],
    cityData: [],

    pin_code: "",
    arrival_from: "",
    address: "",
    status: 1,

    custInfo: {},
  });


  const [bookingGrp, setBookingGrp] = useState({
    checkout_type: "",
    checkout_hour: null,
    date_from: null,
    date_to: null,
    booking_grp_status: 1,
  });

  //console.log(bookingGrp.date_from);

  const [customerBooking, setCustomerBooking] = useState({
    optionShow: true,
    room_type_id: null,
    room_category_id: null,
    room_id: "",
    adults:"",
    childs:"",
    allRooms: [],
  });

  // console.log(customerBooking.allRooms)

  const selected_country_options = {
    value: customer?.custInfo?.country?.id || "",
    label: customer?.custInfo?.country?.name || "select...",
  };
  const selected_state_options = {
    value: customer?.custInfo?.state?.id || "",
    label: customer?.custInfo?.state?.name || "select...",
  };
  const selected_city_options = {
    value: customer?.custInfo?.city?.id || "",
    label: customer?.custInfo?.city?.name || "select...",
  };

  //Set Customer
  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Set Customer booking group
  const ChangeCustBookingGrp = (e) => {
    setBookingGrp((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Set Customer booking group
  const ChangeCustBooking = (e) => {
    setCustomerBooking((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //get All countries data
  const getAllContries = async () => {
    let isSubscribed = true;
    await http
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`, {
        action: "allCountries",
      })
      .then((res) => {
        if (isSubscribed) {
          setCustomer((prev) => ({
            ...prev,
            countryData: res.data.data,
          }));
        }
      });

    return () => (isSubscribed = false);
  };

  useEffect(() => {
    getAllContries();
  }, []);

  const changeState = (e) => {
    if (e.value) {
      setCustomer((prev) => ({
        ...prev,
        country_id: e.value,
      }));
    }
  };

  const getStateById = useCallback(async () => {
    let isSubscribed = true;
    if (customer?.country_id) {
      await http
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`, {
          action: "getState",
          country_id: customer?.country_id,
        })
        .then((res) => {
          if (isSubscribed) {
            setCustomer((prev) => ({
              ...prev,
              stateData: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));
    }

    return () => (isSubscribed = false);
  }, [customer?.country_id]);

  useEffect(() => {
    getStateById();
  }, [getStateById]);

  const changeCity = (e) => {
    if (e.value) {
      setCustomer((prev) => ({
        ...prev,
        state_id: e.value,
      }));
    }
  };

  const getCityById = useCallback(async () => {
    let isSubscribed = true;
    if (customer?.state_id) {
      await http
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/location`, {
          action: "getCity",
          state_id: customer?.state_id,
        })
        .then((res) => {
          if (isSubscribed) {
            setCustomer((prev) => ({
              ...prev,
              cityData: res.data.data,
            }));
          }
        })
        .catch((err) => console.log(err));
    }

    return () => (isSubscribed = false);
  }, [customer?.state_id]);

  useEffect(() => {
    getCityById();
  }, [getCityById]);

  //fetching existing customer info
  const fetchCustomerInfo = useCallback(async () => {
    let isSubscribed = true;

    await http
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/customers/addNewCustomer`, {
        action: "customerInfo",
        mobile: customer?.mobile,
      })
      .then((res) => {
        if (isSubscribed) {
          //console.log(res.data.data?.country_id)
          if (res.data.data?.country_id != null) {
            setCustomer((prev) => ({
              ...prev,
              custInfo: res.data?.data,

              contact_type: res.data.data?.contact_type,
              title: res.data.data?.title,
              fName: res.data.data?.first_name,
              lName: res.data.data?.last_name,
              gender: res.data.data?.gender,
              birth_date: res.data.data?.dob,
              anniversary_date: res.data.data?.anniversary_date,
              nationality: res.data.data?.nationality,
              pin_code: res.data.data?.pin_code,
              arrival_from: res.data.data?.arrival_from,
              address: res.data.data?.address,
              gender: res.data.data?.gender,
              status: res.data.data?.status,

              country_id: res.data.data?.country_id,
              state_id: res.data.data?.state_id,
              city_id: res.data.data?.city_id,
            }));
          } else {
            setCustomer((prev) => ({
              ...prev,
              custInfo: {},
            }));
          }
        }
      })
      .catch((err) => {
        console.log("Something went wrong !");
      });

    return () => (isSubscribed = false);
  }, [customer?.mobile]);

  useEffect(() => {
    fetchCustomerInfo();
  }, [fetchCustomerInfo]);

  //All Room Types
  const [roomTypes, setRoomTypes] = useState([]);

  const fetchAllRoomTypes = async () => {
    let isSubscribed = true;
    await http
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`, {
        action: "allRoomTypes",
      })
      .then((res) => {
        if (isSubscribed) {
          setRoomTypes(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (isSubscribed = false);
  };

  //All Room Categories
  const [roomCategories, setRoomCategories] = useState([]);

  const RoomCategories = async () => {
    let isSubscribed = true;
    await http
      .post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,
        {
          action: "allRoomCategories",
        }
      )
      .then((res) => {
        if (isSubscribed) {
          setRoomCategories(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => (isSubscribed = false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAllRoomTypes();
      RoomCategories();
    });
    return () => clearTimeout(timeout);
  }, []);

  //Fetch all rooms by room types or room category
  const AllRoomsData = useCallback(async () => {
    let isSubscribed = true;

    await http
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`, {
        action: "roomsByTypesOrCategory",
        room_type_id: customerBooking?.room_type_id,
        room_category_id: customerBooking?.room_category_id,
      })
      .then((res) => {
        if (isSubscribed) {
          setCustomerBooking((prev) => ({
            ...prev,
            allRooms: res.data?.data,
          }));
        }
      })
      .catch((err) => {
        console.log("Something went wrong !");
      });

    return () => (isSubscribed = false);
  }, [customerBooking?.room_type_id, customerBooking?.room_category_id]);

  useEffect(() => {
    AllRoomsData();
  }, [AllRoomsData]);

  async function submitForm(e) {
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    e.preventDefault();


    let body = {
      ...customer,
      ...bookingGrp,
      ...customerBooking,
      action: "createCustomer",
    };
    let optionShow = true;
    let isSubscribed = true;
    await http
      .post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/app/customers/addNewCustomer`,
        body
      )
      .then((res) => {
        if (isSubscribed) {
          notify("success", `${res.data.response}`);
          document.querySelector("#customerForm").reset();
          setCustomer((prev) => ({
            ...prev,
            mobile: "",
            contact_type: "",
            title: "",
            fName: "",
            lName: "",
            gender: "male",
            birth_date: null,
            anniversary_date: null,
            nationality: "",

            country_id: "",
            state_id: "",
            city_id: "",

            pin_code: "",
            arrival_from: "",
            address: "",
            status: 1,

            custInfo: {},
          }));

          //set empty Booking Group
          setBookingGrp((prev) => ({
            ...prev,
            checkout_type: "",
            checkout_hour: "",
            date_from: null,
            date_to: null,
            booking_grp_status: 1,
          }));

          //set empty customer Booking
          setCustomerBooking((prev) => ({
            ...prev,
            optionShow:false,
            room_type_id: null,
            room_category_id: null,
            room_id: "",
            adults:"",
            childs: "",
            allRooms: [],
          }));

          setValidated(false);
        }
      })
      .catch((e) => {
        
        const msg = e.response?.data?.response;

        if (typeof e.response?.data?.response == "string") {
          notify("error", `${e.response.data.response}`);
        } else {
          if (msg?.birth_date) {
            notify("error", `Please Enter Date of Birth !`);
          }

          if (msg?.country_id) {
            notify("error", `Country must not be empty!`);
          }
          if (msg?.state_id) {
            notify("error", `State must not be empty!`);
          }
          if (msg?.city_id) {
            notify("error", `City must not be empty!`);
          }
          if (msg?.room_category_id) {
            notify("error", `Room category not be empty!`);
          }
          if (msg?.room_id) {
            notify("error", `Select room number!`);
          }
          if (msg?.checkout_hour) {
            notify("error", `Enter Check-out hour !`);
          }
          if (msg?.adults) {
            notify("error", `Enter no.of adults !`);
          }
          if (msg?.childs) {
            notify("error", `Enter no.of childs !`);
          }

          if (msg?.date_from) {
            notify("error", `Please enter Check-in date !`);
          }
        }

        setValidated(true);
      });

    return () => (isSubscribed = false);
  }

  const theme = createTheme({

    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },

})

  return (
    <>
      <HeadSection title="Add New Customer" />

      <div className="container-fluid ">
        <Form onSubmit={submitForm} id="customerForm" noValidate validated={validated}>
          <h4>Add New Customer</h4>
          <div className="row">
            <div className="col-12 col-md-7">
              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">
                        Customer Info
                      </h4>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label >Mobile Number <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter Mobile Number"
                            name="mobile"
                            value={customer?.mobile}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Contact Type <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="contact_type"
                            value={customer?.contact_type}
                            onChange={handleChange}
                            required
                          >
                            <option disabled value="">
                              Select Contact Type
                            </option>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-4">
                          <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="title"
                            value={customer?.title}
                            onChange={handleChange}
                            required
                          >
                            <option disabled value="">
                              Select Title
                            </option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="others">Others</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2 col-4">
                          <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            name="fName"
                            value={customer?.fName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-4">
                          <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            name="lName"
                            value={customer?.lName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                        <div className="row">
                          <div className="col-12">
                            <div className=" align-content-start flex-gap">
                              <div>
                                <RadioButton
                                  label="Male"
                                  name="gender"
                                  value="male"
                                  checked={customer?.gender == "male"}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <RadioButton
                                  label="Female"
                                  name="gender"
                                  value="female"
                                  checked={customer?.gender == "female"}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <RadioButton
                                  label="Other"
                                  name="gender"
                                  value="other"
                                  checked={customer?.gender == "other"}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>

                      <div className="row mb-2">
                        <Form.Group className="mb-2 col-6">
                  
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            size={1}
                            label="Date of Birth"
                            open={dobOpen}
                            onClose={() => setDobOpen(false)}
                            value={customer?.birth_date}
                            inputFormat="yyyy-MM-dd"
                            onChange={(event) => {
                              setCustomer(prev=>({...prev, birth_date:event}));
                            }}
                            renderInput={(params) =>
                              <ThemeProvider theme={theme}> 
                                <TextField onClick={()=>setDobOpen(true)} fullWidth={true} size='small' {...params} required/>
                              </ThemeProvider>
                            }
                          />
                        </LocalizationProvider>

                        </Form.Group>

                        <Form.Group className="mb-2 col-6">

                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Anniversary Date"
                              open={anniversaryOpen}
                              onClose={() => setAnniversaryOpen(false)}
                              value={customer?.anniversary_date}
                              inputFormat="yyyy-MM-dd"
                              onChange={(event) => {
                                setCustomer(prev=>({...prev, anniversary_date:event}));
                              }}
                              renderInput={(params) => 
                                <ThemeProvider theme={theme}> 
                                  <TextField onClick={()=>setAnniversaryOpen(true)} fullWidth={true} size='small' {...params} required />
                                </ThemeProvider>
                              }
                            />
                          </LocalizationProvider>
                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Nationality"
                            name="nationality"
                            value={customer?.nationality}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        {/* Show country or selected country */}
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                          {customer?.custInfo?.country?.id !== undefined && (
                            <>
                              <Select2
                                options={customer.countryData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                defaultValue={selected_country_options}
                                onChange={changeState}
                              />
                            </>
                          )}
                          {customer?.custInfo?.country?.id === undefined && (
                            <>
                              <Select2
                                options={customer.countryData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                onChange={changeState}
                              />
                            </>
                          )}
                        </Form.Group>
                      </div>

                      {/* show state city or selected */}
                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>State <span className="text-danger">*</span></Form.Label>
                          {customer?.custInfo?.state?.id && (
                            <>
                              <Select2
                                options={customer.stateData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                defaultValue={selected_state_options}
                                onChange={changeCity}
                              />
                            </>
                          )}
                          {customer?.custInfo?.state?.id === undefined && (
                            <>
                              <Select2
                                options={customer.stateData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                onChange={changeCity}
                              />
                            </>
                          )}
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>City <span className="text-danger">*</span></Form.Label>
                          {customer?.custInfo?.city?.id && (
                            <>
                              <Select2
                                options={customer.cityData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                defaultValue={selected_city_options}
                                onChange={(e) =>
                                  setCustomer((prev) => ({
                                    ...prev,
                                    city_id: e.value,
                                  }))
                                }
                              />
                            </>
                          )}

                          {customer?.custInfo?.city?.id === undefined && (
                            <>
                              <Select2
                                options={customer.cityData.map(
                                  ({ id, name }) => ({ value: id, label: name })
                                )}
                                onChange={(e) =>
                                  setCustomer((prev) => ({
                                    ...prev,
                                    city_id: e.value,
                                  }))
                                }
                              />
                            </>
                          )}
                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Pin Code <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Pin Code"
                            name="pin_code"
                            value={customer?.pin_code}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Arrival From <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Where did come from?"
                            name="arrival_from"
                            value={customer?.arrival_from}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </div>

                      <Form.Group className="mb-2">
                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter Full Address"
                          name="address"
                          value={customer?.address}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter full address.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="">
                        <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                        <div className="row">
                          <div className="col-12">
                            <div className=" align-content-start flex-gap">
                              <div>
                                <RadioButton
                                  label="Active"
                                  name="status"
                                  value="1"
                                  checked={customer?.status == "1"}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <RadioButton
                                  label="Inactive"
                                  name="status"
                                  value="0"
                                  checked={customer?.status == "0"}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">Payment Info</h4>

                      <Form.Group className="mb-2">
                        <Form.Check
                          type="checkbox"
                          name="vip"
                          label="VIP"
                          onChange={handleChange}
                          // required
                          // feedbackType="invalid"
                        />
                      </Form.Group>
                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Discount (%)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Discount in %"
                            name="discount"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Discount Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Discount Amount"
                            name="discount_amount"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Select Discount</Form.Label>
                          <Form.Select
                            name="discount_option"
                            onChange={handleChange}
                          >
                            <option disabled>Select Discount</option>
                            <option value="reason">Reason</option>
                            <option value="offer">Offer</option>
                            <option value="promotion">Promotion</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Payment Mode</Form.Label>
                          <Form.Select
                            name="payment_mode"
                            onChange={handleChange}
                          >
                            <option disabled>Select Payment Mode</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="bank">Bank</option>
                          </Form.Select>
                        </Form.Group>
                      </div>

                      <div className="row">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Payment Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Payment Amount"
                            name="payment_amount"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Payment Reference</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Payment Reference"
                            name="payment_ref"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </div>

                      <Form.Group className="mb-2">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Enter Comments..."
                          name="comments"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-5">
              <div className="row">
                <div className="col-12">
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title border-bottom">Room Details</h4>
                      <Form.Group className="mb-2">
                        <Form.Label>Select Room Type <span className="text-danger">*</span></Form.Label>
                        {customerBooking.optionShow &&
                        <>
                        <Select2
                          options={roomTypes.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          }))}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_type_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>
                        }

                        {!customerBooking.optionShow &&
                        <>
                        <Select2
                          options={roomTypes.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          }))}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_type_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>
                        }
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Select Room Category <span className="text-danger">*</span></Form.Label>
                        { customerBooking.optionShow &&
                        <>
                        <Select2
                          options={roomCategories.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          }))}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_category_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>

                        }
                        { !customerBooking.optionShow &&
                        <>
                        <Select2
                          options={roomCategories.map(({ id, name }) => ({
                            value: id,
                            label: name,
                          }))}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_category_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>

                        }
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Select Room Number <span className="text-danger">*</span></Form.Label>
                        {customerBooking.optionShow &&
                        <>
                        <Select2
                          options={customerBooking?.allRooms.map(
                            ({ id, room_no }) => ({ value: id, label: room_no })
                          )}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>
                        }

                        {!customerBooking.optionShow &&
                        <>
                        <Select2
                          options={customerBooking?.allRooms.map(
                            ({ id, room_no }) => ({ value: id, label: room_no })
                          )}
                          onChange={(e) =>
                            setCustomerBooking((prev) => ({
                              ...prev,
                              room_id: e.value,
                            }))
                          }
                          required={true}
                        />
                        </>
                        }
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Room Tarrif</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Room Tarrif"
                          name="room_tarrif"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <h4 className="card-title border-bottom">Guest Info</h4>
                      <div className="row mb-3">
                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Number of Adults <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name="adults"
                            min="0"
                            value={customerBooking?.adults}
                            placeholder="Enter number of adults"
                            onChange={ChangeCustBooking}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 col-6">
                          <Form.Label>Number of Childrens <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="number"
                            name="childs"
                            min="0"
                            value={customerBooking?.childs}
                            placeholder="Enter Number of childrens"
                            onChange={ChangeCustBooking}
                            required
                          />
                        </Form.Group>
                      </div>

                      <h4 className="card-title border-bottom">
                        Check-in/Check-out Info
                      </h4>

                      <Form.Group className="mb-3">
                        <Form.Label>Check-Out-Time <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          value={bookingGrp.checkout_type}
                          name="checkout_type"
                          onChange={ChangeCustBookingGrp}
                          required
                        >
                          <option disabled value="">
                            Select Check-Out Time
                          </option>
                          <option value="24hrs">24 Hours</option>
                          <option value="12pm">Fixed time (12PM)</option>
                          <option value="hourly">Hourly</option>
                        </Form.Select>
                      </Form.Group>
                      {bookingGrp.checkout_type &&
                      bookingGrp.checkout_type === "hourly" ? (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>Set Hours <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              placeholder="Set Hours"
                              name="checkout_hour"
                              value={bookingGrp?.checkout_hour}
                              onChange={ChangeCustBookingGrp}
                              
                            />
                          </Form.Group>
                        </>
                      ) : (
                        <></>
                      )}

                      <div className="row">

                        <Form.Group className={bookingGrp.checkout_type !== 'hourly' ? 'mb-2 col-6': 'mb-2 col-12'}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Check-in"
                                open={checkinOpen}
                                onClose={() => setCheckinOpen(false)}
                                value={bookingGrp?.date_from}
                                inputFormat="yyyy-MM-dd"
                                onChange={(event) => {
                                  setBookingGrp(prev=>({...prev, date_from:event}));
                                }}
                                renderInput={(params) => 
                                  <ThemeProvider theme={theme}> 
                                    <TextField onClick={()=>setCheckinOpen(true)} fullWidth={true} size='small' {...params} required/>
                                  </ThemeProvider>
                                }
                              />
                            </LocalizationProvider>
                        </Form.Group>

                      {
                        bookingGrp.checkout_type !== 'hourly' &&
                        <>
                        <Form.Group className="mb-2 col-6">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Check-Out"
                                open={checkoutOpen}
                                onClose={() => setCheckoutOpen(false)}
                                value={bookingGrp?.date_to}
                                inputFormat="yyyy-MM-dd"
                                onChange={(event) => {
                                  setBookingGrp(prev=>({...prev, date_to:event}));
                                }}
                                renderInput={(params) => 
                                  <ThemeProvider theme={theme}> 
                                    <TextField onClick={()=>setCheckoutOpen(true)} fullWidth={true} size='small' {...params} required/>
                                  </ThemeProvider>
                                }
                              />
                            </LocalizationProvider>
                        </Form.Group>

                        </>
                      }
                      </div>


                      <Form.Group className="">
                        <Form.Label>Status</Form.Label>
                        <div className="row">
                          <div className="col-12">
                            <div className=" align-content-start flex-gap">
                              <div>
                                <RadioButton
                                  label="Active"
                                  name="booking_grp_status"
                                  value="1"
                                  checked={
                                    bookingGrp?.booking_grp_status == "1"
                                  }
                                  onChange={ChangeCustBookingGrp}
                                />
                              </div>
                              <div>
                                <RadioButton
                                  label="Inactive"
                                  name="booking_grp_status"
                                  value="0"
                                  checked={
                                    bookingGrp?.booking_grp_status == "0"
                                  }
                                  onChange={ChangeCustBookingGrp}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="text-end ">
                <Button type="submit" variant="contained" color="warning">
                  Add New Customer
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
