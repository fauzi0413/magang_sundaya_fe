import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaEye, FaShoppingCart } from 'react-icons/fa';
import { getCluster } from '../api/axios';
import { SlidersHorizontal } from 'lucide-react';
import moment from 'moment';
import HeaderContent from './utils/HeaderContent';
import { Modal, Button, Form } from 'react-bootstrap';

moment.locale('id');

const Cluster = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clusters, setClusters] = useState([]);
  const [activeTab, setActiveTab] = useState('IN');
  const [reqType, setReqType] = useState('Req In');
  const [selectedCluster, setSelectedCluster] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ sapCode: '', qty: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getCluster((data) => {
      setClusters(data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div className="container my-5 justify-content-center">
      <HeaderContent title="Cluster Order" icon="bi-file-earmark-text" />
      <div className="d-flex justify-content-center">
        <div className="order-toggle">
          <button className={`order-toggle-button ${activeTab === "IN" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("IN")}>
            IN
          </button>
          <button className={`order-toggle-button ${activeTab === "OUT" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("OUT")}>
            OUT
          </button>
          <button className={`order-toggle-button ${activeTab === "REQ" ? "order-toggle-active" : ""}`} onClick={() => setActiveTab("REQ")}>
            REQ
          </button>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center align-items-center mb-3 gap-2">
        <div className="dropdown">
          <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <SlidersHorizontal /> {selectedCluster || ""}
          </button>
          <ul className="dropdown-menu">
            {clusters.map((cluster, index) => (
              <li key={index}>
                <button className="dropdown-item" onClick={() => setSelectedCluster(cluster.id)}>
                  {cluster.id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa' }}>
          <input type="text" className="px-3 bg-transparent border-0 form-control" placeholder="Item name" value={searchTerm} onChange={handleSearchChange} />
          <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}>
            <FaSearch />
          </button>
        </div>

        {activeTab === 'IN' && (
          <button className="shadow-sm btn rounded-circle" style={{ backgroundColor: 'white', border: '1px solid #C42B2B' }} onClick={() => navigate('/InCluster')}>
            <FaPlus style={{ color: '#C42B2B' }} />
          </button>
        )}
        {activeTab === 'REQ' && reqType === 'Req In' && (
          <button className="shadow-sm btn rounded-circle" style={{ backgroundColor: 'white', border: '1px solid #C42B2B' }} onClick={handleModalShow}>
            <FaPlus style={{ color: '#C42B2B' }} />
          </button>
        )}
        {activeTab === 'OUT' && (
          <button className="btn btn-primary shadow" onClick={() => navigate('/OutCluster')}>
            <FaShoppingCart />
          </button>
        )}
      </div>

      {activeTab === 'REQ' && (
        <div className="d-flex justify-content-center mb-3">
          <label className="me-3">
            <input type="radio" name="reqType" value="Req In" checked={reqType === 'Req In'} onChange={() => setReqType('Req In')} /> Req In
          </label>
          <label>
            <input type="radio" name="reqType" value="Req Out" checked={reqType === 'Req Out'} onChange={() => setReqType('Req Out')} /> Req Out
          </label>
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Body className="text-center">
          <h5>{moment().format('DD/MM/YY')}</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Select value={modalData.sapCode} onChange={(e) => setModalData({ ...modalData, sapCode: e.target.value })}>
                <option value="">SAP_Code</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="number" placeholder="Qty" value={modalData.qty} onChange={(e) => setModalData({ ...modalData, qty: e.target.value })} />
            </Form.Group>
            <Button variant="primary" onClick={handleModalClose}>Confirm</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cluster;
