import React, { useEffect } from 'react'

export default function table() {

    useEffect(()=>{
        $('#alt_pagination').DataTable();
    })

  return (
    <>
    <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="border-bottom title-part-padding">
              <h4 className="card-title mb-0">Alternative Pagination</h4>
            </div>
            <div className="card-body">
         
              <div className="table-responsive">
                <table id="alt_pagination" className="table table-striped table-bordered display" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Start date</th>
                      <th>Start date</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011/04/25</td>
                      <td>2011/04/25</td>
                      <td>2011/04/25</td>
         
                    </tr>
                    
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Start date</th>
                      <th>Start date</th>
                 
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
