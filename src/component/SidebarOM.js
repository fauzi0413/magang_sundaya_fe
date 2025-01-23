import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const SidebarOM = () => {
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);

  const toggleWarehouseSubmenu = () => {
    setIsWarehouseOpen(!isWarehouseOpen);
  };

  return (
    <div className="sidebar d-flex flex-column bg-primary text-white ps-3 py-3 pe-4" style={{ width: "250px", height: "100vh", position: "fixed" }}>
      <div className="mb-4">
        {/* Logo atau elemen lain di sidebar bisa disertakan di sini */}
      </div>

      <ul className="nav flex-column">
        {/* Warehouse Management */}
        <li className="nav-item">
          <div
            className="d-flex align-items-center bg-white text-dark p-2 rounded"
            style={{ cursor: "pointer" }}
            onClick={toggleWarehouseSubmenu}
          >
            <i className="bi bi-cart-fill fs-4 me-2"></i>
            <span className="fs-5">Warehouse Management</span>
            <i className={`bi ms-auto ${isWarehouseOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </div>

          {/* Dropdown Submenu */}
          {isWarehouseOpen && (
            <ul className="list-unstyled ms-3 mt-2">
              <li className="nav-item">
                <Link to="/ItemDataOM" className="text-decoration-none text-dark d-flex align-items-center py-2">
                  <i className="bi bi-database-fill-up me-2 fs-5"></i>
                  <span>Item Data</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/HistoryOM" className="text-decoration-none text-dark d-flex align-items-center py-2">
                  <i className="bi bi-person-plus-fill me-2 fs-5"></i>
                  <span>History</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarOM;
