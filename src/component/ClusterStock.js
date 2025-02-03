import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons
import { deleteClusterStockById, getClusterStock } from '../api/axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

const ClusterStock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clusterStocks, setClusterStock] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); // State for filtering status
  const navigate = useNavigate();
  
  useEffect(() => {
    getClusterStock((data) => {
      setClusterStock(data);  
    });
  }, []);
    
  // Filter data based on search term and status
  const filteredData = clusterStocks.filter(clusterStock => {
    const matchesSearch = clusterStock.sap_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || clusterStock.status === filterStatus;
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

  // Handle edit item with specific ID
  const handleEditItem = (id) => {
    navigate(`/clusterstock/edit/${id}`); // Navigasi ke halaman edit dengan ID
  };

  // Handle delete item with specific ID
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
        deleteClusterStockById(id, (response) => {
                console.log('Item deleted:', response);
                setClusterStock(clusterStocks.filter((clusterStock) => clusterStock.id !== id));

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
          onClick={() => navigate('/clusterstock/create')}
        >
          <FaPlus style={{ color: '#C42B2B' }} />
        </button>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Cluster</th>
              <th>Total Site</th>
              <th>SAP Code</th>
              <th>Total Barang</th>
              <th>Status Barang</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              clusterStocks.map((clusterStock) => (
                <tr key={clusterStock.id}>
                  <td>{clusterStock.id_cluster}</td>
                  <td>{clusterStock.total_site}</td>
                  <td>{clusterStock.sap_code}</td>
                  <td>{clusterStock.total}</td>
                  <td>{
                      clusterStock.status_barang === "baru" ? "Baru" : 
                      clusterStock.status_barang === "bekas" ? "Bekas" : clusterStock.status_barang
                      }
                  </td>
                  <td>
                    <button className='btn text-primary' onClick={() => handleEditItem(clusterStock.id)}><FaEdit></FaEdit></button>
                    <button className='btn text-danger' onClick={() => handleDeleteItem(clusterStock.id)}><FaTrash></FaTrash></button>
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

export default ClusterStock;