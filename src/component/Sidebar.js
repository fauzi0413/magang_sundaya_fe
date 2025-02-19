import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import favicon from "../img/favicon.ico";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
=======
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import favicon from "../img/favicon.ico";
import { loginLogs } from "../api/axios";
>>>>>>> 45558cc (initial commit)

function Sidebar() {
  const [active, setActive] = useState(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") return 1;
    if (currentPath === "/siteup") return 2;
    if (currentPath === "/orders") return 3;
    if (currentPath === "/form") return 4;
    if (currentPath === "/report") return 5;
    if (currentPath === "/warehouse") return 6;
    return null;
  });

<<<<<<< HEAD
  const [submenuOpenStates, setSubmenuOpenStates] = useState([false, false, false, false, false]);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
=======
  const [submenuOpenStates, setSubmenuOpenStates] = useState([false, false, false, false, false,false]);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const navigate = useNavigate();
>>>>>>> 45558cc (initial commit)

  const toggleSubmenu = (index) => {
    const newStates = [...submenuOpenStates];
    newStates[index] = !newStates[index];
    setSubmenuOpenStates(newStates);
  };

  const toggleWarehouseSubmenu = () => {
    setIsWarehouseOpen(!isWarehouseOpen);
  };

<<<<<<< HEAD
  const auth = JSON.parse(localStorage.getItem("auth")||'{}');
=======
  const auth = JSON.parse(localStorage.getItem("auth") || '{}');
>>>>>>> 45558cc (initial commit)
  const [requiredRole, setRequiredRole] = useState("");
  useEffect(() => {
    if (auth && auth.role) {
      setRequiredRole(auth.role);
    }
  }, [auth]);
<<<<<<< HEAD

  return (
    <div className="p-3 py-3 text-black sidebar d-flex custom-bg justify-content-between flex-column ps-3 pe-5 vh-100">
=======
  
  const logout = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.username;

    if (user) {
      await loginLogs({ username: user, action: "logout" });
    }
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="p-3 py-3 text-black sidebar d-flex justify-content-between flex-column ps-3 pe-5 vh-100">
>>>>>>> 45558cc (initial commit)
      <div>
        <span className="invisible p-3 text-white text-decoration-none">
          <img
            src={favicon}
            alt="ECC Dashboard Icon"
<<<<<<< HEAD
            className=" me-4"
=======
            className="me-4"
>>>>>>> 45558cc (initial commit)
            width={32}
            height={32}
          />
          <span className="fs-3">ECC Dashboard</span>
        </span>

        <hr className="text-primary" />
        <ul className="nav nav-pills flex-column">
          
<<<<<<< HEAD
        {/* DASHBOARD */}
        {auth.role === "admin" && (
            <Link to="/" className="text-black bg-white rounded text-decoration-none" onClick={() => setActive(1)}>
              <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}>
                  <i className="bi bi-card-heading fs-4 me-3"></i>
                  <span className="p-1 text-decoration-none fs-4">Dashboard</span>
              </li> 
            </Link>
        )}
          
        {/* DASHBOARD WAREHOUSE */}
        {auth.role === "management" && (
            <Link to="/DashboardWarehouse" className="text-black bg-white rounded text-decoration-none" onClick={() => setActive(1)}>
              <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}>
                  <i className="bi bi-card-heading fs-4 me-3"></i>
                  <span className="p-1 text-decoration-none fs-4">Dashboard</span>
              </li> 
            </Link>
        )}
          
        {/* SITE DOWN */}
        {auth.role === "admin" && (
         <li
            className={` mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[0] ? "show " : ""}`}
            onClick={() => toggleSubmenu(0)}
          >
            <i className="bi bi-building-fill-down fs-4 me-3"></i>
            <span className="p-1 text-decoration-none dropdown-toggle fs-4">
              Site Down
            </span>
            <div
              className={`collapse ${submenuOpenStates[0] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[0]}
=======
          {/* DASHBOARD */}
          {auth.role === "noc" && (
            <Link to="/" className="text-black bg-white rounded text-decoration-none" onClick={() => setActive(1)}>
              <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2 d-flex"}>
              <i className="bi bi-house fs-4 me-3"></i>
                <span className="p-1 text-decoration-none fs-4">Dashboard</span>
              </li>
            </Link>
          )}

          
          {/* DASHBOARD WAREHOUSE */}
          {auth.role === "management" && (
            <Link to="/DashboardWarehouse" className="text-black bg-white rounded text-decoration-none" onClick={() => setActive(1)}>
              <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}>
                <i className="bi bi-card-heading fs-4 me-3"></i>
                <span className="p-1 text-decoration-none fs-4">Dashboard</span>
              </li>
            </Link>
          )}
          
          {/* PROFILE */}
          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[3] ? "show " : ""}`}
            onClick={() => toggleSubmenu(3)}
            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
          >
            <i className="bi bi-person-fill fs-4 me-3"></i>
            <span className="p-1 text-decoration-none dropdown-toggle fs-4">
              Profile
            </span>
            <div
              className={`collapse ${submenuOpenStates[3] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[3]}
>>>>>>> 45558cc (initial commit)
            >
              <ul className="pl-2 flex-column nav">
                <li className="nav-item">
                  <Link
<<<<<<< HEAD
                    to="/sitedown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-building-fill me-3 fs-4"></i>
                      <span>All Site Down</span>
=======
                    to="/profil"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-info-square-fill me-3 fs-4"></i>
                      <span>Info</span>
>>>>>>> 45558cc (initial commit)
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
<<<<<<< HEAD
                    to="/snmpdown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-router-fill me-3 fs-4"></i>
                      <span>SNMP</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/powerdown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-plug-fill me-3 fs-4"></i>
                      <span>Power</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/networkdown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-wifi me-3 fs-4"></i>
                      <span>Network</span>
=======
                    className="dropdown-item"
                    onClick={logout}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-box-arrow-right me-3 fs-4"></i>
                      <span>Logout</span>
>>>>>>> 45558cc (initial commit)
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
<<<<<<< HEAD
        )}
          
        {/* SITE UP */}
        {auth.role === "admin" && (
        <Link
          to="/siteup"
          className="mt-2 text-black bg-white rounded text-decoration-none"
        >
          <li
            className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(2)}
          >
            <i className="bi bi-building-fill-up fs-4 me-3"></i>
            <span className="p-1 text-decoration-none fs-4">Site Up</span>
          </li>
        </Link>
        )}

        {/* TIKEITNG */}
        {auth.role === "admin" && (
        <li
          className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[1] ? "show " : ""}`}
          onClick={() => toggleSubmenu(1)}
        >
          <i className="bi bi-ticket-perforated fs-4 me-3"></i>
          <span className="p-1 text-decoration-none dropdown-toggle fs-4">
            Ticketing
          </span>
          <div
            className={`collapse ${submenuOpenStates[1] ? "show" : ""}`}
            id="submenu2"
            aria-expanded={submenuOpenStates[1]}
          >
            <ul className="pl-2 flex-column nav">
              <li className="nav-item">
                <Link
                  to="/troubleticket"
                  className="dropdown-item"
                  onClick={(e) => {
                    setActive(4);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-clipboard-plus-fill me-3 fs-4"></i>
                    <span>Trouble Ticket</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="dropdown-item "
                  onClick={(e) => {
                    setActive(7);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-database-fill-add me-3 fs-4"></i>
                    <span>Create Trouble Ticket</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="dropdown-item "
                  onClick={(e) => {
                    setActive(2);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-clipboard-plus-fill me-3 fs-4"></i>
                    <span>Procurement</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="dropdown-item "
                  onClick={(e) => {
                    setActive(7);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-database-fill-add me-3 fs-4"></i>
                    <span>Create Procurement Ticket</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        )}
                  
        {/* SLA */}
        {auth.role === "admin" && (
          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[2] ? "show" : ""}`}
            onClick={() => toggleSubmenu(2)}
          >
            <i className="bi bi-person-fill-gear fs-4 me-3"></i>
            <span className="p-1 text-decoration-none dropdown-toggle fs-4">
              SLA
            </span>
            <div
              className={`collapse ${submenuOpenStates[2] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[2]}
            >
              <ul className="pl-2 flex-column nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(6);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-add me-3 fs-4"></i>
                      <span>Create SLA Data</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/"
                    className="dropdown-item "
                    onClick={(e) => {
                      setActive(7);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>Upload SLA Data</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/"
                    className="dropdown-item "
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>Upload SLA Bakti</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/sla1"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>SLA1</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/sla2"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>SLA2</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/sla3"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>SLA3</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
        )}

        {/* PROFILE */}
        <li
          className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[3] ? "show " : ""}`}
          onClick={() => toggleSubmenu(3)}
        >
          <i className="bi bi-people-fill fs-4 me-3"></i>
          <span className="p-1 text-decoration-none dropdown-toggle fs-4">
            Profile
          </span>
          <div
            className={`collapse ${submenuOpenStates[3] ? "show" : ""}`}
            id="submenu1"
            aria-expanded={submenuOpenStates[3]}
          >
            <ul className="pl-2 flex-column nav">
              <li className="nav-item">
                <Link
                  to="/profil"
                  className="dropdown-item"
                  onClick={(e) => {
                    setActive(8);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-info-square-fill me-3 fs-4"></i>
                    <span>Info</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={(e) => {
                    setActive(7);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-person-plus-fill me-3 fs-4"></i>
                    <span>Create Account </span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="dropdown-item"
                  onClick={(e) => {
                    setActive(7);
                  }}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-box-arrow-right me-3 fs-4"></i>
                    <span>Logout</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
          
        {/* USER MANAGEMENT */}
        {auth.role === "admin" && (
        <Link
          to="/user"
          className="mt-2 text-black bg-white rounded text-decoration-none"
        >
          <li
            className={active === 11 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(11)}
          >
            <i className="bi bi-person-fill-gear fs-4 me-3"></i>
            <span className="p-1 text-decoration-none fs-4">User Management</span>
          </li>
        </Link>
        )}
        
        {/* INVENTORY MANAGEMENT */}
        {auth.role === "admin" && (
        <Link
          to="/inventory"
          className="mt-2 text-black bg-white rounded text-decoration-none"
        >
          <li
            className={active === 10 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(10)}
          >
            <i className="bi bi-clipboard-fill fs-4 me-3"></i>
            <span className="p-1 text-decoration-none fs-4">Inventory Management</span>
=======
          {/* USER MANAGEMENT */}
          {auth.role === "noc" && (
            <Link
              to="/user"
              className="mt-2 text-black bg-white rounded text-decoration-none"
            >
              <li
                className={active === 11 ? "active nav-item p-2" : "nav-item p-2"}
                onClick={(e) => setActive(11)}
              >
                <i className="bi bi-person-fill-gear fs-4 me-3"></i>
                <span className="p-1 text-decoration-none fs-4">User Management</span>
              </li>
            </Link>
          )}
        
          {/* INVENTORY MANAGEMENT */}
          {auth.role === "noc" && (
            <Link
              to="/inventory"
              className="mt-2 text-black bg-white rounded text-decoration-none"
            >
              <li
                className={active === 10 ? "active nav-item p-2" : "nav-item p-2"}
                onClick={(e) => setActive(10)}
              >
                <i className="bi bi-clipboard-fill fs-4 me-3"></i>
                <span className="p-1 text-decoration-none fs-4">Inventory Management</span>
              </li>
            </Link>
          )}

          {/* MATERIAL MANAGEMENT */}
        {auth.role === "noc" && (
        <Link
          to="/material"
          className="mt-2 text-black bg-white rounded text-decoration-none"
        >
          <li
            className={active === 15 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(15)}
          >
            <i className="bi bi-boxes fs-4 me-3"></i>
            <span className="p-1 text-decoration-none fs-4">Material Management</span>
>>>>>>> 45558cc (initial commit)
          </li>
        </Link>
        )}

<<<<<<< HEAD
        {/* WAREHOUSE MANAGEMENT */}
        <li
          className={`mt-2 rounded bg-white text-black nav-item p-2 ${isWarehouseOpen ? "show" : ""}`}
          onClick={() => {
            setIsWarehouseOpen(!isWarehouseOpen); // Toggle the dropdown state
            setActive(8); // Set the active state for Warehouse Management
          }}
        >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20V6H4V4ZM4 8H20V10H4V8ZM2 20V12H22V20H2ZM4 14V18H20V14H4Z"/>
        </svg>
          <span className="p-1 text-decoration-none dropdown-toggle fs-4">
              Warehouse Management
          </span>
          <div className={`collapse ${isWarehouseOpen ? "show" : ""}`}>
            <ul className="pl-2 flex-column nav">
              <li className="nav-item">
                <Link
                  to="/warehouse"
                  className={`dropdown-item ${active === 8 ? "active" : ""}`}
                  onClick={() => setActive(8)}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-database-fill-gear me-3 fs-4"></i>
                    <span>Item Data</span>
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/history"
                  className={`dropdown-item ${active === 9 ? "active" : ""}`}
                  onClick={() => setActive(9)}
                >
                  <span className="p-4 text-decoration-none">
                    <i className="bi bi-person-fill-gear me-3 fs-4"></i>
                    <span>History</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
          
        {/* CLUSTER MANAGEMENT */}
        {auth.role === "admin" && (
         <li
            className={` mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[4] ? "show " : ""}`}
            onClick={() => toggleSubmenu(4)}
          >
            <i className="bi bi-houses-fill fs-4 me-3"></i>
            <span className="p-1 text-decoration-none dropdown-toggle fs-4">
              Cluster Management
            </span>
            <div
              className={`collapse ${submenuOpenStates[4] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[4]}
            >
              <ul className="pl-2 flex-column nav">
                <li className="nav-item">
                  <Link
                    to="/cluster"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(12);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-building-fill me-3 fs-4"></i>
                      <span>Cluster Detail</span>
=======
          {/* WAREHOUSE MANAGEMENT */}
          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${isWarehouseOpen ? "show" : ""}`}
            onClick={() => {
              setIsWarehouseOpen(!isWarehouseOpen);
              setActive(8);
            }}
            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
          >
            <svg width="28" height="30" viewBox="0 0 24 28" fill="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20V6H4V4ZM4 8H20V10H4V8ZM2 20V12H22V20H2ZM4 14V18H20V14H4Z"/>
            </svg>
            <span className="p-3 text-decoration-none dropdown-toggle fs-4 ">
              Warehouse Management
            </span>
            <div className={`collapse ${isWarehouseOpen ? "show" : ""}`}>
              <ul className="pl-2 flex-column nav">
                <li className="nav-item">
                  <Link
                    to="/warehouse"
                    className={`dropdown-item ${active === 8 ? "active" : ""}`}
                    onClick={() => setActive(8)}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-database-fill-gear me-3 fs-4"></i>
                      <span>Warehouse Stock</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/history"
                    className={`dropdown-item ${active === 9 ? "active" : ""}`}
                    onClick={() => setActive(9)}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-person-fill-gear me-3 fs-4"></i>
                      <span>Warehouse Stock Logs</span>
>>>>>>> 45558cc (initial commit)
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
<<<<<<< HEAD
                  <Link
                    to="/clusterstock"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(13);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-router-fill me-3 fs-4"></i>
                      <span>Cluster Stock</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/clusterstocklogs"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(14);
                    }}
                  >
                    <span className="p-4 text-decoration-none">
                      <i className="bi bi-plug-fill me-3 fs-4"></i>
                      <span>Cluster Stock Logs</span>
                    </span>
                  </Link>
                </li>
                
              </ul>
            </div>
          </li>
        )}
          
        </ul>
      <div>
            
       </div>
       <hr className="text-white" />
        <div className="p-2 nav-item">
          <span className="p-1 text-white text-decoration-none">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span>
              <strong className="fs-4">it's {auth.username}</strong>
=======
                    <Link
                      to="/vieworder"
                      className="dropdown-item"
                      onClick={(e) => {
                        setActive(13);
                      }}
                    >
                      <span className="p-4 text-decoration-none">
                      <i className="bi bi-clipboard-data fs-4 me-3"></i>
                        <span>Order Warehouse</span>
                      </span>
                    </Link>
                  </li>
              </ul>
            </div>
          </li>
          
          {/* CLUSTER MANAGEMENT */}
          {auth.role === "noc" && (
            <li
              className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[4] ? "show " : ""}`}
              onClick={() => toggleSubmenu(4)}
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              <i className="bi bi-houses-fill fs-4 me-3"></i>
              <span className="p-1 text-decoration-none dropdown-toggle fs-4">
                Cluster Management
              </span>
              <div
                className={`collapse ${submenuOpenStates[4] ? "show" : ""}`}
                id="submenu1"
                aria-expanded={submenuOpenStates[4]}
              >
                <ul className="pl-2 flex-column nav">
                  <li className="nav-item">
                    <Link
                      to="/cluster"
                      className="dropdown-item"
                      onClick={(e) => {
                        setActive(12);
                      }}
                    >
                      <span className="p-4 text-decoration-none">
                        <i className="bi bi-house-check-fill me-3 fs-4"></i>
                        <span>Cluster Detail</span>
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/clusterstock"
                      className="dropdown-item"
                      onClick={(e) => {
                        setActive(13);
                      }}
                    >
                      <span className="p-4 text-decoration-none">
                        <i className="bi bi-house-gear-fill me-3 fs-4"></i>
                        <span>Cluster Stock</span>
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/clusterstocklogs"
                      className="dropdown-item"
                      onClick={(e) => {
                        setActive(14);
                      }}
                    >
                      <span className="p-4 text-decoration-none">
                        <i className="bi bi-house-gear me-3 fs-4"></i>
                        <span>Cluster Stock Logs</span>
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/requestorder"
                      className="dropdown-item"
                      onClick={(e) => {
                        setActive(12);
                      }}
                    >
                      <span className="p-4 text-decoration-none">
                       <i className="bi bi-clipboard fs-4 me-3"></i>
                        <span>Cluster Order</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          )}

           

          {/* ORDER MANAGEMENT
          {auth.role === "noc" && (
            <li
              className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[5] ? "show " : ""}`}
              onClick={() => toggleSubmenu(5)}
              style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            >
              <i className="bi bi-cart fs-4 me-3"></i>
              <span className="p-1 text-decoration-none dropdown-toggle fs-4">
                Order Management
              </span>
              <div
                className={`collapse ${submenuOpenStates[5] ? "show" : ""}`}
                id="submenu1"
                aria-expanded={submenuOpenStates[5]}
              >
                <ul className="pl-2 flex-column nav">
                  

                 


                 
                </ul>
              </div>
            </li>
          )} */}

          
                  {/* Login Logs */}
                  {auth.role === "noc" && (
                <Link
                  to="/loginlogs"
                  className="mt-2 text-black bg-white rounded text-decoration-none"
                >
                  <li
                    className={active === 18 ? "active nav-item p-2" : "nav-item p-2"}
                    onClick={(e) => setActive(18)}
                  >
                    <i className="bi bi-people-fill fs-4 me-3"></i>
                    <span className="p-1 text-decoration-none fs-4">Login Logs</span>
                  </li>
                </Link>
              )}
 
        </ul>
        <div>  
        </div>
          
        <hr className="" />
        
        <div className="p-2 pb-5 nav-item">
          <span className="p-1 text-decoration-none">
            <i className="bi bi-person-circle me-3 fs-4" style={{ color: "#C42B2B" }}></i>
            <span>
              <strong className="fs-4" style={{ color: "#C42B2B" }}>it's {auth.username}</strong>
>>>>>>> 45558cc (initial commit)
            </span>
          </span>
        </div>
      </div>
<<<<<<< HEAD
    </div>   
  );
};

export default Sidebar;
=======
    </div>
  );
};

export default Sidebar;
>>>>>>> 45558cc (initial commit)
