import { useEffect, useState } from "react";
import Link from 'next/link';

const ListDesignation = () => {

  const [item,setItem] = useState(
    {
         id:2,
    }
  );

    useEffect(()=>{
        $('#alt_pagination').DataTable();
    })

    return ( 
        <div>
            <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="border-bottom title-part-padding">
              <h4 className="card-title mb-0">All Designation</h4>
            </div>
            <div className="card-body">
         
              <div className="table-responsive">
                <table id="alt_pagination" className="table table-striped table-bordered display" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created By</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>Active</td>
                      <td>2011/04/25</td>
                      <td>
                      <Link href={`/modules/hr/designation/list/${item.id}`} ><a> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye feather-sm"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </a></Link>
                   &nbsp;&nbsp;&nbsp;
              <Link href={`/modules/hr/designation/update/${item.id}`} ><a>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit feather-sm"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </a></Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link href={`/user/delete/${item.id}`} ><a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 feather-sm"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </a></Link>
                      </td>
                    </tr>
                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created By</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
     );
}
 
export default ListDesignation;