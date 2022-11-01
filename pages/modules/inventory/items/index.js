import Link from 'next/link';
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import Select from '../../../../components/elements/Select';
import Select2 from "../../../../components/elements/Select2";
import ItemSubCat from '../../../../components/inventory_category/ItemSubCat';
import toast from "../../../../components/Toast/index";
import Axios from '../../../utils/axios';

//Create Component
const CreateForm = ({ onSubmit,loading }) => {

  const {http} = Axios();

  const notify = React.useCallback((type, message) => {
      toast({ type, message });
    }, []);

  const [item, setItem] = useState({
    name:"",
    item_type:"",
    description:"",
    unit_cost:0,
    unit_type:"",
    opening_stock:0,
    min_stock:0,
    warehouse:"",
    status:0,
  })

  const [categories, setCategoryList] = useState("");
  const [category_id, setCategoryId] = useState();
  const [catLoading, setCatLoading] = useState(false)

  const [pending, setPending] = useState(false)

  const [warehouseList, setWarehouseList] = useState("");
  const [warehouseId, setWarehouseId] = useState();
  const [levelList, setLevelList] = useState("");
  const [levelNumber, setLevelNumber] = useState();
  
  const [locationList, setLocationList] = useState("");
  const [locationtwoList, setLocationtwoList] = useState("");
  const [locationthreeList, setLocationthreeList] = useState("");
  const [locationfourList, setLocationfourList] = useState("");
  const [locationfiveList, setLocationfiveList] = useState("");

  const [locationOneId, setLocationOneId] = useState();
  const [locationTwoId, setLocationTwoId] = useState();
  const [locationThreeId, setLocationThreeId] = useState();
  const [locationFourId, setLocationFourId] = useState();
  const [locationFiveId, setLocationFiveId] = useState();

  const [data, setData] = useState();

  const handleChange =(e)=>{
    setItem(prev=>({
      ...prev, [e.target.name]:e.target.value
    }))
  }

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

    AllParentCat();
    AllWarehouses();
    
    if(warehouseId){
      getLocationByWarehouse()
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
    if(locationFourId){
      getLocationByLocationFour()
    }
    return ()=> isSubscribed=false;

  },[warehouseId, locationOneId, locationTwoId, locationThreeId, locationFourId])

    const changeWarehouse = (e)=>{
      if(e.value){
        setWarehouseId(e.value);
      }
    }

    const getLocationByWarehouse = async()=>{
      let isSubscribed = true;
      if(warehouseId !== ""){
        setPending(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: warehouseId})
        .then((res)=>{
          if(isSubscribed){
            setLocationList(res.data.data);
            setPending(false)
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
        
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationOneId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationTwoId()
              setLocationThreeId()
              setLocationFourId()
              setLocationFiveId()
              setLocationtwoList("")
              setLocationthreeList("")
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationtwoList(res.data.data);
            }
            
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
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationTwoId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationThreeId()
              setLocationFourId()
              setLocationFiveId()
              setLocationthreeList("")
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationthreeList(res.data.data);
            }
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
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationThreeId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationFourId()
              setLocationFiveId()
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationfourList(res.data.data);
            }
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

    const getLocationByLocationFour = async()=>{
      let isSubscribed = true;
      if(locationFourId !== ""){
        setPending(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationFourId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationFiveId()
              setLocationfiveList("")
            }
            else{
              setLocationfiveList(res.data.data);
            }
            setPending(false)
          }
        });
      }
      return ()=> isSubscribed=false;
    }

    const changeLocationFive = (e)=>{
      if(e.target.value){
        setLocationFiveId(e.target.value);
      }
    }

  let dataset = {...item, category_id, locationList, locationtwoList, locationthreeList, locationfourList, locationfiveList, locationOneId, locationTwoId, locationThreeId, locationFourId, locationFiveId, action:"createItem"}

  return (

    <Form>
        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Item Name"
            name='name'
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
          <Form.Label>Select Warehouse</Form.Label>
          <Select2
            options={warehouseList && warehouseList.map(({ id, name }) => ({ value: id, label: name}))}
            onChange={changeWarehouse}
          />
        </Form.Group>

        <div className="row">
            <div className="col-md-4">
            {locationList!="" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationOneId} onChange={changeLocationOne}>
              <option value="">Select Location of {locationList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-4">
            {locationList && locationtwoList!="" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationtwoList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationTwoId} onChange={changeLocationTwo}>
              <option value="">Select Location of {locationtwoList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-4">
            {locationList && locationtwoList!="" && locationthreeList != "" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationthreeList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationThreeId} onChange={changeLocationThree}>
              <option value="">Select Location of {locationthreeList[0]?.warehouse_level.label}</option>
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
          </div>

          <div className="row">
            <div className="col-md-6">
              {locationList && locationtwoList!="" && locationthreeList != "" && locationfourList!=""  &&
              <Form.Group className="mb-3" controlId="formBasicDesc" >
              <Form.Label>Select Location of {locationfourList[0]?.warehouse_level.label}</Form.Label>
                {pending ? (
                  <Select>
                    <option value="">loading...</option>
                  </Select>
                ) : (
                  <Select value={locationFourId} onChange={changeLocationFour}>
                  <option value="">Select Location of {locationfourList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-6">
              {locationList && locationtwoList!="" && locationthreeList != "" && locationfourList!="" && locationfiveList!=""  &&
              <Form.Group className="mb-3" controlId="formBasicDesc" >
              <Form.Label>Select Location of {locationfiveList[0]?.warehouse_level.label}</Form.Label>
                {pending ? (
                  <Select>
                    <option value="">loading...</option>
                  </Select>
                ) : (
                  <Select value={locationFiveId} onChange={changeLocationFive}>
                  <option value="">Select Location of {locationfourList[0]?.warehouse_level.label}</option>
                  {locationfiveList &&
                  locationfiveList?.map((level,ind)=>(
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
        <Select name="item_type" onChange={handleChange}>
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
            placeholder="Enter Unit cost of item"
            name='unit_cost'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDesc" >
        <Select name="unit_type" onChange={handleChange}>
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
            placeholder="Opening Stock"
            name='opening_stock'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName" >
          <Form.Label>Minimum Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Minimum Stock"
            name='min_stock'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDesc" className="mt-3">
          <Form.Label>Item Description</Form.Label>

          <Form.Control as="textarea" rows={5} 
            placeholder="Enter Item Description"
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
        status:0,
        item_id:itemId,
      })
    
      const [categories, setCategoryList] = useState("");
      const [category_id, setCategoryId] = useState();
      const [catLoading, setCatLoading] = useState(false)

      const [pendingg, setPendingg] = useState(false)

      const [location_id, setLocationId] = useState();
      const [locationInfo, setLocationInfo] = useState("");

      const [warehouseList, setWarehouseList] = useState("");
      const [warehouseId, setWarehouseId] = useState();

      const [locationList, setLocationList] = useState("");
      const [locationtwoList, setLocationtwoList] = useState("");
      const [locationthreeList, setLocationthreeList] = useState("");
      const [locationfourList, setLocationfourList] = useState("");
      const [locationfiveList, setLocationfiveList] = useState("");

      const [locationOneId, setLocationOneId] = useState();
      const [locationTwoId, setLocationTwoId] = useState();
      const [locationThreeId, setLocationThreeId] = useState();
      const [locationFourId, setLocationFourId] = useState();
      const [locationFiveId, setLocationFiveId] = useState();
  
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

        const getLocationInfo = async()=>{
          let isSubscribed = true;
          if(location_id !== null){
            setPendingg(true)
            await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationInfo",id: location_id})
            .then((res)=>{
              if(isSubscribed){
                console.log(res)
                setWarehouseId(res.data.data.warehouse_id)
                if(res.data.data.level_number == 1){
                  setLocationOneId(res.data.data?.id)
                }
                if(res.data.data.level_number == 2){
                  setLocationOneId(res.data.data?.parent_recursive?.id)
                  setLocationTwoId(res.data.data?.id)
                }
                if(res.data.data.level_number == 3){
                  setLocationOneId(res.data.data?.parent_recursive?.parent_recursive?.id)
                  setLocationTwoId(res.data.data?.parent_recursive?.id)
                  setLocationThreeId(res.data.data?.id)
                }
                if(res.data.data.level_number == 4){
                  setLocationOneId(res.data.data?.parent_recursive?.parent_recursive?.parent_recursive?.id)
                  setLocationTwoId(res.data.data?.parent_recursive?.parent_recursive?.id)
                  setLocationThreeId(res.data.data?.parent_recursive?.id)
                  setLocationFourId(res.data.data.id)
                }
                if(res.data.data.level_number == 5){
                  setLocationOneId(res.data.data?.parent_recursive?.parent_recursive?.parent_recursive?.parent_recursive?.id)
                  setLocationTwoId(res.data.data?.parent_recursive?.parent_recursive?.parent_recursive?.id)
                  setLocationThreeId(res.data.data?.parent_recursive?.parent_recursive?.id)
                  setLocationFourId(res.data.data?.parent_recursive?.id)
                  setLocationFiveId(res.data.data.id)
                }
                
                setLocationInfo(res.data.data);
                setPendingg(false)
              }
            });
          }
          return ()=> isSubscribed=false;
        }
    
        AllParentCat();
        AllWarehouses();
        if(location_id && !warehouseId){
          getLocationInfo();
        }
        if(warehouseId){
          getLocationByWarehouse()
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
        if(locationFourId){
          getLocationByLocationFour()
        }
        return ()=> isSubscribed=false;
    
    },[location_id, warehouseId, locationOneId, locationTwoId, locationThreeId, locationFourId])

    // const changeWarehouse = (e)=>{
    //   if(e.value){
    //     setWarehouseId(e.value);
    //   }
    // }

    const getLocationByWarehouse = async()=>{
      let isSubscribed = true;
      if(warehouseId !== ""){
        setPendingg(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: warehouseId})
        .then((res)=>{
          if(isSubscribed){
            setLocationList(res.data.data);
            setPendingg(false)
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
        setPendingg(true)
        
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationOneId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationTwoId()
              setLocationThreeId()
              setLocationFourId()
              setLocationFiveId()
              setLocationtwoList("")
              setLocationthreeList("")
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationtwoList(res.data.data);
            }
            
            setPendingg(false)
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
        setPendingg(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationTwoId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationThreeId()
              setLocationFourId()
              setLocationFiveId()
              setLocationthreeList("")
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationthreeList(res.data.data);
            }
            setPendingg(false)
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
        setPendingg(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationThreeId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationFourId()
              setLocationFiveId()
              setLocationfourList("")
              setLocationfiveList("")
            }
            else{
              setLocationfourList(res.data.data);
            }
            setPendingg(false)
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

    const getLocationByLocationFour = async()=>{
      let isSubscribed = true;
      if(locationFourId !== ""){
        setPendingg(true)
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,{action: "getLocationByWarehouse",id: locationFourId})
        .then((res)=>{
          if(isSubscribed){
            if(res.data.data == ""){
              setLocationFiveId()
              setLocationfiveList("")
            }
            else{
              setLocationfiveList(res.data.data);
            }
            setPendingg(false)
          }
        });
      }
      return ()=> isSubscribed=false;
    }

    const changeLocationFive = (e)=>{
      if(e.target.value){
        setLocationFiveId(e.target.value);
      }
    }

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
          setLocationId(res.data.data.warehouse_location_id)
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
    

    let dataset = {...item, category_id, locationList, locationtwoList, locationthreeList, locationfourList, locationfiveList, locationOneId, locationTwoId, locationThreeId, locationFourId, locationFiveId, action:"editItem"}
  
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
          <Form.Label>Select Warehouse</Form.Label>
          {catLoading ? (
            <Select>
              <option value="">loading...</option>
            </Select>
          ) : (
            <Select value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)}>
            <option value="">Select Warehouse</option>
            {warehouseList &&
            warehouseList?.map((warehouse,ind)=>(
             <>
                <option value={warehouse.id}>{warehouse.name}</option>
             </>
            ))
            }
          </Select>
          )}
        </Form.Group>

        <div className="row">
            <div className="col-md-4">
            {locationList!="" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationOneId} onChange={changeLocationOne}>
              <option value="">Select Location of {locationList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-4">
            {locationList && locationtwoList!="" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationtwoList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationTwoId} onChange={changeLocationTwo}>
              <option value="">Select Location of {locationtwoList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-4">
            {locationList && locationtwoList!="" && locationthreeList != "" &&
          <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Select Location of {locationthreeList[0]?.warehouse_level.label}</Form.Label>
            {pending ? (
              <Select>
                <option value="">loading...</option>
              </Select>
            ) : (
              <Select value={locationThreeId} onChange={changeLocationThree}>
              <option value="">Select Location of {locationthreeList[0]?.warehouse_level.label}</option>
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
          </div>

          <div className="row">
            <div className="col-md-6">
              {locationList && locationtwoList!="" && locationthreeList != "" && locationfourList!=""  &&
              <Form.Group className="mb-3" controlId="formBasicDesc" >
              <Form.Label>Select Location of {locationfourList[0]?.warehouse_level.label}</Form.Label>
                {pending ? (
                  <Select>
                    <option value="">loading...</option>
                  </Select>
                ) : (
                  <Select value={locationFourId} onChange={changeLocationFour}>
                  <option value="">Select Location of {locationfourList[0]?.warehouse_level.label}</option>
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
            <div className="col-md-6">
              {locationList && locationtwoList!="" && locationthreeList != "" && locationfourList!="" && locationfiveList!=""  &&
              <Form.Group className="mb-3" controlId="formBasicDesc" >
              <Form.Label>Select Location of {locationfiveList[0]?.warehouse_level.label}</Form.Label>
                {pending ? (
                  <Select>
                    <option value="">loading...</option>
                  </Select>
                ) : (
                  <Select value={locationFiveId} onChange={changeLocationFive}>
                  <option value="">Select Location of {locationfourList[0]?.warehouse_level.label}</option>
                  {locationfiveList &&
                  locationfiveList?.map((level,ind)=>(
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
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/inventory/items`,items)
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
        if(msg?.locationOneId){
          notify("error", `${msg.locationOneId.LocationOneId}`);
        }
        if(msg?.locationTwoId){
          notify("error", `${msg.locationTwoId.LocationTwoId}`);
        }
        if(msg?.locationThreeId){
          notify("error", `${msg.locationThreeId.LocationThreeId}`);
        }
        if(msg?.locationFourId){
          notify("error", `${msg.locationFourId.LocationFourId}`);
        }
        if(msg?.locationFiveId){
          notify("error", `${msg.locationFiveId.LocationFiveId}`);
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
                        Create Item
                      </Button>



                      {/* Create Modal Form */}
                      <Modal dialogClassName="modal-lg"  show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Create Item</Modal.Title>
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