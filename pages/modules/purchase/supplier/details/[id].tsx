import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as moment from 'moment';
import HeadSection from '../../../../../components/HeadSection';
import Axios from '../../../../utils/axios';

export default function EmployeeDetails() {

    //state declaration
    const [invoices, setInvoices] = useState<any[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [supplierID, setSupplierID] = useState<number>();
    const [items, setItems] = useState();
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(true)

    const { http } = Axios();

    const router = useRouter();
    const {
        isReady,
        query: {
            id,
        }
    } = router;


    useEffect(() => {
        let isSubscribed = true;

        if (!isReady) {
            console.log('fetching...')
            return;
        }
        setLoading(true);
        http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`, { action: "getSupplierByID", id: id })
            .then((res) => {
                if (isSubscribed) {
                    console.log(res);
                    setDetails(res?.data?.data[0]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log('Something went wrong !')
                setLoading(false);
            });

        return () => {
            isSubscribed = false;
        }

    }, [id, isReady])

    // useEffect(() => {
    //     let mount = true;
    //     if (mount && !loading) {
    //         $("#multi_col_order").DataTable();
    //     }

    //     return () => mount = false;

    // }, [loading]);



    // if(loading){
    // return (
    //     <MyLoader loading={loading}>
    //     <div className="container-fluid vh-100">
    //     <div className="row">
    //         <div className="col-12">
    //         <div className="card">
    //             <div className="border-bottom title-part-padding">
    //             <h4 className="card-title mb-0">Employee Info</h4>
    //             </div>
    //             <div className="card-body">

    //             <p>Processing...</p>

    //             </div>
    //         </div>
    //         </div>
    //     </div>
    //     </div>

    // </MyLoader>

    // );
    // }

    useEffect(() => {
        const controller = new AbortController();

        //fetching invoice items
        const getInvoiceDetails = async () => {
            let body: any = {}
            body = {
                action: "getInvoiceDetailsBySupplierID",
                supplier_id: id
            }
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/invoice`,
                body
            ).then(res => {
                setSupplierID(res?.data?.data[0]?.supplier_id)
                setInvoices(res?.data?.data);
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

    return (
        <>
            <HeadSection title="Supplier Details" />
            <div className="container-fluid ">
                <div className="row">
                    {/* Column */}
                    <div className="row">
                        <div className='row bg-white p-5 m-3 shadow'>
                            <div className='col-lg-6 col-md-6 col-sm-6 border-right' >
                                <h3 className="box-title mt-1">Supplier Details</h3>
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td width={390}>Supplier Name</td>
                                                <td>{details && details?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>
                                                    {details && details?.address}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Country</td>
                                                <td>{details && details?.country}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Info</td>
                                                <td>{details && details?.contact_number}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{details && details?.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Description</td>
                                                <td>{details && details?.description}</td>
                                            </tr>
                                            <tr>
                                                <td>Type</td>
                                                <td>{details && details?.type}</td>
                                            </tr>
                                            <tr>
                                                <td>Bank Name</td>
                                                <td>{details && details?.bank_name}</td>
                                            </tr>
                                            <tr>
                                                <td>Bank Acc Number</td>
                                                <td>{details && details?.bank_acc_number}</td>
                                            </tr>
                                            <tr>
                                                <td>Opening Balance</td>
                                                <td>{details && details?.opening_balance}</td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{details && details?.status ? "Active" : "In-Active"}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6' >
                                <h3 className="box-title mt-1">Balance Info</h3>
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td width={390}>Opening Balance</td>
                                                <td>{details && details?.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Balance</td>
                                                <td>
                                                    {details && details?.balance}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Purchase Amount</td>
                                                <td>{details && details?.total_purchase_amount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h3 className="box-title mt-5">Creation/updation related info</h3>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <td width={390}>Created By</td>
                                                    <td>{details && details?.created_by ? moment(details?.created_by).format('DD-MM-YYYY') : "Not-Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Created At</td>
                                                    <td>{details && details?.created_at ? moment(details?.created_at).format('DD-MM-YYYY') : "Not-Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated By</td>
                                                    <td>{details && details?.updated_by ? "" : "Not Available"}</td>
                                                </tr>
                                                <tr>
                                                    <td>Updated At</td>
                                                    <td>{details && details?.updated_at ? "" : "Not Available"}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row m-auto p-0'>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card shadow p-5">
                                <div className="border-bottom title-part-padding">
                                    <h3 className="box-title mb-0">Supplier's Invoice List</h3>
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
                                                    <th>Invoice No</th>
                                                    <th>Supplier invoice</th>
                                                    <th>Total Items</th>
                                                    <th>Total Qty</th>
                                                    <th>Total amount</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!!invoices.length && invoices.map((invoice) => {
                                                    return (

                                                        <tr>
                                                            <td><Link href="#">{invoice?.local_invoice}</Link></td>
                                                            <td>{invoice?.supplier_invoice}</td>
                                                            <td>{invoice?.total_item}</td>
                                                            <td>{invoice?.total_item_qty}</td>
                                                            <td>{invoice?.total_amount}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        {!!!invoices.length  && <p className='text-center my-2' >No data found!</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Column */}
                </div>
            </div>
        </>
    );
}