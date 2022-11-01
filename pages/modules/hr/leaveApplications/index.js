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

export default function TableList() {
  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const {http} = Axios();

  const [applications, setApplicationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $("#multi_col_order").DataTable();
  });

  useEffect(() => {
    applicationList()
}, []);

const applicationList = async () => {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "allLeaveApplication"})
  .then((res)=>{
    setApplicationList(res.data.data);
    setLoading(false);
  });
};

 async function deleteApplication(id)
 {
  //setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/leaves`,{action: "deleteLeaveApplication", application_id: id})
    .then((res)=>{
      notify("success", "successfully has been deleted!");
      //setLoading(false);
    });
    applicationList()
 }

  if (loading)
    return (
      <>
        <HeadSection title="All-Leave-Applications" />

        <TablePlaceholder header_name="All-Leave-Applications"/>
        
      </>
    );

  return (
    <>
      <HeadSection title="All-Leave-Applications" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="border-bottom title-part-padding">
                <h4 className="card-title mb-0">All Leave-Applications</h4>
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
                        <th>Employee Name</th>
                        <th>Employee Id</th>
                        <th>Subject</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Leave-Type</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications &&
                        applications?.map((application, index) => (
                          <tr key={index}>
                            <td>{application?.employee.id}</td>
                            <td>{application?.employee.name}</td>
                            <td>{application?.subject}</td>
                            <td>{application?.leave_category.title}</td>
                            <td>{application?.date}</td>
                            <td>{application?.isHalfday == 1 ? 'Half-Day' : 'Full-Day'}</td>
                            <td>{application?.creator.name}</td>
                            <td>{moment(application?.created_at).format('DD-MM-YYYY')}</td>
                            <td>
                              <ul className="action">
                                <li>
                                  <Link
                                    href={`/modules/hr/leaveApplications/details/${application?.id}`}
                                  >
                                    <a>
                                      <ViewIcon />
                                    </a>
                                  </Link>
                                </li>
                                {/* <li>
                                  <Link
                                    href={`/modules/hr/leaveApplications/editLeaveApplication/${application.id}`}
                                  >
                                    <a>
                                      <EditIcon />
                                    </a>
                                  </Link>
                                </li> */}
                                <li>
                                  <Link href='#'>
                                    <a onClick={() => deleteApplication(application?.id)}>
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