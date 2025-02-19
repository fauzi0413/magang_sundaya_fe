import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons
import { deleteInventoryById, getInventory } from '../api/axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
<<<<<<< HEAD
=======
import HeaderContent from './utils/HeaderContent';
>>>>>>> 45558cc (initial commit)
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
<<<<<<< HEAD
    const matchesSearch = inventory.name.toLowerCase().includes(searchTerm.toLowerCase());
=======
    const matchesSearch = inventory.name.toLowerCase().includes(searchTerm.toLowerCase()) && inventory.status_data === "public";
>>>>>>> 45558cc (initial commit)
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
<<<<<<< HEAD
=======
       {/* Header  */}
       <HeaderContent title="Inventory Management" icon="bi-file-earmark-text" />
>>>>>>> 45558cc (initial commit)
      {/* Search Bar & Add Button */}
     <div className="mt-4 d-flex justify-content-center">
     <div className="gap-2 mb-4 d-flex align-items-center" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa', padding: '5px' }}>
          <input 
            type="text" 
            className="px-3 bg-transparent border-0 form-control" 
            placeholder="find the items you need" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}>
            <FaSearch /> 
          </button>
        </div>
        </div>
        <button 
          className="shadow-sm btn rounded-circle d-flex align-items-center justify-content-center" 
          style={{ backgroundColor: 'white', width: '40px', height: '40px', border: '1px solid #C42B2B' }}
          onMouseDown={(e) => e.target.style.backgroundColor = '#C42B2B'}
          onMouseUp={(e) => e.target.style.backgroundColor = 'white'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          onClick={() => navigate('/inventory/create')}
        >
          <FaPlus style={{ color: '#C42B2B' }} />
        </button>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
<<<<<<< HEAD
              <th>SAP-CODE</th>
              <th>Nama Barang</th>
              <th>Min Stock</th>
=======
              <th className='text-center'>No.</th>
              <th>SAP Code</th>
              <th>Nama Barang</th>
>>>>>>> 45558cc (initial commit)
              <th>Status</th>
              <th>Date</th>
              <th>Detail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
<<<<<<< HEAD
              inventorys.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.sap_code}</td>
                  <td>{inventory.name}</td>
                  <td>{inventory.min_stock}</td>
=======
              filteredData.map((inventory, index) => (
                <tr key={inventory.id}>
                  <td className='text-center'>{index + 1}</td>
                  <td>{inventory.sap_code}</td>
                  <td>{inventory.name}</td>
>>>>>>> 45558cc (initial commit)
                  <td>
                    {inventory.status === "show" ? (
                      <span className="badge bg-success">Show</span>
                    ) : inventory.status === "hide" ? (
                      <span className="badge bg-danger">Hide</span>
                    ) : (
                      <span className="badge bg-secondary">Unknown</span> // Jika status tidak "show" atau "hide"
                    )}
                  </td>
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