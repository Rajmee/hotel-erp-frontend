import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';


//Create Component
const CreateForm = ({ onSubmit,loading }) => {

  const {http} = Axios();

  const [roomCategory, setRoomCategory] = useState({
    name:"",
    description:""
  })


  const handleChange =(e)=>{
    setRoomCategory(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }



  let dataset = {...roomCategory, action:"createRoomCategory"}

  return (
    <Form>
        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category Name"
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            placeholder="Enter Category Description"
            name='description'
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
const EditForm = ({ onSubmit,roomCategoryId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [roomCategory, setRoomCategory] = useState({
      name:"",
      description:"",
      room_category_id:roomCategoryId,
    })
  
    const handleChange =(e)=>{
      setRoomCategory(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))
    }



    const fetchRoomCategoryData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,{action: "roomCategoryInfo", room_category_id:roomCategoryId })
      .then((res)=>{
         if(isSubscribed){
          setRoomCategory(prev=>({
            ...prev, 
            name:res.data.data.name,
            description:res.data.data.description

          }))

          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[roomCategoryId]);
  
    useEffect(()=>{
      fetchRoomCategoryData();
    },[fetchRoomCategoryData])

    let dataset = {...roomCategory, action:"updateRoomCategory"}
  
    return (
      <Form >
        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Room Category Name"
            defaultValue={roomCategory.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName" className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" rows={5}
            placeholder="Enter Category Description"
            defaultValue={roomCategory.description}
            name="description"
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
const DeleteComponent = ({ onSubmit,roomCategoryId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [roomCategory, setRoomCategory] = useState({
      name:"",
      room_category_id:roomCategoryId
    })
    


    const fetchRoomCategoryData = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,{action: "roomCategoryInfo", room_category_id:roomCategoryId })
      .then((res)=>{
         if(isSubscribed){
          setRoomCategory(prev=>({
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
  
    },[roomCategoryId]);
  
    useEffect(()=>{
      fetchRoomCategoryData();
    },[fetchRoomCategoryData]);

    let dataset = {...roomCategory, action:"deleteRoomCategory"}

    return (
      <>
        <Modal.Body>
          <Modal.Title>Are you sure to delete {roomCategory.name} ?</Modal.Title>
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,items)
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
  const [roomCategoryId, setRoomCategoryId] = useState(null)

  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (room_categoryId) =>{
    setShowUpdateModal(true);
    setRoomCategoryId(room_categoryId);
  } 


    //Update floor form
    const updateForm=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,formData)
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
  
         }
         setPending(false);
      });
  
      fetchItemList();
  
      return ()=>isSubscribed=false;
    }


  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (room_CategoryId) =>{
    setShowDeleteModal(true);
    setRoomCategoryId(room_CategoryId);
  } 


    //Delete Tower form
    const handleDelete=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,formData)
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/roomCategory`,{
      action: "allRoomCategories",
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





const actionButton=(roomCategoryId)=>{
    return <>
        <ul className="action ">

            <li>
                <Link href="#">
                    <a onClick={()=>handleOpen(roomCategoryId)}>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpenDelete(roomCategoryId)}>
                        <DeleteIcon />
                    </a>
                </Link>
   
            </li>

            </ul>
    </>
}

const columns = [

    {
        name: 'Name',
        selector: row =>row.name,
        sortable: true,
 

    },
    {
        name: 'Description',
        selector: row => row.description,
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
                      <h4 class="card-title mb-0">All Room Categories</h4>
                    </div>
                    <div class="ms-auto flex-shrink-0">
                      <Button
                        className="shadow rounded"
                        variant="primary"
                        type="button"
                        onClick={handleShow}
                        block
                      >
                        Create Room Category
                      </Button>

                      {/* Create Modal Form */}
                      <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Room Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateForm onSubmit={submitForm} loading={loading}/>
                        </Modal.Body>
                      </Modal>
                      {/* End Create Modal Form */}

                      {/* Update Modal Form */}
                      <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Room Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm onSubmit={updateForm} roomCategoryId={roomCategoryId} pending={pending}
                            />
                        </Modal.Body>
                      </Modal>
                      {/* End Update Modal Form */}
                      {/* Delete Modal Form */}
                      <Modal show={showDeleteModal} onHide={handleExitDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <DeleteComponent onSubmit={handleDelete} roomCategoryId={roomCategoryId} pending={pending}/>
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