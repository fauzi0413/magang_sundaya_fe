import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CardBox = ({title,icon,iconcolor,value,descvalue,footnote}) => {
  return (
    <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
      <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
        <div>
          <h2>
            <span>{title}</span>
          </h2>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <i className={`bi ${icon} fs-1 text-${iconcolor}`}></i>
          </div>
          <div>
            <div className="d-flex align-items-end">
              <div>
                <h2>{value}</h2>
              </div>
              <div className="d-flex align-items-end">
                <span>{descvalue}</span>
              </div>
            </div>
            <div className="text-end">
              <span>{footnote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBox;
