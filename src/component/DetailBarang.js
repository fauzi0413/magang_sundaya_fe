import React from "react";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke TambahOM
  const handleSendClick = () => {
    navigate("/WarehouseTambah");
  };

  // Fungsi untuk navigasi ke BarcodeOM
  const handleBarcodeClick = () => {
    navigate("/Barcode");
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {/* Gambar Barang */}
      <div className="position-relative">
        <img
          src="joulestick.png"
          alt="Item"
          style={{ width: "150px", height: "150px" }}
        />
        {/* Tombol Bulat */}
        <button
          className="btn btn-light rounded-circle position-absolute"
          style={{
            bottom: "10px",
            right: "10px",
            width: "40px",
            height: "40px",
            fontSize: "10px",
          }}
          onClick={handleBarcodeClick}
        >
          📷
        </button>
      </div>

      {/* Data Detail */}
      <div className="mt-4 w-100" style={{ maxWidth: "400px" }}>
        <table className="table">
          <tbody>
            <tr>
              <td>SAP Code</td>
              <td>:</td>
              <td>SAP001</td>
            </tr>
            <tr>
              <td>Nama Barang</td>
              <td>:</td>
              <td>Joulestick</td>
            </tr>
            <tr>
              <td>Total Barang</td>
              <td>:</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td>01/01/2023</td>
            </tr>
            <tr>
              <td>Deskripsi</td>
              <td>:</td>
              <td>Deskripsi Barang</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tombol Send */}
      <button
        className="btn btn-primary mt-3"
        style={{ width: "150px" }}
        onClick={handleSendClick}
      >
        Send
      </button>
    </div>
  );
};

export default DetailPage;
