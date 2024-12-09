import React, { useState, useEffect } from "react";
import { instanceBackEnd } from "../api/axios.js";
import * as XLSX from "xlsx";
import Papa from "papaparse";

function FixExcel() {
  const [typeError, setTypeError] = useState(null);
  const [finalDataArr, setExcelDataArr] = useState([]);
  const [tanggalAwal, setTanggalAwal] = useState([]);
  const [tanggalAkhir, setTanggalAkhir] = useState([]);
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [processDisplay, setProcessDisplay] = useState(0);
  const [jumlahData, setJumlahData] = useState(0);

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
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => processExcelData(e.target.result);
      setUploadDisplay(true);
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
    const rawData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

    if (rawData.length > 0) {
      const columnMapping = generateColumnMapping("A", "CB");

      rawData.slice(1).forEach((row) => {
        const processedRow = {};

        Object.keys(columnMapping).forEach((key) => {
          const index = columnMapping[key];
          processedRow[key] = index < row.length ? row[index] : null;
        });
        excelDataArr.push(processedRow);

        const processedFixData = createProcessedFixData(processedRow);
        processedFixDataArr.push(processedFixData);
      });

      console.log("Processed Fix Data Array:", processedFixDataArr);
      console.log("Excel Data Array:", excelDataArr);

      // setExcelDataArr(excelDataArr);
      // setDisplayButton(true);
      // setJumlahData(excelDataArr.length);
    } else {
      setTypeError("No data found in the Excel file.");
      setUploadDisplay(false);
      setErrorDisplay(true);
    }
  };

  const createProcessedFixData = (row) => {
    const convertToNumber = (value) => parseFloat(value) || 0;

    // Format number to 3 decimal places
    const formatNumber = (value) => {
      return parseFloat(value.toFixed(3));
    };

    return {
      ID: row.cellA,
      ADDR: row.cellB,
      RX_TX: row.cellC,
      PCB_BARCODE: row.cellD,
      PACK_BARCODE: row.cellE,
      DATE_TIME: row.cellF,
      CELL_COUNT: formatNumber(convertToNumber(row.cellG)),
      CELL1: formatNumber(
        convertToNumber(row.cellH) + convertToNumber(row.cellI) / 1000
      ),
      CELL2: formatNumber(
        convertToNumber(row.cellJ) + convertToNumber(row.cellK) / 1000
      ),
      CELL3: formatNumber(
        convertToNumber(row.cellL) + convertToNumber(row.cellM) / 1000
      ),
      CELL4: formatNumber(
        convertToNumber(row.cellN) + convertToNumber(row.cellO) / 1000
      ),
      CELL5: formatNumber(
        convertToNumber(row.cellP) + convertToNumber(row.cellQ) / 1000
      ),
      CELL6: formatNumber(
        convertToNumber(row.cellR) + convertToNumber(row.cellS) / 1000
      ),
      CELL7: formatNumber(
        convertToNumber(row.cellT) + convertToNumber(row.cellU) / 1000
      ),
      CELL8: formatNumber(
        convertToNumber(row.cellV) + convertToNumber(row.cellW) / 1000
      ),
      CELL9: formatNumber(
        convertToNumber(row.cellX) + convertToNumber(row.cellY) / 1000
      ),
      CELL10: formatNumber(
        convertToNumber(row.cellZ) + convertToNumber(row.cellAA) / 1000
      ),
      CELL11: formatNumber(
        convertToNumber(row.cellAB) + convertToNumber(row.cellAC) / 1000
      ),
      CELL12: formatNumber(
        convertToNumber(row.cellAD) + convertToNumber(row.cellAE) / 1000
      ),
      CELL13: formatNumber(
        convertToNumber(row.cellAF) + convertToNumber(row.cellAG) / 1000
      ),
      CELL14: formatNumber(
        convertToNumber(row.cellAH) + convertToNumber(row.cellAI) / 1000
      ),
      CELL15: formatNumber(
        convertToNumber(row.cellAJ) + convertToNumber(row.cellAK) / 1000
      ),
      CELL16: formatNumber(
        convertToNumber(row.cellAL) + convertToNumber(row.cellAM) / 1000
      ),
      MAX_CELL: formatNumber(
        convertToNumber(row.cellAN) + convertToNumber(row.cellAO) / 1000
      ),
      MIN_CELL: formatNumber(
        convertToNumber(row.cellAP) + convertToNumber(row.cellAQ) / 1000
      ),
      TOTAL_VOLT: formatNumber(
        convertToNumber(row.cellAR) + convertToNumber(row.cellAS) / 100
      ),
      CURR: formatNumber(
        convertToNumber(row.cellAT) + convertToNumber(row.cellAU) / 100
      ),
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

  const findSomo = () => {
    somoDataProcess();
  };

  const somoDataProcess = () => {
    downloadExcel();
  };

  const downloadExcel = () => {
    const fileName = `SOMO_${tanggalAwal}_SAMPAI_${tanggalAkhir}.xlsx`;

    if (finalDataArr.length > 0) {
      const wb = XLSX.utils.book_new();

      // Sheet 1
      const sheet1Name = "SOMO LOGERS";
      const sheet1WS = XLSX.utils.json_to_sheet(finalDataArr);
      XLSX.utils.book_append_sheet(wb, sheet1WS, sheet1Name);

      // Sheet 2
      const sheet2Name = "SOMO RECAP";
      const siteCounts = {};
      finalDataArr.forEach((row) => {
        const namaSite = row.NAMA_SITE;
        siteCounts[namaSite] = (siteCounts[namaSite] || 0) + 1;
      });

      const sheet2Data = Object.entries(siteCounts).map(([namaSite, count]) => {
        const matchingRows = finalDataArr.filter(
          (row) => row.NAMA_SITE === namaSite
        );
        const { KOTA, SITE_ID } = matchingRows[0];
        return {
          SITE_ID,
          NAMA_SITE: namaSite,
          KOTA,
          TOTAL_DAYS: count,
        };
      });

      const sheet2WS = XLSX.utils.json_to_sheet(sheet2Data);
      XLSX.utils.book_append_sheet(wb, sheet2WS, sheet2Name);

      XLSX.writeFile(wb, fileName);
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4">Site Somo</h1>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p>
              Harap download data Excel dari{" "}
              <span>
                <a
                  href="https://nms.btsbakti.com/auth/login"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  NMS BAKTI
                </a>
              </span>{" "}
              terlebih dahulu, kemudian import pada formulir di bawah ini:
            </p>
          </div>
        </div>

        <div className="row">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputGroupFile04" className="form-label">
                Import Data Bakti
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
                Uploading Data ... {processDisplay} / {jumlahData}
              </p>
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn btn-secondary"
                id="findSomoButton"
                style={{ display: displayButton ? "block" : "none" }}
                onClick={findSomo}
              >
                Download CSV
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
