import React, { useEffect, useState,useCallback } from "react";
import Link from "next/link";
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from "../../../../components/elements/EditIcon";
import ViewIcon from "../../../../components/elements/ViewIcon";
import HeadSection from "../../../../components/HeadSection";
import toast from "../../../../components/Toast/index";
import Axios from "../../../utils/axios";
import { Modal, Button, Form } from "react-bootstrap";
import DataTable from 'react-data-table-component';

//Delete component
const DeleteComponent = ({ onSubmit,empId, pending }) => {

  const {http} = Axios();

  const [name, setName] = useState(""); 
  const [loading, setLoading] = useState(true);


  const fetchEmployeeInfo = useCallback(async ()=>{
    let isSubscribed = true;
    setLoading(true)
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`,{action: "getEmployeeInfo",employee_id:empId})
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

  },[empId]);

  useEffect(()=>{
    fetchEmployeeInfo();
  },[fetchEmployeeInfo])


  let myFormData = new FormData(); 

  myFormData.append('action', "deleteEmployee");
  myFormData.append('employee_id', empId);

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


export default function index() {

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const {http} = Axios();

    //Delete Tower Modal
    const [employee_id, setEmployeeId] = useState("");
    const [pending, setPending] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleExitDelete = () => setShowDeleteModal(false);

    const handleOpenDelete = (employeeId) =>{
      setShowDeleteModal(true);
      setEmployeeId(employeeId);
    } 
  
  
      //Delete Tower form
      const handleDelete=async(formData)=> {
        let isSubscribed = true;
        setPending(true);
        await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`,formData)
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
  



  const [itemList, setItemList] = useState([]);
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
//console.log(filteredData);


  React.useEffect(() => {
    const timeout = setTimeout(() => {
          fetchItemList();
    });
    return () => clearTimeout(timeout);
}, []);


const actionButton=(id)=>{
    return <>
        <ul className="action">
            <li>
                <Link href={`/modules/hr/employee/details/${id}`}
                >
                <a>
                    <ViewIcon />
                </a>
                </Link>
            </li>
            <li>
                <Link href={`/modules/hr/employee/update/${id}`}>
                <a>
                    <EditIcon />
                </a>
                </Link>
            </li>

            <li>
              <Link href="#" >
                <a  onClick={()=>handleOpenDelete(id)}>
                  <DeleteIcon/>
                </a>
              </Link>
            </li>
            </ul>
    </>
}


const columns = [

    {
        name: 'SL',
        selector: (row, index) => index + 1 ,
        sortable: true,
        width: "70px",

    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,

    },
    {
        name: 'Department',
        selector: row => row.department_id,
        sortable: true,
    },
    {
        name: 'Designation',
        selector: row => row.designation_id,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
    },
    {
        name: 'Mobile',
        selector: row => row.mobile,
        sortable: true,
    },
    {
        name: 'E-mail',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'Creator',
        selector: row => row.created_by,
        sortable: true,
    },
    {
        name: 'Created At',
        selector: row => row.created_at,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
    },
  
];

//console.log(columns);

const data = itemList?.data;

// console.log(productsList?.data)

  const fetchItemList = async () => {
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/employee`,{action: "allEmployee",})
    .then((res)=>{
      if(isSubscribed){

        setItemList(res?.data);
        setFilteredData(res.data?.data);
      }
    });
    return ()=> isSubscribed=false;
  };

// console.log(filteredData);


useEffect(()=>{
  let controller = new AbortController();
  const result = data?.filter((item)=>{
    return item.name.toLowerCase().match(search.toLocaleLowerCase())
  });

  setFilteredData(result);
  return ()=> controller.abort();
},[search])
  

  return (
    <>
      <HeadSection title="All-Employees" />

      <div className="container-fluid">

        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="d-flex border-bottom title-part-padding align-items-center">
                <div>
                  <h4 className="card-title mb-0">All Employees</h4>
                </div>
                <div class="ms-auto flex-shrink-0">
                  <Link href="/modules/hr/employee/create">
                  <Button
                    className="shadow rounded"
                    variant="primary"
                    type="button"
                    block
                  >
                    Create Employee
                  </Button>
                  </Link>

                    {/* Delete Modal Form */}
                    <Modal show={showDeleteModal} onHide={handleExitDelete}>
                      <Modal.Header closeButton></Modal.Header>
                      <DeleteComponent onSubmit={handleDelete} empId={employee_id} pending={pending}/>
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
                    defaultSortFieldId={"Name","Department","Designation","Gender","Created At"}

                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );  

}
