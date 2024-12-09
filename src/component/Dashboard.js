import React, { useState } from "react";

// import RectiSetting from "./child/RectiSetting";
import EChartsExample from "./EChartsExample ";
// import PieCharts from "./PieCharts";
import CardBox from "./utils/CardBox";
import GeoMap from "./GeoMap";

function Dashboard() {
  const [dataFromChild, setDataFromChild] = useState(null);
  const [chargeValue, setChargeValue] = useState(null);

  // const receiveDataFromChild = (data) => {
  //   // Update state or perform any action with the received data
  //   const chargingStatus = data.data[0].charging;

  //   if (chargingStatus === true) {
  //     const chargeVal = "Running";
  //     setChargeValue(chargeVal);
  //   } else {
  //     const chargeVal = "Stop";
  //     setChargeValue(chargeVal);
  //   }

  //   console.log("data : " + data.data[0].charging);
  //   setDataFromChild(data);
  // };
  return (
    <>
      <div className="p-3 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <input></input>
                  <button className="btn btn-primary ms-2">Search</button>
                </div>
                <div>
                  <h2>
                    <span>Dashboard</span>
                  </h2>
                </div>
                <div className="justify-content-between p-2 align-items-center bg-white">
                  <div className="justify-content-end">
                    <button
                      type="button"
                      class="btn btn-primary position-relative"
                    >
                      Issue
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        13
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </button>
                  </div>
                  <div className="justify-content-end mt-2">
                    <button
                      type="button"
                      class="btn btn-success position-relative"
                    >
                      Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div className="d-flex justify-content-end">
                  <select className="form-select" style={{ width: "200px" }}>
                    <option value="option1">H-3 Month</option>
                    <option value="option2">H-2 Month </option>
                    <option value="option3">H-1 Month</option>
                    <option value="option4">H-1</option>
                  </select>
                </div>
                <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm mt-2">
                  <EChartsExample />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <CardBox
              title="SNMP Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />

            <CardBox
              title="Power Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />

            <CardBox
              title="Network Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />

            <CardBox
              title="Site Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />
          </div>

          <div className="row justify-content-around">
            <CardBox
              title="Warning SCC"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />

            <CardBox
              title="Warning SNMP"
              icon="bi-arrow-down-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="19"
              descvalue="/ 122 site"
              footnote="10.9%"
            />

            <CardBox
              title="Site Up"
              icon="bi-arrow-up-circle-fill"
              iconcolor="success" //success = green , warning = yellow , danger = red
              value="102"
              descvalue="/ 122 site"
              footnote="90.1%"
            />
          </div>

          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <GeoMap />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
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

            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
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

          <div>
            <nav aria-label="...">
              <ul class="pagination pagination-lg justify-content-center">
                <li class="page-item active" aria-current="page">
                  <span class="page-link">1</span>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                {/* <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
