import React from "react";
import HeaderContent from "./utils/HeaderContent";
import MultiSelectBootstrap from "./utils/MultiSelectBootsrap";

function SLA1() {
  return (
    <div className="p-3 bg-light">
      <div className="container">
        <HeaderContent title={"SLA1"} icon={"bi-wifi"} />
        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <div class="table d-flex p-3 ">
                <table class="table">
                  <tbody>
                    <tr>
                      <td>
                        <div class="form-floating">
                          <input
                            type="datetime-local"
                            class="form-control"
                            id="dateInputStart"
                            name="dateInputStart"
                            placeholder=""
                            aria-describedby="dateHelp"
                          />
                          <label for="dateInputstart">Start</label>
                        </div>
                      </td>
                      <td>
                        <div class="form-floating">
                          <input
                            type="datetime-local"
                            class="form-control"
                            id="dateInputstartEnd"
                            name="dateInputEnd"
                            placeholder=""
                            aria-describedby="dateHelp"
                          />
                          <label for="dateInputstart">End</label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <MultiSelectBootstrap />
                      </td>
                      <td>
                        <button class="btn btn-success">Filter</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 p-3 bg-light">
                <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SLA1;
