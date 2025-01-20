import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import favicon from "../img/favicon.ico";
// import warehouse from "./Warehouse/DashboardWarehouse";

function Sidebar() {
  const [active, setActive] = useState(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") return 1;
    if (currentPath === "/siteup") return 2;
    if (currentPath === "/orders") return 3;
    if (currentPath === "/form") return 4;
    if (currentPath === "/report") return 5;
    return null;
  });

  // Combine submenu states into a single array
  const [submenuOpenStates, setSubmenuOpenStates] = useState([
    false,
    false,
    false,
    false,
  ]);

  const toggleSubmenu = (index) => {
    const newStates = [...submenuOpenStates];
    newStates[index] = !newStates[index];
    setSubmenuOpenStates(newStates);
  };

  return (
    <div className="sidebar d-flex bg-primary justify-content-between flex-column text-white ps-3 py-3 pe-5 p-3 vh-100">
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
          <Link
            to="/"
            className=" text-black text-decoration-none bg-white rounded"
          >
            <li
              className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}
              onClick={(e) => setActive(1)}
            >
              <i className="bi bi-card-heading fs-4 me-3"></i>
              <span className="text-decoration-none p-1 fs-4">Dashboard</span>
            </li>
          </Link>

          <li
            className={` mt-2 rounded bg-white text-black nav-item p-2 ${
              submenuOpenStates[0] ? "show " : ""
            }`}
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

          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${
              submenuOpenStates[1] ? "show " : ""
            }`}
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

          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${
              submenuOpenStates[2] ? "show" : ""
            }`}
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

          <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${
              submenuOpenStates[3] ? "show " : ""
            }`}
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
        </ul>
      
      <li
            className={`mt-2 rounded bg-white text-black nav-item p-2 ${
            submenuOpenStates[3] ? "show " : ""
            }`}
            onClick={() => toggleSubmenu(3)}
          >
            <i className="bi bi-cart-fill fs-4 me-3"></i>
            <span className="text-decoration-none p-1 dropdown-toggle fs-4">
            Warehouse Management
            </span>
            <div
              className={`collapse ${submenuOpenStates[3] ? "show" : ""}`}
              id="submenu1"
              aria-expanded={submenuOpenStates[3]}
            >
              <ul className="flex-column pl-2 nav">
                <li className="nav-item">
                  <Link
                    to="/isi Warehouse"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(8);
                    }}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-database-fill-up me-3 fs-4"></i>
                      <span>Item Data</span>
                    </span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/Luar Warehouse"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(9);
                    }}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-person-plus-fill me-3 fs-4"></i>
                      <span>external</span>
                    </span>
                  </Link> 
                </li>

                <li className="nav-item">
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={(e) => {
                      setActive(10);
                    }}
                  >
                    <span className="text-decoration-none p-4">
                      <i className="bi bi-clipboard-fill me-3 fs-4"></i>
                      <span>Resource</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </div>

        

      
      <div>
        <hr className="text-white" />
        <div className="nav-item p-2">
          <span className="text-white text-decoration-none p-1">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span>
              <strong className="fs-4">It's User</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
