import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBarcode } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderContent from './utils/HeaderContent';

const OutItem = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    snCode: "",
    itemName: "",
    sapCode: "",
    status: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clusterDestination, setClusterDestination] = useState("");
  const [qty, setQty] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setItems([...items, formData]);
    setFormData({ snCode: "", itemName: "", sapCode: "", status: "" });
  };

  const handleSend = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/vieworder");
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <HeaderContent title="Order - Out" icon="bi-file-earmark-text" />
      <div className="card p-4 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <button className="btn btn-outline-primary" onClick={() => navigate("/barcode")}>
            <FaBarcode />
          </button>
        </div>
        <h3 className="text-center mt-3">Outgoing Item</h3>
        <div className="row mt-3">
          <div className="col-md-6">
            <input className="form-control mb-2" name="snCode" placeholder="SN Code" value={formData.snCode} onChange={handleChange} />
            <input className="form-control mb-2" name="sapCode" placeholder="SAP Code" value={formData.sapCode} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <input className="form-control mb-2" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} />
            <input className="form-control mb-2" name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-3" onClick={handleAdd}>Add</button>
        </div>
      </div>
      
      <table className="table mt-4">
        <thead>
          <tr>
            <th>SN Code</th>
            <th>SAP Code</th>
            <th>Item Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.snCode}</td>
              <td>{item.sapCode}</td>
              <td>{item.itemName}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success mt-3" onClick={handleSend}>Send</button>
      </div>
      
      {/* Pop-up untuk Cluster Destination dan Qty */}
      <Modal show={showModal} centered>
        <Modal.Body className="text-center">
          <h4>DD/MM/YY</h4>
          <select className="form-control mb-2" value={clusterDestination} onChange={(e) => setClusterDestination(e.target.value)}>
            <option value="">Cluster Destination</option>
            <option value="Cluster 1">Cluster 1</option>
            <option value="Cluster 2">Cluster 2</option>
          </select>
          <input className="form-control mb-2" type="number" placeholder="Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
          <button className="btn btn-primary mt-3" onClick={handleConfirm}>Send</button>
        </Modal.Body>
      </Modal>
      
      {/* Pop-up sukses */}
      <Modal show={showSuccessModal} centered>
        <Modal.Body className="text-center">
          <h4>Success!</h4>
          <p>Data has been sent successfully.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OutItem;
