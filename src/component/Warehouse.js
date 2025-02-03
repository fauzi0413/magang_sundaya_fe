import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteWarehouseById, getInventory, getWarehouse } from "../api/axios";
import { Search, Calendar, Plus } from "lucide-react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';

const Warehouse = () => {
  const [warehouses, setWarehouse] = useState([]);
  const [inventorys, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState("NOC");
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
    if (total_barang === 0) return "danger"; // Merah
    if (total_barang <= min_stock) return "warning"; // Kuning
    return "success"; // Hijau
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
  
    // Handle detail item with specific ID
    const handleDetailWarehouse= (id) => {
      navigate(`/warehouse/${id}`); // Navigasi ke halaman edit dengan ID
    };
  
    // Handle edit item with specific ID
    const handleEditWarehouse= (id) => {
      navigate(`/warehouse/edit/${id}`); // Navigasi ke halaman edit dengan ID
    };
  
    // Handle delete item with specific ID
    const handleDeleteWarehouse = (id) => {
      Swal.fire({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this item!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!"
      }).then((result) => {
          if (result.isConfirmed) {
            deleteWarehouseById(id, (response) => {
                console.log('Item deleted:', response);
                setWarehouse(warehouses.filter((warehouse) => warehouse.id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "The item has been deleted successfully.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            });
          }
      });
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

        <div className="item-list ">
          {warehouses.map((item) => {
            const matchedInventory = inventorys.find(
              (inventory) => inventory.sap_code === item.sap_code
            );
            // Jika tidak ditemukan, gunakan nilai default
            const min_stock = matchedInventory?.min_stock || 0;
            const name = matchedInventory?.name || "Unknown Item"; 
            const description = matchedInventory?.description || "No description available";

            const statusClass = getStockStatus(item.total_barang, min_stock);

            return (
              <div className="p-4 my-3 bg-white item-card" key={item.id}>
                <div className="item-info">
                  <h3>{item.sap_code} - {name}</h3>
                  <p>{description}</p>
                </div>
                <div className="item-qty">
                  <span className={`badge bg-${statusClass}`}>{item.total_barang} pcs</span>
                  <button className='btn' onClick={() => handleDetailWarehouse(item.id)}><FaEye></FaEye></button>
                  <button className='btn text-primary' onClick={() => handleEditWarehouse(item.id)}><FaEdit></FaEdit></button>
                  <button className='btn text-danger' onClick={() => handleDeleteWarehouse(item.id)}><FaTrash></FaTrash></button>
                </div>
              </div>
            );
          })}
        </div>

         {/* Add Button */}
         <button
          onClick={() => navigate("/warehouse/create")}
          className="warehouse-add-button"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Warehouse;
