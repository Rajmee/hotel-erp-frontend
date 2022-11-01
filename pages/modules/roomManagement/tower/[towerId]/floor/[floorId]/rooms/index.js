import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import EditIcon from "../../../../../../../../components/elements/EditIcon";
import Select2 from "../../../../../../../../components/elements/Select2";
import ViewIcon from "../../../../../../../../components/elements/ViewIcon";
import toast from "../../../../../../../../components/Toast/index";
import Axios from "../../../../../../../utils/axios";


//Update component
const ViewComponent = ({ roomId}) => {

    const {http} = Axios();

    const [room, setRoom]= useState({
      room_id:roomId,
      room_data:{}

    })
  
    const [loading, setLoading] = useState(true);
  
  
    const fetchRoomInfo = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getRoomInfo", room_id:roomId })
      .then((res)=>{
         if(isSubscribed){
          //console.log(res.data.data)
          setRoom(prev=>({
            ...prev, 
            room_data:res.data.data,
          }))

            setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomId]);
  
    useEffect(()=>{
      fetchRoomInfo();
    },[fetchRoomInfo])

  let facilities = ()=>{
    return <>
          <ul className="action">
            {
            room.room_data.type && room.room_data.type?.room_facilities?.map(item=>(
              <li><span className="badge font-weight-medium bg-light-primary text-primary">{item.facility}</span></li>
            ))
            }
          </ul>
      </>
    
  }

  if(loading) return <p>Loading...</p>
  if(!loading && room.room_data.type.room_facilities.length < 1) return <p>No Facilities Found !</p>

    return (

      <div>
      {
          facilities()
      }
      </div>
    );
  };
//Update component
const EditForm = ({ onSubmit,roomId, pending }) => {

    const {http} = Axios();

    const [room, setRoom]= useState({
      room_id:roomId,
      room_category_id:null,
      room_category:{},
      room_type_id:null,
      room_type_data:{},
      room_description:"",
      room_type_options:[],
      room_category_options:[],
    })
  
    const [loading, setLoading] = useState(true);

    let selected_room_type_options = { value: room.room_type_data?.id || "", label:room.room_type_data?.name || "select..." };
    let selected_room_category_options = { value: room.room_category?.id || "", label:room.room_category?.name || "select..." };

    //fetch all room categories

    useEffect(()=>{
        let isSubscribed = true;
        const fetchAllRoomCategories = async()=>{
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,{action: "allRoomCategories" })
            .then((res)=>{
                if(isSubscribed){
                  setRoom(prev=>({
                    ...prev, 
                    room_category_options:res.data.data
                  }))
                }
            })
            .catch((err)=>{
              console.log('Something went wrong !')
            });
            
        }

        fetchAllRoomCategories();
        return ()=> isSubscribed=false;

    },[])


    useEffect(()=>{
        let isSubscribed = true;
        const fetchAllRoomTypes = async()=>{
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getAllRoomTypes" })
            .then((res)=>{
                if(isSubscribed){
                  setRoom(prev=>({
                    ...prev, 
                    room_type_options:res.data.data
                  }))
                }
            })
            .catch((err)=>{
              console.log('Something went wrong !')
            });
            
        }

        fetchAllRoomTypes();
        return ()=> isSubscribed=false;

    },[])
  
  
    const fetchRoomInfo = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getRoomInfo", room_id:roomId })
      .then((res)=>{
         if(isSubscribed){
          console.log(res.data)
          setRoom(prev=>({
            ...prev, 
            room_category_id:res.data.data?.room_category?.id,
            room_category:res.data.data?.room_category,
            room_type_id:res.data.data.room_type.id,
            room_type_data:res.data.data.room_type,
            room_description:res.data.data?.room_description || "",
          }))

            setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomId]);
  
    useEffect(()=>{
      fetchRoomInfo();
    },[fetchRoomInfo])

    const handleChange =(e)=>{
      setRoom(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))
    }
  
    let dataset = {...room, action:"updateRoom"}
  
    return (
      <Form >
  
        <Form.Group controlId="formBasicName">
          <Form.Label>Room Type</Form.Label>

          {
            !loading &&
            <Select2
              options={room.room_type_options?.map(({ id, name }) => ({ value: id, label: name}))}
              defaultValue={selected_room_type_options}
              onChange={(e) =>setRoom(prev=>({...prev, room_type_id:e.value}))}
            />
          }
          {
            loading &&
            <Select2
              options={room.room_type_options?.map(({ id, name }) => ({ value: id, label: name}))}
              onChange={(e) =>setRoom(prev=>({...prev, room_type_id:e.value}))}
            />
          }

        </Form.Group>

        <Form.Group controlId="formBasicName" className="mb-3">
          <Form.Label>Room Category</Form.Label>

          {
            !loading &&
            <Select2
              options={room.room_category_options?.map(({ id, name }) => ({ value: id, label: name}))}
              defaultValue={selected_room_category_options}
              onChange={(e) =>setRoom(prev=>({...prev, room_category_id:e.value}))}
            />
          }
          {
            loading &&
            <Select2
              options={room.room_category_options?.map(({ id, name }) => ({ value: id, label: name}))}
              onChange={(e) =>setRoom(prev=>({...prev, room_category_id:e.value}))}
            />
          }

        </Form.Group>
  
        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Room Description</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            placeholder="Enter Room Description"
            name="room_description"
            defaultValue={room.room_description}
            onChange={handleChange}
          />
        </Form.Group>

=======
        <Form.Group controlId="formBasicName" className="mt-3">
          <Form.Label>Room Status</Form.Label>

          <Form.Select value={room?.room_status} onChange={handleChange} name="room_status" >
            <option value="" disabled> --select room status-- </option>
            <option value="available">Available</option>
            <option value="free">To be free/check-out</option>
            <option value="occupied">Occupied</option>
            <option value="dirty">Dirty</option>
            <option value="cleaning">Cleaning on process</option>
            <option value="reserved">Reserved for booking</option>
            <option value="maintenance">Damaged or under maintenance</option>
          </Form.Select>
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

export default function ListView() {

    const {http} = Axios();

    const router = useRouter();
    const {
      isReady,
      query: { towerId,floorId },
    } = router;

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);


  const [roomId,setRoomId] = useState('');
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = (room_id) =>{
    setShow(true);
    setRoomId(room_id);
  } 

  //Update floor Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pending, setPending] = useState(false);


  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (room_id) =>{
    setShowUpdateModal(true);
    setRoomId(room_id);
  } 


    //Update floor form
    const updateForm=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,formData)
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
          if(msg?.room_type_id){
            notify("error", `Room type must not be empty !`);
          }

          console.log(e)
  
         }
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
}, [towerId,floorId,isReady]);

const actionButton=(room_id)=>{
    return <>
        <ul className="action">
            <li>
                <Link href="#">
                    <a onClick={()=>handleShow(room_id)}>
                        <ViewIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpen(room_id)}>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>

            </ul>
    </>
}

=======
//Show status
const showStatus=(status)=>{
  if(status == 'available'){
    return <span className="badge font-weight-medium bg-info text-white">Available</span>
  }
  else if(status == 'free'){
    return <span className="badge font-weight-medium bg-primary text-white">To be free/check-out</span>
  }
  else if(status == 'occupied'){
    return <span className="badge font-weight-medium bg-secondary text-white">Occupied</span>
  }
  else if(status == 'dirty'){
    return <span className="badge font-weight-medium bg-success text-white">Dirty</span>
  }
  else if(status == 'cleaning'){
    return <span className="badge font-weight-medium bg-info text-white">Cleaning on process</span>
  }
  else if(status == 'reserved'){
    return <span className="badge font-weight-medium bg-dark text-white">Reserved for booking</span>
  }
  else{
    return <span className="badge font-weight-medium bg-warning text-white">Damaged or under maintenance</span>
  }
}

//if want to show facilities in row then use it
const facilities=(room_id)=>{

  const [room, setRoom]= useState({
    room_data:{}

  })

  const [loading, setLoading] = useState(true);


  const fetchRoomInfo = useCallback(async ()=>{
    let isSubscribed = true;
    setLoading(true)
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getRoomInfo", room_id:room_id })
    .then((res)=>{
       if(isSubscribed){
        console.log(res.data.data)
        setRoom(prev=>({
          ...prev, 
          room_data:res.data.data,
        }))

          setLoading(false)
       }
    })
    .catch((err)=>{
      console.log('Something went wrong !')
      setLoading(false)
    });

    return ()=> isSubscribed=false;

  },[room_id]);

  useEffect(()=>{
    fetchRoomInfo();
  },[fetchRoomInfo])


    return <>
        <ul className="action">
          {
          room.room_data.type && room.room_data.type?.room_facilities?.map(item=>(
            <li><span className="badge font-weight-medium bg-light-primary text-primary">{item.facility}</span></li>
          ))
          }
        </ul>
    </>
}


const columns = [

    {
        name: 'Room No.',
        selector: row =>row.room_no,
        sortable: true,
        width: "300px", 

    },
    {
        name: 'Room Type',
        selector: row => row?.room_type_name,
        sortable: true,
    },
    // {
    //     name: 'Room facilities',
    //     selector: row => facilities(row.id),
    //     sortable: true,
    // },
    {
        name: 'Room Description',
        selector: row => row.room_description,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.room_status == 1? "Active":"Inactive",
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
        width: "80px", 
    },
  
];


const data = itemList?.data?.rooms;

  const fetchItemList = async () => {

    if (!isReady) {
      return;
    }

    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
      action: "getTowerFloorInfo",
      tower_id:towerId,
      floor_id:floorId,
    })
    .then((res)=>{
      if(isSubscribed){
        setItemList(res?.data);
        setFilteredData(res.data?.data?.rooms);
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
            <div className="col-12">
                <div className="card shadow">
                    <div className="border-bottom title-part-padding">
                        <h4 className="card-title mb-0">All Rooms</h4>
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

                    {/* View Modal Form */}
                    <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="border-2">
                        <Modal.Title>Room Facilities</Modal.Title>
                        
                    </Modal.Header>
                    <Modal.Body>
                        <ViewComponent roomId={roomId}/>
                    </Modal.Body>
                    </Modal>
                    {/* End Update Modal Form */}
                    {/* Update Modal Form */}
                    <Modal dialogClassName="modal-lg"  show={showUpdateModal} onHide={handleExit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditForm onSubmit={updateForm} roomId={roomId} pending={pending}
                        />
                    </Modal.Body>
                    </Modal>
                    {/* End Update Modal Form */}


                </div>
            </div>
        </div>
    </div>
  )
}
