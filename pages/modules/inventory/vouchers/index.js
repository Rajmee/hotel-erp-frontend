import * as moment from 'moment';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import RadioButton from "../../../../components/elements/RadioButton";
import ViewIcon from '../../../../components/elements/ViewIcon';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';



//Delete component
const DeleteComponent = ({ onSubmit,voucherId, pending }) => {

    // const {http} = Axios();
  
    // const [name, setName] = useState(""); 
    // const [loading, setLoading] = useState(true);


    // const fetchVoucher = useCallback(async ()=>{
    //   let isSubscribed = true;
    //   setLoading(true)
    //   await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`,{action: "getVoucherInfo", voucher_id:voucherId })
    //   .then((res)=>{
    //      if(isSubscribed){
    //       setName(res.data.data.name)
    //       setLoading(false)
    //      }
    //   })
    //   .catch((err)=>{
    //     console.log('Something went wrong !')
    //     setLoading(false)
    //   });
  
    //   return ()=> isSubscribed=false;
  
    // },[voucherId]);
  
    // useEffect(()=>{
    //   fetchVoucher();
    // },[fetchVoucher])
  
  
    let myFormData = new FormData(); 
  
    myFormData.append('action', "deleteVoucher");
    myFormData.append('voucher_id', voucherId);

    return (
      <>
        <Modal.Body>
          <Modal.Title>Are you sure to Cancel </Modal.Title>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger"  disabled={pending} onClick={()=>onSubmit(myFormData)}>
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </>
    );
  };

export default function ListView() {

    const {http} = Axios();

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);


  //Create Tower
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (voucherId) =>{
    setShowDeleteModal(true);
    setVoucherId(voucherId);
  } 


    //Delete Tower form
    const handleDelete=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`,formData)
      .then((res)=>{
        if(isSubscribed){
          notify("success", "successfully deleted!");
          handleExitDelete();
          setPending(false);
  
        }
  
      })
      .catch((e)=>{
        console.log('error delete !')
        setPending(false);
      });
  
      fetchItemList();
  
      return ()=>isSubscribed=false;
    }



    //Voucher data list
  const [itemList, setItemList] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [pending, setPending] = useState(false);
  const [voucher_id, setVoucherId] = useState('')

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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/consumption-voucher`,{
      action: "getAllVouchers",
    })
    .then((res)=>{
      if(isSubscribed){
        setItemList(res?.data);
        setFilteredData(res.data?.data);
      }
    })
    .catch((err)=>{
      console.log("Server Error ~!")
    });
    
    return ()=> isSubscribed=false;
  };

useEffect(()=>{
  let controller = new AbortController();
  const result = data?.filter((item)=>{
    return item.voucher_number.toLowerCase().match(search.toLocaleLowerCase())
  });

  setFilteredData(result);
  return ()=> controller.abort();
},[search])





const actionButton=(voucher_id)=>{
    return <>
        <ul className="action">
            <li>
                <Link href={`/modules/roomManagement/tower/view/${voucher_id}`}>
                    <a>
                        <ViewIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href={`/modules/inventory/vouchers/update/${voucher_id}`}>
                    <a>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpenDelete(voucher_id)}>
                        <DeleteIcon />
                    </a>
                </Link>
   
            </li>

            </ul>
    </>
}

const columns = [

    {
        name: 'Voucher Number',
        selector: row =>row.voucher_number,
        sortable: true,

    },
    {
        name: 'Remarks',
        selector: row => row.remarks,
        sortable: true,
    },
    {
        name: 'Voucher Date',
        selector: row => row.voucher_date,
        sortable: true,
    },
    {
        name: 'Total Item',
        selector: row => row.total_item,
        sortable: true,
    },
    {
        name: 'Total Quantity',
        selector: row => row.total_item_qty,
        sortable: true,
    },
    {
      name: 'Creator',
      selector: row => row.creator.name,
      sortable: true,
    },
    {
        name: 'Created At',
        selector: row => moment(row.created_at).format('DD/MM/YYYY'),
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
    },
  
];



  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="card shadow">

                  <div className="d-flex border-bottom title-part-padding align-items-center">
                    <div>
                      <h4 class="card-title mb-0">All Consumption Vouchers</h4>
                    </div>
                    <div class="ms-auto flex-shrink-0">
                      <Button
                        className="shadow rounded"
                        variant="primary"
                        type="button"
                        onClick={handleShow}
                        block
                      >
                        Create Tower
                      </Button>
                      
                      {/* Delete Modal Form */}
                      <Modal show={showDeleteModal} onHide={handleExitDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <DeleteComponent onSubmit={handleDelete} voucherId={voucher_id} pending={pending}/>
                      </Modal>

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
                                  onChange={(e)=>setSearch(e.target.value)}
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
  )
}