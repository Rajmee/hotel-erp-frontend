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

  const options = [
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
  ];

  const [holidays, setHolidayList] = useState([]);
  const [year, setYear] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $("#multi_col_order").DataTable();
  });

  // useEffect(() => {
  //   holidayList();
  // }, []);

  useEffect(() => {
  holidayList()
}, [year]);

const holidayList = async () => {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/holidays`,{action: "getHolidays",year: year})
  .then((res)=>{
    console.log(res)
    setHolidayList(res.data.data);
    setLoading(false);
  });
};

 async function deleteHoliday(id)
 {
  setLoading(true);
  await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/hrm/holidays`,{action: "deleteHoliday", holiday_id: id})
    .then((res)=>{
      notify("success", "successfully has been deleted!");
      setLoading(false);
    });
    holidayList()
 }

  if (loading)
    return (
      <>
        <HeadSection title="All-Holidays" />

        <TablePlaceholder header_name="All-Holidays"/>
      </>
    );

  return (
    <>
      <HeadSection title="All-Holidays" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="border-bottom title-part-padding">
                <h4 className="card-title mb-0">All Holidays</h4>
              </div>
              <div className="card-body">
                    <div className="mb-3 row">
                      <Label text="Select Year :"/>
                      <div className="col-sm-5">
                        <Select2 options={options}  onChange={(options)=> setYear(options.value)} />
                      </div>
                    </div>
                <div className="table-responsive">
                  <table
                    id="multi_col_order"
                    className="table table-striped table-bordered display"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Updated By</th>
                        <th>Updated At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holidays &&
                        holidays.map((holiday, index) => (
                          <tr key={index}>
                            <td>{holiday.date}</td>
                            <td>{holiday.title}</td>
                            <td>{holiday.type}</td>
                            <td>{holiday.description}</td>
                            <td>{holiday.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>{holiday.creator.name}</td>
                            <td>{moment(holiday.created_at).format('DD-MM-YYYY')}</td>
                            <td>{holiday.updator ? holiday.updator.name : 'Not Updated'}</td>
                            <td>{moment(holiday.updated_at).format('DD-MM-YYYY')}</td>
                            <td>
                              <ul className="action">
                                <li>
                                  <Link
                                    href={`/modules/hr/holidays/update/${holiday.id}`}
                                  >
                                    <a>
                                      <EditIcon />
                                    </a>
                                  </Link>
                                </li>
                                <li>
                                  <Link href='#'>
                                    <a onClick={() => deleteHoliday(holiday.id)}>
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