import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderContent from "./utils/HeaderContent";
import { getWarehouse, getInventory, postMaterial, getMaterial } from "../api/axios";

const InputingItem = () => {
  const [items, setItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [material, setMaterial] = useState([]);
  const [inventorys, setInventorys] = useState([]);
  const [filteredSAPCodes, setFilteredSAPCodes] = useState([]);
  const [isReadonly, setIsReadonly] = useState(false);
  const [formData, setFormData] = useState({
    sapCode: "",
    snCode: "",
    itemName: "",
    status: "",
    itemSource: "WH001",
    condition: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getMaterial(setMaterial);
    getWarehouse(setWarehouses);
    getInventory(setInventorys);
  }, []);

  useEffect(() => {
    if (warehouses.length > 0 && inventorys.length > 0) {
      const warehouseSAPs = warehouses.map((w) => w.sap_code);
      const validSAPs = inventorys.filter((inv) => warehouseSAPs.includes(inv.sap_code));
      setFilteredSAPCodes(validSAPs);
    }
  }, [warehouses, inventorys]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "sapCode" && !isReadonly) {
      const selectedItem = inventorys.find((item) => item.sap_code === value);
      setFormData({
        ...formData,
        sapCode: value,
        itemName: selectedItem ? selectedItem.name : "",
        itemSource: selectedItem ? "WH001" : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "All entered data will be lost!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({ sapCode: "", snCode: "", itemName: "", status: "", itemSource: "WH001", condition: "" });
        setItems([]);
        setIsReadonly(false);
      }
    });
  };

  const handleAdd = () => {
    if (!formData.sapCode || !formData.snCode || !formData.status || !formData.condition) {
      Swal.fire("Error", "SAP Code, SN Code, Status, and Condition are required!", "error");
      return;
    }
    if (items.some((item) => item.snCode === formData.snCode)) {
      Swal.fire("Error", "SN Code must be unique!", "error");
      return;
    }
    setItems([...items, formData]);
    setFormData({ ...formData, snCode: "", status: "", condition: "" });
    setIsReadonly(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter((_, i) => i !== index));
      }
    });
  };  

  const handleSave = (event) => {
    event.preventDefault();
  
    if (items.length === 0) {
      Swal.fire("Error", "No items to save!", "error");
      return;
    }
  
    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.username || "unknown_user";
  
    let lastIdData = material.reduce((max, item) => (item.id > max ? item.id : max), 0);

    if(lastIdData === ""){
      lastIdData = 0
    }

    // Buat array payload untuk setiap item
    const payloads = items.map((item) => ({
      id_material: `0${lastIdData}`,
      id_location: "WH001",
      sap_code: item.sapCode,
      sn_code: item.snCode,
      status_barang: item.status,
      kondisi_barang: item.condition,
      status_data: "public",
      user,
    }));
  
    // Kirim semua data ke server
    Promise.all(payloads.map((payload) => postMaterial(payload)))
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "All items have been saved successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/vieworder");
        });
      })
      .catch((error) => {
        console.error("Save error:", error);
        Swal.fire("Error", "Failed to save items!", "error");
      });
  };  

  return (
    <div className="container mt-4">
      <button onClick={() => navigate("/vieworder")} className="mb-3 me-2 btn btn-danger">
        <FaArrowLeft /> Back
      </button>
      <HeaderContent title="Order - IN" icon="bi-file-earmark-text" />
      <div className="card p-4 shadow">
        <h3 className="text-center mt-3">Inputing Item</h3>
        <div className="row mt-3">
          <div className="col-md-6">
            <select className="form-control mb-2" name="sapCode" value={formData.sapCode} onChange={handleChange} disabled={isReadonly}>
              <option value="">Pilih SAP Code</option>
              {filteredSAPCodes.map((item) => (
                <option key={item.id} value={item.sap_code}>
                  {item.sap_code} - {item.name}
                </option>
              ))}
            </select>
            <input className="form-control mb-2" name="snCode" placeholder="SN Code" value={formData.snCode} onChange={handleChange} />
            <input className="form-control mb-2 bg-light" name="itemSource" placeholder="Item Source" value={formData.itemSource} readOnly />
          </div>
          <div className="col-md-6">
            <input className="form-control mb-2 bg-light" name="itemName" placeholder="Item Name" value={formData.itemName} readOnly />
            <select className="form-control mb-2" name="status" value={formData.status} onChange={handleChange}>
              <option value="">Pilih Status Barang</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            <select className="form-control mb-2" name="condition" value={formData.condition} onChange={handleChange}>
              <option value="">Pilih Kondisi Barang</option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-3 me-2" onClick={handleAdd}>Add</button>
          <button className="btn btn-warning mt-3" onClick={handleReset}>Reset</button>
        </div>
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>SN Code</th>
            <th>SAP Code</th>
            <th>Item Name</th>
            <th>Status</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.snCode}</td>
              <td>{item.sapCode}</td>
              <td>{item.itemName}</td>
              <td>{item.status}</td>
              <td>{item.condition}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success mt-3" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};
export default InputingItem;
