import React, { useEffect, useState } from "react";
//import axios from "axios";
import HeadSection from '../../../../components/HeadSection';
import TablePlaceholder from '../../../../components/placeholder/TablePlaceholder';
import Link  from 'next/link';
import ViewIcon from '../../../../components/elements/ViewIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import Axios from '../../../utils/axios';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import toast from "../../../../components/Toast/index";


export default function tableList() {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const {http} = Axios();

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $("#multi_col_order").DataTable();
  });

  useEffect(() => {
    productList();
  }, []);

  const productList = async () => {
    setLoading(true);
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "getDesignations",})
    .then((res)=>{
      // if(!data){
         console.log('no data found')
      // }
      setProductsList(res.data.data);
      setLoading(false);
    });
    //console.log("response", response);
  };

  // const deleteDesignation = async(id) =>{
  //   await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "deleteDesignation", designation_id: id})
  //   .then((res)=>{
  //    alert('deleted')
  //   });
  // }
  // const deleteDesignation = async(id)=>{
  //   try{
  //     await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "deleteDesignation", designation_id: id})
  //    console.log('wer');
  //   }
  //   catch(err){

  //   }
  // }

 async function deleteDesignation(id)
 {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/designations`,{action: "deleteDesignation", designation_id: id})
    .then((res)=>{
      notify("success", "successfully has been deleted!");
      setLoading(false);
    });
    productList()
 }

  if (loading)
    return (
      <>
        <HeadSection title="All-Designations" />
        {/* <div className="container-fluid d-flex justify-content-center align-items-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div> */}

        <TablePlaceholder/>
        
      </>
    );

  return (
    <>
      <HeadSection title="All-Designations" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="border-bottom title-part-padding">
                <h4 className="card-title mb-0">All Designations</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    id="multi_col_order"
                    className="table table-striped table-bordered display"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList &&
                        productsList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>Alexander</td>
                            <td>Developer</td>
                            <td>San Francisco</td>
                            <td>$86,500</td>
                            <td>$86,500</td>
                            <td>$86,500</td>
                            <td>$86,500</td>
                            <td>$86,500</td>
                            <td>
                              <ul className="action">
                                <li>
                                  <Link
                                    href={`/modules/hr/designation/list/${item.id}`}
                                  >
                                    <a>
                                      <ViewIcon />
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href={`/modules/hr/designation/update/${item.id}`}>
                                    <a>
                                      <EditIcon />
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='#'>
                                    <a onClick={() => deleteDesignation(item.id)}>
                                      <DeleteIcon />
                                    </a>
                                  </Link>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}