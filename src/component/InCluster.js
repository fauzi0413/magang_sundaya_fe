import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBarcode } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderContent from './utils/HeaderContent';

const InCluster = () => {
    const [condition, setCondition] = useState("NEW");
      const [items, setItems] = useState([]);
      const [formData, setFormData] = useState({
        sapCode: "",
        snCode: "",
        itemName: "",
        status: "",
        itemSource: "",
      });
      const [showModal, setShowModal] = useState(false);
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleAdd = () => {
        setItems([...items, formData]);
        setFormData({ sapCode: "", snCode: "", itemName: "", status: "", itemSource: "" });
      };
    
      const handleSave = () => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/requestorder");
        }, 2000);
      };
  return (
    <div className="container mt-4">
    {/* Header for Login Logs */}
    <HeaderContent title="Cluster - IN" icon="bi-file-earmark-text" />
    <div className="card p-4 shadow">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <input
            type="radio"
            name="condition"
            value="NEW"
            checked={condition === "NEW"}
            onChange={() => setCondition("NEW")}
          />
          <label className="ms-2 me-4">New</label>
          <input
            type="radio"
            name="condition"
            value="USED"
            checked={condition === "USED"}
            onChange={() => setCondition("USED")}
          />
          <label className="ms-2">Used🔁</label>
        </div>
        {condition === "USED" && (
          <button className="btn btn-outline-primary" onClick={() => navigate("/barcode")}>
            <FaBarcode />
          </button>
        )}
      </div>
      <h3 className="text-center mt-3">Inputing Item</h3>
      <div className="row mt-3">
        <div className="col-md-6">
          <input className="form-control mb-2" name="sapCode" placeholder="SAP Code" value={formData.sapCode} onChange={handleChange} />
          <input className="form-control mb-2" name="snCode" placeholder="SN Code" value={formData.snCode} onChange={handleChange} />
          <input className="form-control mb-2" name="itemSource" placeholder="Item Source" value={formData.itemSource} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input className="form-control mb-2" name="itemName" placeholder="Item Name" value={formData.itemName} onChange={handleChange} />
          <input className="form-control mb-2" name="status" placeholder="Status" value={formData.status} onChange={handleChange} />
          <input className="form-control mb-2" name="Condition" placeholder="Condition" value={formData.condition} onChange={handleChange} />
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
      <button className="btn btn-success mt-3" onClick={handleSave}>Save</button>
    </div>
    
    <Modal show={showModal} centered>
      <Modal.Body className="text-center">
        <h4>Success!</h4>
        <p>Data has been saved successfully.</p>
      </Modal.Body>
    </Modal>
  </div>
);
};
export default InCluster
