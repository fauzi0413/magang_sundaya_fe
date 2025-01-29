import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { getInventory, getWarehouse } from "../api/axios";
import { Search, Calendar, Plus } from "lucide-react";




const Warehouse = () => {
  const [warehouses, setWarehouse] = useState([]);
  const [inventorys, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState("OM");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());


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

  // const [activeTab, setActiveTab] = useState("OM");
  const navigate = useNavigate();

  const getStockStatus = (total_barang, min_stock) => {
    if (total_barang < min_stock) return "low-stock"; // Merah
    if (total_barang === min_stock) return "medium-stock"; // Kuning
    return "high-stock"; // Hijau
  };

  const handleIncrement = (index) => {
    navigate("/DetailBarang"); // Navigasi ke halaman DetailBarang
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddItem = () => {
    navigate("/WarehouseDetail"); // Navigasi ke halaman WarehouseDetail
  };

  const generateCalendarDays = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    
    // Previous month days
    for (let i = firstDay.getDay(); i > 0; i--) {
      days.push({ day: new Date(firstDay - i * 86400000).getDate(), inactive: true });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ day: i, inactive: false });
    }
    
    return days;
  };



  return (
    <div className="backgroundwarehouse">
      <div className="container bg-transparent">
          {/* Search Bar and Controls */}
          <div className="warehouse-controls">
          <div className="warehouse-search-wrapper">
            <input
              type="text"
              placeholder="Search"
              className="warehouse-search-input"
            />
            <Search className="warehouse-search-icon" size={20} />
          </div>
          
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="warehouse-calendar-button"
          >
            <Calendar size={20} />
          </button>

          <div className="warehouse-toggle">
            <button
              className={`warehouse-toggle-button ${
                activeTab === "NOC" ? "warehouse-toggle-active" : ""
              }`}
              onClick={() => setActiveTab("NOC")}
            >
              NOC
            </button>
            <button
              className={`warehouse-toggle-button ${
                activeTab === "OM" ? "warehouse-toggle-active" : ""
              }`}
              onClick={() => setActiveTab("OM")}
            >
              OM
            </button>
          </div>
        </div>


         {/* Calendar Dropdown */}
         {showCalendar && (
          <div className="warehouse-calendar">
            <div className="warehouse-calendar-sidebar">
              <button className="warehouse-calendar-option">Today</button>
              <button className="warehouse-calendar-option">Yesterday</button>
              <button className="warehouse-calendar-option">Last 7 Days</button>
              <button className="warehouse-calendar-option">Last 30 Days</button>
              <button className="warehouse-calendar-option">This Month</button>
              <button className="warehouse-calendar-option">Last Month</button>
              <button className="warehouse-calendar-option warehouse-calendar-option-active">
                Custom Range
              </button>
            </div>
            
            <div className="warehouse-calendar-main">
              <div className="warehouse-calendar-header">
                <button className="warehouse-calendar-nav">&lt;</button>
                <span className="warehouse-calendar-title">Mar 2018</span>
                <button className="warehouse-calendar-nav">&gt;</button>
              </div>
              
              <div className="warehouse-calendar-grid">
                <div className="warehouse-calendar-weekday">Su</div>
                <div className="warehouse-calendar-weekday">Mo</div>
                <div className="warehouse-calendar-weekday">Tu</div>
                <div className="warehouse-calendar-weekday">We</div>
                <div className="warehouse-calendar-weekday">Th</div>
                <div className="warehouse-calendar-weekday">Fr</div>
                <div className="warehouse-calendar-weekday">Sa</div>
                
                {generateCalendarDays(selectedMonth).map((day, idx) => (
                  <div
                    key={idx}
                    className={`warehouse-calendar-day ${
                      day.inactive ? 'warehouse-calendar-day-inactive' : ''
                    }`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="item-list">
          {warehouses.map((item) => {
            const matchedInventory = inventorys.find(
              (inventory) => inventory.sap_code === item.sap_code
            );
            const min_stock = matchedInventory ? matchedInventory.min_stock : 0;
            const statusClass = getStockStatus(item.total_barang, min_stock);

            return (
              <div className="item-card m-3 my-5 bg-white p-4" key={item.id}>
                <div className="item-info">
                  {matchedInventory && <h3>{matchedInventory.name}</h3>}
                  <h3>{item.name}</h3>
                  <p>{item.sap_code}</p>
                </div>
                <div className="item-qty">
                  <span>{item.total_barang} pcs</span>
                  <button
                    className="plus-icon"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                  <span className={`status ${statusClass}`} style={{fontSize: '100px'}}></span>
                </div>
              </div>
            );
          })}
        </div>

         {/* Add Button */}
         <button
          onClick={() => navigate("/WarehouseDetail")}
          className="warehouse-add-button"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Warehouse;
