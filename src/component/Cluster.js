import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'; // Importing icons
import { deleteClusterById, getCluster } from '../api/axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

const Cluster = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clusters, setCluster] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All'); // State for filtering status
  const navigate = useNavigate();
  
    useEffect(() => {
      getCluster((data) => {
        setCluster(data);
      });
    }, []);
    
  // Filter data based on search term and status
  const filteredData = clusters.filter(cluster => {
    const matchesSearch = cluster.provinsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || cluster.status === filterStatus;
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

  // Navigate to InputCluster page
  const handleAddItem = () => {
    navigate('/cluster/create');
  };

  // Handle edit item with specific ID
  const handleEditItem = (id) => {
    navigate(`/cluster/edit/${id}`); // Navigasi ke halaman edit dengan ID
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
            deleteClusterById(id, (response) => {
                console.log('Item deleted:', response);
                setCluster(clusters.filter((cluster) => cluster.id !== id));

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
          onClick={() => navigate('/cluster/create')}
        >
          <FaPlus style={{ color: '#C42B2B' }} />
        </button>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Cluster</th>
              <th>Provinsi</th>
              <th>Kabupaten/Kota</th>
              <th>Center Point</th>
              <th>PIC</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              clusters.map((cluster) => (
                <tr key={cluster.id}>
                  <td>{cluster.id_cluster}</td>
                  <td>{cluster.provinsi}</td>
                  <td>{cluster.kabupaten_kota}</td>
                  <td>{cluster.center_point}</td>
                  <td>{cluster.pic}</td>
                  <td>{cluster.contact}</td>
                  <td>
                    <button className='btn text-primary' onClick={() => handleEditItem(cluster.id)}><FaEdit></FaEdit></button>
                    <button className='btn text-danger' onClick={() => handleDeleteItem(cluster.id)}><FaTrash></FaTrash></button>
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

export default Cluster;