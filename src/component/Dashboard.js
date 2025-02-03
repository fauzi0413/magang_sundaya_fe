import React, { useEffect, useState } from "react";

// import PieCharts from "./PieCharts";
import CardBox from "./utils/CardBox";
import GeoMap from "./GeoMap";
import EChartsSLA from "./EChartsSLA";

function Dashboard() {
  const [dataCard, setDataCard] = useState({});
  const [dataSLA, setDataSLA] = useState([]);

  // Fetch SLA data
  const fetchDataSLA = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.89:3777/api/sla/summary?startDate=2025-01-01&endDate=2025-01-14`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("SLA Data:", jsonData.data); // Debugging log
      setDataSLA(jsonData.data || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching SLA data:", error);
    }
  };

  // Fetch card data
  const fetchDataCard = async () => {
    try {
      const response = await fetch(`http://192.168.3.171:5000/api/overview`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("Card Data:", jsonData.data); // Debugging log
      setDataCard(jsonData); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  useEffect(() => {
    fetchDataCard();
    fetchDataSLA();
    const interval = setInterval(fetchDataCard, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div className="p-3 bg-light">
        <div className="container bg-light">
          {/* Header */}
          <div className="row">
            <div className="col-12 p-3">
              <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <button className="btn btn-primary ms-2">Search</button>
                <h2>Dashboard</h2>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary position-relative"
                  >
                    Issue
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      13
                    </span>
                  </button>
                  <button type="button" className="btn btn-success">
                    Stock
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SLA Comparison */}
          <div className="row">
            <div className="col-12 p-3">
              <div className="bg-white border border-secondary shadow-sm">
                <div className="d-flex justify-content-end p-4">
                  <select className="form-select" style={{ width: "200px" }}>
                    <option>H-3 Month</option>
                    <option>H-2 Month</option>
                    <option>H-1 Month</option>
                    <option>H-1</option>
                  </select>
                </div>
                <div className="p-4">
                  <h1>SLA Comparison</h1>
                  <EChartsSLA inputData={dataSLA} />
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="row justify-content-around">
            <CardBox
              title="SNMP Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="danger" // Warna disesuaikan dengan konteks
              value={dataCard?.data?.snmpDown?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.snmpDown?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.snmpDown?.percentage ?? 0} %`}
              route="snmpdown"
            />

            <CardBox
              title="Power Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="warning"
              value={dataCard?.data?.powerDown?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.powerDown?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.powerDown?.percentage ?? 0} %`}
              route="powerdown"
            />

            <CardBox
              title="Network Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="danger"
              value={dataCard?.data?.networkDown?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.networkDown?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.networkDown?.percentage ?? 0} %`}
              route="networkdown"
            />
          </div>

          <div className="row justify-content-around">
            <CardBox
              title="Site Down"
              icon="bi-arrow-down-circle-fill"
              iconcolor="danger"
              value={dataCard?.data?.siteDown?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.siteDown?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.siteDown?.percentage ?? 0} %`}
              route="sitedown"
            />

            <CardBox
              title="Warning"
              icon="bi-exclamation-triangle-fill"
              iconcolor="warning"
              value={dataCard?.data?.warning?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.warning?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.warning?.percentage ?? 0} %`}
              route="warning"
            />

            <CardBox
              title="Site Up"
              icon="bi-arrow-up-circle-fill"
              iconcolor="success"
              value={dataCard?.data?.siteUp?.count ?? 0}
              descvalue={`/ ${dataCard?.data?.siteUp?.amount ?? 0} site`}
              footnote={`${dataCard?.data?.siteUp?.percentage ?? 0} %`}
              route="siteup"
            />
          </div>

          {/* GeoMap */}
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="bg-white border border-secondary shadow-sm">
                <GeoMap />
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="row">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-6 p-3 bg-light"
              >
                <div className="bg-white border border-secondary shadow-sm">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First</th>
                        <th>Last</th>
                        <th>Handle</th>
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
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-lg">
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/">
                    2
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
