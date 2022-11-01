import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import Select2 from "../../../../components/elements/Select2";
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';

//Create Component
const CreateForm = ({ onSubmit,loading }) => {

  const {http} = Axios();

  const [roomFacility, setRoomFacility] = useState({
    facility:"",
  })


  const handleChange =(e)=>{
    setRoomFacility(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }



  let dataset = {...roomFacility, action:"createRoomFacility"}

  return (
    <Form>
        <Form.Group controlId="formBasicName" >
          <Form.Label>Room Facility</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Facility"
            name='facility'
            onChange={handleChange}
          />
        </Form.Group>

      <Button variant="primary" className="shadow rounded" disabled={loading} style={{ marginTop: "5px" }} type="button" onClick={()=>onSubmit(dataset)} block>
        Create
      </Button>
    </Form>
  );
};


//Update component
const EditForm = ({ onSubmit,roomFacilityId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [roomFacility, setRoomFacility] = useState({
      facility:"",
      room_facility_id:roomFacilityId,
    })
  
    const handleChange =(e)=>{
      setRoomFacility(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))
    }



    const fetchRoomFacilityData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,{action: "roomFacilityInfo", room_facility_id:roomFacilityId })
      .then((res)=>{
         if(isSubscribed){
          setRoomFacility(prev=>({
            ...prev, 
            facility:res.data.data.facility,

          }))

          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomFacilityId]);
  
    useEffect(()=>{
      fetchRoomFacilityData();
    },[fetchRoomFacilityData])

    let dataset = {...roomFacility, action:"updateRoomFacility"}
  
    return (
      <Form >
        <Form.Group controlId="formBasicName">
          <Form.Label>Room Facility</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Facility"
            defaultValue={roomFacility.facility}
            name="facility"
            onChange={handleChange}
          />
        </Form.Group>

  
        <Button variant="primary" className="shadow rounded" 
          disabled={pending || loading} style={{ marginTop: "5px" }}  
          onClick={()=>onSubmit(dataset)} 
        >
          update
        </Button>
      </Form>
    );
  };

//Delete component
const DeleteComponent = ({ onSubmit,roomFacilityId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [roomFacility, setRoomFacility] = useState({
      facility:"",
      room_facility_id:roomFacilityId
    })
    


    const fetchRoomFacilityData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,{action: "roomFacilityInfo", room_facility_id:roomFacilityId })
      .then((res)=>{
         if(isSubscribed){
          setRoomFacility(prev=>({
            ...prev, 
            facility:res.data.data.facility,

          }))

          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomFacilityId]);
  
    useEffect(()=>{
      fetchRoomFacilityData();
    },[fetchRoomFacilityData]);

    let dataset = {...roomFacility, action:"deleteRoomFacility"}

    return (
      <>
        <Modal.Body>
          <Modal.Title>Are you sure to delete {roomFacility.facility} ?</Modal.Title>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger"  disabled={pending || loading} onClick={()=>onSubmit(dataset)}>
            Delete
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

  //create floor form
  const submitForm=async(items)=> {
    let isSubscribed = true;
    setLoading(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,items)
    .then((res)=>{
      if(isSubscribed){
        notify("success", "successfully Added!");
        handleClose();
        setLoading(false);

      }

    })
    .catch((e)=>{
      const msg = e.response?.data?.response;

       if(typeof(msg) == 'string'){
        notify("error", `${msg}`);
       }
       else{
        if(msg?.facility){
          notify("error", `${msg.facility.Facility}`);
        }

       }
       setLoading(false);
    });

    fetchItemList();

    return ()=>isSubscribed=false;
  }




  //Update Tower Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [roomFacilityId, setRoomFacilityId] = useState(null)

  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (room_facilityId) =>{
    setShowUpdateModal(true);
    setRoomFacilityId(room_facilityId);
  } 


    //Update floor form
    const updateForm=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,formData)
      .then((res)=>{
        if(isSubscribed){
          notify("success", "successfully Updated!");
          handleExit();
          setPending(false);
  
        }
  
      })
      .catch((e)=>{
        const msg = e.response?.data?.response;
  
         if(typeof(msg) == 'string'){
          notify("error", `${msg}`);
         }
         else{
          if(msg?.facility){
            notify("error", `${msg.facility.Facility}`);
          }
  
         }
         setPending(false);
      });
  
      fetchItemList();
  
      return ()=>isSubscribed=false;
    }


  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (room_facilityId) =>{
    setShowDeleteModal(true);
    setRoomFacilityId(room_facilityId);
  } 


    //Delete Tower form
    const handleDelete=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,formData)
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,{
      action: "allRoomFacilities",
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
    return item.facility.toLowerCase().match(search.toLocaleLowerCase())
  });

  setFilteredData(result);
  return ()=> controller.abort();
},[search])





const actionButton=(roomFacilityId)=>{
    return <>
        <ul className="action ">

            <li>
                <Link href="#">
                    <a onClick={()=>handleOpen(roomFacilityId)}>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpenDelete(roomFacilityId)}>
                        <DeleteIcon />
                    </a>
                </Link>
   
            </li>

            </ul>
    </>
}

const columns = [

    {
        name: 'Facility',
        selector: row =>row.facility,
        sortable: true,
 

    },
    {
        name: 'Status',
        selector: row => row.status == 1? "Active":"Inactive",
        sortable: true,

    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
        width: "80px",

    },
  
];



  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="card shadow">

                  <div className="d-flex border-bottom title-part-padding align-items-center">
                    <div>
                      <h4 class="card-title mb-0">All Room Facilities</h4>
                    </div>
                    <div class="ms-auto flex-shrink-0">
                      <Button
                        className="shadow rounded"
                        variant="primary"
                        type="button"
                        onClick={handleShow}
                        block
                      >
                        Create Room Facility
                      </Button>

                      {/* Create Modal Form */}
                      <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Room Facility</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateForm onSubmit={submitForm} loading={loading}/>
                        </Modal.Body>
                      </Modal>
                      {/* End Create Modal Form */}

                      {/* Update Modal Form */}
                      <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Room Facility</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm onSubmit={updateForm} roomFacilityId={roomFacilityId} pending={pending}
                            />
                        </Modal.Body>
                      </Modal>
                      {/* End Update Modal Form */}
                      {/* Delete Modal Form */}
                      <Modal show={showDeleteModal} onHide={handleExitDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <DeleteComponent onSubmit={handleDelete} roomFacilityId={roomFacilityId} pending={pending}/>
                      </Modal>

                    </div>
                  </div>


                  <div className="card-body">
                      <div className="">

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