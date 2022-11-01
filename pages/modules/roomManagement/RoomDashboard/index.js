import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Select2 from '../../../../components/elements/Select2';
import toast from '../../../../components/Toast/index';
import Axios from '../../../utils/axios';

//Update component
const EditForm = ({ onSubmit,roomId, pending }) => {

    const {http} = Axios();

    const [room, setRoom]= useState({
      room_id:roomId,
      room_type_id:null,
      room_category_id:null,
      room_category:{},
      room_type_data:{},
      room_description:"",
      room_status:"",
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

    //fetch all room types

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
          //console.log(res.data)
          setRoom(prev=>({
            ...prev, 
            room_category_id:res.data.data?.room_category?.id,
            room_category:res.data.data?.room_category,
            room_type_id:res.data.data.room_type.id,
            room_type_data:res.data.data.room_type,
            room_description:res.data.data?.room_description || "",
            room_status:res.data.data?.room_status || "",
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
  
        <Form.Group controlId="formBasicName" className="mb-3">
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
  
        <Form.Group controlId="formBasicPassword" className='mb-3'>
          <Form.Label>Room Description</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            placeholder="Enter Room Description"
            name="room_description"
            defaultValue={room.room_description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName" className="mb-3">
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

export default function index() {
    const {http} = Axios();
    const ref = useRef(null);
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);

    const [room, setRoom]=useState([]);
    const [roomType,setRoomType]=useState([]);
    const [room_id, setRoomId] = useState(null);

    //Towers
    const [towers,setTowers]=useState([]);
    const [towerIds, setTowerIds] = useState([]);
    //console.log(towerIds);
    const [store_status,setStoreStatus] = useState([]);

    console.log(store_status);

    console.log(room);
    // console.log(Object.keys(room));
    // console.log(roomType);

    const fetchData = useCallback(async()=>{
        let isSubscribed=true;
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
            action: "getAllTowersRooms", towerIds:towerIds, room_status:store_status
          })
          .then((res)=>{
            if(isSubscribed){
                setRoom(res.data.data);
                setRoomType(Object.keys(res.data.data));
            }
          })
          .catch((err)=>{
            console.log("Server Error ~!");
          });

          

          return ()=>isSubscribed=false;

    },[towerIds,store_status])

    useEffect(()=>{
        fetchData();
      },[fetchData,])


    //Update Room Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleExit = () => setShowUpdateModal(false);

  const handleDoubleClick = (event,roomId) => {
    if (event.detail === 2) {
      setRoomId(roomId);
      setShowUpdateModal(true);

      const timer = setTimeout(() => {
        //console.log("Time Out for double click")
        
      }, 2500);

      return () => clearTimeout(timer);


    }
  };

    const renderTooltip = (props) => (

        <Tooltip  id="tooltip-top" {...props}>
          {props}
        </Tooltip>
      );

        //Update Room
        const [pending, setPending]=useState(false);

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
        
                //console.log(e)
        
                }
                setPending(false);
            });
        
            fetchData();
        
            return ()=>isSubscribed=false;
            
        }
    
    //Store Room Ids
    const [roomIds, setRoomIds]=useState([]);
    //console.log(roomIds)
    //store dom event while checked
    const [dom, setDom]= useState([]);

    const handleInputChange=(event)=> {
        const target = event.target;
           if(target.checked){
             setRoomIds((prev) => [...prev, target.value]); 

            //  under this line is very helpful to get checked element from dom
              dom.push(document.querySelector(`.Mycheckbox-${target.value}`));
           }
           else{
            setRoomIds(roomIds.filter(element => element !== event.target.value))
           }
        
       }

    //Fetch Towers
    const fetchTowers = useCallback(async()=>{
        let isSubscribed=true;
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
            action: "getTowers",
          })
          .then((res)=>{
            if(isSubscribed){
                setTowers(res.data.data);

            }
          })
          .catch((err)=>{
            console.log("Server Error ~!");
          });

          return ()=>isSubscribed=false;

    },[])

    useEffect(()=>{
        fetchTowers();
    },[fetchTowers])


    const storeTowerIds=(event)=> {

        const target = event.target;
           if(target.checked){
            setTowerIds((prev) => [...prev, target.value]); 
           }
           else{
            setTowerIds(towerIds.filter(element => element !== event.target.value))
           }
        
       }

    //dropdown status
    const [roomStatus,setRoomStatus]= useState("");
    const [selectDom, setSelectDom] = useState();

    const handleSetStatus=(e)=>{
        setRoomStatus(e.target.value);

        //reset status dropdown select options
        var dropDown = document.querySelector("#roomStatus");
        const timer = setTimeout(() => {
          dropDown.selectedIndex = 0;
          
        }, 2000);
        return () => clearTimeout(timer);

      }


    const unCheck=()=> {
      //console.log(dom);
      for(let i=0; i<=dom.length; i++) {
        //unchecked
         dom[i].checked = false;
         //then remove roomIds Array
         roomIds.splice(0);
       }   
    }


    const roomStatusChange = async(e) =>{
      
       let isSubscribed=true;
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
            action: "updateRoomStatus", roomIds:roomIds, roomStatus:roomStatus
          })
          .then((res)=>{
           if(isSubscribed){
              notify("success", "Room status has been Updated!");
              unCheck();
           }
        })
        .catch((e)=>{
            const msg = e.response?.data?.response;
    
            if(typeof(msg) == 'string'){
                notify("error", `${msg}`);
            }

        });

        fetchData();

        return ()=>isSubscribed=false;


    }

  //Show room status color
  // const showRoomStatus=(status,roomNumber)=>{
  //   if(status == 'available'){
  //     return <span className="badge fs-2 fw-bold btn btn-info text-white">{roomNumber}</span>
  //   }
  //   else if(status == 'free'){
  //     return <span className="badge fs-2 fw-bold btn btn-primary text-white">{roomNumber}</span>
  //   }
  //   else if(status == 'occupied'){
  //     return <span className="badge fs-2 fw-bold btn btn-secondary text-white">{roomNumber}</span>
  //   }
  //   else if(status == 'dirty'){
  //     return <span className="badge fs-2 fw-bold btn btn-success text-white">{roomNumber}</span>
  //   }
  //   else if(status == 'cleaning'){
  //     return <span className="badge fs-2 fw-bold btn btn-info text-white">{roomNumber}</span>
  //   }
  //   else if(status == 'reserved'){
  //     return <span className="badge fs-2 fw-bold btn btn-dark text-white">{roomNumber}</span>
  //   }
  //   else{
  //     return <span className="badge fs-2 fw-bold btn btn-warning text-white">{roomNumber}</span>
  //   }
  // }
  const showRoomStatus=(status,roomNumber,roomId)=>{
    if(status == 'available'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-info">{roomNumber}</label>
    }
    else if(status == 'free'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-primary">{roomNumber}</label>
    }
    else if(status == 'occupied'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-secondary">{roomNumber}</label>
    }
    else if(status == 'dirty'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-success">{roomNumber}</label>
    }
    else if(status == 'cleaning'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-info">{roomNumber}</label>
    }
    else if(status == 'reserved'){
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-dark">{roomNumber}</label>
    }
    else{
      return <label htmlFor={roomId} className="fs-2 fw-bold btn btn-outline-warning ">{roomNumber}</label>
    }
  }
  
  //Show tower Name
  const [towerInfo,setTowerInfo] = useState({});

  const towerIdSet=async(towerid)=>{
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
      action: "getTowerInfo", tower_id:towerid
    })
    .then((res)=>{
      if(isSubscribed){
          setTowerInfo(res.data.data);
      }
    })
    .catch((err)=>{
      console.log("Server Error ~!");
    });

    return ()=> isSubscribed=false;
  }

  //Store status with checkbox in right panel
  const storeStatusVal=(event)=> {

    const target = event.target;
       if(target.checked){
        setStoreStatus((prev) => [...prev, target.value]); 
       }
       else{
        setStoreStatus(store_status.filter(element => element !== event.target.value))
       }
    
   }

  let roomCount;

  if(room.length < 1){
    roomCount=(
      <div className='text-center'>
        <p>No Data Found !</p>
      </div>
    )
  }


    return (
        <div className="container-fluid">
    
          <div className="row">
            <div className="col-12">
                <div className="card shadow p-3">
                    <div className="row border-bottom">
                        <div className="col-md-10">
                            <div className="d-flex flex-gap align-content-start   title-part-padding align-items-center">


                                <h4>Towers:</h4>
                                {
                                    towers && towers.map(tower=>(
                                        <div className='text-center' key={tower.id}>
            
                                            <input type="checkbox"  id={tower.id} value={tower.id}  onChange={storeTowerIds} className='d-none'/>
                                            <label htmlFor={tower.id}>
                                                <span className="badge custom-badge fs-4 fw-bold btn btn-info text-white">{tower.name}</span> 
                                            </label>
                                        </div>
                                    ))
                                }
                

                            </div>
                        </div>

                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                            <Form>
                                <Form.Group controlId="formBasicName"  className="d-inline mx-2">
                        
                                    <Form.Select id="roomStatus" defaultValue="" onClick={roomStatusChange} onChange={handleSetStatus }  className="border-2 border-warning statusDropdown">
                                        <option value="" disabled >Select Room Status</option>
                                        <option value="available">Available</option>
                                        <option value="free">To be free/check-out</option>
                                        <option value="occupied">Occupied</option>
                                        <option value="dirty">Dirty</option>
                                        <option value="cleaning">Cleaning on process</option>
                                        <option value="reserved">Reserved for booking</option>
                                        <option value="maintenance">Damaged or under maintenance</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </div>

                    </div>

                    {/* Update Modal Form */}
                    <Modal dialogClassName="modal-lg"  show={showUpdateModal} onHide={handleExit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm onSubmit={updateForm} roomId={room_id} pending={pending}/>
                        </Modal.Body>
                    </Modal>
                    {/* End Update Modal Form */}
                 
                
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-10">

                        {roomCount}

                        {
                            roomType && roomType.map((room_type,index)=>(

                                <div className='mb-3 border border-1 p-3 shadow rounded bg-white' key={index}>

                                    <div>
                                        <h4>{room_type}</h4>
                                    </div>

                                    <div className='align-content-start flex-gap'>
                                      
                                        {
                                          room &&  room[`${room_type}`]?.map(room=>(

                                            <div className='text-center' onMouseOver={()=>towerIdSet(room.tower_id)} onClick={event=>handleDoubleClick(event,room.id)} key={room.id}>
                                                <input type="checkbox"  id={room.id}  value={room.id}  onChange={handleInputChange}  className={`d-none Mycheckbox-${room.id} btn-check`}/>
                                                {/* <label htmlFor={room.id}> */}
                                                <OverlayTrigger trigger={['click', 'hover', 'focus']}  placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(`${towerInfo.name || "waiting..."}`)}>
                                                    {showRoomStatus(room.room_status,room.room_no,room.id)}
                                                </OverlayTrigger>
                                                {/* </label> */}
                                            </div>
                                          ))
                                        }

                                        
                                    </div>

                                </div>
                            ))
                        }


                            

                            
                        </div>

                        <div className="col-md-2 p-0">
                            <div className='border border-1 p-3 shadow rounded bg-white'>

                                <div className="form-check">
                                  <input className="form-check-input available border border-success rounded-circle" type="checkbox" value="available" id="available" onChange={storeStatusVal} />
                                  <label className="form-check-label" htmlFor="available">
                                    <h5 className='text-success'>Available</h5>
                                  </label>
                                </div>

                                <div className="form-check">
                                  <input className="form-check-input free border border-info rounded-circle" type="checkbox" value="free" id="free" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="free">
                                    <h5 className='text-info'>To be free/check-out</h5>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input occupied border border-danger rounded-circle" type="checkbox" value="occupied" id="occupied" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="occupied">
                                    <h5 className='text-danger'>Occupied</h5>
                                  </label>
                                </div>

                                <div className="form-check">
                                  <input className="form-check-input dirty border border-primary rounded-circle" type="checkbox" value="dirty" id="dirty" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="dirty">
                                    <h5 className='text-primary'>Dirty</h5>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input cleaning border border-secondary rounded-circle" type="checkbox" value="cleaning" id="cleaning" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="cleaning">
                                    <h5 className='text-secondary'>Cleaning on process</h5>
                                  </label>
                                </div>

                                <div className="form-check">
                                  <input className="form-check-input reserved border border-warning rounded-circle" type="checkbox" value="reserved" id="reserved" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="reserved">
                                    <h5 className='text-warning'>Reserved for booking</h5>
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input maintenance border border-light rounded-circle" type="checkbox" value="maintenance" id="maintenance" onChange={storeStatusVal}/>
                                  <label className="form-check-label" htmlFor="maintenance">
                                    <h5 className='text-muted'>Damaged or under maintenance</h5>
                                  </label>
                                </div>

                                <h4 style={{color:"red"}}>
                                    <i className="
                                        ri-checkbox-blank-circle-fill
                                        align-middle
                                        font-10
                                        me-2"
                                    ></i>Checked
                                </h4>
                                <h6>Note: Double click for updating room info.</h6>
                            </div>
                        </div>

                    </div>





                </div>
    
              </div>
    
            </div>
          </div>
    
        </div>
      );
}



