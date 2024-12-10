import React from 'react'

const CardSite=({sitename,ip,sla,downtime,update,pic,gs,lc})=> {
  return (
    <div class="col-12 col-sm-6 col-md-4 col-lg-4 p-3">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div>
            <h4 class="card-title">{sitename}</h4>
            <span>Ecom</span>
          </div>
          <div>
            <p class="card-text">{ip}</p>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <div class="mb-2">
                <label>Lost SLA:</label>
                <input
                  type="text"
                  class="form-control"
                  value={sla}
                  readOnly
                />
              </div>
              <div class="mb-2">
                <label>Downtime:</label>
                <input
                  type="text"
                  class="form-control"
                  value={downtime}
                  readOnly
                />
              </div>
              <div class="mb-2">
                <label>Last Update:</label>
                <input
                  type="text"
                  class="form-control"
                  value={update}
                  readOnly
                />
              </div>
              <div class="mb-2">
                <label>Last PIC:</label>
                <input
                  type="text"
                  class="form-control"
                  value={pic}
                  readOnly
                />
              </div>
            </div>
            <div class="col-6">
              <div class="mb-2">
                <label>GS:</label>
                <input
                  type="text"
                  class="form-control"
                  value={gs}
                  readOnly
                />
              </div>
              <div class="mb-2">
                <label>LC:</label>
                <input
                  type="text"
                  class="form-control"
                  value={lc}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center">
          <a href="/sitedetail" class="btn btn-primary">
            Click to Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardSite