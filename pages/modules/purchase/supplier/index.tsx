import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DeleteIcon } from "../../../../components";
import {EditIcon} from "../../../../components";
import {ViewIcon} from "../../../../components";
import {HeadSection} from "../../../../components";
import Axios from "../../../utils/axios";

const index = () => {
  const {http} = Axios();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [rows, setRows] = React.useState([]);
  const [supplierList, setSupplierList] = useState([]);

  const getSupplierList = async () => {
    let isSubscribed = true;
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`,{action: "getAllSupplier"})
    .then((res)=>{
      if(isSubscribed){
        //console.log(res.data);
        setSupplierList(res?.data);
        setFilteredData(res.data?.data);
      }
    })
    .catch((err)=>{
      console.log("Server Error ~!")
    });

    return ()=> isSubscribed=false;
  };

  /**Getting Supplier List */
  React.useEffect(() => {
    const timeout = setTimeout(() => {
        getSupplierList();
    });
    return () => clearTimeout(timeout);
}, []);


/**filtering supplierList into lowercase */
//   useEffect(()=>{
//     let controller = new AbortController();
//     const result = data?.filter((item)=>{
//       return item.name.toLowerCase().match(search.toLocaleLowerCase())
//     });
  
//     supplierList(result);
//     return ()=> controller.abort();
//   },[search]);

const handleDelete = async(id:any) => {
  let body:any = {}

    body = {
        action: "delete",
        id: id
      }
    await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/purchase/supplier`,
    body
  );
}

const actionButton=(id:any)=>{
    return <>
        <ul className="action">
            <li>
                <Link href={`/modules/purchase/supplier/details/${id}`}
                >
                <a>
                    <ViewIcon />
                </a>
                </Link>
            </li>
            <li>
                <Link href={`/modules/purchase/supplier/update/${id}`}>
                <a>
                    <EditIcon />
                </a>
                </Link>
            </li>

            <li>
              <Link href="#" >
                <a  onClick={()=>handleDelete(id)}>
                  <DeleteIcon/>
                </a>
              </Link>
            </li>
            </ul>
    </>
}

const conditionalRowStyles = [
	{
		when: row => row.status == 0,
		style: {
			backgroundColor: 'rgba(243, 59, 42, 0.9)',
			color: 'white',
			'&:hover': {
				cursor: 'pointer',
			},
		},
	},
	// {
	// 	when: row => row.calories >= 300 && row.calories < 400,
	// 	style: {
	// 		backgroundColor: 'rgba(248, 148, 6, 0.9)',
	// 		color: 'white',
	// 		'&:hover': {
	// 			cursor: 'pointer',
	// 		},
	// 	},
	// },
	// {
	// 	when: row => row.calories >= 400,
	// 	style: {
	// 		backgroundColor: 'rgba(242, 38, 19, 0.9)',
	// 		color: 'white',
	// 		'&:hover': {
	// 			cursor: 'not-allowed',
	// 		},
	// 	},
	// },
];

const columns = [

    {
        name: 'Supplier Name',
        selector: row => row.name,
        sortable: true,

    },
    {
        name: 'Supplier Address',
        selector: row => row.address,
        sortable: true,
    },
    {
        name: 'Supplier Balance',
        selector: row => row.balance,
        sortable: true,
    },
    {
        name: 'Total Invoice',
        selector: row => row.total_invoice,
        sortable: true,
    },
    {
        name: 'Creator',
        selector: row => row.createdBy,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => actionButton(row.id),
    },
  
];

  return (
    <>
    <HeadSection title="Supplier List" />
    <div className="container-fluid">

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="border-bottom title-part-padding">
                <h4 className="card-title mb-0">Supplier List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">

                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    subHeader
                    conditionalRowStyles={conditionalRowStyles}
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
    </>
  )
}

export default index