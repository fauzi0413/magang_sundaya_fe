import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { getMaterialLogs, getInventory, postOrder, getOrder } from '../api/axios';
import moment from 'moment';
import HeaderContent from './utils/HeaderContent';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

moment.locale('id');

const ViewOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [materialLogs, setMaterialLogs] = useState([]);
  const [order, setOrder] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activeTab, setActiveTab] = useState('IN');
  const [reqType, setReqType] = useState('Req In'); // Tambahkan state untuk radio Req In & Req Out
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ sapCode: '', qty: '' });
  const [inventorys, setInventorys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMaterialLogs(setMaterialLogs);
    getOrder(setOrder);
    getInventory(setInventory);
    getInventory(setInventory);
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleSubmit = async () => {
    const { sapCode, qty } = modalData;
    const selectedMaterial = inventory.find(item => item.sap_code === sapCode);
    if (!selectedMaterial || !qty) return;

    let lastIdData = order.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const id_tujuan = reqType === 'Req In' ? 'M1' : 'WH001'; // Sesuaikan tujuan berdasarkan radio button

    const orderData = Array.from({ length: qty }, () => ({
      id_order: `0${lastIdData}`,
      id_material: "",
      id_tujuan,
      status_checking: "pending",
      sap_code: sapCode
    }));

    postOrder(orderData, () => {
      Swal.fire({
        title: "Success!",
        text: "The item has been created successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        handleCloseModal();
        navigate('/viewOrder');
      });
    });
  };

  const groupedOrders = order.reduce((acc, item) => {
  const qty = Number(item.qty) || 0; // Pastikan qty berupa angka

  if (!acc[item.id_order]) {
    acc[item.id_order] = {
      id_order: item.id_order,
      sap_code: item.sap_code,
      id_tujuan: item.id_tujuan,
      created_at: item.created_at,
      totalQty: qty,  // Inisialisasi total jumlah
      count: 1,       // Inisialisasi jumlah pesanan
    };
  } else {
    acc[item.id_order].totalQty += qty; // Tambahkan qty jika id_order sama
    acc[item.id_order].count++;         // Tambahkan jumlah pesanan
  }

  return acc;
}, {});

// Ubah ke array untuk mapping
const groupedOrdersArray = Object.values(groupedOrders);

  return (
    <div className="container my-5 justify-content-center">
      <HeaderContent title="Order Warehouse" icon="bi-file-earmark-text" />

      {/* Toggle Button */}
      <div className="d-flex justify-content-center">
        <div className="order-toggle">
          <button className={`order-toggle-button ${activeTab === "IN" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("IN")}>IN</button>
          <button className={`order-toggle-button ${activeTab === "OUT" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("OUT")}>OUT</button>
          <button className={`order-toggle-button ${activeTab === "REQ" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("REQ")}>REQ</button>
        </div>
      </div>

      {/* Search Bar & Buttons */}
      <div className="mt-4 d-flex justify-content-center align-items-center mb-3" style={{ width: '100%' }}>
        {/* Search Input */}
        <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa', padding: '5px' }}>
          <input type="text" className="px-3 bg-transparent border-0 form-control" placeholder="Search Item" value={searchTerm} onChange={handleSearchChange} />
          <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}><FaSearch /></button>
        </div>

        {/* Kondisi Tombol di Kanan Search */}
        {activeTab === 'IN' && (
          <button className="shadow-sm btn rounded-circle d-flex align-items-center justify-content-center ms-3"
            style={{ backgroundColor: 'white', width: '40px', height: '40px', border: '1px solid #C42B2B' }} onClick={() => navigate("/inWarehouse")}>
            <FaPlus style={{ color: '#C42B2B' }} />
          </button>
        )}
        
        {activeTab === 'OUT' && (
          <button className="shadow-sm btn rounded-circle d-flex align-items-center justify-content-center ms-3"
            style={{ backgroundColor: 'white', width: '40px', height: '40px', border: '1px solid #007BFF' }} onClick={() => navigate("/outWarehouse")}>
            <FaShoppingCart style={{ color: '#007BFF' }} />
          </button>
        )}
        
        {(activeTab === 'REQ' && reqType === 'Req In') && (
          <button className="shadow-sm btn rounded-circle d-flex align-items-center justify-content-center ms-3"
            style={{ backgroundColor: 'white', width: '40px', height: '40px', border: '1px solid #C42B2B' }} onClick={handleOpenModal}>
            <FaPlus style={{ color: '#C42B2B' }} />
          </button>
        )}
      </div>

      {/* Radio Req In / Req Out */}
      {activeTab === 'REQ' && (
        <div className="d-flex justify-content-left align-items-center-left">
          <Form.Check
            type="radio"
            label="Req In"
            name="reqType"
            checked={reqType === 'Req In'}
            onChange={() => setReqType('Req In')}
            className="mx-3"
          />
          <Form.Check
            type="radio"
            label="Req Out"
            name="reqType"
            checked={reqType === 'Req Out'}
            onChange={() => setReqType('Req Out')}
            className="mx-3"
          />
        </div>
      )}

      {/* Filter Data berdasarkan Tab */}
      <div className="item-list">
        {activeTab === 'IN' &&
          materialLogs
            .filter(item => item.action === 'insert')
            .map(item => (
              <div className="p-4 my-3 bg-light item-card" key={item.id}>
                <div className="item-info">
                  <h3>{item.id_location}</h3>
                  <p>{moment(item.created_at).format('DD/MM/YY')}</p>
                </div>
                <div className="item-qty">
                  <span>{item.qty} pcs</span>
                </div>
              </div>
            ))
        }

        {activeTab === 'OUT' &&
          materialLogs
            .filter(item => item.action === 'update')
            .map(item => (
              <div className="p-4 my-3 bg-light item-card" key={item.id}>
                <div className="item-info">
                  <h3>{item.id_location}</h3>
                  <p>{moment(item.created_at).format('DD/MM/YY')}</p>
                </div>
                <div className="item-qty">
                  <span>{item.qty} pcs</span>
                </div>
              </div>
            ))
        }

        {activeTab === 'REQ' &&
          groupedOrdersArray
          .filter(item => 
            (reqType === 'Req In' && item.id_tujuan === 'M1') ||
            (reqType === 'Req Out' && item.id_tujuan === 'WH001')
          )
          .map(item => {
            const matchedInventory = inventory.find((inv) => inv.sap_code === item.sap_code) || {};
        
            return (
              <div className="p-4 my-3 bg-light item-card" key={item.id_order}>
                <div className="item-info">
                  <h3>{matchedInventory?.name || 'Unknown'}</h3>
                  <p>{moment(item.created_at).format('DD/MM/YY')}, {item.sap_code}, {item.id_tujuan === 'M1' ? 'Management' : item.id_tujuan}</p>
                </div>
                <div className="item-qty">
                  <span>{item.count} pcs</span>
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Modal untuk Input Order */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <h4>{moment().format('DD/MM/YY')}</h4>
          <Form>
            <Form.Select className="mb-3" onChange={(e) => setModalData(prev => ({ ...prev, sapCode: e.target.value }))}>
              <option value="">Pilih SAP Code</option>
              {inventory
                .filter(item => item.status_data === 'public') // Perbaikan filter
                .map((item) => (
                  <option key={item.sap_code} value={item.sap_code}>
                    {item.sap_code} - {item.name}
                  </option>
                ))
              }
            </Form.Select>
            <Form.Control className="mb-3" placeholder="Qty" type="number" onChange={(e) => setModalData(prev => ({ ...prev, qty: e.target.value }))} />
            <Button variant="primary" className="w-100" onClick={handleSubmit}>Confirm</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default ViewOrder;
