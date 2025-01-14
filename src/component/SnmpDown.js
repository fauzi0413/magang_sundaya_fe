import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import HeaderContent from "./utils/HeaderContent";
import CardSite from "./utils/CardSite";

function SnmpDown() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State untuk data yang difilter
  const [filterType, setFilterType] = useState(""); // State untuk jenis filter
  const [activeView, setActiveView] = useState("view1"); // State untuk menentukan tampilan aktif
  const tableRef = useRef(null);

  // Fungsi untuk menangani perubahan filter
  const handleFilter = (event) => {
    const { value } = event.target;
    setFilterType(value);

    if (value === "siteName") {
      const filtered = [...data].sort((a, b) =>
        a.site_name.localeCompare(b.site_name)
      );
      setFilteredData(filtered);
    } else if (value === "downTime") {
      const filtered = data.filter(
        (item) => item.downtime && parseInt(item.downtime) > 10 // Down time lebih dari 10
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/sitedetail.json");
        const jsonData = await response.json();
        setData(jsonData.data);
        setFilteredData(jsonData.data);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeView === "view1" && data.length > 0) {
      // Hancurkan instance DataTable jika sudah ada
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      // Inisialisasi ulang DataTable
      $(tableRef.current).DataTable({
        data: data.map((item, index) => [
          index + 1,
          item.site_name,
          item.site_host,
          item.batt_volt,
          item.downtime,
          item.message,
          item.load1,
          item.load2,
          item.load3,
          item.pv1_curr,
          item.pv1_volt,
          item.pv2_curr,
          item.pv2_volt,
          item.pv3_curr,
          item.pv3_volt,
          `<a href="/sitedetail?id=${item.id}" class="btn btn-success">Details</a>`,
        ]),
        columns: [
          { title: "No" },
          { title: "Site Name" },
          { title: "Site Host" },
          { title: "Battery Volt" },
          { title: "Downtime" },
          { title: "Message" },
          { title: "load1" },
          { title: "load2" },
          { title: "load3" },
          { title: "PV1 Current" },
          { title: "PV1 Voltage" },
          { title: "PV2 Current" },
          { title: "PV2 Voltage" },
          { title: "PV3 Current" },
          { title: "PV3 Voltage" },
          { title: "Action" },
        ],
        scrollY: "650px",
        scrollCollapse: true,
        paging: true,
        searching: true,
        ordering: true,
        destroy: true, // Pastikan DataTable bisa dihancurkan
      });

      // Cleanup saat komponen dilepas
      return () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
      };
    }
  }, [data, activeView]);

  return (
    <div className="p-3 bg-light">
      <div className="container">
        <HeaderContent title={"SNMP Down"} icon={"bi-router-fill"} />

        {/* Tombol Switch View */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className={`btn ${
              activeView === "view1" ? "btn-primary" : "btn-outline-primary"
            } me-2`}
            onClick={() => setActiveView("view1")}
          >
            View 1
          </button>
          <button
            className={`btn ${
              activeView === "view2" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveView("view2")}
          >
            View 2
          </button>
        </div>

        {/* Render View Berdasarkan State */}
        {activeView === "view1" && (
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <table
                  ref={tableRef}
                  className="table table-striped table-bordered"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        )}

        {activeView === "view2" && (
          <div className="row">
            <div className="col-12 p-3 bg-light">
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div className="d-flex justify-content-end">
                  <select
                    className="form-select"
                    style={{ width: "200px" }}
                    value={filterType}
                    onChange={handleFilter}
                  >
                    <option value="">Filter By</option>
                    <option value="siteName">Site Name</option>
                    <option value="downTime">Down Time</option>
                  </select>
                </div>

                <div className="row">
                  {filteredData.map((item, index) => (
                    <CardSite
                      key={index}
                      sitename={item.site_name}
                      ip={item.site_host}
                      sla={item.sla}
                      downtime={item.downtime}
                      update={item.update}
                      pic={item.pic}
                      gs={item.gs}
                      lc={item.lc}
                      id={item.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnmpDown;
