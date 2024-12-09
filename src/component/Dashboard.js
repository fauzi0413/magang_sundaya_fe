import React, { useState } from "react";

// import RectiSetting from "./child/RectiSetting";
import EChartsExample from "./EChartsExample ";
// import PieCharts from "./PieCharts";

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
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-12 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Dashboard</span>
                  </h2>
                </div>
                <div className="justify-content-between p-2 align-items-center bg-white border border-secondary shadow-sm">
                  <div>
                    <button>12 Issue</button>
                  </div>
                  <div>
                    <button>Stock</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-12 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <input></input>
                  <button>search</button>
                </div>
                <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                  <EChartsExample />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>SNMP Down</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Power Down</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Network Down</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Site Down</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Warning SCC</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Warning SNMP</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-down-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>19</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>10.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div>
                  <h2>
                    <span>Site Up</span>
                  </h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="bi bi-arrow-up-circle-fill fs-1 text-success"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-end">
                      <div>
                        <h2>102</h2>
                      </div>
                      <div className="d-flex align-items-end">
                        <span>/ 122 site</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <span>90.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
