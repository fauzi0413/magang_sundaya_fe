import React, { useEffect, useState } from "react";
import { monitoringBackEnd } from "../../api/axios.js";
import HeaderContent from "./utilities/HeaderContent.js";
import Loading from "./utilities/Loading.js";
import ContentsRack from "./utilities/ContentsRack.js";
import ContentsFrame from "./utilities/ContentFrame.js";
import TempFrame from "./utilities/TempFrame.js";

function MonitoringTalis7() {
  const [talisData, setTalisData] = useState(null);
  const [frameData, setFrameData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTalis = await monitoringBackEnd.get(
          `api/specificRackTalis7`,
          {
            timeout: 1000,
          }
        );
        setTalisData(responseTalis.data);
        const responseFrame = await monitoringBackEnd.get(
          `api/specificFrameTalis7`,
          {
            timeout: 1000,
          }
        );
        setFrameData(responseFrame.data);
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [talisData, frameData]);

  if (!talisData) {
    return <Loading />;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="p-3 bg-light">
        <div className="container-fluid">
          {/* Header */}
          <HeaderContent title={"Talis 15"} />
          {/* content */}
          <div className="row">
            <ContentsRack api={talisData} />
          </div>
          <div className="row">
            <TempFrame api={frameData} />
            <ContentsFrame api={frameData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MonitoringTalis7;
