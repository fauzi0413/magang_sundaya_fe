import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const initialItems = [
  { name: "JOULESTICK SUNDAYA", sap: "12231, Bogor, 10 maret", qty: 5, color: "yellow" },
  { name: "Nama Barang", sap: "sap code, lokasi, tanggal", qty: 0, color: "red" },
  { name: "Nama Barang", sap: "sap code, lokasi, tanggal", qty: 30, color: "green" },
  { name: "Nama Barang", sap: "sap code, lokasi, tanggal", qty: 21, color: "green" },
  { name: "Nama Barang", sap: "sap code, lokasi, tanggal", qty: 0, color: "red" },
  { name: "Nama Barang", sap: "sap code, lokasi, tanggal", qty: 21, color: "green" },
];

const Warehouse = () => {
  const [items, setItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState("OM");
  const navigate = useNavigate();

  const handleIncrement = (index) => {
    navigate("/DetailOM"); // Navigasi ke halaman DetailOM
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddItem = () => {
    navigate("/WarehouseDetail"); // Navigasi ke halaman WarehouseDetail
  };

  return (
    <div className="background/warehouse.css">
      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="icon">🔍</button>
        </div>
        <div className="toggle-buttons">
          <button className={`noc ${activeTab === "NOC" ? "active" : ""}`} onClick={() => handleTabChange("NOC")}>
            NOC
          </button>
          <button className={`om ${activeTab === "OM" ? "active" : ""}`} onClick={() => handleTabChange("OM")}>
            OM
          </button>
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-card" key={index}>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.sap}</p>
              </div>
              <div className="item-qty">
                <span>{item.qty} pcs</span>
                <button className="plus-icon" onClick={() => handleIncrement(index)}>+</button>
                <span className={`status ${item.color}`}></span>
              </div>
            </div>
          ))}
        </div>
       
      </div>
    </div>
  );
};

export default Warehouse;
