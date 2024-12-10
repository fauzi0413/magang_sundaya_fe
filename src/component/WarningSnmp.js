import React from 'react'
import HeaderContent from './utils/HeaderContent';

function WarningSnmp() {
  return (
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <HeaderContent title={"Warning SNMP"} icon={"bi-router-fill"} />
        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <div className="d-flex justify-content-end">
                <select className="form-select" style={{ width: "200px" }}>
                  <option selected>Filter By</option>
                  <option value="option1">Site Name</option>
                  <option value="option2">Down Time </option>
                </select>
              </div>
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarningSnmp