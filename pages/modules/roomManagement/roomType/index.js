import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import makeAnimated from 'react-select/animated';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import RadioButton from '../../../../components/elements/RadioButton';
import Select2 from "../../../../components/elements/Select2";
import { FileSelectButton, MRIfileManagerRender, MRI_Uploader } from '@mdrakibul8001/filemanager';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';

//Create Component
const CreateForm = ({ onSubmit,loading }) => {

  const {http} = Axios();

  const animatedComponents = makeAnimated();

  const notify = React.useCallback((type, message) => {
      toast({ type, message });
    }, []);

  const [roomType, setRoomType] = useState({
    name:"",
    adults:0,
    childrens:0,
    beds:0,
    smoking_status:0,
    room_type_id:null,
    room_facility_options:[],
    room_facilityIds:[],
    upload_files:[],
    upload_ids:[],
  })

  const [arr, setArr]=useState([]);
  const [filesArr, setFilesArr]=useState([]);

  const facility_options = roomType.room_facility_options.data;

  const handleChange =(e)=>{
    setRoomType(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  const changeRoomFacility=(e)=>{

    setRoomType(prev=>({
      ...prev, room_facilityIds:(Array.isArray(e)?e.map(x=>x.value):[])
    }))

  }


  useEffect(()=>{
    let isSubscribed = true;
    const AllRoomFacilities = async()=>{
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,{action: "allRoomFacilities" })
        .then((res)=>{
            if(isSubscribed){
              setRoomType(prev=>({
                ...prev, 
                room_facility_options:res.data
              }))
            }
        })
        .catch((err)=>{
          console.log('Something went wrong !')
        });
        
    }

    AllRoomFacilities();
    return ()=> isSubscribed=false;

  },[])

  // start File manager section
  //function set selected files ids
  const setFilesData=(data)=>{
    for (let i = 0; i < data.length; i++) {
      filesArr.push(data[i]);
    }

    setRoomType(prev=>({
      ...prev, upload_files:filesArr
    }))
  }

    //function set selected files ids
    const setIds=(Ids)=>{
  
      for (let i = 0; i < Ids.length; i++) {
         arr.push(Ids[i]);
      }
  
      setRoomType(prev=>({
        ...prev, upload_ids:arr
      }))

    };
  
    const removePhoto = (id) => {
      //Ids array remove
      let filtered = arr.filter(function(item){ 
        return item != id;
      });

      setArr(filtered);
  
      setRoomType(prev=>({
        ...prev, upload_ids:filtered
      }))

      //remove files array of objects
      const newList = filesArr.filter((item) => item.id !== id);
      setFilesArr(newList);
  
      setRoomType(prev=>({
        ...prev, upload_files:newList
      }))
  
    }
// End File manager section

  let dataset = {...roomType, action:"createRoomType"}

  return (
    //wrap this MRIfileManagerRender component where you want to integrate file-manager. Make sure exist setIds function.
    <MRIfileManagerRender setIds={setIds} setFilesData={setFilesData}   render={(show,handleClose,uploadIds,selecteLoading,handleShow,files)=>(<>

    {/* MRI_Uploader Modal Form */}
    <Modal  dialogClassName="modal-xlg"   show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>File Uploader</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <MRI_Uploader onSubmitUploads={uploadIds} selectLoading={selecteLoading}/>

      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
    {/* End MRI_Uploader Modal Form */}

    <Form>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Type"
            name='name'
            onChange={handleChange}
          />
        </Form.Group>

        {/* Choose File Button */}
        <FileSelectButton handleShow={handleShow} files={roomType} removePhoto={removePhoto}/>
        {/* End choose file button */}
        <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Room Facilities</Form.Label>
          <Select2
            isMulti
            options={facility_options && facility_options.map(({ id, facility }) => ({ value: id, label: facility}))}
            onChange={changeRoomFacility}
            components={animatedComponents}
            closeMenuOnSelect={false}
            
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Audults</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of adults"
            name='adults'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Childrens</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of childrens"
            name='childrens'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Beds</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of beds"
            name='beds'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStatus" className="mt-3">
          <Form.Label>Smoking</Form.Label>
          <div className="mb-3 row">
            <div className="col-sm-9">
              <ul className="action d-flex align-items-center mt-2">
                <li>
                  <RadioButton
                    type="radio"
                    label="Allow"
                    value="1"
                    checked={roomType.smoking_status == "1"}
                    name="smoking_status"
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    label="Disallow"
                    value="0"
                    checked={roomType.smoking_status == "0"}
                    name="smoking_status"
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
        </Form.Group>

      <Button variant="primary" className="shadow rounded mb-3" disabled={loading} style={{ marginTop: "5px" }} type="button" onClick={()=>onSubmit(dataset)} block>
        Create
      </Button>
    </Form>


    </>)} />



  );
};


//Update component
const EditForm = ({ onSubmit,roomTypeId, pending }) => {

    const {http} = Axios();

    const animatedComponents = makeAnimated();
  
    const [loading, setLoading] = useState(true);
    const [roomType, setRoomType] = useState({
      name:"",
      adults:null,
      childrens:null,
      beds:null,
      smoking_status:null,
      room_type_id:roomTypeId,
      room_type_data:{},
      room_facility_options:[],
      room_facilityIds:[],
      upload_ids:[],
      upload_files:[]
    })

    const [arr, setArr]=useState([]);
    const [filesArr, setFilesArr]=useState([]);
  
    const handleChange =(e)=>{
      setRoomType(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))
    }

    const changeRoomFacility=(e)=>{

      setRoomType(prev=>({
        ...prev, room_facilityIds:(Array.isArray(e)?e.map(x=>x.value):[])
      }))
  
    }

    //All Room Facilities options data
    useEffect(()=>{
      let isSubscribed = true;
      const AllRoomFacilities = async()=>{
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_facility`,{action: "allRoomFacilities" })
          .then((res)=>{
              if(isSubscribed){
                setRoomType(prev=>({
                  ...prev, 
                  room_facility_options:res.data.data
                }))
              }
          })
          .catch((err)=>{
            console.log('Something went wrong !')
          });
          
      }
  
      AllRoomFacilities();
      return ()=> isSubscribed=false;
  
    },[])

    const fetchRoomTypeData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,{action: "roomTypeInfo", room_type_id:roomTypeId })
      .then((res)=>{
         if(isSubscribed){
          setRoomType(prev=>({
            ...prev, 
            name:res.data.data.name,
            adults:res.data.data.adults,
            childrens:res.data.data.childrens,
            beds:res.data.data.beds,
            smoking_status:res.data.data.smoking_status,
            room_type_data:res.data.data,
            room_facilityIds:(res.data.data?.room_facilities?.map(facility=>facility.id)),

          }));

          if(res.data.data?.photos.length > 0){

            setRoomType(prev=>({
              ...prev,
              upload_ids:res.data?.data?.photos,
              upload_files:res.data?.data?.uploadsData,
            }))

            setArr(res.data.data?.photos);
            setFilesArr(res.data?.data?.uploadsData)
          }
          
          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomTypeId]);
  
    useEffect(()=>{
      fetchRoomTypeData();
    },[fetchRoomTypeData])
    
// start File manager section
  const setFilesData=(data)=>{
    for (let i = 0; i < data.length; i++) {
      filesArr.push(data[i]);
    }

    setRoomType(prev=>({
      ...prev, upload_files:filesArr
    }))

  }

  //function set selected files ids
  const setIds=(Ids)=>{

    for (let i = 0; i < Ids.length; i++) {
       arr.push(Ids[i]);
    }

    setRoomType(prev=>({
      ...prev, upload_ids:arr
    }))

    
  };

  const removePhoto = (id) => {

    let filtered = arr.filter(function(item){ 
      return item != id;
    });

    setArr(filtered);

    setRoomType(prev=>({
      ...prev, upload_ids:filtered
    }))

    const newList = filesArr.filter((item) => item.id !== id);
    setFilesArr(newList);

    setRoomType(prev=>({
      ...prev, upload_files:newList
    }))

  }
// End File manager section

    let dataset = {...roomType, action:"updateRoomType"}
  
    return (
      //wrap this MRIfileManagerRender component where you want to integrate file-manager. Make sure exist setIds function.
    <MRIfileManagerRender setIds={setIds} setFilesData={setFilesData}  render={(show,handleClose,uploadIds,selecteLoading,handleShow,files)=>(<>

      {/* MRI_Uploader Modal Form */}
      <Modal  dialogClassName="modal-xlg"  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>File Uploader</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
          <MRI_Uploader onSubmitUploads={uploadIds} selectLoading={selecteLoading}/>
  
        </Modal.Body>
        <Modal.Footer>
  
        </Modal.Footer>
      </Modal>
      {/* End MRI_Uploader Modal Form */}

      <Form >
        <Form.Group controlId="formBasicName" className="mb-3">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Type"
            defaultValue={roomType.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        {/* Choose File Button */}
        <FileSelectButton handleShow={handleShow} files={roomType} removePhoto={removePhoto}/>
        {/* End choose file button */}




        <Form.Group controlId="formBasicName" className="mb-3">
          <Form.Label>Room Facilities</Form.Label>

          {
            !loading &&
            <Select2
              isMulti
              options={roomType.room_facility_options?.map(({ id, facility }) => ({ value: id, label: facility}))}
              defaultValue={roomType.room_type_data?.room_facilities?.map(({ id, facility }) => ({ value: id, label: facility}))}
              onChange={changeRoomFacility}
              components={animatedComponents}
              closeMenuOnSelect={false}
            />
          }
          {
            loading &&
            <Select2
              isMulti
              options={roomType.room_facility_options?.map(({ id, facility }) => ({ value: id, label: facility}))}
              onChange={changeRoomFacility}

            />
          }

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Audults</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of adults"
            defaultValue={roomType.adults}
            name='adults'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Childrens</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of childrens"
            defaultValue={roomType.childrens}
            name='childrens'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>No.of Beds</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No.of beds"
            defaultValue={roomType.beds}
            name='beds'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStatus" className="mt-3">
          <Form.Label>Smoking</Form.Label>
          <div className="mb-3 row">
            <div className="col-sm-9">
              <ul className="action d-flex align-items-center mt-2">
                <li>
                  <RadioButton
                    type="radio"
                    label="Allow"
                    value="1"
                    checked={roomType.smoking_status == "1"}
                    name="smoking_status"
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    label="Disallow"
                    value="0"
                    checked={roomType.smoking_status == "0"}
                    name="smoking_status"
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
        </Form.Group>

  
        <Button variant="primary" className="shadow rounded" 
          disabled={pending || loading} style={{ marginTop: "5px" }}  
          onClick={()=>onSubmit(dataset)} 
        >
          {pending?'updating...':'update'}
        </Button>
      </Form>

      </>)} />
    );
  };

//Delete component
const DeleteComponent = ({ onSubmit,roomTypeId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [roomType, setRoomType] = useState({
      name:"",
      room_type_id:roomTypeId
    })
    


    const fetchRoomTypeData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,{action: "roomTypeInfo", room_type_id:roomTypeId })
      .then((res)=>{
         if(isSubscribed){
          setRoomType(prev=>({
            ...prev, 
            name:res.data.data.name,

          }))

          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomTypeId]);
  
    useEffect(()=>{
      fetchRoomTypeData();
    },[fetchRoomTypeData]);

    let dataset = {...roomType, action:"deleteRoomType"}

    return (
      <>
        <Modal.Body>
          <Modal.Title>Are you sure to delete {roomType.name} ?</Modal.Title>
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,items)
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

       }
       setLoading(false);
    });

    fetchItemList();

    return ()=>isSubscribed=false;
  }




  //Update Tower Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [roomTypeId, setRoomTypeId] = useState(null)

  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (room_typeId) =>{
    setShowUpdateModal(true);
    setRoomTypeId(room_typeId);
  } 


    //Update floor form
    const updateForm=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,formData)
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
          if(msg?.smoking_status){
            notify("error", `Smoking status must not be empty !`);
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
  const handleOpenDelete = (room_typeId) =>{
    setShowDeleteModal(true);
    setRoomTypeId(room_typeId);
  } 


    //Delete Tower form
    const handleDelete=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,formData)
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/room_type`,{
      action: "allRoomTypes",
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
    return item.name.toLowerCase().match(search.toLocaleLowerCase())
  });

  setFilteredData(result);
  return ()=> controller.abort();
},[search])





const actionButton=(roomTypeId)=>{
    return <>
        <ul className="action ">

            <li>
                <Link href="#">
                    <a onClick={()=>handleOpen(roomTypeId)}>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpenDelete(roomTypeId)}>
                        <DeleteIcon />
                    </a>
                </Link>
   
            </li>

            </ul>
    </>
}


const smokeStatus=(status)=>(
  <>
    {status == 1 ? <span className="badge font-weight-medium bg-info text-white">Allow</span> : <span className="badge font-weight-medium bg-danger text-white">Disallow</span>}
  </>
)


const columns = [

    {
        name: 'Name',
        selector: row =>row.name,
        sortable: true,
        width: "250px",
    },
    {
        name: 'Facilities',
        selector: row => row.room_facilities.map((facility)=>(<><span className="badge font-weight-medium bg-light-primary text-primary">{facility.facility}</span>&nbsp;</>)),
        sortable: true,
        width: "770px",
    },
    {
      name: 'Beds',
      selector: row =>row.beds,
      sortable: true,
      width: "100px",
    },
    {
      name: 'Adults',
      selector: row =>row.adults,
      sortable: true,
      width: "100px",
    },
    {
      name: 'Childrens',
      selector: row =>row.childrens,
      sortable: true,
      width: "110px",
    },
    {
      name: 'Smoking',
      selector: row =>smokeStatus(row.smoking_status),
      sortable: true,
      width: "110px",
    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
        width: "80px",                       // added line here

    },
  
];



  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="card shadow">

                  <div className="d-flex border-bottom title-part-padding align-items-center">
                    <div>
                      <h4 class="card-title mb-0">All Room Types</h4>
                    </div>
                    <div class="ms-auto flex-shrink-0">
                      <Button
                        className="shadow rounded"
                        variant="primary"
                        type="button"
                        onClick={handleShow}
                        block
                      >
                        Create Room Type
                      </Button>



                      {/* Create Modal Form */}
                      <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Room Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateForm onSubmit={submitForm} loading={loading}/>
                        </Modal.Body>
                      </Modal>
                      {/* End Create Modal Form */}

                      {/* Update Modal Form */}
                      <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Room Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm onSubmit={updateForm} roomTypeId={roomTypeId} pending={pending}
                            />
                        </Modal.Body>
                      </Modal>
                      {/* End Update Modal Form */}
                      {/* Delete Modal Form */}
                      <Modal show={showDeleteModal} onHide={handleExitDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <DeleteComponent onSubmit={handleDelete} roomTypeId={roomTypeId} pending={pending}/>
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