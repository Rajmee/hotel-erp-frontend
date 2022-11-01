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

//Create Component
const CreateForm = ({ onSubmit,loading }) => {

  const {http} = Axios();

  const [tower, setTower] = useState({
    name:"",
    description:"",
    tower_status:1
  })

  const handleChange =(e)=>{
    setTower(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

  let dataset = {...tower, action:"createTower"}

  return (
    <Form>
        <Form.Group controlId="formBasicName" >
          <Form.Label>Tower Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tower Name"
            defaultValue={tower.name}
            name='name'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDesc" className="mt-3">
          <Form.Label>Tower Description</Form.Label>

          <Form.Control as="textarea" rows={5} 
            placeholder="Enter Tower Description"
            name='description'
            onChange={handleChange} 
          />

        </Form.Group>

        <Form.Group controlId="formBasicStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <div className="mb-3 row">
            <div className="col-sm-9">
              <ul className="action d-flex align-items-center mt-2">
                <li>
                  <RadioButton
                    type="radio"
                    label="active"
                    value="1"
                    checked={tower.tower_status == "1"}
                    name="tower_status"
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    label="inactive"
                    value="0"
                    checked={tower.tower_status == "0"}
                    name="tower_status"
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
        </Form.Group>

      <Button variant="primary" className="shadow rounded" disabled={loading} style={{ marginTop: "5px" }} type="button" onClick={()=>onSubmit(dataset)} block>
        Create
      </Button>
    </Form>
  );
};


//Update component
const EditForm = ({ onSubmit,towerId, pending }) => {

    const {http} = Axios();
  
    const [loading, setLoading] = useState(true);
    const [tower, setTower] = useState({
      name:"",
      description:"",
      tower_status:1
    })
  
    const handleChange =(e)=>{
      setTower(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))
    }



    const fetchTower = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getTowerInfo", tower_id:towerId })
      .then((res)=>{
         if(isSubscribed){
          setTower(prev=>({
            ...prev, 
            name:res.data.data.name,
            description:res.data.data.description,
            tower_status:res.data.data.tower_status
          }))

          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[towerId]);
  
    useEffect(()=>{
      fetchTower();
    },[fetchTower])

    let dataset = {...tower, action:"updateTower", tower_id:towerId}
  
    return (
      <Form >
        <Form.Group controlId="formBasicName">
          <Form.Label>Tower Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tower Name"
            defaultValue={tower.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDesc" className="mt-3">
          <Form.Label>Tower Description</Form.Label>
          <Form.Control 
            as="textarea" rows={5}
            placeholder="Enter Tower Description"
            defaultValue={tower.description}
            name='description'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <div className="mb-3 row">
            <div className="col-sm-9">
              <ul className="action d-flex align-items-center mt-2">
                <li>
                  <RadioButton
                    type="radio"
                    label="active"
                    value="1"
                    checked={tower.tower_status == "1"}
                    name="tower_status"
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <RadioButton
                    type="radio"
                    label="inactive"
                    value="0"
                    checked={tower.tower_status == "0"}
                    name="tower_status"
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
          update
        </Button>
      </Form>
    );
  };

//Delete component
const DeleteComponent = ({ onSubmit,towerId, pending }) => {

    const {http} = Axios();
  
    const [name, setName] = useState(""); 
    const [loading, setLoading] = useState(true);


    const fetchTower = useCallback(async ()=>{
      let isSubscribed = true;
      setLoading(true)
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{action: "getTowerInfo", tower_id:towerId })
      .then((res)=>{
         if(isSubscribed){
          setName(res.data.data.name)
          setLoading(false)
         }
      })
      .catch((err)=>{
        console.log('Something went wrong !')
        setLoading(false)
      });
  
      return ()=> isSubscribed=false;
  
    },[towerId]);
  
    useEffect(()=>{
      fetchTower();
    },[fetchTower])
  
  
    let myFormData = new FormData(); 
  
    myFormData.append('action', "deleteTower");
    myFormData.append('tower_id', towerId);

    return (
      <>
        <Modal.Body>
          <Modal.Title>Are you sure to delete {name} ?</Modal.Title>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger"  disabled={pending || loading} onClick={()=>onSubmit(myFormData)}>
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
        if(msg?.description){
          notify("error", `${msg.description.Description}`);
        }

        console.log(e)

       }
       setLoading(false);
    });

    fetchItemList();

    return ()=>isSubscribed=false;
  }




  //Update Tower Modal form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [tower_id, setTowerId] = useState('')

  const handleExit = () => setShowUpdateModal(false);
  const handleOpen = (towerId) =>{
    setShowUpdateModal(true);
    setTowerId(towerId);
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
          if(msg?.name){
            notify("error", `${msg.name.Name}`);
          }
          if(msg?.description){
            notify("error", `${msg.description.Description}`);
          }

          console.log(e)
  
         }
         setPending(false);
      });
  
      fetchItemList();
  
      return ()=>isSubscribed=false;
    }


  //Delete Tower Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleExitDelete = () => setShowDeleteModal(false);
  const handleOpenDelete = (towerId) =>{
    setShowDeleteModal(true);
    setTowerId(towerId);
  } 


    //Delete Tower form
    const handleDelete=async(formData)=> {
      let isSubscribed = true;
      setPending(true);
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,formData)
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/roomManagement/tower`,{
      action: "getAllTowers",
    })
    .then((res)=>{
      if(isSubscribed){
        setItemList(res?.data);
        setFilteredData(res?.data?.data);
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





const actionButton=(tower_id)=>{
    return <>
        <ul className="action">
            <li>
                <Link href={`/modules/roomManagement/tower/view/${tower_id}`}>
                    <a>
                        <ViewIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpen(tower_id)}>
                        <EditIcon />
                    </a>
                </Link>
   
            </li>
            <li>
                <Link href="#">
                    <a onClick={()=>handleOpenDelete(tower_id)}>
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
    // {
    //     name: 'Total Rooms',
    //     selector: row => row.total_room,
    //     sortable: true,
    // },
    {
      name: 'Creator',
      selector: row => row.creator,
      sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.tower_status == 1? "Active":"Inactive",
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
                      <h4 class="card-title mb-0">All Towers</h4>
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

                      {/* Create Modal Form */}
                      <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Tower</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateForm onSubmit={submitForm} loading={loading}/>
                        </Modal.Body>
                      </Modal>
                      {/* End Create Modal Form */}

                      {/* Update Modal Form */}
                      <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Tower</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditForm onSubmit={updateForm} towerId={tower_id} pending={pending}
                            />
                        </Modal.Body>
                      </Modal>
                      {/* End Update Modal Form */}
                      {/* Delete Modal Form */}
                      <Modal show={showDeleteModal} onHide={handleExitDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <DeleteComponent onSubmit={handleDelete} towerId={tower_id} pending={pending}/>
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
