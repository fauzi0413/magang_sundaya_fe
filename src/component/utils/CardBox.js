import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

<<<<<<< HEAD
const CardBox = ({title,icon,iconcolor,value,descvalue,footnote,route}) => {
  return (
    <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
      <a
        href={`/${route}`}
        className="text-decoration-none"
        style={{ color: "inherit" }}
      >
        <div
          className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm rounded-2"
          style={{ width: "300px" }}
        >
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
=======
const CardBox = ({ title, icon, iconcolor, value, descvalue, footnote, route }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
      <a
        href={`/${route}`}
        className="text-decoration-none d-block h-100"
        style={{ color: "inherit" }}
      >
        <div
          className="d-flex flex-column justify-content-between p-3 bg-white border border-secondary shadow-sm rounded-2 h-100"
        >
          <div>
            <h2 className="fs-5 mb-3">{title}</h2>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <i className={`bi ${icon} fs-1 text-${iconcolor}`}></i>
            </div>
            <div className="text-end">
              <div className="d-flex align-items-end justify-content-end">
                <h2 className="mb-0 me-2">{value}</h2>
                <span className="text-muted">{descvalue}</span>
              </div>
              <span className="text-muted">{footnote}</span>
>>>>>>> 45558cc (initial commit)
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

<<<<<<< HEAD
export default CardBox;
=======
export default CardBox;
>>>>>>> 45558cc (initial commit)
