import React from "react";

const HeaderContent = ({ title,Subtitle,icon }) => {
  return (
    <div className="row">
      <div className="col-12 p-3 bg-light">
        <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
          <i className={`bi ${icon} fs-1 text-success`}></i>
          <div>
            <h2>
              <span>{title}</span>
            </h2>
            <div>
              <span>{Subtitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderContent;
