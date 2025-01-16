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
import SLA1 from "./component/SLA1";
import SLA2 from "./component/SLA2";
import SLA3 from "./component/SLA3";
import LoginPage from "./component/LoginPage";
import ProfilePage from "./component/ProfilePage";
function App() {
  const [toggle, setToggle] = useState(true);
  function Toggle() {
    setToggle(!toggle);
  }

  return (
    <BrowserRouter>
      <div className="d-flex">
        <div
          className={
            toggle ? "d-none" : "w-auto position-fixed overflow-auto bg-primary"
          }
        >
          <Sidebar Toggle={Toggle} />
        </div>
        <div className={toggle ? "d-none" : "invisible"}>
          <Sidebar />
        </div>
        <div className="col overflow-auto">
          <div className="w-auto shadow-sm">
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
            <Route path="/sla1" element={<SLA1 />} />
            <Route path="/sla2" element={<SLA2 />} />
            <Route path="/sla3" element={<SLA3 />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profil" element={<ProfilePage />} />
            {/* <Route path="/users" element={<Users />} /> */}
            {/* <Route path="/orders" element={<Orders />} /> */}
            {/* <Route path="/form" element={<Form />} /> */}
            {/* <Route path="/report" element={<Report />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
