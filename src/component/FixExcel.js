import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

function FixExcel() {
  const [typeError, setTypeError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fixedData, setFixedData] = useState([]);
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [processDisplay, setProcessDisplay] = useState(0);
  const [jumlahData, setJumlahData] = useState(0);

  let jumlahProses = 0;

  useEffect(() => {
    console.log("Start Program");
    // Fetch sites logic (commented out)
  }, []);

  const handleFile4 = (e) => {
    setDisplayButton(false);

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

      // Get file name and remove the extension
      const originalFileName = selectedFile.name;
      const fileNameWithoutExtension = originalFileName.replace(
        /\.(xlsx|xls|csv)$/i,
        ""
      );
      setFileName(fileNameWithoutExtension);

      setProcessDisplay(0);
      setJumlahData(0);
      setErrorDisplay(false);
    } else {
      setTypeError("Only Excel or CSV Files are allowed");
      setUploadDisplay(false);
      setErrorDisplay(true);
    }
  };

  const processExcelData = (fileData) => {
    if (!fileData) {
      setTypeError("No file data found.");
      setUploadDisplay(false);
      setErrorDisplay(true);
      return;
    }

    const excelDataArr = [];
    const processedFixDataArr = [];

    const workbook = XLSX.read(fileData, { type: "array" });
    const workSheetName = workbook.SheetNames[0];
    const workSheet = workbook.Sheets[workSheetName];
    console.log("workSheet : " + workSheet);
    const rawData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

    if (rawData.length > 0) {
      const columnMapping = generateColumnMapping("A", "CB");

      rawData.slice(1).forEach((row) => {
        const processedRow = {};

        Object.keys(columnMapping).forEach((key) => {
          const index = columnMapping[key];
          processedRow[key] = index < row.length ? row[index] : null;
        });

        if (validateProcessedRow(processedRow)) {
          jumlahProses = jumlahProses + 1;
          console.log(" jumlahProses : " + jumlahProses);
          setProcessDisplay(jumlahProses);
          excelDataArr.push(processedRow);
          const processedFixData = createProcessedFixData(processedRow);
          processedFixDataArr.push(processedFixData);
        } else {
          console.warn("Skipping row due to missing data:", processedRow);
        }
      });

      setFixedData(processedFixDataArr);
      console.log("Processed Fix Data Array:", processedFixDataArr);
      console.log("Excel Data Array:", excelDataArr);

      setJumlahData(excelDataArr.length);

      // Show download button after processing is complete
      setDisplayButton(true);
      setUploadDisplay(false);
    } else {
      setTypeError("No data found in the Excel file.");
      setUploadDisplay(false);
      setErrorDisplay(true);
    }
  };

  const validateProcessedRow = (row) => {
    // Check if the row contains required fields (you can customize this)
    return row.cellA && row.cellB && row.cellC; // Example validation
  };

  const formatNumber = (num) => {
    // Convert to number and format to three decimal places
    return Number(num).toFixed(3);
  };

  const formatNumber2 = (num) => {
    // Convert to number and format to three decimal places
    return Number(num).toFixed(2);
  };

  const toNumber = (value) => {
    // Convert the value to a number, defaulting to 0 if the value is invalid
    return Number(value) || 0;
  };

  const createProcessedFixData = (row) => {
    return {
      ID: String(row.cellA || ""),
      ADDR: String(row.cellB || ""),
      Rx_Tx: String(row.cellC || ""),
      PCB_BARCODE: String(row.cellD || ""),
      PACK_BARCODE: String(row.cellE || ""),
      DateTime: String(row.cellF || ""),
      Cell_Count: String(row.cellG),
      CELL1: 1000 * toNumber(row.cellH) + toNumber(row.cellI),
      CELL2: 1000 * toNumber(row.cellJ) + toNumber(row.cellK),
      CELL3: 1000 * toNumber(row.cellL) + toNumber(row.cellM),
      CELL4: 1000 * toNumber(row.cellN) + toNumber(row.cellO),
      CELL5: 1000 * toNumber(row.cellP) + toNumber(row.cellQ),
      CELL6: 1000 * toNumber(row.cellR) + toNumber(row.cellS),
      CELL7: 1000 * toNumber(row.cellT) + toNumber(row.cellU),
      CELL8: 1000 * toNumber(row.cellV) + toNumber(row.cellW),
      CELL9: 1000 * toNumber(row.cellX) + toNumber(row.cellY),
      CELL10: 1000 * toNumber(row.cellZ) + toNumber(row.cellAA),
      CELL11: 1000 * toNumber(row.cellAB) + toNumber(row.cellAC),
      CELL12: 1000 * toNumber(row.cellAD) + toNumber(row.cellAE),
      CELL13: 1000 * toNumber(row.cellAF) + toNumber(row.cellAG),
      CELL14: 1000 * toNumber(row.cellAH) + toNumber(row.cellAI),
      CELL15: 1000 * toNumber(row.cellAJ) + toNumber(row.cellAK),
      CELL16: 1000 * toNumber(row.cellAL) + toNumber(row.cellAM),
      Max_cell: 1000 * toNumber(row.cellAN) + toNumber(row.cellAO),
      Min_Cell: 1000 * toNumber(row.cellAP) + toNumber(row.cellAQ),
      Total_Volt: String(toNumber(row.cellAR) + toNumber(row.cellAS) / 100),
      Curr: String(
        formatNumber2(toNumber(row.cellAT) + toNumber(row.cellAU) / 100)
      ),
      Full_Capacity: String(toNumber(row.cellAV) + toNumber(row.cellAW) / 100),
      Remain_Capcity: String(toNumber(row.cellAX) + toNumber(row.cellAY) / 100),
      "All_Chg_Ah(Ah)": String(toNumber(row.cellAZ)),
      "All_Dsg_Ah(Ah)": String(toNumber(row.cellBA)),
      "All_Chg_Time(h)": String(
        toNumber(row.cellBB) + toNumber(row.cellBC) / 100
      ),
      "All_Dsg_Time(h)": String(
        toNumber(row.cellBD) + toNumber(row.cellBE) / 100
      ),
      All_Chg_kWh: String(
        formatNumber(toNumber(row.cellBF) + toNumber(row.cellBG) / 1000)
      ),
      All_Dsg_kWh: String(
        formatNumber(toNumber(row.cellBH) + toNumber(row.cellBI) / 1000)
      ),
      SOC: String(
        formatNumber2(toNumber(row.cellBJ) + toNumber(row.cellBK) / 100)
      ),
      SOH: String(toNumber(row.cellBL) + toNumber(row.cellBM) / 100),
      TEMP_Count: String(toNumber(row.cellBN)),
      TEMP1: String(toNumber(row.cellBO) + toNumber(row.cellBP) / 10),
      TEMP2: String(toNumber(row.cellBQ) + toNumber(row.cellBR) / 10),
      TEMP3: String(toNumber(row.cellBS) + toNumber(row.cellBT) / 10),
      TEMP4: String(toNumber(row.cellBU) + toNumber(row.cellBV) / 10),
      MOS_Temp: String(toNumber(row.cellBW) + toNumber(row.cellBX) / 10),
      AMB_Temp: String(toNumber(row.cellBY) + toNumber(row.cellBZ) / 10),
      Status_Code: String(row.cellCA || ""),
      Status_Log: String(row.cellCB || ""),
    };
  };

  const generateColumnMapping = (start, end) => {
    const columnMapping = {};
    let currentColumn = start;

    while (true) {
      columnMapping[`cell${currentColumn}`] = letterToIndex(currentColumn);
      if (currentColumn === end) break;
      currentColumn = nextColumn(currentColumn);
    }

    return columnMapping;
  };

  const letterToIndex = (letter) => {
    let index = 0;
    for (let i = 0; i < letter.length; i++) {
      const charIndex = letter.charCodeAt(i) - "A".charCodeAt(0);
      index = index * 26 + charIndex + 1;
    }
    return index - 1;
  };

  const nextColumn = (column) => {
    let result = "";
    let carry = true;

    for (let i = column.length - 1; i >= 0; i--) {
      if (carry) {
        if (column[i] === "Z") {
          result = "A" + result;
        } else {
          result = String.fromCharCode(column.charCodeAt(i) + 1) + result;
          carry = false;
        }
      } else {
        result = column.slice(0, i) + column[i] + result;
      }
    }

    if (carry) result = "A" + result;

    return result;
  };

  const downloadFileExcel = () => {
    const fileNameWithSuffix = `${fileName}_FIXED.xlsx`;

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

      // Ensure each row in fixedData has the correct keys
      const dataWithHeaders = fixedData.map((row) =>
        headers.reduce((acc, header) => {
          acc[header] = row[header] || ""; // Ensure every header has a value
          return acc;
        }, {})
      );

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Create Sheet 1 with the processed fix data
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
          <h1 className="text-black fs-4">Fix Excel Discharge Data</h1>
        </div>

        <div className="row">
          <div className="col-md-6"></div>
        </div>

        <div className="row">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputGroupFile04" className="form-label">
                Import Data Excel
              </label>
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
              <button
                type="button"
                className="btn btn-secondary"
                id="downloadFileExcelButton"
                style={{ display: displayButton ? "block" : "none" }}
                onClick={downloadFileExcel}
              >
                Download File
              </button>

              <p
                style={{
                  display: errorDisplay ? "block" : "none",
                  color: "red",
                }}
                id="typeError"
              >
                {typeError}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FixExcel;
