import React, { useState } from "react";

import RectiSetting from "./child/RectiSetting";
// import EChartsExample from "./EChartsExample ";
// import PieCharts from "./PieCharts";

function ChargingTalis5() {
  const [dataFromChild, setDataFromChild] = useState(null);
  const [chargeValue, setChargeValue] = useState(null);

  const receiveDataFromChild = (data) => {
    // Update state or perform any action with the received data
    const chargingStatus = data.data[0].charging;

    if (chargingStatus === true) {
      const chargeVal = "Running";
      setChargeValue(chargeVal);
    } else {
      const chargeVal = "Stop";
      setChargeValue(chargeVal);
    }

    console.log("data : " + data.data[0].charging);
    setDataFromChild(data);
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-hdd-stack fs-1 text-success"></i>
                <div>
                  <h2>
                    <span>PCB Barcode</span>
                  </h2>
                  <span>
                    {dataFromChild ? dataFromChild.data[0].pcb_barcode : "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-hdd-stack fs-1 text-success"></i>
                <div>
                  <h2>
                    <span>SN1 Code</span>
                  </h2>
                  <span>
                    {dataFromChild ? dataFromChild.data[0].sn_code_1 : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery-charging fs-1 text-warning"></i>
                <div>
                  <h3>
                    <span>Batt Volt</span>
                  </h3>

                  <h3>
                    {dataFromChild
                      ? dataFromChild.data[0].voltage + " V"
                      : 0 + " V"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery-charging fs-1 text-secondary"></i>
                <div>
                  <h3>
                    <span>Batt Current</span>
                  </h3>

                  <h3>
                    {dataFromChild
                      ? dataFromChild.data[0].current + " A"
                      : 0 + " A"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-brightness-high fs-1 text-danger"></i>
                <div>
                  <h3>
                    <span>Temperature</span>
                  </h3>

                  <h3>
                    {dataFromChild
                      ? dataFromChild.data[0].temperature + " °C"
                      : 0 + " °C"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-battery-half fs-1 text-dark"></i>
                <div>
                  <h3>
                    <span>SOC</span>
                  </h3>

                  <h3>
                    {dataFromChild
                      ? dataFromChild.data[0].soc + " %"
                      : 0 + " %"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-smartwatch fs-1 text-info "></i>
                <div>
                  <h3>
                    <span>Time Est</span>
                  </h3>

                  <h3>
                    {dataFromChild
                      ? dataFromChild.data[0].time_estimate + " mins"
                      : 0 + " mins"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 com-md-4 col-lg-6 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-ev-station fs-1 text-primary "></i>
                <div>
                  <h3>
                    <span>Charge Status</span>
                  </h3>

                  <h3>{chargeValue ? chargeValue : "Standby"}</h3>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-sm-6 com-md-4 col-lg-3 p-3 bg-light">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <i className="bi bi-graph-up-arrow fs-1 text-warning"></i>
                <div>
                  <span>Sales</span>
                  <h3>0</h3>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col-12 col-md-12 p-3">
              <EChartsExample />
            </div>
          </div> */}

          <div className="row">
            <RectiSetting sendDataToParent={receiveDataFromChild} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChargingTalis5;
