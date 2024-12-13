// import logo from "./logo.svg";
import Navbar from "./component/Navbar";
import React, { useState } from "react";
import "./App.css";
import Sidebar from "./component/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Users from "./component/Users";
// import Orders from "./component/Orders";
// import Form from "./component/Form";
// import Report from "./component/Report";
import ChargingTalis5 from "./component/ChargingTalis5";
import History from "./component/History";
import Underconstruction from "./component/Underconstruction";
import MonitoringTalis5 from "./component/monitoring/MonitoringTalis5";
import MonitoringTalis7 from "./component/monitoring/MonitoringTalis7";
import SettingMonitoring from "./component/SettingMonitoring";
import SpecificTalis from "./component/monitoring/SpecificTalis";
import SpecificFrame from "./component/monitoring/SpecificFrame";
import FixExcel from "./component/FixExcel";
import InsertCharging from "./component/InsertCharging";
import FilterDischarge from "./component/FilterDischarge";
import Dashboard from "./component/Dashboard";
import SiteDown from "./component/SiteDown";
import SnmpDown from "./component/SnmpDown";
import PowerDown from "./component/PowerDown";
import NetworkDown from "./component/NetworkDown";
import WarningScc from "./component/WarningScc";
import WarningSnmp from "./component/WarningSnmp";
import SiteUp from "./component/SiteUp";
import SiteDetail from "./component/SiteDetail";
import TroubleTicket from "./component/TroubleTicket";
function App() {
  const [toggle, setToggle] = useState(true);
  function Toggle() {
    setToggle(!toggle);
  }

  // useEffect(() => {
  //   const handleSize = () => {
  //     if (window.innerWidth > 768) {
  //       setToggle(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleSize);

  //   return () => {
  //     window.removeEventListener("resize", handleSize);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <div className="d-flex">
        <div
          className={toggle ? "d-none" : "w-auto position-fixed overflow-auto bg-primary"}
        >
          <Sidebar />
        </div>
        <div className={toggle ? "d-none" : "invisible"}>
          <Sidebar />
        </div>
        <div className="col overflow-auto">
          <div className="w-auto position-fixed overflow-auto">
            <Navbar Toggle={Toggle} />
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sitedown" element={<SiteDown />} />
            <Route path="/snmpdown" element={<SnmpDown />} />
            <Route path="/powerdown" element={<PowerDown />} />
            <Route path="/networkdown" element={<NetworkDown />} />
            <Route path="/warningscc" element={<WarningScc />} />
            <Route path="/warningsnmp" element={<WarningSnmp />} />
            <Route path="/siteup" element={<SiteUp />} />
            <Route path="/sitedetail" element={<SiteDetail />} />
            <Route path="/troubleticket" element={<TroubleTicket />} />
            {/* <Route path="/users" element={<Users />} /> */}
            {/* <Route path="/orders" element={<Orders />} /> */}
            {/* <Route path="/form" element={<Form />} /> */}
            {/* <Route path="/report" element={<Report />} /> */}
            <Route path="/chargingTalis5" element={<ChargingTalis5 />} />
            <Route path="/history" element={<History />} />
            <Route path="/underconstruction" element={<Underconstruction />} />
            <Route path="/monitoringtalis5" element={<MonitoringTalis5 />} />
            <Route path="/monitoringtalis7" element={<MonitoringTalis7 />} />
            <Route path="/settingmonitoring" element={<SettingMonitoring />} />
            <Route path="/specifictalis" element={<SpecificTalis />} />
            <Route path="/specificframe" element={<SpecificFrame />} />
            <Route path="/fixexcel" element={<FixExcel />} />
            <Route path="/insertCharging" element={<InsertCharging />} />
            <Route path="/filterDischarge" element={<FilterDischarge />} />
          </Routes>

          {/* <Navbar /> */}
          {/* <Home /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
