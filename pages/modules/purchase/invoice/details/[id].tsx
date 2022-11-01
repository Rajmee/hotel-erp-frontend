import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Button } from "react-bootstrap";
import { FaPhone, FaEdit, FaFilePdf } from 'react-icons/fa';
import Link from 'next/link';
import easyinvoice from 'easyinvoice';
import converter from 'number-to-words';
import DataTable from 'react-data-table-component';

import Axios from '../../../../utils/axios';
import toast from "../../../../../components/Toast/index";

function InvoiceDetails() {

    // Router setup
    const { http } = Axios();
    const router = useRouter();
    const {
        isReady,
        query: {
            id,
        }
    } = router;

    // Toastify setup;
    const notify = React.useCallback((type: any, message: any) => {
        toast({ type, message });
    }, []);

    //state declaration
    const [invoices, setInvoices] = useState<any[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [supplierID, setSupplierID] = useState<number>();
    const [supplierInfo, setSupplierInfo] = useState<{ name: string; address: string; contact_number: number; email: string }>({
        name: "",
        address: "",
        contact_number: 0,
        email: "",
    })

    useEffect(() => {
        const controller = new AbortController();

        //fetching invoice items
        const getInvoiceDetails = async () => {
            let body: any = {}
            body = {
                action: "getInvoiceDetails",
                supplier_invoice_id: id
            }
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
                body
            ).then(res => {
                setSupplierID(res?.data?.data[0]?.supplier_id)
                setInvoices(res?.data?.data || []);
                let totalamount = 0;
                res?.data?.data.map((invoice: any) => {
                    totalamount += invoice.unitPrice * invoice.item_qty
                })
                setTotalAmount(totalamount);
            }).catch((err) => {
                console.log(err + <br /> + 'Something went wrong !')
            });
        }

        isReady && getInvoiceDetails()

        return () => controller.abort();
    }, [id, isReady])

    useEffect(() => {
        const controller = new AbortController();

        //fetching supplier info
        const getSupplierInfo = async () => {
            if (supplierID) {
                await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, { action: "getSupplierByID", id: supplierID })
                    .then((res) => {
                        setSupplierInfo({
                            ...supplierInfo, name: res?.data?.data[0]?.name,
                            address: res?.data?.data[0]?.address,
                            contact_number: res?.data?.data[0]?.contact_number,
                            email: res?.data?.data[0]?.email
                        } || {})
                    })
                    .catch((err) => {
                        console.log(err + <br /> + 'Something went wrong !')
                    });
            }
        }
        getSupplierInfo()

        return () => controller.abort();
    }, [supplierID])

    //pascal case converter
    function getPascalCase(string: String) {
        var splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    let items: { quantity: number, description: string, price: number, "tax-rate": number }[] = [];

    if (invoices?.length) {
        invoices?.map((invoice) => {
            items.push({
                quantity: invoice?.item_qty,
                description: invoice?.itemName,
                "tax-rate": 0,
                price: invoice?.unitPrice
            })
        })
    }

    //print data
    const pdfData: any = {
        "products":
            items
        ,
        "images": {
            // The logo on top of your invoice
            "logo": "https://res.cloudinary.com/duvqwdyz6/image/upload/v1661764156/cover_wusqku.png",
            // The invoice background
            // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
        },
        // Your own data
        "sender": {
            "company": supplierInfo?.name,
            "address": supplierInfo?.address,
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        // Your recipient
        "client": {
            "company": "Managebeds",
            "address": "Clientstreet 456",
            "zip": "4567 CD",
            "city": "Clientcity",
            "country": "Clientcountry"
            // "custom1": "custom value 1",
            // "custom2": "custom value 2",
            // "custom3": "custom value 3"
        },
        "information": {
            // Invoice number
            "number": "2021.0001",
            // Invoice data
            "date": "12-12-2021",
            // Invoice due date
            "due-date": "31-12-2021"
        },
        // The products you would like to see on your invoice
        // Total values are being calculated automatically
        // The message you would like to display on the bottom of your invoice
        "bottom-notice": "Kindly pay your invoice within 15 days.",
        // Settings to customize your invoice
        "settings": {
            "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
            // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
            // "tax-notation": "gst", // Defaults to 'vat'
            // "margin-top": 25, // Defaults to '25'
            // "margin-right": 25, // Defaults to '25'
            // "margin-left": 25, // Defaults to '25'
            // "margin-bottom": 25, // Defaults to '25'
            // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
            // "height": "1000px", // allowed units: mm, cm, in, px
            // "width": "500px", // allowed units: mm, cm, in, px
            // "orientation": "landscape", // portrait or landscape, defaults to portrait
        },
        // Translate your invoice to your preferred language
        "translate": {
            // "invoice": "FACTUUR",  // Default to 'INVOICE'
            // "number": "Nummer", // Defaults to 'Number'
            // "date": "Datum", // Default to 'Date'
            // "due-date": "Verloopdatum", // Defaults to 'Due Date'
            // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
            // "products": "Producten", // Defaults to 'Products'
            // "quantity": "Aantal", // Default to 'Quantity'
            // "price": "Prijs", // Defaults to 'Price'
            // "product-total": "Totaal", // Defaults to 'Total'
            // "total": "Totaal" // Defaults to 'Total'
        },
    }

    //print pdf
    const printInvoice = async () => {
        easyinvoice.createInvoice(pdfData, function (result) {
            easyinvoice.download('myInvoice.pdf', result.pdf);
        });
        notify("success", "Invoice printing!");
    }

    //table data
    const columnData: any = [
        {
            name: <span className='fw-bold' >SL</span>,
            selector: (row: { id: any; }) => row.id,
            width: "10%"
        },
        {
            name: <span className='fw-bold' >Product</span>,
            selector: (row: { itemName: string; }) => row?.itemName,
            width: "60%"
        },
        {
            name: <span className='fw-bold' >Cost</span>,
            selector: (row: { unitPrice: number; }) => row?.unitPrice,
            width: "10%"
        },
        {
            name: <span className='fw-bold' >Qty</span>,
            selector: (row: { item_qty: number; }) => row?.item_qty,
            width: "10%"
        },
        {
            name: <span className='fw-bold' >Subtotal</span>,
            selector: (row: { item_qty: number, unitPrice: number; }) => row?.item_qty * row?.unitPrice,
            width: "10%"
        },
    ];
    const rowData = invoices;

    console.log(invoices);
    return (
        <div>
            <div className='card shadow p-5 m-4'>
                <div className='mb-5'>
                    <div className='text-center fs-3'>
                        <h1 className='mb-3'>(Company Logo)</h1>
                        <p className='m-0'>Gonoeshtola, Modern More, Dinajpur-500, Bangladesh</p>
                        <p><span style={{ fontSize: "14px", marginRight: "2px" }} ><FaPhone /></span>017xxxxxx, 017xxxxxx-Al-Amin, 017xxxxxx-Russel, <span style={{ fontSize: "14px", marginRight: "2px" }} ><FaPhone /></span>info@siliconbd.com www.siliconbd.com</p>
                    </div>
                    <div className='row small my-2'>
                        <div className='col-sm-4 col-lg-4 col-md-4 my-2'>
                            <div>
                                <div>{supplierInfo?.name}</div>
                                <strong>{supplierInfo?.address} </strong>
                                {!!supplierInfo?.contact_number && <div className='mt-1'>Phone:  {supplierInfo?.contact_number}</div>}
                                {supplierInfo?.email && <div>Email: {supplierInfo?.email}</div>}
                            </div>
                        </div>
                        <div className='text-center col-sm-4 col-lg-4 col-md-4 my-2'>
                            <div>
                                <strong>Invoice# </strong>
                                <span>{invoices.length && invoices[0]?.local_invoice}</span>
                            </div>
                            <div>(Bar Code)</div>
                        </div>
                        <div className='row col-sm-4 col-lg-4 col-md-4 my-2'>
                            <div className='ms-auto col-sm-8 col-lg-8 col-md-8'>
                                <div><strong>Supplier Invoice:</strong><span>{invoices.length && invoices[0]?.supplier_invoice_id}</span></div>
                                <div><strong>Local Invoice:</strong><span>{invoices.length && invoices[0]?.local_invoice}</span></div>
                                <div className='mt-2'><strong>Total Amount:</strong><span>{totalAmount} Tk</span></div>
                                <div><strong>Invoice Date:</strong><span>{invoices.length && invoices[0]?.invoice_date}</span></div>
                                <div><strong>Create Date-Time:</strong><span>{invoices.length && invoices[0]?.created_at}</span></div>
                                <div><strong>Remarks:</strong><span>{invoices.length && invoices[0]?.common_remarks}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <DataTable
                        columns={columnData}
                        data={rowData}
                        striped
                    />
                    <div className='mb-2 pt-4 row border-top'>
                        <div className='col-sm-12 col-lg-8 col-md-8'>
                            <div><span className='fw-bold' >In Word: {getPascalCase(converter.toWords(totalAmount)) + " TAKA Only"}</span></div>
                        </div>
                        <div className='row text-end col-sm-12 col-lg-4 col-md-4'>
                            <div className='row col-sm-6 col-lg-6 col-md-6'>
                                <div><span className='fw-bold' >Total Amount:</span></div>
                            </div>
                            <div className='row col-sm-12 col-lg-6 col-md-6'>
                                <div><span>{totalAmount} Tk</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between my-4'>
                        <div className='w-25 mt-5'>
                            <div><hr /></div>
                            <div className='text-center fw-bolder'>Reciever's signature </div>
                        </div>
                        <div className='w-25 text-center pt-5 mt-5'>
                            (company logo)
                        </div>
                        <div className='w-25 mt-5'>
                            <div ><hr /></div>
                            <div className='text-center fw-bolder'>For managebeds computer</div>
                        </div>
                    </div>
                    <div className='row m-0'>
                        <div className='col-md-6 col-lg-6'>
                            <div>
                                <Button variant='danger'>  <span className='fs-5'><FaEdit /></span> Return Purchase</Button>
                                <Link href={`/modules/purchase/invoice/update/${id}`}><Button variant='info my-2 mx-2'> <span className='fs-5 mx-2'><FaEdit /></span>Edit Invoice </Button></Link>
                                <Button variant='info' > <span className='fs-5'><FaEdit /></span> Edit History</Button>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-6 text-end'>
                            <Button variant='success' className='' onClick={printInvoice} ><span className='fs-5 me-1'><FaFilePdf /></span>Print Consignment</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default InvoiceDetails