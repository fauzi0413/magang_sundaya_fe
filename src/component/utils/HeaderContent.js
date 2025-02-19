import React from "react";

<<<<<<< HEAD
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
=======
const HeaderContent = ({ title }) => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-light p-3 mb-3 shadow rounded text-center" style={{ borderRadius: '10px' }}> 
        <div className="border" style={{ width: '1%', height: '70px', backgroundColor: '#C42B2B', borderRadius: '5px' }}></div> 
        <h3 className="text-dark w-100" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{title}</h3>
        <div className="border" style={{ width: '1%', height: '70px', backgroundColor: '#C42B2B', borderRadius: '5px' }}></div> 
    </div>
  );
};

export default HeaderContent;

>>>>>>> 45558cc (initial commit)
