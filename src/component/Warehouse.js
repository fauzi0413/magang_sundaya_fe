import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { getInventory, getWarehouse } from "../api/axios";
import { FaSearch } from "react-icons/fa";

const Warehouse = () => {
  const [warehouses, setWarehouse] = useState([]);
  const [inventorys, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState("OM");
  const navigate = useNavigate();

  useEffect(() => {
    getWarehouse((data) => {
      setWarehouse(data);
    });
  }, []);

  useEffect(() => {
    getInventory((data) => {
      setInventory(data);
    });
  }, []);

  const handleIncrement = (index) => {
    navigate("/DetailBarang");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddItem = () => {
    navigate("/WarehouseDetail");
  };

  return (
    <div className="backgroundwarehouse">
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold border-radius py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center gap-2">
          <FaSearch />
          
        </button>
        
        <div className="toggle-buttons">
          <button className={`noc ${activeTab === "NOC" ? "active" : ""}`} onClick={() => handleTabChange("NOC")}>
            NOC
          </button>
          <tr>
          <button className={`om ${activeTab === "OM" ? "active" : ""}`} onClick={() => handleTabChange("OM")}>
            OM
          </button>
          </tr>
        </div>
        </div>
        <div className="item-list">
          {warehouses.map((item) => (
            <div className="item-card" key={item.id}>
              <div className="item-info">
                {inventorys
                  .filter((inventory) => inventory.sap_code === item.sap_code)
                  .map((inventory) => (
                    <h3 key={inventory.id}>{inventory.name}</h3>
                  ))}
                <h3>{item.name}</h3>
                <p>{item.sap_code}</p>
              </div>
              <div className="item-qty">
                <span>{item.total_barang} pcs</span>
                <button className="plus-icon" onClick={() => handleIncrement(item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-button" onClick={handleAddItem}>+</button>
      </div>
    </div>
  );
};

export default Warehouse;
