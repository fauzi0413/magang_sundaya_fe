import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "./../App.css";
import HeaderContent from "./utils/HeaderContent";

function SnmpDown() {
  const [data, setData] = useState([]);
  const settingTableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/sitedetail.json");
        console.log(response);
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };
    fetchData();

    // Inisialisasi DataTable setelah data berhasil di-fetch
    if (data.length > 0) {
      $(settingTableRef.current).DataTable();
    }
  }, [data]);

  return (
    <div className="p-3 bg-light">
      <div className="container">
        <div className="p-1 bg-white rounded p-4">
          <HeaderContent title={"SNMP Down"} icon={"bi-router-fill"} />
          <div className="row">
            {/* Tambahkan wrapper untuk membuat tabel scrollable */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <table
                ref={settingTableRef}
                className="table table-striped"
                style={{ width: "100%" }}
              >
                {/* Table header */}
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Site Name</th>
                    <th scope="col">Site Host</th>
                    <th scope="col">Battery Volt</th>
                    <th scope="col">Downtime</th>
                    <th scope="col">Message</th>
                    <th scope="col">load1</th>
                    <th scope="col">load2</th>
                    <th scope="col">load3</th>
                    <th scope="col">PV1 Current</th>
                    <th scope="col">PV1 Voltage</th>
                    <th scope="col">PV2 Current</th>
                    <th scope="col">PV2 Voltage</th>
                    <th scope="col">PV3 Current</th>
                    <th scope="col">PV3 Voltage</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.site_name}</td>
                      <td>{item.site_host}</td>
                      <td>{item.batt_volt}</td>
                      <td>{item.downtime}</td>
                      <td>{item.message}</td>
                      <td>{item.load1}</td>
                      <td>{item.load2}</td>
                      <td>{item.load3}</td>
                      <td>{item.pv1_curr}</td>
                      <td>{item.pv1_volt}</td>
                      <td>{item.pv2_curr}</td>
                      <td>{item.pv2_volt}</td>
                      <td>{item.pv3_curr}</td>
                      <td>{item.pv3_volt}</td>
                      <td className="table-center">
                        <button type="button" className="btn btn-success">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnmpDown;
