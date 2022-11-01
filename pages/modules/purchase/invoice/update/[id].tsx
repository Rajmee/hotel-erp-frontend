import { useRouter } from 'next/router';
import * as moment from 'moment';
import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Form } from '../../../../../components';
import { Label } from '../../../../../components';
import { Select2 } from '../../../../../components';
import { TextInput } from '../../../../../components';
import toast from "../../../../../components/Toast/index";
import Axios from '../../../../utils/axios';
import Link from 'next/link';
import { DeleteIcon } from '../../../../../components';
import { EditIcon } from '../../../../../components';
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
// import MRI_Uploader from '../../../../components/MRIfileManager/MRI_Uploader';
import PropagateLoading from '../../../../../components/PropagateLoading';

const UpdateInvoice = () => {

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    // const [item, setItem]= useState({
    //   itemData:[
    //     {id: 0, code: 'select value', name: '', inventory_category_id: '', description: ''},

    //   ],
    // })

    const { http } = Axios();
    const router = useRouter();
    const {
        isReady,
        query: {
            id,
        }
    } = router;

    const [invoice, setInvoice] = useState([]);
    const [deletedInvoice, setdeletedInvoice] = useState([])
    const [newInvoice, setNewInvoice] = useState([])

    const [date, setDate] = useState("");
    const [itemId, setItemId] = useState("");
    const [test, setTest] = useState("");
    const [itemName, setItemName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryData, setCategoryData] = useState();
    const [itemCode, setItemCode] = useState("");
    const [itemCodeName, setItemCodeName] = useState("");
    const [item_obj, setItemObj] = useState();
    //const [code_obj, setCodeObj] = useState();
    const [remarks, setRemarks] = useState("");
    const [totalRemarks, setTotalRemarks] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [getItems, setItems] = useState();
    const items_options = getItems?.data;
    const [getItemCategories, setItemCategories] = useState("");
    const categories_options = getItemCategories.data;
    const [switcher, setSwitcher] = useState(true);
    const [itemLoading, setItemLoading] = useState(true)
    const [totalAmount, setTotalAmount] = useState(0)
    const [total, setTotal] = useState(0);

    const [initialLoading, setInitailLoading] = useState(true);

    let item_name_options = { value: itemId || '', label: itemName || 'Select...' };

    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(false)
    const [pendingCat, setPendingCat] = useState(true)
    const [supplierID, setSupplierID] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [supplierNamePending, setSupplierNamePending] = useState(true);
    const [SupplierInvoiceNumber, setSupplierInvoiceNumber] = useState();


    const [disable, setDisable] = useState(true);
    const [localInv, setLocalInv] = useState("loading...");
    const [supplier, setSupplier] = useState([]);
    const [InvoiceSupplierName, setInvoiceSupplierName] = useState("");

    const [updateCount, setUpdateCount] = useState(1);
    const [supplierDetails, setSupplierDetails] = useState([]);
    const [supplierInfoloading, setSupplierInfoLoading] = useState(false);

    // const [itemListLoading, setItemListLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController();
        async function getInvoiceDetails() {
            if (switcher) {
                // if (!invoice.length) {
                //     await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, { action: "getInvoiceDetails", supplier_invoice_id: id })
                //         .then((res) => {
                //             setRemarks(res?.data?.data[0]?.item_remarks)
                //             setTotalRemarks(res?.data?.data[0]?.common_remarks)
                //             setDate(res?.data?.data[0]?.created_at)
                //             setItemName(res?.data?.data[0]?.itemName)
                //             let amount = 0;
                //             (res?.data?.data?.map((item: any) => {
                //                 amount += Number(item.unitPrice * item.item_qty)
                //             }))
                //             setTotalAmount(amount)
                //             setInvoice(res?.data?.data)
                //             console.log("Fetch");
                //             setInitailLoading(false);
                //             setDisable(false)
                //             // setInd(res?.data?.data?.id +1)
                //         });
                // }
            }
        }
        // const fetchSupplierDetails = async () => {
        //     setSupplierDetails([])
        //     setSupplierInfoLoading(true)
        //     await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, { action: "getInvoiceByID", id: id })
        //         .then((res) => {

        //             setSupplierDetails(res?.data?.data);
        //             setSupplierInfoLoading(false)
        //         });
        // }
        async function getAllItems() {
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`, { action: "getAllItems" })
                .then((res) => {
                    console.log(res?.data);
                    setItems(res?.data);
                    setSupplierNamePending(false)
                });
        }
        const categoryList = async () => {
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/category`, { action: "getAllCategories" })
                .then((res) => {
                    setItemCategories(res.data);
                    setCatPending(false)
                });
        };

        // const getSuppliersDetails = async () => {
        //     let body: any = {}
        //     body = {
        //         action: "getInvoiceByID",
        //         id: id
        //     }
        //     await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
        //         body
        //     ).then(result => {
        //         setLocalInv(result?.data?.data[0]?.local_invoice);
        //         setInvoiceSupplierName(result?.data?.data[0]?.supplier_name)
        //         setSupplierInvoiceNumber(result?.data?.data[0]?.supplier_invoice)
        //         setSupplierID(result?.data?.data[0]?.supplier_id)
        //         setTotalRemarks(result?.data?.data[0]?.remarks)
        //         setDate(result?.data?.data[0]?.created_at)
        //     });

        // }
        // router.isReady && getInvoiceDetails()
        // fetchSupplierDetails()
        // getSuppliersDetails()
        getItemByCategory()
        getAllItems();
        getSuppliers();
        categoryList();
        getItemByCode();
        return () => controller.abort();

    }, [id, categoryId, itemCode])

    useEffect(() => {
        const getInvoiceDetails = async () => {
            if (!invoice.length) {
                await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, { action: "getInvoiceDetails", supplier_invoice_id: id })
                    .then((res) => {
                        setRemarks(res?.data?.data[0]?.item_remarks)
                        setTotalRemarks(res?.data?.data[0]?.common_remarks)
                        setDate(res?.data?.data[0]?.created_at)
                        setItemName(res?.data?.data[0]?.itemName)
                        let amount = 0;
                        (res?.data?.data?.map((item: any) => {
                            amount += Number(item.unitPrice * item.item_qty)
                        }))
                        setTotalAmount(amount)
                        setInvoice(res?.data?.data)
                        console.log("Fetch");
                        setInitailLoading(false);
                        setDisable(false)
                        // setInd(res?.data?.data?.id +1)
                    });
            }
        }
        const fetchSupplierDetails = async () => {
            setSupplierDetails([])
            setSupplierInfoLoading(true)
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, { action: "getInvoiceByID", id: id })
                .then((res) => {

                    setSupplierDetails(res?.data?.data);
                    setSupplierInfoLoading(false)
                });
        }
        const getSuppliersDetails = async () => {
            let body: any = {}
            body = {
                action: "getInvoiceByID",
                id: id
            }
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
                body
            ).then(result => {
                setLocalInv(result?.data?.data[0]?.local_invoice);
                setInvoiceSupplierName(result?.data?.data[0]?.supplier_name)
                setSupplierInvoiceNumber(result?.data?.data[0]?.supplier_invoice)
                setSupplierID(result?.data?.data[0]?.supplier_id)
                setTotalRemarks(result?.data?.data[0]?.remarks)
                setDate(result?.data?.data[0]?.created_at)
            });

        }
        isReady && getInvoiceDetails()
        fetchSupplierDetails()
        getSuppliersDetails()
    }, [id, isReady, updateCount])

    // const [ind, setInd] = useState(1)
    const StoringData = (e: any) => {

        setTotalAmount(totalAmount + total);
        e.preventDefault();
        // e.target.reset();
        setNewInvoice([...newInvoice,
        {
            id: newInvoice.length ? newInvoice[newInvoice.length - 1]?.id + 1 : invoice[invoice.length - 1]?.id + 1,
            unitPrice: unitPrice,
            item_qty: quantity,
            unitPrice: unitPrice,
            // total: total,
            itemId: itemId,
            itemName: itemName,
            item_remarks: remarks,
            status: 1,
            supplierName: InvoiceSupplierName,
            local_invoice: localInv,
            supplier_id: supplierID,
            qty: quantity,
            total_remarks: totalRemarks,
            date: date,
        }])
        setQuantity("")
    }
    const [objedit, setObjEdit] = useState(false);
    const [arrayIndex, setArrayIndex] = useState();
    const [editId, setEditId] = useState('');
    const [editedItemId, setEditedItemId] = useState('');
    const [editedItemName, setEditedItemName] = useState('');

    const selected_category_options = { value: categoryId, label: categoryName };
    const selected_code_options = { value: itemCode, label: itemCodeName };
    const selected_item_options = { value: itemId, label: itemName };
    const [catPending, setCatPending] = useState(true);
    const [tempTotal, setTempTotal] = useState(0);

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

    function editobj(index, editId) {
        console.log(invoice[index]?.itemName);
        setObjEdit(true)
        setArrayIndex(index)
        setEditId(editId)
        setQuantity(invoice[index]?.item_qty)
        setRemarks(invoice[index]?.item_remarks)
        setItemId(invoice[index]?.itemId)
        setItemName(invoice[index]?.itemName)
        setCategoryId(invoice[index]?.catId)
        setCategoryName(invoice[index]?.catName)
        setItemCode(invoice[index]?.itemCode)
        setItemCodeName(invoice[index]?.itemCodeName)
        setUnitPrice(invoice[index]?.unitPrice)
        setTotal(invoice[index]?.unitPrice * invoice[index]?.item_qty)
        setTempTotal(invoice[index]?.unitPrice * invoice[index]?.item_qty);
    }

    function editobjNewInvoice(index, editId) {
        setObjEdit(true)
        setArrayIndex(index)
        setEditId(editId)
        setQuantity(newInvoice[index]?.item_qty)
        setRemarks(newInvoice[index]?.item_remarks)
        setItemId(newInvoice[index]?.itemId)
        setItemName(newInvoice[index]?.itemName)
        setCategoryId(newInvoice[index]?.catId)
        setCategoryName(newInvoice[index]?.catName)
        setItemCode(newInvoice[index]?.itemCode)
        setItemCodeName(newInvoice[index]?.itemCodeName)
        setUnitPrice(newInvoice[index]?.unitPrice)
        setTotal(newInvoice[index]?.unitPrice * newInvoice[index]?.item_qty)
        setTempTotal(newInvoice[index]?.unitPrice * newInvoice[index]?.item_qty);
    }

    const UpdateData = (e: any) => {
        e.preventDefault();

        const InvoiceState = invoice.map(obj => {
            if (obj.id === editId) {
                if (item_name_options.value == '') {
                    return { ...obj, itemCode: itemId, itemCodeName: itemCodeName, itemId: itemId, itemName: itemName, common_remarks: totalRemarks, item_remarks: remarks, item_qty: quantity, unitPrice: unitPrice };
                }
                else {
                    return { ...obj, itemCode: itemId, itemCodeName: itemCodeName, itemId: item_name_options.value, itemName: item_name_options.label, common_remarks: totalRemarks, item_remarks: remarks, item_qty: quantity, unitPrice: unitPrice };
                }
            }
            return obj;
        });
        setInvoice(InvoiceState);
        e.target.reset();
        const newInvoiceState = newInvoice.map(obj => {
            if (obj.id === editId) {
                if (item_name_options.value == '') {
                    return { ...obj, itemCode: itemId, itemCodeName: itemCodeName, itemId: itemId, itemName: itemName, common_remarks: totalRemarks, item_remarks: remarks, item_qty: quantity, unitPrice: unitPrice };
                }
                else {
                    return { ...obj, itemCode: itemId, itemCodeName: itemCodeName, itemId: item_name_options.value, itemName: item_name_options.label, common_remarks: totalRemarks, item_remarks: remarks, item_qty: quantity, unitPrice: unitPrice };
                }
            }
            return obj;
        });
        setNewInvoice(newInvoiceState);
        e.target.reset();
        setObjEdit(false)
        setTotalAmount(totalAmount - tempTotal + total);
    }

    async function removeObjectFromArray(id, index) {

        setTotalAmount(totalAmount - invoice[index].item_qty * invoice[index].unitPrice)
        setdeletedInvoice([...deletedInvoice,
        invoice[index]
        ])

        setInvoice(current =>
            current.filter(obj => {
                return obj.id !== id;
            }),
        );

    };

    async function removeObjectFromArrayNewInvoice(id, index) {

        setTotalAmount(totalAmount - newInvoice[index].item_qty * newInvoice[index].unitPrice)
        setdeletedInvoice([...deletedInvoice,
        newInvoice[index]
        ])

        setNewInvoice(current =>
            current.filter(obj => {
                return obj.id !== id;
            }),
        );

    };

    const changeCategory = (e: any) => {
        if (e.value) {
            setCategoryId(e.value);
            setCategoryName(e.label);
        }
    }

    const getItemByCategory = async () => {
        let isSubscribed = true;
        if (categoryId !== "") {
            setPending(true)
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`, { action: "getAllItems", })
                .then((res) => {
                    if (isSubscribed) {
                        // console.log(res?.data)
                        setCategoryData(res.data.data);
                        setPending(false)
                    }
                });
        }
        return () => isSubscribed = false;
    }

    const changeItem = (e: any) => {
        if (e.value) {
            setItemCode(e.value)
            setItemCodeName(e.label)
        }
    }

    const getItemByCode = async () => {
        let isSubscribed = true;
        if (itemCode !== "") {
            setPending(true)
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`, { action: "getItemByCode", id: itemCode })
                .then((res) => {
                    if (isSubscribed) {
                        //setItemObj(res.data.data);
                        setItemId(res.data.data?.id);
                        setItemName(res.data.data?.name);
                        setUnitPrice(res?.data?.data?.unit_cost)
                        setTotal(res?.data?.data?.unit_cost * quantity)
                        setPending(false)
                        // setSwitcher(false);
                    }
                });
        }
        return () => isSubscribed = false;
    }

    const changeItemCode = (e: any) => {
        if (e.value) {
            setItemId(e.value);
            setItemName(e.label);
            setItemCodeName(e.code)
            setUnitPrice(e.unitCost)
            quantity ? setTotal(e.unitCost * quantity) : setTotal(e.unitCost)
        }
    }

    // const getCodeByItem = async()=>{
    //   let isSubscribed = true;
    //   if(itemId !== ""){
    //     setPendingCode(true)
    //     await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`,{action: "getCodeByItem",id: test})
    //     .then((res)=>{
    //       if(isSubscribed){

    //         setCodeObj(res.data.data);

    //         setPendingCode(false)
    //       }
    //     });
    //   }
    //   return ()=> isSubscribed=false;
    // }

    async function submitForm(e: any) {
        e.preventDefault();

        if (SupplierInvoiceNumber) {
            setDisable(true)
            setLoading(true)
            setTotalAmount(0)
            setInitailLoading(true)
            invoice.map((item, index) => { delete item.common_remarks; delete item.totalAmount; })
            deletedInvoice.map((itm, ind) => { deletedInvoice[ind].status = 0; delete itm.totalAmount; delete itm.common_remarks; })
            let body = {
                action: "updateInvoice",
                invoice: invoice,
                status: true,
                localInvoice: localInv,
                supplierID: supplierID,
                supplierName: InvoiceSupplierName,
                supplier_invoice_id: id,
                inv_id: SupplierInvoiceNumber,
                totalRemarks: totalRemarks,
                totalAmount: totalAmount,
                inv_date: date,
                newInvoice: newInvoice,
                deletedInvoice: deletedInvoice
                // inv_id: SupplierInvoiceNumber,
                // supplierID: supplierID,
                // supplierName: supplierName
            }
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`, body)
                .then((res) => {
                    setLoading(false)
                    notify("success", "successfully Updated!");
                    // setVourchers([])
                    e.target.reset();
                    setInvoice([])
                    setNewInvoice([])
                    setUpdateCount(updateCount + 1);
                    router.push("/modules/purchase/invoice")
                })
                .catch((e) => {
                    setLoading(false)
                    const msg = e.response?.data?.response;

                    if (typeof (e.response?.data?.response) == 'string') {
                        notify("error", `${e.response?.data?.response}`);
                    }
                    else {
                        if (msg?.date) {
                            notify("error", `${msg?.date?.Date}`);
                        }
                    }
                });
        }
        else {
            notify("error", "fields must not be empty");
        }

    }
    const [totalCost, setTotalCost] = useState("");
    // const [totalCost, setTotalCost] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);

    const handleTotal = (e: any) => {
        console.log("qty")
        if (e.target.name === 'unitCost') {
            setUnitPrice(e.target.value)
            setTotal(Number(e.target.value) * Number(quantity));
            // setTotalCost(Number(e.target.value) * Number(quantity));
        }
        else if (e.target.name === "qty") {
            setQuantity(e.target.value);
            setTotal(Number(e.target.value) * Number(unitPrice))
            // setTotalCost(Number(e.target.value) * Number(unitPrice));
        }

    }
    console.log(InvoiceSupplierName)
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    {/* //-------------------- Supplier Name -------------------- */}
                    <div className="col-md-12">
                        <div className="card shadow p-3">
                            <div className="border-bottom title-part-padding d-flex justify-content-between">
                                <h4 className="card-title mb-0">
                                    <strong className='fw-bolder'>
                                        Edit Purchase Invoice Info
                                    </strong>
                                </h4>
                                {/* <div>
                                    <strong className='fw-bolder'>
                                        # LP-2209-{String("00000000" + localInv).slice(-8)}
                                    </strong>
                                </div> */}
                            </div>
                            <div className="card-body ">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="table-responsive p-3" style={{ minHeight: "200px", overflowX: "hidden" }}>
                                        {/* <TextInput type="number" label="Local Invoice" name="supplierInvoiceNumber" disabled={true} value={localInv} placeholder="Local Invoice Number" required onChange={(e) => setLocalInv(e.target.value)} /> */}
                                        <TextInput type="text" label="Supplier Invoice" name="supplierInvoiceNumber" value={SupplierInvoiceNumber} placeholder="Supplier invoice number" required onChange={(e) => setSupplierInvoiceNumber(e.target.value)} />
                                        <div className="mb-3 row">
                                            {/* Discount calculation */}
                                            {/* <div className="mb-3 row">
                                            <Label text="Discount Type" />
                                            <div className="col-sm-9 col-lg-9 col-md-7">
                                            <Select2
                                                options={discount_options}
                                                onChange={(e) => {
                                                setDisTotalType(e)
                                                }}
                                                defaultValue={{ value: "0", label: "None" }}
                                            />
                                            </div>
                                        </div>
                                        {disTotalType?.label === "Percentage" && <TextInput type="number" label="Discount rate" placeholder="0%" onChange={(e) => totalDiscountPercentage(e)} value={totalDisPercentage} />}
                                        {disTotalType?.label === "Plain" && <TextInput type="number" label="Discount" placeholder="0" onChange={(e) => totalDiscountRate(e)} value={totalDisRate} />} */}
                                            {/* <TextInput type="number" label="Paid" name="supplierInvoiceNumber" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} />
                                        <TextInput type="number" label="Due" name="supplierInvoiceNumber" placeholder="Due" value={grandTotal - paidAmount} /> */}

                                            <Label text="Select Supplier" />
                                            {InvoiceSupplierName && <div className="col-sm-10 col-lg-10 col-md-10 ">
                                                <Select2
                                                    options={supplier?.map(({ id, name }) => ({ value: id, label: name }))}
                                                    isDisabled={true}
                                                    onChange={(e: any) => {
                                                        setSupplierID(e.value);
                                                        setSupplierName(e.label);
                                                        // fetchSupplierDetails(e.value)
                                                        // fetchSupplierDetails(e.value)
                                                    }}
                                                    defaultValue={{ value: "", label: InvoiceSupplierName }}
                                                />
                                            </div>}
                                            {!InvoiceSupplierName && <div className="col-sm-10 col-lg-10 col-md-10 ">
                                                <Select2
                                                    options={supplier?.map(({ id, name }) => ({ value: id, label: name }))}
                                                    isDisabled={true}
                                                    onChange={(e: any) => {
                                                        setSupplierID(e.value);
                                                        setSupplierName(e.label);
                                                        // fetchSupplierDetails(e.value)
                                                    }}
                                                    defaultValue={{ value: "", label: "loading..." }}
                                                />
                                            </div>}
                                            {/* {!supplierNamePending && <div className="col-sm-10 col-lg-10 col-md-10">
                                                <Select2
                                                    options={supplier?.map(({ id, name }) => ({ value: id, label: name }))}
                                                    onChange={(e: any) => {
                                                        setSupplierID(e.value);
                                                        setSupplierName(e.label);
                                                        fetchSupplierDetails(e.value)
                                                    }}
                                                />
                                            </div>} */}
                                        </div>
                                        <div>
                                            {supplierDetails?.map((info) => {
                                                return (
                                                    <div className='text-center my-3'>
                                                        <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Name: </span>{info.supplier_name}</span>&nbsp;
                                                        <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Type: </span>{info.type}</span>&nbsp;
                                                        <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Remarks: </span>{info.remarks}</span>&nbsp;
                                                        <span className="badge font-weight-medium bg-light-primary text-primary"><span className='text-dark'>Balance: </span>{info.total_amount}</span>&nbsp;
                                                        {/* <TextInput type="text" label="Name" placeholder="Total Cost" disabled value={!!!info.name ? "Not Found" : info.name} />
                                                        <TextInput type="text" label="Type" placeholder="Total Cost" disabled value={info.type} />
                                                        <TextInput type="text" label="Contact Number" placeholder="Total Cost" disabled value={info.contact_number} />
                                                        <TextInput type="text" label="Email" placeholder="Total Cost" disabled value={info.email} /> */}
                                                    </div>
                                                )
                                            })}
                                            {supplierInfoloading && <>
                                                <>
                                                    {/* <TextInput type="text" label="Name"  disabled value="" />
                                                    <TextInput type="text" label="Type"  disabled value="" />
                                                    <TextInput type="text" label="Contact Number" disabled value="" />
                                                    <TextInput type="text" label="Email"  disabled value="" /> */}
                                                    {/* <MRI_Uploader onSubmitUploads={uploadIds} selectLoading={selecteLoading} /> */}
                                                    <div className="my-3 text-center">
                                                        <PropagateLoading />
                                                    </div>
                                                </>
                                            </>}
                                        </div>
                                        <div className="my-3 row">
                                            <label className="col-md-2 col-form-label ">Invoice Remarks:</label>
                                            <div className="col-sm-10 col-lg-10 col-md-10 ">
                                                <input type="text" placeholder="Invoice Remarks" className="form-control" disabled={disable} value={totalRemarks} onChange={(e) => setTotalRemarks(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <label className="col-md-2 col-form-label ">Invoice Date:</label>
                                            <div className="col-sm-10 col-lg-10 col-md-10 ">
                                                <input type="date" name="inv_date" disabled={disable} Value={moment(date).format('YYYY-MM-DD')} onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                                                {/* <input type="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="date" /> */}
                                                {/* <DatePicker selected={date} className="form-control dateInput" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* //-------------------- Supplier Name Ends-------------------- */}
                    {/* //-------------------- Supplier Name Details-------------------- */}
                    {/* <div className="col-md-12">
                        <div className="card shadow p-3" >
                            <div className="border-bottom title-part-padding">
                                <h4 className="card-title mb-0">
                                    <strong className='fw-bolder'>
                                        Supplier Details
                                    </strong>
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="table-responsive" style={{ height: "400px", overflowX: "hidden" }}>
                                        {supplierDetails?.map((info) => {
                                            return (
                                                <>
                                                    <TextInput type="text" label="Name" placeholder="" disabled value={!!!info.name ? "Not Found" : info.name} />
                                                    <TextInput type="text" label="Type" placeholder="" disabled value={info.type} />
                                                    <TextInput type="text" label="Contact Number" placeholder="" disabled value={info.contact_number} />
                                                    <TextInput type="text" label="Email" placeholder="" disabled value={info.email} />
                                                    <TextInput type="text" label="Priority" placeholder="" disabled value={info.priority} />
                                                    <TextInput type="text" label="Description" placeholder="" disabled value={info.description} />
                                                    <TextInput type="text" label="Tax id" placeholder="" disabled value={info.tax_id} />
                                                    <TextInput type="text" label="Bank name" placeholder="" disabled value={info.bank_name} />
                                                    <TextInput type="text" label="Bank account number" placeholder="" disabled value={info.bank_acc_number} />
                                                    <TextInput type="text" label="Address" placeholder="" disabled value={info.address} />
                                                    <TextInput type="text" label="Country name" placeholder="" disabled value={info.country_name} />
                                                    <TextInput type="text" label="Amount" placeholder="" disabled value={!!!info.amount ? "No invoice found" : info.amount} /></>
                                            )
                                        })}
                                        {supplierInfoloading && <div className='text-center' style={{ marginTop: "150px" }}>
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <div className="spinner-grow spinner-grow-sm mx-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* //-------------------- Supplier Name Details Ends-------------------- */}
                <div className="row">
                    <div className="col-md-6">
                        {/* -------------------- Invoice Update Starts -------------------- */}
                        {objedit ? (
                            <div className="card shadow p-3">
                                <div className="card-body border-bottom">
                                    <h4 className="card-title">Update Invoice</h4>
                                </div>
                                <form onSubmit={UpdateData}>
                                    <div className="card-body">
                                        {/* {pending &&
                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">
                                                    <Select2
                                                        options={categoryData?.map(({ id, name }) => ({ value: id, label: name }))}
                                                        onChange={changeItemCode}
                                                        value={{ value: "", label: "loading..." }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        {!pending &&
                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">
                                                    <Select2
                                                        options={categoryData?.map(({ id, name, code, unit_cost }) => ({ value: id, label: name, code: code, unitCost: unit_cost }))}
                                                        value={item_name_options}
                                                        onChange={changeItemCode}
                                                    />
                                                </div>
                                            </div>} */}

                                        <TextInput type="number" label="Unit Cost" name="unitCost" value={unitPrice} placeholder="Unit Price" required onChange={handleTotal} />
                                        <TextInput type="number" label="Qty" name="qty" value={quantity} required onChange={handleTotal} placeholder={undefined} />
                                        <TextInput type="text" label="Total" placeholder="Total Cost" disabled value={total} />
                                        <TextInput type="text" label="Remarks" placeholder="Remarks" value={remarks} onChange={(e: any) => setRemarks(e.target.value)} />

                                    </div>
                                    <div className="p-3 border-top">
                                        <div className="text-end">
                                            <Button variant='success' className='me-2' type='submit' disabled={!quantity || !unitPrice || !itemId || !total}>
                                                Update
                                            </Button>
                                            <Button variant='danger' onClick={() => setObjEdit(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            //  -------------------- Invoice Update Ends  --------------------
                        ) : (
                            //-------------------- Invoice Entry Starts --------------------
                            <div className="card shadow p-3">
                                <div className="card-body border-bottom">
                                    <h4 className="card-title">Create Invoice</h4>
                                </div>
                                <form onSubmit={StoringData}>
                                    <div className="card-body">
                                        {!catPending && <div className="mb-3 row">
                                            <Label text="Select Category" />
                                            <div className="col-sm-10">
                                                <Select2
                                                    options={categories_options?.map(({ id, name }) => ({ value: id, label: name }))}
                                                    onChange={changeCategory}
                                                />
                                            </div>
                                        </div>}
                                        {catPending && <div className="mb-3 row">
                                            <Label text="Select Category" />
                                            <div className="col-sm-10">
                                                <Select2
                                                    options={categories_options?.map(({ id, name }) => ({ value: id, label: name }))}
                                                    onChange={changeCategory}
                                                    defaultValue={{ value: "", label: "loading..." }}
                                                />
                                            </div>
                                        </div>}

                                        {/* {pendingCode &&
                                            <div className="mb-3 row">          
                                            <Label text="Select Item Code"/>
                                            <div className="col-sm-10">
                                            <Select2
                                                options={items_options?.map(({ id, code }) => ({ value: id, label: code}))}
                                                onChange={changeItem}
                                            />
                                            </div>
                                            </div>
                                            } */}

                                        {/* {itemLoading &&
                                            <div className="mb-3 row">          
                                            <Label text="Select Item Code"/>
                                            <div className="col-sm-10">
                                            <Select2
                                                options={item?.itemData?.map(({ id, code }) => ({ value: id, label: code}))}
                                                onChange={changeItem}
                                                //defaultValue={item_code_options} 
                                            />
                                            </div>
                                            </div>
                                            } */}

                                        <div className="mb-3 row">
                                            <Label text="Select Item Code" />
                                            <div className="col-sm-10">
                                                <Select2
                                                    options={items_options?.map(({ id, code }) => ({ value: id, label: code }))}
                                                    onChange={changeItem}
                                                    value={selected_code_options}
                                                />
                                            </div>
                                        </div>
                                        {pending &&
                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">
                                                    <Select2
                                                        options={categoryData?.map(({ id, name, code }) => ({ value: id, label: name, code: code }))}
                                                        onChange={changeItemCode}
                                                        defaultValue={{ value: "", label: "loading..." }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        {!pending &&
                                            <div className="mb-3 row">
                                                <Label text="Select Item" />
                                                <div className="col-sm-10">
                                                    <Select2
                                                        options={categoryData?.map(({ id, name, unit_cost, code }) => ({ value: id, label: name, unitCost: unit_cost, code: code }))}
                                                        defaultValue={item_name_options}
                                                        // onChange={changeItemCode}
                                                        onChange={(e: any) => {
                                                            setItemCode(e.value);
                                                            setItemCodeName(e.code)
                                                            setItemId(e.value);
                                                            setItemName(e.label);
                                                            setUnitPrice(e.unitCost);
                                                            quantity ? setTotal(e.unitCost * quantity) : setTotal(e.unitCost)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }

                                        {/* <TextInput type="number" label="Qty" placeholder="item qty" required onChange={(e) => setQuantity(e.target.value)} /> */}
                                        <TextInput type="number" label="Unit Cost" name="unitCost" value={unitPrice} placeholder="Unit Price" required onChange={handleTotal} />
                                        <TextInput type="number" label="Qty" name="qty" placeholder="item qty" value={quantity} required onChange={handleTotal} />
                                        <TextInput type="text" label="Total" placeholder="Total Cost" disabled value={total} />
                                        <TextInput type="text" label="Remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} />
                                    </div>
                                    <div className="p-3 border-top">
                                        <div className="text-end">
                                            <Button
                                                className="shadow rounded"
                                                variant="primary"
                                                type="submit"
                                                disabled={!quantity || !categoryName || !categoryName || !remarks || !total}
                                            >
                                                Add to Invoice
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            //-------------------- Invoice Entry Ends --------------------
                        )}
                    </div>
                    {/* //-------------------- Invoice Items Display Starts -------------------- */}
                    <div className="col-md-6 col-lg-6">
                        <div className="card shadow p-3" style={{ minHeight: "625px", overflowX: "hidden" }}>
                            <div className="border-bottom title-part-padding">
                                <h4 className="card-title mb-0">All Items</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        id="multi_col_order"
                                        className="table table-striped table-bordered display"
                                        style={{ width: "100%" }}
                                    >
                                        <thead>
                                            <tr>
                                                {/* <th>id</th> */}
                                                <th>Item Name</th>
                                                <th>Remarks</th>
                                                <th>Unit price</th>
                                                <th>Qty</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!initialLoading && invoice?.map((item, index) => (
                                                <>
                                                    {item.itemId !== null && (
                                                        <tr key={index}>
                                                            {/* <td>{item.id}</td> */}
                                                            <td>{item.itemName}</td>
                                                            <td>{item.item_remarks}</td>
                                                            <td>{item.unitPrice}</td>
                                                            <td>{item.item_qty}</td>
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
                                                                            <a onClick={() => removeObjectFromArray(item.id, index)}>
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
                                            {!initialLoading && newInvoice?.map((item, index) => (
                                                <>
                                                    {item.itemId !== null && (
                                                        <tr key={index}>
                                                            {/* <td>{item.id}</td> */}
                                                            <td>{item.itemName}</td>
                                                            <td>{item.item_remarks}</td>
                                                            <td>{item.unitPrice}</td>
                                                            <td>{item.item_qty}</td>
                                                            <td>
                                                                <ul className="action">
                                                                    <li>
                                                                        <Link href="#">
                                                                            <a onClick={() => editobjNewInvoice(index, item.id)}>
                                                                                <EditIcon />
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link href='#'>
                                                                            <a onClick={() => removeObjectFromArrayNewInvoice(item.id, index)}>
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
                                    </table>

                                    {!!totalAmount &&
                                        <>
                                            <hr />
                                            <div className='text-end fw-bold'>Total Amount: <span>{totalAmount}</span></div>
                                        </>}
                                    {initialLoading && <div className="my-5 mx-3 text-center">
                                        <PropagateLoading />
                                    </div>}
                                    <form onSubmit={submitForm}>
                                        <Button className="shadow rounded-3 my-4"
                                            variant="primary"
                                            type="submit" style={{ float: 'right' }}
                                            disabled={initialLoading || disable || invoice.length === 0 && newInvoice.length === 0}
                                        >
                                            Update Invoice
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* //-------------------- Invoice Items Display Ends -------------------- */}
                </div>
            </div>
        </>
    );
}
export default UpdateInvoice;
