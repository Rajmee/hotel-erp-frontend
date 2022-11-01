import React, { useEffect, useState } from "react";
import HeadSection from '../../../../components/HeadSection';
import TablePlaceholder from '../../../../components/placeholder/TablePlaceholder';
import Link  from 'next/link';
import ViewIcon from '../../../../components/elements/ViewIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import Axios from '../../../utils/axios';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import Label from '../../../../components/elements/Label';
import Select2 from '../../../../components/elements/Select2';
import moment from 'moment';
import toast from "../../../../components/Toast/index";

export default function tableList() {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const {http} = Axios();

  const [leaves, setLeaveList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $("#multi_col_order").DataTable();
  });

  // useEffect(() => {
  //   holidayList();
  // }, []);

  useEffect(() => {
    leaveList()
}, []);

const leaveList = async () => {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "getAllLeaveCategories"})
  .then((res)=>{
    setLeaveList(res.data.data);
    setLoading(false);
  });
};

 async function deleteLeave(id)
 {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "deleteLeaveCategory", leave_id: id})
    .then((res)=>{
      notify("success", "successfully has been deleted!");
      setLoading(false);
    });
    leaveList()
 }

  if (loading)
    return (
      <>
        <HeadSection title="All-Leave-Categories" />

        <TablePlaceholder header_name="All-Leave-Categories"/>
        
      </>
    );

  return (
    <>
      <HeadSection title="All-Leave-Categories" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="border-bottom title-part-padding">
                <h4 className="card-title mb-0">All Leave-Categories</h4>
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Application Count</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Updated By</th>
                        <th>Updated At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaves &&
                        leaves.map((leave, index) => (
                          <tr key={index}>
                            <td>{leave.title}</td>
                            <td>{leave.description}</td>
                            <td>{leave.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>{leave.applications.length}</td>
                            <td>{leave.creator.name}</td>
                            <td>{moment(leave.created_at).format('DD-MM-YYYY')}</td>
                            <td>{leave.updator ? leave.updator.name : 'Not Updated'}</td>
                            <td>{moment(leave.updated_at).format('DD-MM-YYYY')}</td>
                            <td>
                              <ul className="action">
                                <li>
                                  <Link
                                    href={`/modules/hr/leaveCategories/update/${leave.id}`}
                                  >
                                    <a>
                                      <EditIcon />
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='#'>
                                    <a onClick={() => deleteLeave(leave.id)}>
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