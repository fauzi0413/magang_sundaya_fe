import React, { useState } from "react";

const MultiSelectBootstrap = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ["Aifam", "Aisa", "Boha", "Bumi Rahmat", "Dorolamo 1"];

  // Handle Select All
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOptions([...options]); // Pilih semua opsi
    } else {
      setSelectedOptions([]); // Hapus semua pilihan
    }
  };

  // Handle per checkbox
  const handleOptionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedOptions((prev) => [...prev, value]); // Tambahkan opsi
    } else {
      setSelectedOptions((prev) => prev.filter((item) => item !== value)); // Hapus opsi
    }
  };

  return (
    <div className="container">
      <h5>NOJS</h5>
      <div className="dropdown">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select Options"}
        </button>
        <ul className="dropdown-menu p-3" style={{ width: "250px" }}>
          <li>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={selectedOptions.length === options.length}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select All
              </label>
            </div>
          </li>
          <hr />
          {options.map((option, index) => (
            <li key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={option}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleOptionChange}
                />
                <label className="form-check-label" htmlFor={option}>
                  {option}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectBootstrap;
