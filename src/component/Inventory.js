import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons
import { deleteInventoryById, getInventory } from '../api/axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventorys, setInventory] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); // State for filtering status
  const navigate = useNavigate();
  
    useEffect(() => {
      getInventory((data) => {
        setInventory(data);
      });
    }, []);
    
  // Filter data based on search term and status
  const filteredData = inventorys.filter(inventory => {
    const matchesSearch = inventory.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || inventory.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle status filter buttons
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Navigate to InputInventory page
  const handleAddItem = () => {
    navigate('/inventory/create');
  };

  // Handle edit item with specific ID
  const handleEditItem = (id) => {
    navigate(`/inventory/edit/${id}`); // Navigasi ke halaman edit dengan ID
  };

  // Handle deelete item with specific ID
  const handleDeleteItem = (id) => {
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
            deleteInventoryById(id, (response) => {
                console.log('Item deleted:', response);
                setInventory(inventorys.filter((inventory) => inventory.id !== id));

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
    <div className="container my-5">
      {/* Search Bar & Add Button */}
      <div className="mb-3 d-flex">
        <input 
          type="text" 
          className="form-control search-bar me-2" 
          placeholder="Find the items you need" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-secondary me-2">
          <FaSearch /> Search
        </button>
        <button className="btn btn-primary d-flex align-items-center" onClick={handleAddItem} style={{ padding: '10px' }}>
          <FaPlus size={16} style={{ marginRight: '5px' }} /> Add
        </button>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>SAP-CODE</th>
              <th>Nama Barang</th>
              <th>Min Stock</th>
              <th>Status</th>
              <th>Date</th>
              <th>Detail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              inventorys.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.sap_code}</td>
                  <td>{inventory.name}</td>
                  <td>{inventory.min_stock}</td>
                  <td>{inventory.status}</td>
                  <td>{moment(inventory.created_at).format('llll')}</td>
                  <td>{inventory.description}</td>
                  <td>
                    <button className='btn text-primary' onClick={() => handleEditItem(inventory.id)}><FaEdit></FaEdit></button>
                    <button className='btn text-danger' onClick={() => handleDeleteItem(inventory.id)}><FaTrash></FaTrash></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;