import React, { useState, useEffect } from "react";
import HeaderContent from './utils/HeaderContent';
import CardSite from "./utils/CardSite";

function WarningSnmp() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("/mock/snmpdown.json");
          console.log(response);
          const jsonData = await response.json();
          setData(jsonData.data);
        } catch (error) {
          console.error("Ada kesalahan dalam mengambil data:", error);
        }
      };

      fetchData();
    }, []);
  return (
    <div className="p-3 bg-light">
      <div className="container-fluid">
        <HeaderContent title={"Power Down"} icon={"bi-plug-fill"} />
        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <div className="d-flex justify-content-end">
                <select className="form-select" style={{ width: "200px" }}>
                  <option selected>Filter By</option>
                  <option value="option1">Site Name</option>
                  <option value="option2">Down Time </option>
                </select>
              </div>

              <div className="row">
                {data.map((item, index) => (
                  <CardSite
                    key={index}
                    sitename={item.sitename}
                    ip={item.ip}
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
      </div>
    </div>
  );
}

export default WarningSnmp