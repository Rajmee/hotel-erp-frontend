import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../../components/elements/EditIcon';
import RadioButton from '../../../../../components/elements/RadioButton';
import Select2 from "../../../../../components/elements/Select2";
import Select from '../../../../../components/elements/Select';
import FileSelectButton from '../../../../../components/MRIfileManager/FileSelectButton';
import toast from "../../../../../components/Toast/index";
import Axios from '../../../../utils/axios';
import TextInput from '../../../../../components/elements/TextInput';

//Create Component
const CreateForm = ({ onSubmit,loading }) => {

    const {http} = Axios();
  
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
      }, []);
  
    const [location, setLocation] = useState({
      title:"",
      title_prefix:"",
      location_type:"",
      description:"",
      range_start:0,
      range_end:0,
    })
  
    const [warehouseList, setWarehouseList] = useState("");
    const [levelList, setLevelList] = useState("");
    const [warehouseId, setWarehouseId] = useState();
    const [levelId, setLevelId] = useState();
    const [levelNumber, setLevelNumber] = useState();
    const [catLoading, setCatLoading] = useState(false)
    const [pending, setPending] = useState(false)

    const [locationList, setLocationList] = useState("");
    const [locationtwoList, setLocationtwoList] = useState("");
    const [locationthreeList, setLocationthreeList] = useState("");
    const [locationfourList, setLocationfourList] = useState("");

    const [locationOneId, setLocationOneId] = useState();
    const [locationTwoId, setLocationTwoId] = useState();
    const [locationThreeId, setLocationThreeId] = useState();
    const [locationFourId, setLocationFourId] = useState();
  
    const handleChange =(e)=>{
        setLocation(prev=>({
        ...prev, [e.target.name]:e.target.value
      }))

      if(e.target.name == 'level_name'){
        setLevelName([{id: 1, name: e.target.value}])
      }
    }
  
    useEffect(()=>{
      let isSubscribed = true;
      const AllWarehouses = async()=>{
          setCatLoading(true)
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse`,{action: "getAllWarehouse" })
          .then((res)=>{
              if(isSubscribed){
                setWarehouseList(res.data.data);
                  setCatLoading(false)
              }
          })
          .catch((err)=>{
            console.log('Something went wrong !')
          });
      }
  
      AllWarehouses();
      getLevelByWarehouse()
      if(warehouseId && levelId){
        getLocationByLevel();
      }
      if(locationOneId){
        getLocationByLocationOne()
      }
      if(locationTwoId){
        getLocationByLocationTwo()
      }
      if(locationThreeId){
        getLocationByLocationThree()
      }
      return ()=> isSubscribed=false;
  
    },[warehouseId, levelId, locationOneId, locationTwoId, locationThreeId])


    const changeWarehouse = (e)=>{
        if(e.value){
          setWarehouseId(e.value);
        }
      }
  
      const getLevelByWarehouse = async()=>{
        let isSubscribed = true;
        if(warehouseId !== ""){
          setPending(true)
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,{action: "getLevelByWarehouse",id: warehouseId})
          .then((res)=>{
            if(isSubscribed){
              setLevelList(res.data.data);
              setPending(false)
            }
          });
        }
        return ()=> isSubscribed=false;
      }

      const changeLevel = (e)=>{
        if(e.target.value){
          setLevelNumber($("#levelSelect").find("option:selected").attr('level_number'))
          setLevelId(e.target.value);
        }
      }

      const getLocationByLevel = async()=>{
        let isSubscribed = true;
        if(levelId !== ""){
          setPending(true) 
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,{action: "getLocationByLevel",warehouseId: warehouseId, levelId: levelId, current_id: warehouseId})
          .then((res)=>{
            if(isSubscribed){
              setLocationList(res.data.data);
              setPending(false)
            }
          })
          .catch((e)=>{
            const msg = e.response?.data?.response;
             if(typeof(msg) == 'string'){
              notify("error", `${msg}`);
              setLevelId('')
             }
          });
          
        }
        return ()=> isSubscribed=false;
      }

      const changeLocationOne = (e)=>{
        if(e.target.value){
          setLocationOneId(e.target.value);
        }
      }

      const getLocationByLocationOne = async()=>{
        let isSubscribed = true;
        if(locationOneId !== ""){
          setPending(true)
          
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,{action: "getLocationByLocation",warehouseId: warehouseId, current_id: locationOneId})
          .then((res)=>{
            if(isSubscribed){
              console.log(res)
              setLocationtwoList(res.data.data);
              setPending(false)
            }
          });
        }
        return ()=> isSubscribed=false;
      }

      const changeLocationTwo = (e)=>{
        if(e.target.value){
          setLocationTwoId(e.target.value);
        }
      }

      const getLocationByLocationTwo = async()=>{
        let isSubscribed = true;
        if(locationTwoId !== ""){
          setPending(true)
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,{action: "getLocationByLocation",warehouseId: warehouseId, current_id: locationTwoId})
          .then((res)=>{
            if(isSubscribed){
              console.log(res)
              setLocationthreeList(res.data.data);
              setPending(false)
            }
          });
        }
        return ()=> isSubscribed=false;
      }

      const changeLocationThree = (e)=>{
        if(e.target.value){
          setLocationThreeId(e.target.value);
        }
      }

      const getLocationByLocationThree = async()=>{
        let isSubscribed = true;
        if(locationThreeId !== ""){
          setPending(true)
          await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,{action: "getLocationByLocation",warehouseId: warehouseId, current_id: locationThreeId})
          .then((res)=>{
            if(isSubscribed){
              console.log(res)
              setLocationfourList(res.data.data);
              setPending(false)
            }
          });
        }
        return ()=> isSubscribed=false;
      }

      const changeLocationFour = (e)=>{
        if(e.target.value){
          setLocationFourId(e.target.value);
        }
      }
  
    let dataset = {...location, warehouseId, levelId, locationOneId, locationTwoId, locationThreeId, locationFourId, action:"createLocation"}
  
    return (
  
      <Form>
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Warehouse</Form.Label>
          <Select2
            options={warehouseList && warehouseList.map(({ id, name }) => ({ value: id, label: name}))}
            onChange={changeWarehouse}
          />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location Level</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={levelId} id="levelSelect" onChange={changeLevel}>
              <option value="">Select Location Level</option>
              {levelList &&
              levelList?.map((level,ind)=>(
              <>
              <option key={ind} value={level.id} level_number={level.level_number}>{level.label}</option>
              </>
              ))
              }
            </Select>
            )}
          </Form.Group>

          <div className="row">
            <div className="col-md-3">
            {locationList &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {levelList[0].label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationOneId} onChange={changeLocationOne}>
              <option value="">Select Location of {levelList[0].label}</option>
              {locationList &&
              locationList?.map((level,ind)=>(
              <>
              <option value={level.id}>{level.title}</option>
              </>
              ))
              }
            </Select>
            )}
          </Form.Group>}
            </div>
            <div className="col-md-3">
            {locationList && locationtwoList && levelNumber>=3 &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {levelList[1].label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationTwoId} onChange={changeLocationTwo}>
              <option value="">Select Location of {levelList[1].label}</option>
              {locationtwoList &&
              locationtwoList?.map((level,ind)=>(
              <>
              <option value={level.id}>{level.title}</option>
              </>
              ))
              }
            </Select>
            )}
          </Form.Group>}
            </div>
            <div className="col-md-3">
            {locationList && locationthreeList && levelNumber>=4 &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {levelList[2].label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationThreeId} onChange={changeLocationThree}>
              <option value="">Select Location of {levelList[2].label}</option>
              {locationthreeList &&
              locationthreeList?.map((level,ind)=>(
              <>
              <option value={level.id}>{level.title}</option>
              </>
              ))
              }
            </Select>
            )}
          </Form.Group>}
            </div>
            <div className="col-md-3">
            {locationList && locationfourList && levelNumber>=5 &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {levelList[3].label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationFourId} onChange={changeLocationFour}>
              <option value="">Select Location of {levelList[3].label}</option>
              {locationfourList &&
              locationfourList?.map((level,ind)=>(
              <>
              <option value={level.id}>{level.title}</option>
              </>
              ))
              }
            </Select>
            )}
          </Form.Group>}
            </div>
          </div>
          
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Select name="location_type" onChange={handleChange}>
              <option value="">Select Location Type</option>
              <option value="Individual-Location">Individual Location</option>
              <option value="Ranged-Location">Ranged Location</option>
          </Select>
          </Form.Group>
  
         <div className={`${(location.location_type == 'Individual-Location') ? '' : 'd-none'}`}>
          <Form.Group className="mb-3" controlId="formBasicName" >
              <Form.Label>Location Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location Title"
                name='title'
                onChange={handleChange}
              />
          </Form.Group>
         </div>

         <div className={`${(location.location_type == 'Ranged-Location') ? '' : 'd-none'}`}>
          <div className="row">
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicName" >
              <Form.Label>Location Title Prefix</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location Title Prefix"
                name='title_prefix'
                onChange={handleChange}
              />
             </Form.Group>
            </div>
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Range Start</Form.Label>
            <Form.Control
              type="number"
              placeholder="Range Start"
              name='range_start'
              onChange={handleChange}
            />
            </Form.Group>
            </div>
            <div className="col-md-4">
            <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Range End</Form.Label>
            <Form.Control
              type="number"
              placeholder="Range End"
              name='range_end'
              onChange={handleChange}
            />
            </Form.Group>
            </div>
          </div>
         </div>
  
          <Form.Group controlId="formBasicDesc" className="mt-3">
            <Form.Label>Location Description</Form.Label>
  
            <Form.Control as="textarea" rows={5} 
              placeholder="Enter Location Description"
              name='description'
              onChange={handleChange} 
            />
          </Form.Group>
  
        <Button variant="primary" className="shadow rounded mb-3" disabled={loading || catLoading} style={{ marginTop: "5px" }} type="button" onClick={()=>onSubmit(dataset)} block>
          Create
        </Button>
      </Form>
    );
  };
  
  
  //Update component
  const EditForm = ({ onSubmit,itemId, pending }) => {
  
      const {http} = Axios();
    
      const [loading, setLoading] = useState(true);
      const [item, setItem] = useState({
          name:"",
          item_type:"",
          description:"",
          unit_cost:"",
          unit_type:"",
          opening_stock:"",
          min_stock:"",
          warehouse:"",
          status:0,
          item_id:itemId,
        })
      
        const [categories, setCategoryList] = useState("");
        const [category_id, setCategoryId] = useState();
        const [catLoading, setCatLoading] = useState(false)
    
      const handleChange =(e)=>{
          setItem(prev=>({
          ...prev, [e.target.name]:e.target.value
        }))
      }
  
      //All category data
      useEffect(()=>{
          let isSubscribed = true;
          const AllParentCat = async()=>{
              setCatLoading(true)
              await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/category`,{action: "getSubCategories" })
              .then((res)=>{
                  if(isSubscribed){
                      setCategoryList(res.data.data);
                      setCatLoading(false)
                  }
              })
              .catch((err)=>{
                console.log('Something went wrong !')
              });
          }
      
          AllParentCat();
          return ()=> isSubscribed=false;
      
      },[])
  
      const fetchItemData = useCallback(async ()=>{
        let isSubscribed = true;
        setLoading(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getItemInfo", item_id:itemId })
        .then((res)=>{
           if(isSubscribed){
              setItem(prev=>({
              ...prev, 
              name:res.data.data.name,
              item_type:res.data.data.item_type,
              description:res.data.data.description,
              unit_cost:res.data.data.unit_cost,
              unit_type:res.data.data.unit_type,
              opening_stock:res.data.data.opening_stock,
              min_stock:res.data.data.min_stock,
              warehouse:res.data.data.warehouse,
              status: res.data.data.status,
            }));
            setCategoryId(res.data.data.inventory_category_id)
            setLoading(false)
           }
        })
        .catch((err)=>{
          console.log('Something went wrong !')
          setLoading(false)
        });
    
        return ()=> isSubscribed=false;
    
      },[itemId]);
    
      useEffect(()=>{
          fetchItemData();
      },[fetchItemData])
      
  
      let dataset = {...item, category_id, action:"editItem"}
    
      return (
  
        <Form >
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Item Name"
              defaultValue={item.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicDesc" >
            <Form.Label>Select Category</Form.Label>
            {catLoading ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select Category</option>
              {categories &&
              categories?.map((cat,ind)=>(
               <>
               {cat?.children_recursive?.length != 0 ?
                  <option disabled value={cat.id}>{cat.name}</option>
               :
                  <option value={cat.id}>{cat.name}</option>
               }
                
                {cat?.children_recursive?.length != 0 && (
                  <ItemSubCat cat={cat} dot='----' />
                )} 
              </>
              ))
              }
            </Select>
            )}
        </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Select value={item.item_type} name="item_type" onChange={handleChange}>
              <option value="">Select Item Type</option>
              <option value="one-time-usable">One Time Usable</option>
              <option value="long-time-usable">Long time usable</option>
              <option value="depreciable-item">Depreciable item</option>
              <option value="laundry-item">Laundry item</option>
          </Select>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Unit Cost</Form.Label>
            <Form.Control
              type="number"
              defaultValue={item.unit_cost}
              placeholder="Enter Unit cost of item"
              name='unit_cost'
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Select value={item.unit_type} name="unit_type" onChange={handleChange}>
              <option value="">Select Unit Type</option>
              <option value="Piece">Piece</option>
              <option value="KG">KG</option>
              <option value="Ltr">Ltr</option>
              <option value="gm">gm</option>
              <option value="Meter">Meter</option>
              <option value="Feet">Feet</option>
              <option value="Inch">Inch</option>
              <option value="Box">Box</option>
          </Select>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Opening Stock</Form.Label>
            <Form.Control
              type="number"
              defaultValue={item.opening_stock}
              placeholder="Opening Stock"
              name='opening_stock'
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Minimum Stock</Form.Label>
            <Form.Control
              type="number"
              defaultValue={item.min_stock}
              placeholder="Minimum Stock"
              name='min_stock'
              onChange={handleChange}
            />
          </Form.Group>
  
          <Form.Group controlId="formBasicDesc" className="mt-3">
            <Form.Label>Item Description</Form.Label>
  
            <Form.Control as="textarea" rows={5} 
              placeholder="Enter Item Description"
              defaultValue={item.description}
              name='description'
              onChange={handleChange} 
            />
          </Form.Group>
  
    
          <Button variant="primary" className="shadow rounded" 
            disabled={pending || loading} style={{ marginTop: "5px" }}  
            onClick={()=>onSubmit(dataset)} 
          >
            {pending?'updating...':'update'}
          </Button>
        </Form>
      );
    };
  
  //Delete component
  const DeleteComponent = ({ onSubmit,itemId, pending }) => {
  
      const {http} = Axios();
    
      const [loading, setLoading] = useState(true);
      const [item, setItem] = useState({
        item_id:itemId
      })
  
      let dataset = {...item, action:"deleteItem"}
  
      return (
        <>
          <Modal.Body>
            <Modal.Title>Are you sure to delete ?</Modal.Title>
          </Modal.Body>
          <Modal.Footer>
  
            <Button variant="danger"  disabled={pending} onClick={()=>onSubmit(dataset)}>
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
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/warehouse/location`,items)
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
          if(msg?.location_type){
              notify("error", `${msg.location_type.Location_type}`);
            }
          if(msg?.levelId){
          notify("error", `${msg.levelId.LevelId}`);
          }
          if(msg?.title){
          notify("error", `${msg.title.Title}`);
          }
          if(msg?.title_prefix){
              notify("error", `${msg.title_prefix.Title_prefix}`);
          }
          if(msg?.range_start){
            notify("error", `${msg.range_start.Range_start}`);
          }
          if(msg?.range_end){
            notify("error", `${msg.range_end.Range_end}`);
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
    const [itemId, setItemId] = useState(null)
  
    const handleExit = () => setShowUpdateModal(false);
    const handleOpen = (item_id) =>{
      setShowUpdateModal(true);
      setItemId(item_id);
    } 
  
  
      //Update floor form
      const updateForm=async(formData)=> {
        let isSubscribed = true;
        setPending(true);
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,formData)
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
            if(msg?.category_id){
                notify("error", `${msg.category_id.Category_id}`);
              }
            if(msg?.unit_cost){
            notify("error", `${msg.unit_cost.Unit_cost}`);
            }
            if(msg?.unit_type){
            notify("error", `${msg.unit_type.Unit_type}`);
            }
            if(msg?.item_type){
                notify("error", `${msg.item_type.Item_type}`);
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
    const handleOpenDelete = (item_id) =>{
      setShowDeleteModal(true);
      setItemId(item_id);
    } 
  
  
      //Delete Tower form
      const handleDelete=async(formData)=> {
        let isSubscribed = true;
        setPending(true);
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,formData)
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
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{
        action: "getAllItems",
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
  
  
  
  
  
  const actionButton=(itemId)=>{
      return <>
          <ul className="action ">
  
              <li>
                  <Link href="#">
                      <a onClick={()=>handleOpen(itemId)}>
                          <EditIcon />
                      </a>
                  </Link>
     
              </li>
              <li>
                  <Link href="#">
                      <a onClick={()=>handleOpenDelete(itemId)}>
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
          name: 'Item Code',
          selector: row => row.code,
          sortable: true,
      },
      {
        name: 'Category',
        selector: row =>row.name,
        sortable: true,
      },
      {
        name: 'Unit Cost',
        selector: row =>row.unit_cost,
        sortable: true,
      },
      {
        name: 'Quantity',
        selector: row =>row.qty,
        sortable: true,
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
                        <h4 class="card-title mb-0">All Items</h4>
                      </div>
                      <div class="ms-auto flex-shrink-0">
                        <Button
                          className="shadow rounded"
                          variant="primary"
                          type="button"
                          onClick={handleShow}
                          block
                        >
                          Add Location
                        </Button>
  
  
  
                        {/* Create Modal Form */}
                        <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Add Warehouse Location</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <CreateForm onSubmit={submitForm} loading={loading}/>
                          </Modal.Body>
                        </Modal>
                        {/* End Create Modal Form */}
  
                        {/* Update Modal Form */}
                        <Modal dialogClassName="modal-lg" show={showUpdateModal} onHide={handleExit}>
                          <Modal.Header closeButton>
                              <Modal.Title>Update Item</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                              <EditForm onSubmit={updateForm} itemId={itemId} pending={pending}
                              />
                          </Modal.Body>
                        </Modal>
                        {/* End Update Modal Form */}
                        {/* Delete Modal Form */}
                        <Modal show={showDeleteModal} onHide={handleExitDelete}>
                          <Modal.Header closeButton></Modal.Header>
                          <DeleteComponent onSubmit={handleDelete} itemId={itemId} pending={pending}/>
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