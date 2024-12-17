import React from 'react'

const CardSite=({sitename,ip,sla,downtime,update,pic,gs,lc,id})=> {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h4 className="card-title">{sitename}</h4>
            <span>Ecom</span>
          </div>
          <div>
            <p className="card-text">{ip}</p>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="mb-2">
                <label>Lost SLA:</label>
                <input type="text" className="form-control" value={sla} readOnly />
              </div>
              <div className="mb-2">
                <label>Downtime:</label>
                <input
                  type="text"
                  className="form-control"
                  value={downtime}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label>Last Update:</label>
                <input
                  type="text"
                  className="form-control"
                  value={update}
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label>Last PIC:</label>
                <input type="text" className="form-control" value={pic} readOnly />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label>GS:</label>
                <input type="text" className="form-control" value={gs} readOnly />
              </div>
              <div className="mb-2">
                <label>LC:</label>
                <input type="text" className="form-control" value={lc} readOnly />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <a href={`/sitedetail?id=${id}`} className="btn btn-primary">
            Click to Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardSite