import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { instanceBackEnd } from "../api/axios";

function FilterDischarge() {
  const [typeError, setTypeError] = useState(null);
  const [typeSuccess, setTypeSuccess] = useState(null);

  const [fileName, setFileName] = useState(null);
  const [fixedData, setFixedData] = useState([]);
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [successDisplay, setSuccessDisplay] = useState(false);
  const [createButoon, setCreateButoon] = useState(false);

  const [processDisplay, setProcessDisplay] = useState(0);
  const [jumlahData, setJumlahData] = useState(0);

  useEffect(() => {
    console.log("Start Program");
  }, []);

  const handleFile4 = (e) => {
    setErrorDisplay(false);
    setSuccessDisplay(false);
    setUploadDisplay(false);

    const fileTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files[0];

    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setTypeError(null);
      setUploadDisplay(true);
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => processExcelData(e.target.result);

      const originalFileName = selectedFile.name;
      const fileNameWithoutExtension = originalFileName.replace(
        /\.(xlsx|xls|csv)$/i,
        ""
      );
      setFileName(fileNameWithoutExtension);
      console.log("fileNameWithoutExtension : " + fileNameWithoutExtension);

      setProcessDisplay(0);
      setJumlahData(0);
    } else {
      setTypeError("Only Excel or CSV files are allowed.");
      setUploadDisplay(false);
      setErrorDisplay(true);
    }
  };

  const processExcelData = (fileData) => {
    console.log("Processing data...");

    if (fileData) {
      const workbook = XLSX.read(fileData, { type: "array" });
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];

      const columnExcelData = {
        ID: "ID",
        ADDR: "ADDR",
        Rx_Tx: "Rx_Tx",
        PCB_BARCODE: "PCB_BARCODE",
        PACK_BARCODE: "PACK_BARCODE",
        DateTime: "DateTime",
        Cell_Count: "Cell_Count",
        CELL1: "CELL1",
        CELL2: "CELL2",
        CELL3: "CELL3",
        CELL4: "CELL4",
        CELL5: "CELL5",
        CELL6: "CELL6",
        CELL7: "CELL7",
        CELL8: "CELL8",
        CELL9: "CELL9",
        CELL10: "CELL10",
        CELL11: "CELL11",
        CELL12: "CELL12",
        CELL13: "CELL13",
        CELL14: "CELL14",
        CELL15: "CELL15",
        CELL16: "CELL16",
        Max_cell: "Max_cell",
        Min_Cell: "Min_Cell",
        Total_Volt: "Total_Volt",
        Curr: "Curr",
        Full_Capacity: "Full_Capacity",
        Remain_Capcity: "Remain_Capcity",
        "All_Chg_Ah(Ah)": "All_Chg_Ah(Ah)",
        "All_Dsg_Ah(Ah)": "All_Dsg_Ah(Ah)",
        "All_Chg_Time(h)": "All_Chg_Time(h)",
        "All_Dsg_Time(h)": "All_Dsg_Time(h)",
        All_Chg_kWh: "All_Chg_kWh",
        All_Dsg_kWh: "All_Dsg_kWh",
        SOC: "SOC",
        SOH: "SOH",
        TEMP_Count: "TEMP_Count",
        TEMP1: "TEMP1",
        TEMP2: "TEMP2",
        TEMP3: "TEMP3",
        TEMP4: "TEMP4",
        MOS_Temp: "MOS_Temp",
        AMB_Temp: "AMB_Temp",
        Status_Code: "Status_Code",
        Status_Log: "Status_Log",
      };

      const integerFields = [
        "ADDR",
        "Cell_Count",
        "CELL1",
        "CELL2",
        "CELL3",
        "CELL4",
        "CELL5",
        "CELL6",
        "CELL7",
        "CELL8",
        "CELL9",
        "CELL10",
        "CELL11",
        "CELL12",
        "CELL13",
        "CELL14",
        "CELL15",
        "CELL16",
        "Full_Capacity",
        "All_Chg_Ah(Ah)",
        "All_Dsg_Ah(Ah)",
        "All_Chg_kWh",
        "All_Dsg_kWh",
        "SOH",
        "TEMP_Count",
        "Max_cell",
        "Min_Cell",
      ];

      const floatFields = [
        "Total_Volt",
        "Remain_Capcity",
        "All_Chg_Time(h)",
        "All_Dsg_Time(h)",
        "SOC",
        "TEMP1",
        "TEMP2",
        "TEMP3",
        "TEMP4",
        "MOS_Temp",
        "AMB_Temp",
      ];

      const stringFields = [
        "DateTime",
        "PACK_BARCODE",
        "PCB_BARCODE",
        "Rx_Tx",
        "Status_Code",
        "Status_Log",
      ];

      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      console.log("Extracted data:", data);

      if (data.length > 1) {
        let processedRows = 0;
        const extractedData = data.slice(1).reduce((acc, row) => {
          const rowData = {};

          Object.keys(columnExcelData).forEach((key) => {
            const columnName = columnExcelData[key];
            const columnIndex = data[0].indexOf(columnName);

            if (columnIndex !== -1) {
              let value = row[columnIndex] || "";

              if (integerFields.includes(key)) {
                value = parseInt(value, 10);
                if (isNaN(value)) value = ""; // Handle NaN cases
              } else if (floatFields.includes(key)) {
                value = parseFloat(value);
                if (isNaN(value)) value = ""; // Handle NaN cases
              } else if (stringFields.includes(key)) {
                value = String(value).trim();
                if (value === "") {
                  console.log(`Empty or invalid string for ${key}`);
                }
              } else {
                value = String(value);
              }

              rowData[key] = value;
            } else {
              console.log(`Column ${columnName} not found in header.`);
            }
          });

          // Calculate Dif_cell as Max_cell - Min_Cell and add it to rowData
          if (rowData.Max_cell && rowData.Min_Cell) {
            rowData.Dif_cell = rowData.Max_cell - rowData.Min_Cell;
          }

          // Check if the 'ADDR' field is not empty
          if (rowData.ADDR && rowData.Curr < 0) {
            processedRows++;
            acc.push(rowData);
          }

          // Update progress after processing each row
          setProcessDisplay(processedRows);
          setCreateButoon(true);

          return acc;
        }, []);

        const formattedData = { data: extractedData };

        if (extractedData.length > 0) {
          console.log("Processed data:", extractedData);
          setFixedData(extractedData);
          setJumlahData(extractedData.length);
          setTypeSuccess("Data processed successfully.");
          setSuccessDisplay(true);
        } else {
          setTypeError("No valid data found after processing.");
          setFixedData([]);
          setErrorDisplay(true);
        }
      } else {
        setTypeError("No data found in the Excel file.");
        setFixedData([]);
        setErrorDisplay(true);
      }
    } else {
      setTypeError("Please select a file.");
      setFixedData([]);
      setErrorDisplay(true);
    }
  };

  const downloadFileExcel = () => {
    const fileNameWithSuffix = `${fileName}_FILTER.xlsx`;

    if (fixedData.length > 0) {
      const headers = [
        "ID",
        "ADDR",
        "Rx_Tx",
        "PCB_BARCODE",
        "PACK_BARCODE",
        "DateTime",
        "Cell_Count",
        "CELL1",
        "CELL2",
        "CELL3",
        "CELL4",
        "CELL5",
        "CELL6",
        "CELL7",
        "CELL8",
        "CELL9",
        "CELL10",
        "CELL11",
        "CELL12",
        "CELL13",
        "CELL14",
        "CELL15",
        "CELL16",
        "Max_cell",
        "Min_Cell",
        "Dif_cell", // Ensure "Dif_cell" is included in the headers
        "Total_Volt",
        "Curr",
        "Full_Capacity",
        "Remain_Capcity",
        "All_Chg_Ah(Ah)",
        "All_Dsg_Ah(Ah)",
        "All_Chg_Time(h)",
        "All_Dsg_Time(h)",
        "All_Chg_kWh",
        "All_Dsg_kWh",
        "SOC",
        "SOH",
        "TEMP_Count",
        "TEMP1",
        "TEMP2",
        "TEMP3",
        "TEMP4",
        "MOS_Temp",
        "AMB_Temp",
        "Status_Code",
        "Status_Log",
      ];

      // Calculate the max value of Dif_cell
      const maxDifCell = Math.max(
        ...fixedData.map((row) => row.Dif_cell || 0) // Ensure no undefined values
      );

      // Create an extra row with max_dif_cell
      const extraRow = {
        ID: "",
        ADDR: "",
        Rx_Tx: "",
        PCB_BARCODE: "",
        PACK_BARCODE: "",
        DateTime: "",
        Cell_Count: "",
        CELL1: "",
        CELL2: "",
        CELL3: "",
        CELL4: "",
        CELL5: "",
        CELL6: "",
        CELL7: "",
        CELL8: "",
        CELL9: "",
        CELL10: "",
        CELL11: "",
        CELL12: "",
        CELL13: "",
        CELL14: "",
        CELL15: "",
        CELL16: "",
        Max_cell: "",
        Min_Cell: "",
        Dif_cell: "Dif_max : " + maxDifCell, // Add max_dif_cell to this row
        Total_Volt: "",
        Curr: "",
        Full_Capacity: "",
        Remain_Capcity: "",
        All_Chg_Ah: "",
        All_Dsg_Ah: "",
        All_Chg_Time: "",
        All_Dsg_Time: "",
        All_Chg_kWh: "",
        All_Dsg_kWh: "",
        SOC: "",
        SOH: "",
        TEMP_Count: "",
        TEMP1: "",
        TEMP2: "",
        TEMP3: "",
        TEMP4: "",
        MOS_Temp: "",
        AMB_Temp: "",
        Status_Code: "",
        Status_Log: "",
      };

      // Append the extra row to the fixedData
      const dataWithHeaders = [...fixedData, extraRow].map((row) =>
        headers.reduce((acc, header) => {
          acc[header] = row[header] || ""; // Ensure every header has a value
          return acc;
        }, {})
      );

      // Create a new workbook and add the data to it
      const wb = XLSX.utils.book_new();
      const sheet1WS = XLSX.utils.json_to_sheet(dataWithHeaders, {
        header: headers,
      });
      XLSX.utils.book_append_sheet(wb, sheet1WS, "Sheet1");

      // Write the workbook to a file
      XLSX.writeFile(wb, fileNameWithSuffix);
    } else {
      console.error("No data available to download.");
      setTypeError("No data available to download.");
      setErrorDisplay(true);
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4">Filter Excel Discharge Data</h1>
        </div>

        <div className="row">
          <div className="col-md-6"></div>
        </div>

        <div className="row">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputGroupFile04" className="form-label">
                Insert Discharge Excel File
              </label>
              <br />
              <input
                type="file"
                required
                onChange={handleFile4}
                className="form-control"
                id="inputGroupFile04"
              />
              <p
                style={{ display: uploadDisplay ? "block" : "none" }}
                id="uploadText"
              >
                Process Data ... {processDisplay} / {jumlahData}
              </p>
            </div>

            <div className="col-12">
              <p
                style={{
                  display: errorDisplay ? "block" : "none",
                  color: "red",
                }}
              >
                {typeError}
              </p>

              <p
                style={{
                  display: successDisplay ? "block" : "none",
                  color: "green",
                }}
              >
                {typeSuccess}
              </p>

              <button
                type="button"
                className="btn btn-primary"
                style={{ display: createButoon ? "block" : "none" }}
                onClick={downloadFileExcel}
              >
                Download Filtered Excel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FilterDischarge;
