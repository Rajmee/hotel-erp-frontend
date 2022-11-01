import * as moment from 'moment';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
//import Button from '../../../../../components/elements/Button';
//import Form from '../../../../../components/elements/Form';
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import EditIcon from "../../../../../components/elements/EditIcon";
import ViewIcon from "../../../../../components/elements/ViewIcon";
import toast from "../../../../../components/Toast/index";
import Axios from "../../../../utils/axios";

const AddFloorForm = ({ onSubmit,towerid,loading }) => {

  const {http} = Axios();

  const [floor, setFloor]= useState({
    name:"",
    tower_id:towerid,
    total_rooms:"",
    room_prefix:"",
    room_length:"",
    status:1
  })

  const handleChange =(e)=>{
    setFloor(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  let dataset = {...floor, action:"createFloor"}

  return (
    <Form >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Floor Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Floor Name"
          name="name"
          value={floor.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Total Rooms</Form.Label>
        <Form.Control
          type="number"
          placeholder="Total Rooms"
          name="total_rooms"
          value={floor.total_rooms}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Room Length</Form.Label>
        <Form.Control
          type="number"
          placeholder="Room Length"
          name="room_length"
          value={floor.room_length}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Room Number Prefix</Form.Label>
        <Form.Control
          type="text"
          placeholder="Room Number Prefix"
          name="room_prefix"
          value={floor.room_prefix}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" className="shadow rounded" 
        disabled={loading} style={{ marginTop: "5px" }} 
        type="button" onClick={()=>onSubmit(dataset)} block
      >
        Create
      </Button>
    </Form>
  );
};

//Update component
const UpdateFloorForm = ({ onSubmit,towerid,floorId, pending }) => {

  const {http} = Axios();

  const [floor, setFloor]= useState({
    name:"",
    tower_id:towerid,
    floor_id:floorId,
    total_rooms:"",
    room_prefix:"",
    room_length:"",
    status:1
  })

  const [loading, setLoading] = useState(true);


  const fetchFloorInfo = useCallback(async ()=>{
    let isSubscribed = true;
    setLoading(true)
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getTowerFloorInfo", tower_id:towerid, floor_id:floorId })
    .then((res)=>{
       if(isSubscribed){
        setFloor(prev=>({
          ...prev, 
          name:res.data.data.name,
          total_rooms:res.data.data.total_rooms,
          room_prefix:res.data.data.room_prefix
        }))

        setLoading(false)
       }
    })
    .catch((err)=>{
      console.log('Something went wrong !')
      setLoading(false)
    });

    return ()=> isSubscribed=false;

  },[towerid,floorId]);

  useEffect(()=>{
    fetchFloorInfo();
  },[fetchFloorInfo])


  const handleChange =(e)=>{
    setFloor(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  let dataset = {...floor, action:"updateFloor"}

  return (
    <Form >

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Floor Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Floor Name"
          name="name"
          value={floor.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Total Rooms</Form.Label>
        <Form.Control
          type="number"
          placeholder="Total Rooms"
          name="total_rooms"
          value={floor.total_rooms}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Room Length</Form.Label>
        <Form.Control
          type="number"
          placeholder="Room Length"
          name="room_length"
          value={floor.room_length}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Room Number Prefix</Form.Label>
        <Form.Control
          type="text"
          placeholder="Room Number Prefix"
          name="room_prefix"
          value={floor.room_prefix}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" className="shadow rounded" disabled={pending || loading} 
        style={{ marginTop: "5px" }} type="button" 
        onClick={()=>onSubmit(dataset)} block>
          Update
      </Button>
    </Form>
  );
};

export default function View() {

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const { http } = Axios();

  const router = useRouter();
  const {
    isReady,
    query: { id },
  } = router;

  const [tower, setTowerData] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const fetchTower = useCallback(async () => {
    if (!isReady) {
      console.log("fetching...");
      return;
    }

    let isSubscribed = true;
    await http
      .post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`, {
        action: "getTowerInfo",
        tower_id: id,
      })
      .then((res) => {
        if (isSubscribed) {
          setTowerData(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Something went wrong !");
      });

    return () => (isSubscribed = false);
  }, [id, isReady]);

  useEffect(() => {
    fetchTower();
  }, [fetchTower]);

  //create floor form
  const submitForm=async(items)=> {
    let isSubscribed = true;
    setLoading(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,items)
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
        if(msg?.name){
          notify("error", `${msg.name.Name}`);
        }
        if(msg?.tower_id){
          notify("error", `Tower must not be empty`);
        }
        if(msg?.total_rooms){
          notify("error", `Rooms must not be empty`);
        }
        if(msg?.room_length){
          notify("error", `Room length must not be empty`);
        }
        if(msg?.room_prefix){
          notify("error", `Room prefix must not be empty`);
        }
        if(msg?.status){
          notify("error", `Floor status must not be empty`);
        }
        console.log(e)

       }
       setLoading(false);
    });

    fetchItemList();

    return ()=>isSubscribed=false;
  }


  //Update floor Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [floorInfo,setFloorInfo] = useState('');
  const [fId,setFId] = useState('');
  //console.log(floorInfo);
  //console.log(fId);

  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (id) =>{
    setShowUpdateModal(true);
    setFId(id);
  } 


    //Update floor form
    const updateForm=async(fdata)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,fdata)
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
          if(msg?.name){
            notify("error", `${msg.name.Name}`);
          }
          if(msg?.tower_id){
            notify("error", `Tower must not be empty`);
          }
          if(msg?.total_rooms){
            notify("error", `Rooms must not be empty`);
          }
          if(msg?.room_length){
            notify("error", `Room length must not be empty`);
          }
          if(msg?.room_prefix){
            notify("error", `Room prefix must not be empty`);
          }
          if(msg?.status){
            notify("error", `Floor status must not be empty`);
          }
          console.log(e)
  
         }
         setPending(false);
      });
  
      fetchItemList();
  
      return ()=>isSubscribed=false;
    }



  //Tower Floor Data
  const [itemList, setItemList] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  React.useEffect(() => {
    const timeout = setTimeout(() => {
          fetchItemList();
    });
    return () => clearTimeout(timeout);
}, [id,isReady]);


const actionButton=(floor_id)=>{
    return <>
        <ul className="action">
            <li>
                <Link href={`/modules/roomManagement/tower/${id}/floor/${floor_id}/rooms`}
                >
                <a>
                    <ViewIcon />
                </a>
                </Link>
            </li>
            <li>
              <Link href="#" >
                <a onClick={()=>handleOpen(floor_id)} >
                    <EditIcon />
                </a>
              </Link>
   
            </li>

            {/* <li>
              <Link href="#" >
                <a  onClick={()=>handleDelete(id)}>
                  <DeleteIcon/>
                </a>
              </Link>
            </li> */}
            </ul>
    </>
}



const columns = [

    {
        name: 'Floor',
        selector: row =>row.name,
        sortable: true,

    },
    {
        name: 'Total Rooms',
        selector: row => row.total_rooms,
        sortable: true,
    },
    {
        name: 'Room Prefix',
        selector: row => row.room_prefix,
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
    },
  
];


const data = itemList?.data;

  const fetchItemList = async () => {

    if (!isReady) {
        return;
    }

    setLoading(true);
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
      action: "getTowerFloors",
      tower_id:id,
    })
    .then((res)=>{
      if(isSubscribed){
        setItemList(res?.data);
        setFilteredData(res.data?.data);
        setLoading(false);
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
    return item.room_no.toLowerCase().match(search.toLocaleLowerCase())
  });

  setFilteredData(result);
  return ()=> controller.abort();
},[search])


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <div className="card shadow">
                <div className="border-bottom title-part-padding">
                  <h4 className="card-title mb-0">
                    Tower info
                  </h4>
                </div>
                <div className="card-body">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td width={390}>Name</td>
                            <td>{tower && tower.name}</td>
                          </tr>
                          <tr>
                            <td>Description</td>
                            <td>{tower && tower.description}</td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td>{tower && tower.tower_status==1? 'Active':'Inactive'}</td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card shadow">
            <div className="border-bottom title-part-padding">
              <h4 className="card-title mb-0">
                Creation/updating related info
              </h4>
            </div>
            <div className="card-body">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td width={390}>Created By</td>
                        <td>{tower && tower?.creator?.name}</td>
                      </tr>
                      <tr>
                        <td>Created At</td>
                        <td>{tower && moment(tower.created_at).format('DD/MM/YYYY')}</td>
                      </tr>
                      <tr>
                        <td>Updated By</td>
                        <td>{tower && tower.updated_by? tower.updated_by:'-'}</td>
                      </tr>
                      <tr>
                        <td>Updated At</td>
                        <td>{tower && moment(tower.updated_at).format('DD/MM/YYYY')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">

          <div className="card shadow">
            <div className="d-flex border-bottom title-part-padding align-items-center">
              <div>
                <h4 class="card-title mb-0">Floor Info</h4>
              </div>
              <div class="ms-auto flex-shrink-0">
                <Button
                  className="shadow rounded"
                  variant="primary"
                  type="button"
                  onClick={handleShow}
                  block
                >
                  Create Floor
                </Button>
                {/* Create Modal Form */}
                <Modal dialogClassName="modal-lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Floor</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <AddFloorForm onSubmit={submitForm} towerid={tower?.id} loading={loading}/>
                  </Modal.Body>
                </Modal>
                {/* End Create Modal Form */}

                {/* Update Modal Form */}
                <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Floor</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <UpdateFloorForm onSubmit={updateForm} towerid={tower?.id}
                      floorId={fId} pending={pending}
                    />
                  </Modal.Body>
                </Modal>
                {/* End Update Modal Form */}
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
  );
}
