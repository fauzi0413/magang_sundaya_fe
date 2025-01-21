import React, { useEffect, useState } from "react";
import CardBox from "./utils/CardBox";
import GeoMap from "./GeoMap";
import EChartsSLA from "./EChartsSLA";

function DashboardWarehouse() {
  const [dataCard, setDataCard] = useState({});
  const [dataSLA, setDataSLA] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

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
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchDataCard();
    fetchDataSLA();
    const interval = setInterval(fetchDataCard, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <>
      <div className="p-3 bg-light">
        <div className="container">
          {/* SLA Comparison */}
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="bg-white border border-secondary shadow-sm">
                <div className="d-flex justify-content-end p-4">
                  <select className="form-select" style={{ width: "200px" }}>
                    <option>Masuk</option>
                    <option>Keluar</option>
                  </select>
                </div>
                <div className="p-4">
                  <h1>Statistic Warehouse</h1>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <EChartsSLA inputData={dataSLA} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* GeoMap */}
          <div className="row">
            <div className="row justify-content-left">
              <CardBox
                title="Storage"
                icon="bi-arrow-up-circle-fill"
                iconcolor="danger" // Warna disesuaikan dengan konteks
                value={dataCard?.data?.snmpDown?.count ?? 0}
                descvalue={`/ ${dataCard?.data?.snmpDown?.amount ?? 0} site`}
                footnote={`${dataCard?.data?.snmpDown?.percentage ?? 0} %`}
                route="snmpdown"
              />
              <div className="col-9 p-2 bg-light">
                <div className="bg-white border border-secondary shadow-sm">
                  <GeoMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardWarehouse;