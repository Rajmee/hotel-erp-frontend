import { useEffect, useState } from 'react';
//import Pagination from "react-js-pagination";
import moment from 'moment';
import Link from 'next/link';
import { Button, Form, Modal } from "react-bootstrap";
import Switch from "react-switch";
import { EditIcon, ViewIcon } from '../../../../components';
import DeleteIcon from "../../../../components/elements/DeleteIcon";
import Axios from "../../../utils/axios";


const ListDepartment = () => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //console.log(process.env.NEXT_PUBLIC_DOMAIN)
  const [departments,setDepartment]:any = useState([]);
  //let departments = [];
  const [load, setLoad] = useState<boolean>(true);

  //const userData = getToken();
  // const {http} = getToken();
  const {http} = Axios();
  // const response = userData.response && userData.response;
  //console.log(response)
  // const token = {
  //   Authorization: `Bearer ${response}`
  //  }
      const fetchListDepartment = async () => {     //useEffect function calling won't work in async fucntion
      //   const config = {
      //     headers: token
      // };
      const body = {
        action: "getAllDepartments",
      };
      
      // const fetcher =  await axios.post(
        await http.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/departments`,
        body,
        // config
      ).then((data)=>{
        //departments = data;
        setDepartment(data);
      });


      // console.log(Object.keys(dprtmnt).length);
      //console.log(departments.data.data)
      //console.log(department.data[0].data.name)
      //fetcher.data && setDepartment(fetcher.data)

      //console.log(fetcher);

    }
     useEffect(() => {
      fetchListDepartment();
      },[]);
      //console.log(departments.data)
    
    if(!departments.data) return(
      <>
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      </>
    )

    return (
       <>
       <div className="container-fluid ">
    <div className="row page-titles">
          <div className="col-md-5 col-12 align-self-center">
            <h3 className="text-themecolor mb-0">All Departments</h3>
          </div>
          <div className="
                col-md-7 col-12
                align-self-center
                d-none d-md-flex
                justify-content-end
              ">
            <ol className="breadcrumb mb-0 p-0 bg-transparent">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active d-flex align-items-center">
                Department List
              </li>
            </ol>
          </div>
    </div>
    <div className="widget-content searchable-container list">
      <div className="card card-body">
        <div className="row">
          <div className="col-md-4 col-xl-2">
            <form>
              <input type="text" className="form-control product-search" id="input-search" placeholder="Search Contacts..." />
            </form>
          </div>
          <div className="
                col-md-8 col-xl-10
                text-end
                d-flex
                justify-content-md-end justify-content-center
                mt-3 mt-md-0
              ">
            <div className="action-btn show-btn" style={{display: 'none'}}>
              <a href="#" className="
                    delete-multiple
                    btn-light-danger btn
                    me-2
                    text-danger
                    d-flex
                    align-items-center
                    font-weight-medium
                  ">
                <i data-feather="trash-2" className="feather-sm fill-white me-1" />
                Delete All Row</a>
            </div>

              <Button variant="primary" onClick={handleShow}>
              <i data-feather="users" className="feather-sm fill-white me-1"></i>
                Add Department
              </Button>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John duo..."
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department Description</Form.Label>
              <Form.Control
                as="textarea" rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department Status</Form.Label>
              <Switch/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="card card-body">
        <div className="table-responsive">
          <table className="table search-table v-middle">
            <thead className="header-item">
              <tr><th>
                  <div className="n-chk align-self-center text-center">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input secondary" id="contact-check-all" />
                      <label className="form-check-label" htmlFor="contact-check-all" />
                      <span className="new-control-indicator" />
                    </div>
                  </div>
                </th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Action</th>
              </tr></thead>
            <tbody>
            {
              departments.data && departments.data.data.map((department:any,index:any)=>(

              <tr className="search-items" key={index}>
                <td>
                  <div className="n-chk align-self-center text-center">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input contact-chkbox primary" id="checkbox1" />
                      <label className="form-check-label" htmlFor="checkbox1" />
                    </div>
                  </div>
                </td>
                <td>
                  <span className="usr-email-addr" >{department.name}</span>
                </td>
                <td>
                  <span className="usr-email-addr" >{department.description}</span>
                </td>
                <td>
                  <span className="usr-email-addr" >{department.status}</span>
                </td>
                <td>
                  <span className="usr-email-addr" >{department.created_by}</span>
                </td>
                <td>
                  <span className="usr-email-addr" >{moment(department.created_at).format('DD-MM-YYYY')}</span>
                </td>
                <td>
                  <ul className="action">
                      <li><Link href={`/modules/hr/department/details/${department.id}`}><a><ViewIcon/></a></Link></li>
                      <li><Link href={`/modules/hr/department/update/${department.id}`}><a><EditIcon/></a></Link></li>
                      <li><Link href={`/modules/hr/department/delete/${department.id}`}><a><DeleteIcon /></a></Link></li>
                  </ul>
                </td>
              </tr>

              ))
            }
            </tbody>
          </table>
          {/* pagination */}
          {/* <div className='justify-content-end d-flex'>
            <div className="mt-3">
                <Pagination
                    activePage={departments && departments.meta.current_page}
                    itemsCountPerPage={departments && departments.meta.per_page}
                    totalItemsCount={departments && departments.meta.total}
                    pageRangeDisplayed={6}
                    onChange={(pageNumber:any)=>fetchListDepartment(pageNumber)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />
            </div>
          </div> */}

        </div>
      </div>
    </div>

    </div>

       </>
    );
}

export default ListDepartment