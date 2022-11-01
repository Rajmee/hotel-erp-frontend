import Link from "next/link";
import React from "react";
import {useEffect, useState} from 'react';

export default function LeftSidebar() {
  const [active, setActive] = useState(false);

    useEffect(()=> {
       let abortController = new AbortController();
      if(localStorage.getItem('user')){
        setActive(true);
      }
      else {
        setActive(false);
      }
      return () => {
          abortController.abort();
          }
    },[active]);

  return (
    <>
      <aside className="left-sidebar">
        <div className="scroll-sidebar">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="sidebar-item user-profile">

                  <a
                    className="sidebar-link has-arrow waves-effect waves-dark"
                    aria-expanded="false"
                  >
                    <img src="/assets/images/users/profile.png" alt="user" />
                    <span className="hide-menu">Managebeds User </span>
                  </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link p-0">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> My Profile </span>
                    </a>
                  </li>
                 <Link href="/admin/permission/">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link p-0">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> Setting </span>
                    </a>
                  </li>
                  </Link>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link p-0">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> My Balance </span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link p-0">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> Inbox </span>
                    </a>
                  </li>
                  {active &&
                  <Link href="/user/logout">
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link p-0">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> Logout </span>
                    </a>
                  </li>
                  </Link>}
                </ul>
              </li>
              <li className="nav-small-cap">
                <i className="mdi mdi-dots-horizontal"></i>
                <span className="hide-menu">Personal</span>
              </li>

              {/* Settings part */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">
                    Settings
                    <span className="side-badge badge bg-info">3</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <Link href="/admin/permission">
                    <a  className="sidebar-link">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu">Manage Permission</span>
                    </a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href="/admin/role">
                      <a href="index2.html" className="sidebar-link">
                        <i className="mdi mdi-adjust"></i>
                        <span className="hide-menu"> Manage Role </span>
                      </a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href="/admin/manage-role-permission">
                      <a href="index2.html" className="sidebar-link">
                        <i className="mdi mdi-adjust"></i>
                        <span className="hide-menu"> Operation </span>
                      </a>
                    </Link>
                  </li> 
                  <li className="sidebar-item">
                    <Link href="/admin/general-setting">
                      <a href="index2.html" className="sidebar-link">
                        <i className="mdi mdi-adjust"></i>
                        <span className="hide-menu"> General Settings </span>
                      </a>
                    </Link>
                  </li> 
                  <li className="sidebar-item">
                    <Link href="/admin/information">
                      <a href="index2.html" className="sidebar-link">
                        <i className="mdi mdi-adjust"></i>
                        <span className="hide-menu"> Information </span>
                      </a>
                    </Link>
                  </li>   
                </ul>
              </li>
              {/* Dashboard part */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">
                    Dashboard
                    <span className="side-badge badge bg-info">2</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <Link href="/admin/room">
                    <a  className="sidebar-link">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu"> Minimal</span>
                    </a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href="/admin/room/form">
                      <a href="index2.html" className="sidebar-link">
                        <i className="mdi mdi-adjust"></i>
                        <span className="hide-menu"> Analytical </span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Modules Part */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="clipboard" className="feather-icon"></i>
                  <span className="hide-menu">
                  <span className="hide-menu">Manage HRM</span>
                  <span className="side-badge badge bg-info">5</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  {/* employe */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Employee </span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                      <Link href="/modules/hr/employee/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Employee
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                      <Link href="/modules/hr/employee">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Employee
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>
                  {/* Department */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Department </span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                        <Link href="/modules/hr/department/list">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Departments
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/department/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Department
                          </span>
                        </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* Designation */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Designation </span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                        <Link href="/modules/hr/designation">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Designation
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/designation/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Designation
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>

                  {/* Holiday */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false">
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Holiday</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                        <Link href="/modules/hr/holidays">
                        <a className="sidebar-link">
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Holidays
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/holidays/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Holiday
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>

                  {/* Leave-Category */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false">
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Leave-Category</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveCategories">
                        <a className="sidebar-link">
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Leaves
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveCategories/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Leave
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>

                  {/* Leave-Application */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false">
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Leave-Application</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveApplications">
                        <a className="sidebar-link">
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Applications
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveApplications/myApplications">
                        <a className="sidebar-link">
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            My Applications
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveApplications/addLeaveApplication">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add Application
                          </span>
                        </a>
                        </Link>
                      </li>

                      <li className="sidebar-item">
                        <Link href="/modules/hr/leaveApplications/addEmployeesLeave">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Add EmployeesLeave
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>

                </ul>
              </li>

              {/* Customers Management */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">
                    Customers
                    <span className="side-badge badge bg-info">2</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                    <Link href="/modules/customers/create">
                    <a  className="sidebar-link">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu">Add New Customer</span>
                    </a>
                    </Link>
                  </li>
                  <li className="sidebar-item">
                    <Link href="/modules/customers">
                    <a  className="sidebar-link">
                      <i className="mdi mdi-adjust"></i>
                      <span className="hide-menu">All Customers</span>
                    </a>
                    </Link>
                  </li>

                </ul>
              </li>
              {/* end customers Management */}

              {/* Room Management */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="clipboard" className="feather-icon"></i>
                  <span className="hide-menu">
                  <span className="hide-menu">Manage Room</span>
                  <span className="side-badge badge bg-info">2</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  {/* employe */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Tower</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">

                      <li className="sidebar-item">
                      <Link href="/modules/roomManagement/tower">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Tower
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>
                  {/* Room categories */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Room Categories</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                      <Link href="/modules/roomManagement/roomCategory/">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Room Categories List
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>
                  {/* Room types */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Room Types</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                      <Link href="/modules/roomManagement/roomType/">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Room Types
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>
                  {/* Room Facilities */}
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Room Facilities</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                      <Link href="/modules/roomManagement/roomFacility">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Room Facilities
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>

                </ul>
              </li>
              {/* end Room Management */}

              {/* Inventory Management */}
              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="clipboard" className="feather-icon"></i>
                  <span className="hide-menu">
                  <span className="hide-menu">Inventory</span>
                  <span className="side-badge badge bg-info">6</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/categories">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                             Manage Category
                          </span>
                        </a>
                      </Link>
                  </li>
                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Warehouse</span>
                    </a>
                    <ul aria-expanded="false" className="collapse first-level">
                      <li className="sidebar-item">
                      <Link href="/modules/inventory/warehouses">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                             Manage Warehouse
                          </span>
                        </a>
                        </Link>
                      </li>
                      <li className="sidebar-item">
                      <Link href="/modules/inventory/warehouses/location">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                             Warehouse Location
                          </span>
                        </a>
                        </Link>
                      </li>

                    </ul>
                  </li>
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/warehouses">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                             Manage Warehouse
                          </span>
                        </a>
                      </Link>
                  </li>
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/warehouses/location">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Warehouse Location
                          </span>
                        </a>
                      </Link>
                  </li>
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/items">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                             Manage Item
                          </span>
                        </a>
                      </Link>
                  </li>
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/vouchers/create">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            Create Voucher
                          </span>
                        </a>
                      </Link>
                  </li>
                  <li className="sidebar-item">
                      <Link href="/modules/inventory/vouchers">
                        <a
                          className="sidebar-link"
                        >
                          <i className="mdi mdi-format-align-left"></i>
                          <span className="hide-menu">
                            All Vouchers
                          </span>
                        </a>
                      </Link>
                  </li>
                </ul>
              </li>
              {/* end Inventory Management */}
               {/* Supplier */}

              {/* end Room Management */}

              <li className="sidebar-item">
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark"
                  href="#"
                  aria-expanded="false"
                >
                  <i data-feather="clipboard" className="feather-icon"></i>
                  <span className="hide-menu">
                  <span className="hide-menu">Purchase</span>
                  <span className="side-badge badge bg-info">2</span>
                  </span>
                </a>
                <ul aria-expanded="false" className="collapse first-level">

                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Supplier</span>
                    </a>
                      <ul aria-expanded="false" className="collapse first-level">
                        <li className="sidebar-item">
                          <Link href="/modules/purchase/supplier/create">
                            <a
                              className="sidebar-link"
                            >
                              <i className="mdi mdi-format-align-left"></i>
                              <span className="hide-menu">
                                Add Supplier
                              </span>
                            </a>
                          </Link>
                        </li>

                        <li className="sidebar-item">
                          <Link href="/modules/purchase/supplier">
                            <a
                              className="sidebar-link"
                            >
                              <i className="mdi mdi-format-align-left"></i>
                              <span className="hide-menu">
                                View All Supplier
                              </span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                  </li>

                  <li className="sidebar-item">
                    <a
                      className="sidebar-link has-arrow waves-effect waves-dark"
                      href="#"
                      aria-expanded="false"
                    >
                      <i data-feather="clipboard" className="feather-icon"></i>
                      <span className="hide-menu">Invoice</span>
                    </a>
                      <ul aria-expanded="false" className="collapse first-level">
                        <li className="sidebar-item">
                          <Link href="/modules/purchase/invoice/inv-item">
                            <a
                              className="sidebar-link"
                            >
                              <i className="mdi mdi-format-align-left"></i>
                              <span className="hide-menu">
                                Create Invoice
                              </span>
                            </a>
                          </Link>
                        </li>

                        <li className="sidebar-item">
                          <Link href="/modules/purchase/invoice/">
                            <a
                              className="sidebar-link"
                            >
                              <i className="mdi mdi-format-align-left"></i>
                              <span className="hide-menu">
                                All Invoices
                              </span>
                            </a>
                          </Link>
                        </li>
                      </ul>
                  </li>
                </ul>

              </li>

            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}