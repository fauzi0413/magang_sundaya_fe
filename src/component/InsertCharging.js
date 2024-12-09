import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { instanceBackEnd } from "../api/axios";

function InsertCharging() {
  const [typeError, setTypeError] = useState(null);
  const [typeSuccess, setTypeSuccess] = useState(null);

  // const [fileName, setFileName] = useState(null);
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
        address: "ADDR",
        rxtx: "Rx_Tx",
        pcb_barcode: "PCB_BARCODE",
        pack_barcode: "PACK_BARCODE",
        date_time: "DateTime",
        cell_count: "Cell_Count",
        cell_voltage_1: "CELL1",
        cell_voltage_2: "CELL2",
        cell_voltage_3: "CELL3",
        cell_voltage_4: "CELL4",
        cell_voltage_5: "CELL5",
        cell_voltage_6: "CELL6",
        cell_voltage_7: "CELL7",
        cell_voltage_8: "CELL8",
        cell_voltage_9: "CELL9",
        cell_voltage_10: "CELL10",
        cell_voltage_11: "CELL11",
        cell_voltage_12: "CELL12",
        cell_voltage_13: "CELL13",
        cell_voltage_14: "CELL14",
        cell_voltage_15: "CELL15",
        cell_voltage_16: "CELL16",
        max_cell_voltage: "Max_cell",
        min_cell_voltage: "Min_Cell",
        total_voltage: "Total_Volt",
        current: "Curr",
        full_capacity: "Full_Capacity",
        remaining_capacity: "Remain_Capcity",
        all_chg_ah: "All_Chg_Ah(Ah)",
        all_dsg_ah: "All_Dsg_Ah(Ah)",
        all_chg_time: "All_Chg_Time(h)",
        all_dsg_time: "All_Dsg_Time(h)",
        all_chg_kwh: "All_Chg_kWh",
        all_dsg_kwh: "All_Dsg_kWh",
        soc: "SOC",
        soh: "SOH",
        temperature_count: "TEMP_Count",
        cell_temperature_1: "TEMP1",
        cell_temperature_2: "TEMP2",
        cell_temperature_3: "TEMP3",
        cell_temperature_4: "TEMP4",
        mos_temp: "MOS_Temp",
        amb_temp: "AMB_Temp",
        status_code: "Status_Code",
        status_log: "Status_Log",
      };

      const integerFields = [
        "address",
        "cell_count",
        "cell_voltage_1",
        "cell_voltage_2",
        "cell_voltage_3",
        "cell_voltage_4",
        "cell_voltage_5",
        "cell_voltage_6",
        "cell_voltage_7",
        "cell_voltage_8",
        "cell_voltage_9",
        "cell_voltage_10",
        "cell_voltage_11",
        "cell_voltage_12",
        "cell_voltage_13",
        "cell_voltage_14",
        "cell_voltage_15",
        "cell_voltage_16",
        "full_capacity",
        "all_chg_ah",
        "all_dsg_ah",
        "all_chg_kwh",
        "all_dsg_kwh",
        "soh",
        "temperature_count",
        "max_cell_voltage",
        "min_cell_voltage",
      ];

      const floatFields = [
        "total_voltage",
        "current",
        "remaining_capacity",
        "all_chg_time",
        "all_dsg_time",
        "soc",
        "cell_temperature_1",
        "cell_temperature_2",
        "cell_temperature_3",
        "cell_temperature_4",
        "mos_temp",
        "amb_temp",
      ];

      const stringFields = [
        "date_time",
        "pack_barcode",
        "pcb_barcode",
        "rxtx",
        "status_code",
        "status_log",
      ];

      const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      console.log("Extracted data:", data);

      if (data.length > 1) {
        let processedRows = 0;
        const extractedData = data.slice(1).reduce((acc, row) => {
          const rowData = {};
          // let isValidRow = true; // Flag to check if the row is valid

          Object.keys(columnExcelData).forEach((key) => {
            const columnName = columnExcelData[key];
            const columnIndex = data[0].indexOf(columnName);

            if (columnIndex !== -1) {
              let value = row[columnIndex] || "";
              // console.log(
              //   `Raw value for ${key} at index ${columnIndex}:`,
              //   value
              // );

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

              // console.log(`Processed value for ${key}:`, value);
              rowData[key] = value;
            } else {
              console.log(`Column ${columnName} not found in header.`);
            }
          });

          // Check if the 'address' field is empty
          if (rowData.address) {
            processedRows++;
            acc.push(rowData);
          }

          // Update progress after processing each row
          setProcessDisplay(processedRows);
          setCreateButoon(true);

          return acc;
        }, []);

        // Wrap the extracted data in an object with a "data" key
        const formattedData = { data: extractedData };

        console.log("Fixed data:", formattedData);
        setFixedData(formattedData);
        setJumlahData(extractedData.length);
      } else {
        setTypeError("No data found in the Excel file.");
        setFixedData([]);
      }
    } else {
      setTypeError("Please select a file.");
      setFixedData([]);
    }
  };

  const createDataButton = async () => {
    try {
      console.log("Sending data to server:", fixedData); // Verify data being sent

      const res = await instanceBackEnd.post(
        "/api/discharging/data",
        fixedData,
        {
          timeout: 10000, // Timeout in milliseconds (adjust as needed)
        }
      );

      const resStatus = res.status;

      if (resStatus !== "error") {
        console.log("sukses");
        const textSuccess = "Berhasil Upload Data";
        setTypeSuccess(textSuccess);
        setSuccessDisplay(true);
      } else {
        console.error("Server responded with an error:", res.data.message);
        setTypeError("Failed to process data. Please try again.");
        setErrorDisplay(true);
      }
    } catch (error) {
      console.error("Error during API request:", error);
      setTypeError("An error occurred while contacting the server.");
      setErrorDisplay(true);
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4">Create Excel Discharge Data</h1>
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
                id="typeError"
              >
                {typeError}
              </p>

              <p
                style={{
                  display: successDisplay ? "block" : "none",
                  color: "green",
                }}
                id="typeSuccess"
              >
                {typeSuccess}
              </p>

              <button
                style={{
                  display: createButoon ? "block" : "none",
                }}
                type="button"
                className="btn btn-secondary"
                id="insertDataButton"
                onClick={createDataButton}
              >
                Create Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InsertCharging;
