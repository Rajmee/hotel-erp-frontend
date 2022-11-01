import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button } from "react-bootstrap";
import { Label } from '../../../../components';
import { Select2 } from '../../../../components';
import { TextInput } from '../../../../components';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';
import Link from 'next/link';
import { DeleteIcon } from '../../../../components';
import { EditIcon } from '../../../../components';
import PropagateLoading from '../../../../components/PropagateLoading';


const CreateInvoice = () => {

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const { http } = Axios();
  const router = useRouter();
  const [date, setDate] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [disType, setDisType] = useState();
  const [disTotalType, setDisTotalType] = useState();
  const [disPercentage, setDisPercentage] = useState("");
  const [totalDisPercentage, setTotalDisPercentage] = useState("");
  const [totalDisRate, setTotalDisRate] = useState("");
  const [disRate, setDisRate] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const [getItems, setItems] = useState("");
  const [totalRemarks, setTotalRemarks] = useState("");
  const [supplier, setSupplier] = useState([]);       /**Getting Suppliers */

  const [allSupplier, setAllSupplier] = useState([]);       /**Getting Suppliers */
  const items_options = getItems.data;

  /** Category Part*/
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryData, setCategoryData] = useState();
  const [itemCode, setItemCode] = useState("");
  const [itemCodeName, setItemCodeName] = useState("");
  const [item_obj, setItemObj] = useState();
  const [getItemCategories, setItemCategories] = useState("");
  const categories_options = getItemCategories.data;
  /**End Category Part*/

  const [SupplierInvoiceNumber, setSupplierInvoiceNumber] = useState();
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [localInv, setLocalInv] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [catPending, setCatPending] = useState(true);

  // let item_name_options = { value: item_obj?.id || '', label: item_obj?.name || 'Select...' };
  let item_name_options = { value: itemId || '', label: itemName || 'Select...' };
  var options = [];


  const [invoice, setInvoice] = useState([]);
  const [ind, setInd] = useState(1)

  const reset = () => {
    setRemarks("");
    setTotal("");
    setQuantity("")
    setUnitPrice("")
    setItemCode("");
    setItemId("");
    setItemCodeName("")
    setCatPending(true)
    setItemName("")
    setItemId("")
  }

  const StoringData = (e) => {
    e.preventDefault();
    setGrandTotal(grandTotal + total);
    // setQuantity("")
    // e.target.reset();
    setInd(() => ind + 1)

    setInvoice([...invoice,
    {
      id: ind,
      unitPrice: unitPrice,
      qty: quantity,
      unitPrice: unitPrice,
      total: total,
      itemId: itemId,
      itemName: itemName,
      remarks: remarks,
      itemCode: itemCode,

      itemCodeName: itemCodeName,
      itemName: itemName
    }
    ])
    reset()
  }

  const [objedit, setObjEdit] = useState(false);
  const [arrayIndex, setArrayIndex] = useState();
  const [editId, setEditId] = useState();
  const [status, setStatus] = useState<boolean>(false)

  const selected_category_options = { value: categoryId, label: categoryName };
  const selected_code_options = { value: itemCode, label: itemCodeName };
  const [selected_item_options, setSelected_item_options]: any = useState({ value: itemId, label: itemName });
  const [pending, setPending] = useState(true);

  const [tempTotal, setTempTotal] = useState(0);

  async function editobj(index, editId) {
    console.log(invoice[index]);
    setObjEdit(true)
    setArrayIndex(index)
    setEditId(editId)
    setQuantity(invoice[index]?.qty)
    setRemarks(invoice[index]?.remarks)
    setItemId(invoice[index]?.itemId)
    setItemName(invoice[index]?.itemName)
    setCategoryId(invoice[index]?.catId)
    setCategoryName(invoice[index]?.catName)
    setItemCode(invoice[index]?.itemCode)
    setItemCodeName(invoice[index]?.itemCodeName)
    setUnitPrice(invoice[index].unitPrice)
    setTotal(invoice[index].total);
    setItemId(invoice[index].itemId);
    setTempTotal(invoice[index].total);
    // setSelected_item_options({ value: itemId, label: itemName })

    // console.log(selected_category_options);
    //editedUnitPrice = invoice[index].unitPrice;
    //console.log(editedUnitPrice)
    //console.log();
  }

  const UpdateData = (e: any) => {
    e.preventDefault();
    const newState = invoice.map(obj => {
      if (obj.id === editId) {
        if (item_name_options.value == '') {
          return { ...obj, itemId: itemId, itemName: itemName, remarks: remarks, qty: quantity, unitPrice: unitPrice, total: total };
        }
        else {
          return { ...obj, itemId: item_name_options.value, itemName: item_name_options.label, remarks: remarks, qty: quantity, unitPrice: unitPrice, total: total };
        }
      }
      return obj;
    });

    setInvoice(newState);
    e?.target.reset();
    console.log(e.target);
    setObjEdit(false)
    setGrandTotal(grandTotal - tempTotal + total);
    reset()
  }

  async function removeObjectFromArray(id: Number) {
    setInvoice(current =>
      current.filter(obj => {
        return obj.id !== id;
      }),
    );
  };

  const changeCategory = (e) => {
    if (e.value) {
      setCategoryId(e.value);
      setCategoryName(e.label);
    }
  }
  const changeItem = (e: any) => {
    if (e.value) {
      setItemCode(e.value)
      setItemCodeName(e.label)
    }
  }
  async function submitForm(e) {
    e.preventDefault();
    if (supplierName && SupplierInvoiceNumber) {
      setLoading(true)
      let body = {
        action: "createSupplierInvoiceItem",
        invoice: invoice,
        status: true,
        localInv: localInv,
        totalRemarks: totalRemarks,
        inv_id: SupplierInvoiceNumber,
        inv_date: date,
        supplierID: supplierID,
        supplierName: supplierName
      }

      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, body)
        .then((res) => {
          setLoading(false)
          notify("success", "successfully Added!");
          setInvoice([])
        })
      setGrandTotal(0)
      router.push("/modules/purchase/invoice")
      console.log(body)
    }
    else {
      notify("error", "fields must not be empty");
    }
  }

  const handleTotal = (e) => {
    if (e.target.name == 'unitCost') {
      setUnitPrice(e.target.value)
      setTotal(Number(e.target.value) * Number(quantity));
      setTotalCost(Number(e.target.value) * Number(quantity));
    }
    else {
      setQuantity(e.target.value);
      setTotal(Number(e.target.value) * Number(unitPrice))
      setTotalCost(Number(e.target.value) * Number(unitPrice));
    }

  }
  const discountPercentage = (e) => {
    const disPercenatge = e.target.value;
    if (totalCost && disPercenatge >= 0 && disPercenatge < 101) {
      setDisPercentage(disPercenatge);
      const totalCostAfterDiscount = (totalCost - ((totalCost / 100) * disPercenatge))
      setTotal(totalCostAfterDiscount)
    }
  }
  const discountRate = (e) => {
    const disAmount = e.target.value;
    if (totalCost && disAmount <= totalCost) {
      setDisRate(disAmount);
      console.log(totalCost);
      setTotal(totalCost - disAmount);
    }
  }

  const discount_options = [{ value: '2', label: 'Percentage' }, { value: '1', label: 'Plain' }];

  const totalDiscountPercentage = (e) => {
    const disPercenatge = e.target.value;
    if (grandTotal && disPercenatge >= 0 && disPercenatge < 101) {
      // grandTotalCost = grandTotal;
      setTotalDisPercentage(disPercenatge);
      const totalCostAfterDiscount = (grandTotal - ((grandTotal / 100) * disPercenatge))
      setGrandTotal(totalCostAfterDiscount)
    }
  }

  const totalDiscountRate = (e) => {
    const disAmount = e.target.value;
    if (grandTotal && disAmount <= grandTotal) {
      setTotalDisRate(disAmount);
      // console.log(totalCost);
      // setTotal(totalCost -disAmount);
    }
  }
  let supplierInvNumber = "";

  useEffect(() => {
    const controller = new AbortController();
    const getSuppliers = async () => {
      let body: any = {}
      body = {
        action: "getAllSupplier",
      }
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`,
        body
      ).then(result => {
        setSupplier(result.data.data);
      });

    }
    const getAllSupplierInvoice = async () => {
      try {
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, { action: "getAllSupplierInvoice" })
        .then((res) => {
          setAllSupplier(res?.data?.data || {});

          //Generating Local-Inv operation starts here ----------------
          var today = new Date();
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear().toString().slice(-2);
          today = yyyy + mm;

          const LocalINVMiddlefix = today + "-";

          if (res?.data?.data?.length) {
            const LocalINVPrefix = (res?.data?.data[res?.data?.data.length - 1]?.local_invoice).slice(0, 3);
            const LocalINVPostfix = (res?.data?.data[res?.data?.data.length - 1]?.local_invoice).slice(-4)
            const LocalINVPostfixIncrement = Number(LocalINVPostfix) + 1;
            const LocalINVPostfixIncrementStr = String("0000" + LocalINVPostfixIncrement).slice(-4)
            setLocalInv(LocalINVPrefix + LocalINVMiddlefix + LocalINVPostfixIncrementStr);
          }
          else {
            setLocalInv("LP-" + LocalINVMiddlefix + "00001");
          }
          //Generating Local-Inv operation end here ----------------

        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllSupplierInvoice()
    getSuppliers();
    return () => controller.abort();
  }, [])

  useEffect(() => {
    const controller = new AbortController();

    async function getAllItems() {
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`, { action: "getAllItems", })
        .then((res) => {
          console.log(res?.data)
          setItems(res.data);
          setPending(false);
        });
    }
    const categoryList = async () => {
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/category`, { action: "getAllCategories" })
        .then((res) => {
          setItemCategories(res.data);
          setCatPending(false)
        });
    };
    const getItemByCode = async () => {
      let isSubscribed = true;
      if (itemCode !== "") {
        setPending(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`, { action: "getItemByCode", id: itemCode })
          .then((res) => {
            if (isSubscribed) {
              console.log(res?.data?.data);
              //setItemObj(res.data.data);
              setItemId(res.data.data?.id);
              setUnitPrice(res?.data?.data?.unit_cost)
              setTotal(res?.data?.data?.unit_cost * quantity)
              setItemName(res.data.data?.name);
              setPending(false)
              // setSwitcher(false);
            }
          });
      }
      return () => isSubscribed = false;
    }
    getAllItems();
    categoryList()
    getItemByCode()

    return () => controller.abort();

  }, [itemCode, categoryId])
  // supplierInvNumber = String("000000000000000" + (Number(supplierInv) + 1)).slice(-15);

  const [supplierDetails, setSupplierDetails] = useState([]);
  const [supplierInfoloading, setSupplierInfoLoading] = useState(false);

  const fetchSupplierDetails = async (id: any) => {
    setSupplierDetails([])
    setSupplierInfoLoading(true)
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, { action: "getSupplierByID", id: id })
      .then((res) => {
        setSupplierDetails(res?.data?.data);
        setSupplierInfoLoading(false)
      });
  }
  var today = new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear().toString().slice(-2);

  today = yyyy + mm;
  // const localInvNumber = "LP-" + today + "-" + String("0000" + localInv).slice(-4);
  // console.log(localInvNumber);
  console.log(localInv);

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow p-3">
              <div className="border-bottom bg-light title-part-padding d-flex justify-content-between">
                <h4 className="card-title mb-0">
                  <strong className='fw-bolder'>
                    Create New Purchase Invoice
                  </strong>
                </h4>
                {/* <div>
                  <strong className='fw-bolder'>
                    # {localInvNumber}
                  </strong>
                </div> */}
              </div>
              <div className="card-body">
                <div className='row'>
                  <div className='col-md-6 p-2 p-4'>
                    <div className='mb-1 row'>
                      <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Supplier Name:" />
                      {true && <div className="col-sm-8 col-lg-8 col-md-8">
                        <Select2
                          options={supplier?.map(({ id, name }) => ({ value: id, label: name }))}
                          onChange={(e) => {
                            setSupplierID(e.value);
                            setSupplierName(e.label);
                            fetchSupplierDetails(e.value)
                          }}
                        />
                      </div>}
                      {false &&
                        <div className="col-sm-8 col-lg-8 col-md-8">
                          <Select2
                            options={supplier?.map(({ id, name }) => ({ value: id, label: name }))}
                            onChange={(e) => {
                              setSupplierID(e.value);
                              setSupplierName(e.label);
                              fetchSupplierDetails(e.value)
                            }}
                            defaultValue={{ value: "", label: "loading..." }}
                          />
                        </div>
                      }
                    </div>
                    {supplierDetails?.map((info) => {
                      return (
                        <>
                          <div className='pr-5 m-auto'>
                            <div className='mb-1'>
                              <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Name: </span>{info.name}</span>&nbsp;
                              <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Contact number: </span>{info.contact_number}</span>&nbsp;
                              <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Address: </span>{info.address}</span>&nbsp;
                              <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Balance: </span>{info.balance}</span>&nbsp;
                            </div>
                          </div>
                        </>
                      )
                    })}
                    {supplierInfoloading && <div className='text-center'>
                      <div className="text-center">
                        <PropagateLoading />
                      </div>
                    </div>}
                    <div className="mb-1 mt-2 row">
                      <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Remarks:" />
                      <div className="col-sm-8 col-lg-8 col-md-8">
                        <input type="text" placeholder="Invoice Remarks" className="form-control" value={totalRemarks} onChange={(e) => setTotalRemarks(e.target.value)} />
                      </div>
                    </div>
                    <div className='mb-1 row'>
                      <div className="mb-3 row m-auto">
                        <div className='col-sm-11 col-lg-11 col-md-11 mb-4 mt-2 border-bottom'>
                          {!objedit ? <h5 className="text-info">Add Item to Invoice</h5> : <h5 className="text-info">Update Item Info</h5>}
                        </div>
                      </div>
                      {objedit ? (
                        //-------------------- Invoice Update Starts --------------------
                        <div className="">
                          <form onSubmit={UpdateData}>
                            <div className="">
                              <div className="mb-3 row">
                                <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Unit Cost" />
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <input type="number" name="unitCost" placeholder="Unit Price" className="form-control" value={unitPrice} required onChange={handleTotal} />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Quantity" />
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <input type="number" name="Qty" placeholder="Qty" className="form-control" value={quantity} required onChange={handleTotal} />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Total" />
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <input type="number" name="total" placeholder="Qty" className="form-control" disabled value={total} />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Remarks" />
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <input type="text" name="Remarks" placeholder="Remarks" className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="text-center">
                                <Button variant='success mx-2' type='submit' disabled={!quantity || !unitPrice || !total}>
                                  Update
                                </Button>
                                <Button onClick={() => { setObjEdit(false); reset(); }} variant="danger">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>
                        //-------------------- Invoice Update Ends --------------------
                      ) : (
                        //-------------------- Invoice Entry Starts --------------------
                        <div className="">
                          <form onSubmit={StoringData}>
                            {!catPending && <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Select Category" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <Select2
                                  options={categories_options?.map(({ id, name }) => ({ value: id, label: name }))}
                                  onChange={changeCategory}
                                />
                              </div>
                            </div>}
                            {catPending && <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Select Category" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <Select2
                                  options={categories_options?.map(({ id, name }) => ({ value: id, label: name }))}
                                  onChange={changeCategory}
                                  defaultValue={{ value: "", label: "loading..." }}
                                />
                              </div>
                            </div>}
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Select Item Code" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <Select2
                                  options={items_options?.map(({ id, code }) => ({ value: id, label: code }))}
                                  onChange={changeItem}
                                  value={selected_code_options}
                                />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Select Item" />
                              {itemName &&
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <Select2
                                    options={items_options?.map(({ id, name, unit_cost, code }) => ({ value: id, label: name, unitCost: unit_cost, code: code }))}
                                    value={item_name_options}
                                    onChange={(e) => {
                                      console.log("cat")
                                      setItemCode(e.value);
                                      setItemCodeName(e.code)
                                      setItemId(e.value);
                                      setItemName(e.label);
                                      setUnitPrice(e.unitCost);
                                      quantity ? setTotal(e.unitCost * quantity) : setTotal(e.unitCost)
                                    }}
                                  />
                                </div>}
                              {!itemName &&
                                <div className="col-sm-8 col-lg-8 col-md-8">
                                  <Select2
                                    options={items_options?.map(({ id, name, unit_cost, code }) => ({ value: id, label: name, unitCost: unit_cost, code: code }))}
                                    // value={item_name_options}
                                    onChange={(e) => {
                                      setItemCode(e.value);
                                      setItemCodeName(e.code)
                                      setItemId(e.value);
                                      setItemName(e.label);
                                      setUnitPrice(e.unitCost);
                                      quantity ? setTotal(e.unitCost * quantity) : setTotal(e.unitCost)
                                    }}
                                  />
                                </div>
                              }
                            </div>
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Unit cost" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <input type="number" name="unitCost" placeholder="Unit Price" className="form-control" value={unitPrice} required onChange={handleTotal} />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Quantity" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <input type="number" name="qty" placeholder="Item Quantity" className="form-control" value={quantity} required onChange={handleTotal} />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Total" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <input type="number" name="total" placeholder="Total Cost" className="form-control" disabled value={total} />
                              </div>
                            </div>
                            <div className="mb-3 row">
                              <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Remarks" />
                              <div className="col-sm-8 col-lg-8 col-md-8">
                                <input type="text" name="Remarks" placeholder="Remarks" className="form-control" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                              </div>
                            </div>
                            <div className="p-3 text-center">
                              <Button variant='danger' onClick={reset} disabled={!itemName} >
                                Clear
                              </Button>
                              <Button className='mx-3' variant='primary' disabled={!quantity || !unitPrice || !categoryId || !itemId || !total} type='submit'>
                                Add to Invoice
                              </Button>

                            </div>
                          </form>
                        </div>
                        //-------------------- Invoice Entry Ends --------------------
                      )}
                    </div>
                  </div>
                  <div className='col-md-6 p-2'>
                    <div className="mb-1 row">
                      <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Supplier Invoice:" />
                      <div className="col-sm-7 col-lg-7 col-md-7 mb-2">
                        <input type="text" placeholder="Supplier Invoice No" className="form-control" value={SupplierInvoiceNumber} required onChange={(e) => setSupplierInvoiceNumber(e.target.value)} />
                      </div>
                      <Label className="col-sm-3 col-lg-3 col-md-3 fw-bolder" text="Invoice Date:" />
                      <div className="col-sm-7 col-lg-7 col-md-7">
                        <input type="date" placeholder="Invoice Date:" className="form-control" value={date} required onChange={(e) => setDate(e.target.value)} id="date" />
                      </div>
                    </div>
                    <div className="my-1 mt-3 row">
                      {/* <h5 className='fw-bolder m-2'>All Items</h5> */}
                      <div className='p-3'>
                        <Table striped bordered hover>
                          <thead className='bg-light border-0'>
                            <tr className='text-center'>
                              <th className='fw-bolder'>Item Name</th>
                              <th className='fw-bolder'>Item Code</th>
                              <th className='fw-bolder'>Unit Cost</th>
                              <th className='fw-bolder'>Quantity</th>
                              <th className='fw-bolder'>Total</th>
                              <th className='fw-bolder'>Remarks</th>
                              <th className='fw-bolder'>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice?.map((item, index) => (
                              <>
                                {item.itemId !== null && (
                                  <tr className='text-center' key={index}>
                                    {/* <td>{item.id}</td> */}
                                    <td>{item.itemName}</td>
                                    <td>{item.itemCodeName}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.qty * item.unitPrice}</td>
                                    <td>{item.remarks}</td>
                                    <td>
                                      <ul className="action">
                                        <li>
                                          <Link href="#">
                                            <a onClick={() => editobj(index, item.id)}>
                                              <EditIcon />
                                            </a>
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href='#'>
                                            <a onClick={() => { removeObjectFromArray(item.id); setGrandTotal(grandTotal - item.total) }}>
                                              <DeleteIcon />
                                            </a>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                )}
                              </>
                            ))}
                          </tbody>
                        </Table>
                        {/* <hr /> */}
                        {!!grandTotal && <div className='text-end fw-bold mb-3 me-2'>Total Amount: <span>{grandTotal.toFixed(2)}</span></div>}
                        <div className="text-end">
                          <Button variant="success" style={{ float: 'right' }} disabled={!invoice.length} onClick={submitForm}>
                            Create Invoice
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default CreateInvoice;