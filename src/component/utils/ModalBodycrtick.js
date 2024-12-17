import React from "react";

function ModalBodycrtick({ formData, handleChange }) {
  return (
    <>
      <form>
        {/* Site Name */}
        <div className="mb-3">
          <label htmlFor="siteName" className="form-label">
            Site Name
          </label>
          <input
            type="text"
            className="form-control"
            id="siteName"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            placeholder="Enter Site Name"
          />
        </div>

        {/* Status Site */}
        <div className="mb-3">
          <label htmlFor="statusSite" className="form-label">
            Status Site
          </label>
          <input
            type="text"
            className="form-control"
            id="statusSite"
            name="statusSite"
            value={formData.statusSite}
            onChange={handleChange}
            placeholder="Enter Status Site"
          />
        </div>

        {/* Problem */}
        <div className="mb-3">
          <label htmlFor="problem" className="form-label">
            Problem
          </label>
          <select
            className="form-select"
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
          >
            <option value="">Select Problem</option>
            <option value="Battery Rendah">Battery Rendah</option>
            <option value="Sensor Arus Bermasalah">
              Sensor Arus Bermasalah
            </option>
            <option value="LVD Rusak">LVD Rusak</option>
            <option value="SCC Tidak Termonitor">SCC Tidak Termonitor</option>
            <option value="SCC Rusak">SCC Rusak</option>
            <option value="SNMP Tidak Termonitor">SNMP Tidak Termonitor</option>
          </select>
        </div>

        {/* PIC */}
        <div className="mb-3">
          <label htmlFor="pic" className="form-label">
            PIC
          </label>
          <select
            className="form-select"
            id="pic"
            name="pic"
            value={formData.pic}
            onChange={handleChange}
          >
            <option value="">Select PIC</option>
            <option value="NOC">NOC</option>
            <option value="OM">OM</option>
            <option value="Management">Management</option>
          </select>
        </div>

        {/* File Input */}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Select File
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            onChange={handleChange}
          />
        </div>

        {/* Response / Note */}
        <div className="mb-3">
          <label htmlFor="response" className="form-label">
            Response / Note
          </label>
          <textarea
            className="form-control"
            id="response"
            name="response"
            value={formData.response}
            onChange={handleChange}
            rows="3"
            placeholder="Write your response or notes here..."
          ></textarea>
        </div>
      </form>
    </>
  );
}

export default ModalBodycrtick;

