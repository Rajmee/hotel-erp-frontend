import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";

function Example() {

    const [state, setData] = useState({
        users: ''
    });

    const fetchData = async (pageNumber = 1) => {
        
        const api = await fetch(`https://boibitan.com/api/v2/products?page=${pageNumber}`);
        setData({
            users: await api.json()
        });
    };

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">User List : CodeCheef</div>
                        <div className="card-body">
                          <table>
                              <thead>
                                <tr>
                                    <th>1</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                state?.users?.data ?
                                    state?.users?.data?.map((user) => (
                                            <tr key={user?.id}>
                                                <td>{user?.id}</td>
                                                <td>{user?.name}</td>
                                                <td>{user?.email}</td>
                                            </tr>
                                    )) : "Loading..."
                              }
                              </tbody>
                          </table>
                            <div>
                                <Pagination
                                    activePage={state.users.meta?.current_page ? state.users.meta?.current_page : 0}
                                    itemsCountPerPage={state.users.meta?.per_page ? state.users.meta?.per_page : 0 }
                                    totalItemsCount={state.users.meta?.total ? state.users.meta?.total : 0}
                                    onChange={(pageNumber) => {
                                        fetchData(pageNumber)
                                    }}
                                    pageRangeDisplayed={8}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    firstPageText="First Page"
                                    lastPageText="Last Lage"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

// if (document.getElementById('example')) {
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }