import React from "react";
import Loading from "./Loading";

const ContentsRack = ({ api }) => {
  if (!api) {
    return <Loading />;
  }
  return (
    <>
      {api.data.rack_data?.map((talis, index) => {
        let batteryClass = "bi bi-battery";
        let textClass = "";
        let colClass = "col-lg-3";

        switch (talis.color) {
          case "warning":
            batteryClass = "bi bi-battery-half";
            textClass = "text-warning";
            break;
          case "success":
            batteryClass = "bi bi-battery-full";
            textClass = "text-success";
            break;
          case "danger":
            textClass = "text-danger";
            break;
          default:
            break;
        }

        switch (api.data.rack_data.length) {
          case 1:
            colClass = "col-lg-12";
            break;
          case 2:
            colClass = "col-lg-6";
            break;
          default:
            break;
        }
        // Format updatedAt
        const formattedUpdatedAt = new Date(talis.updatedAt).toLocaleString();

        // Hitung selisih waktu antara updatedAt dan waktu sekarang
        const currentTime = Date.now();
        const updatedAtTime = new Date(talis.updatedAt).getTime();
        const timeDifferenceInHours =
          (currentTime - updatedAtTime) / (1000 * 60 * 60);

        // Jika selisih lebih dari 24 jam, tambahkan indikator
        let timeDifferenceIndicator = "";
        if (timeDifferenceInHours > 0.15) {
          timeDifferenceIndicator = "text-danger"; // Memberikan warna teks merah jika lebih dari 24 jam
        }

        // Periksa apakah pcb_barcode dimulai dengan "FLS"
        const isFlsPcbBarcode = talis.pcb_barcode.startsWith("FLS");

        // Set href menjadi "#" jika talis_id adalah "Talis 7", sebaliknya arahkan ke specificframe
        const hrefLink =
          api.data.talis_id === "Talis 7"
            ? "#"
            : `/specificframe?pcb_barcode=${talis.pcb_barcode}`;

        return (
          <div
            key={index}
            className={`col-12 col-sm-6 com-md-4 ${colClass} p-3 bg-light`}
          >
            <a
              href={hrefLink}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
                <div className="d-flex justify-content-between">
                  <div>
                    <h2>
                      <span>{talis.sn_code}</span>
                    </h2>
                    <div>
                      <span>{talis.pcb_barcode}</span>
                    </div>
                  </div>
                  <div>{talis.current !== 0 && <h4>{talis.current} A</h4>}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <i className={`${batteryClass} fs-1 ${textClass}`}></i>
                    <h4>{talis.voltage} V</h4>
                  </div>
                  <div>
                    <h4>
                      <span>SOC</span>
                    </h4>
                    <h3>{talis.soc} %</h3>
                  </div>
                </div>
                {/* Sembunyikan div updatedAt jika pcb_barcode dimulai dengan "FLS" */}
                {!isFlsPcbBarcode && (
                  <div className="text-end">
                    <h5 className={timeDifferenceIndicator}>
                      {formattedUpdatedAt}
                    </h5>
                    {timeDifferenceInHours > 0.15 && (
                      <div className="text-danger">
                        <strong>Warning:</strong> talis OFF
                      </div>
                    )}
                  </div>
                )}
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};
export default ContentsRack;
