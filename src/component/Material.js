import React, { useEffect, useState } from 'react';
import { FaSearch, FaTrash, FaEye, FaSort, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';
import { getMaterial, deleteMaterialById, getInventory } from '../api/axios';
import Swal from 'sweetalert2';
import HeaderContent from './utils/HeaderContent';
import { useNavigate } from 'react-router-dom';

const Material = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState('ALL');
  const [clusterFilter, setClusterFilter] = useState('');
  const [showClusterDropdown, setShowClusterDropdown] = useState(false);
  const [clusterList, setClusterList] = useState([]);
  const [inventorys, setInventorys] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    getMaterial(setMaterials);
    getInventory(setInventorys);
  }, []);

  useEffect(() => {
    // Ambil semua id_location unik dari materials, kecuali WH001
    const uniqueClusters = [...new Set(materials.map((material) => material.id_location))]
      .filter((id) => id !== "WH001"); // Hapus WH001 dari daftar cluster
  
    setClusterList(uniqueClusters);
  }, [materials]);  

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = [...materials].sort((a, b) => {
    if (!sortConfig.key) return 0;
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key].localeCompare(b[sortConfig.key])
      : b[sortConfig.key].localeCompare(a[sortConfig.key]);
  });

  const filteredData = sortedData.filter((material) => {
    if (filter === "WH") {
      return material.id_location === "WH001"; // Jika filter WH, hanya tampilkan WH001
    } else if (filter === "Cluster" && clusterFilter) {
      return material.id_location === clusterFilter; // Jika filter Cluster, hanya tampilkan berdasarkan clusterFilter
    } else {
      return true; // Jika filter ALL atau Cluster tanpa filter spesifik, tampilkan semua data
    }
  }).filter((material) =>
    material.sn_code?.toLowerCase().includes(searchTerm.toLowerCase()) // Filter berdasarkan pencarian SN Code
  );  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMaterialById(id, () => {
          setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== id));
          Swal.fire('Deleted!', 'The item has been deleted successfully.', 'success');
        });
      }
    });
  };
  
  return (
    <div className="container mt-4">
      <HeaderContent title="Material Management" icon="bi-file-earmark-text" />
      <div className="card p-3 rounded">
        <div className="mb-3 d-flex align-items-center">
          {(filter === 'ALL' || filter === 'Cluster') && (
            <div className="position-relative me-3">
              <button className="btn btn-light" onClick={() => setShowClusterDropdown(!showClusterDropdown)}>
                <FaFilter />
              </button>
              {showClusterDropdown && clusterList.length > 0 && (
                <div className="dropdown-menu show p-2 shadow bg-white" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1050 }}>
                  {clusterList.map((cluster, index) => (
                    <div 
                      key={index} 
                      className="dropdown-item" 
                      onClick={() => { 
                        setClusterFilter(cluster);
                        setFilter("Cluster"); // Pastikan filter diubah ke Cluster
                        setShowClusterDropdown(false); 
                      }}>
                      {cluster}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="input-group-text bg-white"><FaSearch /></span>
          </div>
          <div className="ms-auto">
            <button className={`btn ${filter === 'ALL' ? 'btn-primary' : 'btn-light'} rounded-pill me-2`} onClick={() => setFilter('ALL')}>ALL</button>
            <button className={`btn ${filter === 'WH' ? 'btn-primary' : 'btn-light'} rounded-pill me-2`} onClick={() => setFilter('WH')}>WH</button>
            {clusterList.length > 0 && (
              <button className={`btn ${filter === 'Cluster' ? 'btn-primary' : 'btn-light'} rounded-pill`} onClick={() => setFilter('Cluster')}>Cluster</button>
            )}
          </div>
        </div>

        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th className='text-center'>No.</th>
              <th onClick={() => handleSort('sn_code')} className="sortable">SN Code <FaSort /></th>
              <th onClick={() => handleSort('sap_code')} className="sortable">SAP Code <FaSort /></th>
              <th onClick={() => handleSort('name')} className="sortable">Item Name <FaSort /></th>
              <th>Status</th>
              <th onClick={() => handleSort('condition')} className="sortable">Condition <FaSort /></th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((material, index) => (
                <tr key={index}>
                  <td className='text-center'>{index + 1}</td>
                  <td>{material.sn_code}</td>
                  <td>{material.sap_code}</td>
                  <td>
                    {inventorys.find((inv) => inv.sap_code === material.sap_code)?.name || 'Unknown'}
                  </td>
                  <td>
                    <span className={`badge ${material.status_barang === 'new' ? 'bg-success' : 'bg-danger'} text-capitalize`}>
                      {material.status_barang}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${material.kondisi_barang === 'good' ? 'bg-success' : 'bg-danger'} text-capitalize`}>
                      {material.kondisi_barang}
                    </span>
                  </td>
                  <td className='text-center'>
                    <button className='btn text-primary' onClick={() => navigate(`/material/detail/${material.id}`)}><FaEye /></button>
                    <button className='btn text-danger' onClick={() => handleDeleteItem(material.id)}><FaTrash /></button>
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

export default Material;
