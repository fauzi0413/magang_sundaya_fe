import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";
import dataTable from "./child/dataTable.json"; // Import the JSON file

function Underconstruction() {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  // const [pageLength, setPageLength] = useState(5); // Initial page length

  useEffect(() => {
    setData(dataTable); // Set the data directly from the imported JSON file
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const table = $(tableRef.current).DataTable({
        paging: true,
        ordering: true,
        searching: true,
        // pageLength: pageLength,
        lengthMenu: [5, 10, 15, 20],
      });

      return () => {
        table.destroy();
      };
    }
  }, [data]);

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4"> UNDER CONSTRUCTION</h1>
        </div>
      </div>
    </div>
  );
}

export default Underconstruction;
