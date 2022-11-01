import * as moment from 'moment';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import { FaBeer, FaPlus } from 'react-icons/fa';

// import { Container, Button as FButton } from 'react-floating-action-button'
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { FloatingButton } from "../../../../components"
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import { DeleteIcon } from '../../../../components';
import { EditIcon } from '../../../../components';
import { RadioButton } from '../../../../components';
import { ViewIcon } from '../../../../components';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';
import Switch from "react-switch";
import { TextInput } from '../../../../components';
import { Select2 } from '../../../../components';
import { Label } from '../../../../components';
import Textarea from 'react-expanding-textarea';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import { valueContainerCSS } from 'react-select/dist/declarations/src/components/containers';
import { PdfIcon } from '../../../../components';
import { PDFViewer } from '@react-pdf/renderer';
import PropagateLoading from '../../../../components/PropagateLoading';


//Create Component
const CreateForm = ({ onSubmit, loading }) => {

  const { http } = Axios();

  const [tower, setTower] = useState({
    name: "",
    description: "",
    tower_status: 1
  });
  const [value, setValue] = useState([]);
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState<boolean>(true);
  const [adate, setADate] = useState([{

    cdate: new Date(),
    inv_created_date: "",
    inv_date: "",
    updated_at: "",
    updated_by: "",
    created_by: "",
    created_at: "",
  }]);

  /**Date Formation  Anwar Part*/
  const [cdate, setCDate] = useState(new Date());
  const [inv_created_date, setInv_created_date] = useState(new Date());
  const [inv_date, setInv_date] = useState(new Date());
  const [updated_at, setUpdated_at] = useState(new Date());
  const [updated_by, setUpdated_by] = useState(new Date());
  const [created_by, setCreated_by] = useState(new Date());
  const [created_at, setreated_at] = useState(new Date());
  /**Date Formation Anwar Part */


  const submit = async () => {
    // console.log(value)
    // console.log(inv_created_date)
    // console.log(inv_date)
    // console.log(updated_at)

    let body: any = {}
    body = {
      action: "createSupplierInvoice",
      suplier_id: value.supplier_id,
      invoice_remarks: value.invoice_remarks,
      amount: value.amount,
      invoice_number: value.invoice_number,
      invoice_ref: value.invoice_ref,
      date: cdate,
      total_item_qty: value.total_item_qty,
      inv_created_date: inv_created_date,
      isReturned: Number(status),
      status2: Number(status2),
      return_type: value.return_type,
      inv_date: inv_date,
      updated_at: updated_at,
      updated_by: updated_by,
      created_by: created_by,
      created_at: created_at
    }
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
      body
    );


  }

  // new Date('1976-04-19T12:59-0500');
  // (e)=>{setADate([...adate, {cdate:new Date(e)}])}

  const handleChange = (e: any) => {

    // console.dir((e.toDateString()))
    // console.log  (moment(e.toDateString()).format("M/D/YYYY"))


    e.name == 'supplier_id' || e.name == "return_type" ? setValue({ ...value, [e.name]: e.value }) :
      setValue({ ...value, [e.target.name]: e.target.value })
  }

  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const handleDateChange = () => {

  }

  let dataset = { ...tower, action: "createTower" }

  const option = [
    { value: '1', label: 'Supplier1', name: 'supplier_id' },
    { value: '2', label: 'Supplier2', name: "supplier_id" },
    { value: '3', label: 'Supplier3', name: "supplier_id" },
    { value: '4', label: 'Supplier4', name: "supplier_id" },
    { value: '5', label: 'Supplier4', name: "supplier_id" },
    { value: '6', label: 'Supplier5', name: "supplier_id" },
    { value: '7', label: 'Supplier6', name: "supplier_id" },
    { value: '8', label: 'Supplier7', name: "supplier_id" },
    { value: '9', label: 'Supplier8', name: "supplier_id" },
    { value: '10', label: 'Supplier9', name: "supplier_id" },
    { value: '11', label: 'Supplier10', name: "supplier_id" },
    { value: '12', label: 'Supplier11', name: "supplier_id" },
    { value: '13', label: 'Supplier12', name: "supplier_id" },
  ];


  const options = [
    { value: '1', label: '1', name: 'return_type' },
    { value: '2', label: '2', name: "return_type" },
    { value: '3', label: '3', name: "return_type" },
  ];



  let formData = new FormData();

  // formData.append('action', "");
  // formData.append('invoice_number', invoice_number);
  // formData.append('invoice_remarks', invoice_remarks);
  // formData.append('amount', amount)
  // formData.append('status', status)



  return (
    <Form>

      <TextInput label="Invoice Number" placeholder="Invoice Number" style={{ width: "90%" }} onChange={handleChange} name="invoice_number" />

      <div className="mb-3 row">
        <Label text="Supplier Name" />
        <div className="col-sm-9">
          <Select2 options={option} onChange={handleChange} />
        </div>
      </div>
      <TextInput label="Supplier Invoice Ref" placeholder="Invoice Ref..." style={{ width: "90%" }} onChange={handleChange} name="invoice_ref" />
      <div className="mb-3 row">
        <Label text="Remarks" />
        <div className="col-sm-9">
          <Textarea
            className="textarea form-control"
            // defaultValue="Write Descriptions..."
            id="my-textarea"
            onChange={handleChange}
            placeholder="Remarks..."
            name="invoice_remarks"
          />
        </div>
      </div>
      <div className="mb-3 row">
        <Label text="Amount" />
        <div className="col-sm-9">
          <input type="text" placeholder="Enter Amount" className='form-control' name="amount" onChange={handleChange} />
        </div>
      </div>

      <div className="mb-3 row">
        <Label text="Date" />
        <div className="col-sm-9">
          <DatePicker selected={cdate} className="form-control dateInput" onChange={(date: Date) => setCDate(date)} />
        </div>
      </div>


      <div className="mb-3 row">
        <Label text="Invoice created Date" />
        <div className="col-sm-9">

          <DatePicker selected={inv_created_date} className="form-control dateInput" onChange={(date: Date) => setInv_created_date(date)} />

        </div>
      </div>



      <div className="mb-3 row">
        <Label text="Invoice Date" />
        <div className="col-sm-9">
          <DatePicker selected={inv_date} className="form-control dateInput" onChange={(date: Date) => setInv_date(date)} />
        </div>
      </div>

      <div className="mb-3 row">
        <Label text="Total item Quantity" />
        <div className="col-sm-9">
          <Form.Control type="number" onChange={handleChange} name="total_item_qty" placeholder='Enter total item Quantity' />
        </div>
      </div>
      <div className="mb-3 row">
        <Label text="IsReturned" />
        <div className="col-sm-9">
          <div className="col-sm-9">
            <Switch name="isReturned" onChange={() => setStatus(!status)} checked={status} />
          </div>
        </div>
      </div>


      {/*
    <div className="mb-3 row">
        <Label text="Return Type"/>
            <div className="col-sm-9">

            <Form.Select aria-label="Default select example"  name="return_type"  >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>



            </div>
    </div> */}


      <div className="mb-3 row">
        <Label text="Return Type" />
        <div className="col-sm-9">
          <Select2 options={options} onChange={handleChange} />
        </div>
      </div>


      <div className="mb-3 row">
        <Label text="Return Amount" />
        <div className="col-sm-9">
          <input type="text" placeholder='Enter Return Amount' name="return_amount" className='form-control' onChange={handleChange} />
        </div>
      </div>
      <div className="mb-3 row">
        <Label text="Updated At" />
        <div className="col-sm-9">
          <DatePicker selected={updated_at} className="form-control dateInput" onChange={(date: Date) => setUpdated_at(date)} />
        </div>
      </div>

      <div className="mb-3 row">
        <Label text="Updated By" />
        <div className="col-sm-9">
          <DatePicker selected={updated_by} className="form-control dateInput" onChange={(date: Date) => setUpdated_by(date)} />
        </div>
      </div>


      <div className="mb-3 row">
        <Label text="Updated Count" />
        <div className="col-sm-9">
          X
        </div>
      </div>


      <div className="mb-3 row">
        <Label text="Created by" />
        <div className="col-sm-9">
          <DatePicker selected={created_by} className="form-control dateInput" onChange={(date: Date) => setCreated_by(date)} />
        </div>
      </div>

      <div className="mb-3 row">
        <Label text="Created At" />
        <div className="col-sm-9">
          <DatePicker selected={created_at} className="form-control dateInput" onChange={(date: Date) => setreated_at(date)} />
        </div>
      </div>



      <div className="mb-3 row">
        <Label text="Status" />
        <div className="col-sm-9">

          <div className="col-sm-9">
            <Switch onChange={() => setStatus2(!status2)} checked={status2} />
          </div>


        </div>
      </div>

      <Button variant="primary" className="shadow rounded" disabled={loading} style={{ marginTop: "5px" }} type="button" onClick={submit} block>
        Create
      </Button>
    </Form>
  );
};

//View component
const ViewForm = ({ supplierId }) => {
  const { http } = Axios();

  const [supplifyInfo, setSupplyInfo] = useState([]);

  const [invoice, setInvoice] = useState([]);

  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierNamePending, setSupplierNamePending] = useState(true);
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [supplierInfoloading, setSupplierInfoLoading] = useState(true);
  const [initialLoading, setInitailLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0)

  // const fetchSupplierDetails = async () => {
  //   setSupplierDetails([])
  //   setSupplierInfoLoading(true)
  //   await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, { action: "getSupplierByID", id: id })
  //     .then((res) => {
  //       setSupplierDetails(res?.data?.data);
  //       setSupplierInfoLoading(false)
  //     });
  // }
  const getInvoiceDetails = async () => {
    let body: any = {}
    body = {
      action: "getInvoiceDetails",
      supplier_invoice_id: supplierId
      // action: "getItemDetailsByID",
      // id:supplierId
    }

    if (!invoice.length) {
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, body)
        .then((res) => {
          setInvoice(res?.data?.data)
          setTotalAmount(parseInt(res?.data?.data[0]?.totalAmount))
          setInitailLoading(false)
        });
    }
  }

  const getSuppliers = async () => {
    let body: any = {}
    body = {
      action: "getInvoiceByID",
      id: supplierId
    }
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
      body
    ).then(result => {
      setSupplyInfo(result.data.data);
      setSupplierInfoLoading(false)
    });

  }

  useEffect(() => {
    getSuppliers()
    getInvoiceDetails()
  }, [])

  console.log("loading :" + supplierInfoloading);
  return (
    <div >
      <div className="col-md-12">
        <div className="p-3">
          <div className="border-bottom title-part-padding">
            <h4 className="card-title mb-0">
              <strong className='fw-bolder'>
                Supply Info
              </strong>
            </h4>
          </div>
          <div className="p-5">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="table-responsive " style={{ minHeight: "400px", overflowX: "hidden" }}>
                {/* <TextInput type="number" label="Supplier Inv No" name="supplierInvoiceNumber" value={supplierInv} placeholder="Supplier Invoice Number" required onChange={(e) => setSupplierInv(e.target.value)} /> */}
                <div className="mb-3 row">
                </div>
                <div>
                  {supplifyInfo?.map((info) => {
                    return (
                      <div className='text-center my-3'>
                        <div className='mb-3'>
                          <div>
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Name: </span>{info.supplier_name}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Supplier ID: </span>{info.supplier_id}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Supplier Invoice: </span>{info.supplier_invoice}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Total Amount: </span>{info.total_amount}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Total Item Quantity: </span>{info.total_item_qty}</span>&nbsp;
                          </div>
                          <div className='mt-3'>
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Remarks: </span>{info.remarks}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Updated at: </span>{info.updated_at}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Created at: </span>{info.created_at}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Created by: </span>{info.created_by}</span>&nbsp;
                            <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>status: </span>{info.status}</span>&nbsp;
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {supplierInfoloading && <>
                    <>
                      <div className="my-3 text-center mt-5">
                        <div className="my-3 text-center">
                          <PropagateLoading />
                        </div>
                      </div>
                    </>
                  </>}
                  <div className='mt-5'>
                    <div className="border-bottom title-part-padding">
                      <h4 className="card-title mb-0">
                        <strong className='fw-bolder'>
                          All items
                        </strong>
                      </h4>
                    </div>
                    <div className="table-responsive">
                      <table
                        id="multi_col_order"
                        className="table table-striped table-bordered display"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Item Name</th>
                            <th>Remarks</th>
                            <th>Unit price</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice?.map((item, index) => (
                            <>
                              {item.itemId !== null && (
                                <tr key={index}>
                                  <td>{item.id}</td>
                                  <td>{item.itemName}</td>
                                  <td>{item.item_remarks}</td>
                                  <td>{item.unitPrice}</td>
                                  <td>{item.item_qty}</td>
                                </tr>
                              )}
                            </>
                          ))}

                        </tbody>

                      </table>

                      {!!totalAmount &&
                        <>
                          <hr />
                          <div className='text-end fw-bold'>Total Amount: <span className='me-3'>{totalAmount}</span></div>
                        </>}
                      {initialLoading && <div className="my-5 mx-3 text-center">
                        <PropagateLoading />
                      </div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


//Delete component
const DeleteComponent = ({ onSubmit, supplierId, pending }) => {

  const { http } = Axios();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);


  const fetchSupplierInfo = useCallback(async () => {
    let isSubscribed = true;
    setLoading(true)
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, { action: "getSupplierDetailsByID", id: supplierId })
      .then((res) => {
        if (isSubscribed) {
          console.log(res?.data?.data[0].supplier_name);
          setName(res?.data?.data[0].supplier_name)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log('Something went wrong !')
        setLoading(false)
      });

    return () => isSubscribed = false;

  }, [supplierId]);

  useEffect(() => {
    fetchSupplierInfo();
  }, [fetchSupplierInfo])

  let dataSet = { id: supplierId, action: "deleteInvoice" }
  return (
    <>
      <Modal.Body>
        <Modal.Title>Are you sure to delete {name}'s Invoice ?</Modal.Title>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="danger" disabled={pending || loading} onClick={() => onSubmit(dataSet)}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};


/** View Data List Part Supplier Invoice */

export default function ListView() {

  const { http } = Axios();

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);


  //Create Tower
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //create floor form
  const submitForm = async (items) => {
    let isSubscribed = true;
    setLoading(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`, items)
      .then((res) => {
        if (isSubscribed) {
          notify("success", "successfully Added!");
          handleClose();
          setLoading(false);

        }

      })
      .catch((e) => {
        const msg = e?.response?.data?.response;

        if (typeof (msg) == 'string') {
          notify("error", `${msg}`);
        }
        else {
          if (msg?.name) {
            notify("error", `${msg?.name?.Name}`);
          }
          if (msg?.description) {
            notify("error", `${msg?.description?.Description}`);
          }

          console.log(e)

        }
        setLoading(false);
      });

    fetchItemList();

    return () => isSubscribed = false;
  }


  //Update Tower Modal form
  const [showVieweModal, setShowViewModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [supplierId, setSupllierId] = useState(null)

  const handleExit = () => setShowViewModal(false);

  const handleOpen = (supplierId) => {
    setShowViewModal(true);
    setSupllierId(supplierId)
  }

  //Update floor form
  const updateForm = async (formData) => {
    let isSubscribed = true;
    setPending(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`, formData)
      .then((res) => {
        if (isSubscribed) {
          notify("success", "successfully Updated!");
          handleExit();
          setPending(false);

        }

      })
      .catch((e) => {
        const msg = e?.response?.data?.response;

        if (typeof (msg) == 'string') {
          notify("error", `${msg}`);
        }
        else {
          if (msg?.name) {
            notify("error", `${msg?.name?.Name}`);
          }
          if (msg?.description) {
            notify("error", `${msg?.description?.Description}`);
          }

          //console.log(e)

        }
        setPending(false);
      });

    fetchItemList();

    return () => isSubscribed = false;
  }


  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);

  const handleOpenDelete = (supplier_Id) => {
    setShowDeleteModal(true);
    setSupllierId(supplier_Id);
  }


  //Delete Tower form

  const handleDelete = async (formData) => {
    console.log(formData)
    let isSubscribed = true;
    setPending(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, formData)
      .then((res) => {
        if (isSubscribed) {
          notify("success", "successfully deleted!");
          handleExitDelete();
          setPending(false);

        }
      })
      .catch((e) => {
        console.log('error delete !')
        setPending(false);
      });

    fetchItemList();

    return () => isSubscribed = false;
  }
  //Tower Floor Rooms data list
  const [itemList, setItemList] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      fetchItemList();
    });
    return () => clearTimeout(timeout);
  }, []);

  //Fetch List Data for datatable
  const data = itemList?.data;
  const fetchItemList = async () => {

    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, {
      action: "getAllSupplierInvoice",
    })
      .then((res) => {
        if (isSubscribed) {
          setItemList(res?.data);
          console.log(res?.data)
          setFilteredData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("Server Error ~!")
      });
    return () => isSubscribed = false;
  };
  const checkStatus = (status) => {
    /**
     * 1 => Paid
     * 2 => Overdue
     * 3 => Partial
     * 4 => Unpaid
     */
    if (status === 4) {
      return <span className='bg-success p-3 text-white fs-4 rounded-3' >Paid</span>
    }
    else if (status === 2) {
      return <span className='bg-danger p-3 text-white fs-4 rounded-3' >Overdue</span>
    }
    else if (status === 3) {
      return <span className='bg-warning p-3 text-white fs-4 rounded-3' >Partial</span>
    }
    else if (status === 1) {
      return <span className='bg-primary p-3 text-white fs-4 rounded-3' >Unpaid</span>
    }
    else {
      return <span></span>
    }
  }

  useEffect(() => {
    let controller = new AbortController();
    const result = data?.filter((item) => {
      if (item) {
        return item?.name?.toLowerCase().match(search.toLocaleLowerCase())
      }
    });

    setFilteredData(result);
    return () => controller.abort();
  }, [search]);

  const handlePdf = () => {

  }
  const [isOpen, setIsopen] = useState(false)
  const [selectedRowId, setSelectedRowId] = useState("")

  const actionButton = (supplier_Id) => {
    return <>
      {/* <FloatingButton isOpen={isOpen}
        setIsopen={selectedRowId === selectedRowId && setIsopen} fontSize={25}
        supplier_Id={supplier_Id}
        isOpen={supplier_Id === selectedRowId}
        onClick={() => { supplier_Id === selectedRowId ? setSelectedRowId(" ") : setSelectedRowId(supplier_Id) }}
        subIcon={[{ icon: <ViewIcon />, click: handleOpen },
        { icon: <Link href={`/modules/purchase/invoice/update/${supplier_Id}`}><span><EditIcon /></span></Link>, click: "" },
        { icon: <DeleteIcon />, click: handleOpenDelete }, { icon: <PdfIcon />, click: handlePdf }]}
      /> */}
      {/* <div className=''>ABCDEFGHIJKLMNOP</div> */}
      <ul className="action">
      {/* <li>
          <Link href={`#`}>
            <a onClick={() => handleOpen(supplier_Id)}>
              <ViewIcon />
            </a>
          </Link>
        </li> */}
        <li>
          <Link href={`/modules/purchase/invoice/details/${supplier_Id}`}>
            <a >
              <ViewIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/modules/purchase/invoice/update/${supplier_Id}`}>
            <a>
              <EditIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a onClick={() => handleOpenDelete(supplier_Id)}>
              <DeleteIcon />
            </a>
          </Link>
        </li>

        {/* <li>
          <Link href="#">
            <a onClick={() => handlePdf(supplier_Id)}>
              <PdfIcon />
            </a>
          </Link>
        </li> */}
      </ul>
    </>
  }

  const columns = [
    // {
    //   name: 'Status',
    //   selector: row => checkStatus(row.status),
    //   sortable: true,
    // },

    {
      name: 'Supplier Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Local Invoice',
      selector: row => row.local_invoice,
      sortable: true,
    },
    {
      name: 'Supplier Invoice',
      selector: row => row.supplier_invoice,
      sortable: true,
    },
    {
      name: 'Total Item',
      selector: row => row.total_item,
      sortable: true,
    },
    {
      name: 'Total Item Quantity',
      selector: row => row.total_item_qty,
      sortable: true,
    },
    {
      name: 'Total amount',
      selector: row => row.total_amount,
      sortable: true,
    },
    // {
    //   name: 'Updated At',
    //   selector: row => moment(row.updated_at).format('DD/MM/YYYY'),
    //   sortable: true,
    // },
    {
      name: 'Created At',
      selector: row => moment(row.created_at).format('DD/MM/YYYY'),
      sortable: true,
    },
    {
      name: 'Action',
      selector: row => actionButton(row.id),
      width: "220px"
    },
  ];


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow">

              <div className="d-flex border-bottom title-part-padding align-items-center">
                <div>
                  <h4 className="card-title mb-0">Supplier Invoice</h4>
                </div>
                <div className="ms-auto flex-shrink-0">
                  <Link href="/modules/purchase/invoice/inv-item" >
                    <Button
                      className="shadow rounded"
                      variant="primary"
                      type="button"
                      // onClick={handleShow}
                      block
                    >
                      Create Invoice
                    </Button>
                  </Link>

                  {/* Create Modal Form */}
                  {/* <Modal dialogClassName="modal-lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Create Supplier Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <CreateForm onSubmit={submitForm} loading={loading} />
                    </Modal.Body>
                  </Modal> */}
                  {/* End Create Modal Form */}

                  {/* View Modal Form */}
                  <Modal dialogClassName="modal-lg" show={showVieweModal} onHide={handleExit}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                      <ViewForm supplierId={supplierId} />
                    </Modal.Body>
                  </Modal>
                  {/* End Update Modal Form */}

                  {/* Delete Modal Form */}
                  <Modal show={showDeleteModal} onHide={handleExitDelete}>
                    <Modal.Header closeButton></Modal.Header>
                    <DeleteComponent onSubmit={handleDelete} supplierId={supplierId} pending={pending} />
                  </Modal>
                  {/* End Delete Modal Form */}

                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                      <input
                        type="text"
                        placeholder="search..."
                        className="w-25 form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    }
                    striped
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}