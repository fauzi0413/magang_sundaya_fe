import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
import "./../App.css";
import { instanceBackEnd } from "../api/axios";

function History() {
  const [frame, setFrame] = useState([]);
  const [frameCode, setFrameCode] = useState("");
  const frameTableRef = useRef(null);
  const historyTableRef = useRef(null);
  const historyTableInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instanceBackEnd.get("/api/charging/master-frame", {
          timeout: 1000,
        });
        const { data } = res.data;
        setFrame(data);
      } catch (error) {
        console.log("error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (frame.length > 0) {
      $(frameTableRef.current).DataTable();
    }
  }, [frame]);

  const handleClick = async (pcbCode) => {
    setFrameCode(pcbCode);
    try {
      const res = await instanceBackEnd.get(
        `/api/charging/frame-history/${pcbCode}`
      );
      const data2 = res.data.data;
      const statusData = res.data.status;

      if (statusData === "error") {
        const defaultData = [
          {
            pcb_barcode: "noData",
            voltage: "noData",
            charging: "noData",
            current: "noData",
          },
        ];

        cekBody(defaultData);
      } else if (statusData === "success") {
        console.log("loggers history : ", data2);
        cekBody(data2);
      }
    } catch (error) {
      console.log("error fetching history data:", error);
    }
  };

  const cekBody = async (dataHistory) => {
    console.log("masuk cke body : " + dataHistory.length);
    if (dataHistory.length > 0) {
      $(historyTableRef.current).DataTable().destroy();
      const tbody = document.querySelector("#historyBody");
      tbody.innerHTML = ""; // Clear existing content
      dataHistory.forEach((item, index) => {
        const indexNumber = index + 1;
        console.log("index number : " + indexNumber);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.pcb_barcode}</td>
          <td>${item.voltage}</td>
          <td>${item.charging}</td>
          <td>${item.current}</td>
        `;
        tbody.appendChild(row);
      });

      historyTableInstance.current = $(historyTableRef.current).DataTable({
        paging: true,
        ordering: true,
        searching: true,
        lengthMenu: [5, 10, 15, 20],
      });
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4"> Master Frame</h1>
        </div>
        <div className="container mt-5">
          <table
            ref={frameTableRef}
            className="table table-striped"
            style={{ width: "100%" }}
          >
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">PCB Barcode</th>
                <th scope="col">SN Code 1</th>
                <th scope="col">Charging</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {frame.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.pcb_barcode}</td>
                  <td>{item.sn_code_1}</td>
                  <td>{item.charging.toString()}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.updatedAt}</td>
                  <td className="table-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleClick(item.pcb_barcode)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4"> History : {frameCode}</h1>
        </div>
        <div className="container mt-5">
          <table
            ref={historyTableRef}
            className="table table-striped"
            style={{ width: "100%" }}
            id="historyTable2"
          >
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">PCB Barcode</th>
                <th scope="col">voltage</th>
                <th scope="col">Charging</th>
                <th scope="col">Current</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody id="historyBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
