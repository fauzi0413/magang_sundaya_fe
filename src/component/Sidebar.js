import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import favicon from "../img/favicon.ico";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

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

  const [submenuOpenStates, setSubmenuOpenStates] = useState([false, false, false, false, false]);
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);

  const toggleSubmenu = (index) => {
    const newStates = [...submenuOpenStates];
    newStates[index] = !newStates[index];
    setSubmenuOpenStates(newStates);
  };

  const toggleWarehouseSubmenu = () => {
    setIsWarehouseOpen(!isWarehouseOpen);
  };

  const auth = JSON.parse(localStorage.getItem("auth")||'{}');
  const [requiredRole, setRequiredRole] = useState("");
  useEffect(() => {
    if (auth && auth.role) {
      setRequiredRole(auth.role);
    }
  }, [auth]);

  return (
    <div className="sidebar d-flex custom-bg justify-content-between flex-column text-black ps-3 py-3 pe-5 p-3 vh-100">
      <div>
        <span className="text-white text-decoration-none p-3 invisible">
          <img
            src={favicon}
            alt="ECC Dashboard Icon"
            className=" me-4"
            width={32}
            height={32}
          />
          <span className="fs-3">ECC Dashboard</span>
        </span>

        <hr className="text-primary" />
        <ul className="nav nav-pills flex-column">
            <Link to="/" className="text-black text-decoration-none bg-white rounded" onClick={() => setActive(1)}>
              <li className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}>
                  <i className="bi bi-card-heading fs-4 me-3"></i>
                  <span className="text-decoration-none p-1 fs-4">Dashboard</span>
              </li> 
            </Link>
          {/* Additional sidebar items... */}
          
        {auth.role === "admin" && (
         <li
            className={` mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[0] ? "show " : ""}`}
            onClick={() => toggleSubmenu(0)}
          >
            <i className="bi bi-building-fill-down fs-4 me-3"></i>
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
              Site Down
            </span>
            <div
              className={`collapse ${submenuOpenStates[0] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[0]}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/sitedown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-building-fill me-3 fs-4"></i>
                      <span>All Site Down</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/snmpdown"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(2);
                    }}
                  >
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-wifi me-3 fs-4"></i>
                      <span>Network</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
        )}
          

          {auth.role === "admin" && (
          <Link
            to="/siteup"
            className="mt-2 text-black text-decoration-none bg-white rounded"
          >
            <li
              className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
              onClick={(e) => setActive(2)}
            >
              <i className="bi bi-building-fill-up fs-4 me-3"></i>
              <span className="text-decoration-none p-1 fs-4">Site Up</span>
            </li>
          </Link>
          )}

          {auth.role === "admin" && (
          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[1] ? "show " : ""}`}
            onClick={() => toggleSubmenu(1)}
          >
            <i className="bi bi-ticket-perforated fs-4 me-3"></i>
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
              Ticketing
            </span>
            <div
              className={`collapse ${submenuOpenStates[1] ? "show" : ""}`}
              id="submenu2"
              aria-expanded={submenuOpenStates[1]}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/troubleticket"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(4);
                    }}
                  >
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-database-fill-add me-3 fs-4"></i>
                      <span>Create Procurement Ticket</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        )}
                  
        {auth.role === "admin" && (
          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[2] ? "show" : ""}`}
            onClick={() => toggleSubmenu(2)}
          >
            <i className="bi bi-person-fill-gear fs-4 me-3"></i>
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
              SLA
            </span>
            <div
              className={`collapse ${submenuOpenStates[2] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[2]}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(6);
                    }}
                  >
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>SLA3</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          
        )}

          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${submenuOpenStates[3] ? "show " : ""}`}
            onClick={() => toggleSubmenu(3)}
          >
            <i className="bi bi-people-fill fs-4 me-3"></i>
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
              Profile
            </span>
            <div
              className={`collapse ${submenuOpenStates[3] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[3]}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/profil"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
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
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-box-arrow-right me-3 fs-4"></i>
                      <span>Logout</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>

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
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
                Warehouse Management
            </span>
            <div className={`collapse ${isWarehouseOpen ? "show" : ""}`}>
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/Warehouse"
                    className={`dropdown-item ${active === 8 ? "active" : ""}`}
                    onClick={() => setActive(8)}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-database-fill-gear me-3 fs-4"></i>
                      <span>Item Data</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/History"
                    className={`dropdown-item ${active === 9 ? "active" : ""}`}
                    onClick={() => setActive(9)}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-person-fill-gear me-3 fs-4"></i>
                      <span>History</span>
                    </span>
                  </Link>
                </li>

                
               {auth.role === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/Inventory"
                    className={`dropdown-item ${active === 9 ? "active" : ""}`}
                    onClick={() => setActive(9)}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-clipboard-fill me-3 fs-4"></i>
                      <span>Inventory</span>
                    </span>
                  </Link>
                </li>
                )}  
              </ul>
            </div>
          </li>
        </ul>
      <div>
            
       </div>
       <hr className="text-white" />
        <div className="nav-item p-2">
          <span className="text-white text-decoration-none p-1">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span>
              <strong className="fs-4">it's {auth.username}</strong>
            </span>
          </span>
        </div>
      </div>
    </div>   
  );
};

export default Sidebar;
