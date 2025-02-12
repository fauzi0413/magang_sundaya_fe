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
// import LoginForm from "./component/LoginForm";
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

import Warehouse from "./component/Warehouse";
import InputWarehouse from "./component/InputWarehouse";
import EditWarehouse from "./component/EditWarehouse";
import WarehouseDetail from "./component/WarehouseDetail";
import WarehouseTambah from "./component/WarehouseTambah";

import SuccesTambah from "./component/SuccesTambah";
import DetailBarang from "./component/DetailBarang";
import History from "./component/History";
import DashboardWarehouse from "./component/DashboardWarehouse";
import Barcode from "./component/Barcode";

import User from "./component/User";
import InputUser from "./component/InputUser";
import EditUser from "./component/EditUser";
import UserDetail from "./component/UserDetail";

import Inventory from "./component/Inventory";
import InputInventory from "./component/InputInventory";
import EditInventory from "./component/EditInventory";

import Cluster from "./component/Cluster";
import InputCluster from "./component/InputCluster";
import EditCluster from "./component/EditCluster";
import ClusterDetail from "./component/ClusterDetail";
import ClusterStockLogs from "./component/ClusterStockLogs";

import ClusterStock from "./component/ClusterStock";
import InputClusterStock from "./component/InputClusterStock";
import EditClusterStock from "./component/EditClusterStock";

import DashboardOM from "./component/DashboardOM";
import ItemdataOM from "./component/ItemdataOM";
import SidebarOM from "./component/SidebarOM";
import HistoryOM from "./component/HistoryOM";
import DetailOM from "./component/DetailOM";
import TambahOM from "./component/TambahOM";
import SuccesOM from "./component/SuccesOM";
import BarcodeOM from "./component/BarcodeOM";
import ProtectedRoute from "./component/ProtectedRoute";

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
            toggle ? "d-none" : "w-auto position-fixed overflow-auto custom-bg"
          }
        >
          <Sidebar Toggle={Toggle} />
        </div>
        <div className={toggle ? "d-none" : "invisible"}>
          <Sidebar />
        </div>
        <div className="overflow-auto col">
          <div className="w-auto shadow-sm">
            <Navbar Toggle={Toggle} />
          </div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
              
            <Route path="/" element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/SidebarOM" element={<SidebarOM />} />
            
            <Route path="/Dashboardwarehouse" element={
              <ProtectedRoute requiredRole="management">
                <DashboardWarehouse />
              </ProtectedRoute>
            } />
            
            <Route path="/user" element={<User />} />
            <Route path="/user/create" element={<InputUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<UserDetail />} />
            
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/create" element={<InputInventory />} />
            <Route path="/inventory/edit/:id" element={<EditInventory />} />
            
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/warehouse/create" element={<InputWarehouse/>}/>
            <Route path="/warehouse/edit/:id" element={<EditWarehouse />} />
            <Route path="/warehouse/:id" element={<WarehouseDetail />} />
            <Route path="/warehousetambah" element={<WarehouseTambah />} />
            <Route path="/History" element={<History />} />
            
            <Route path="/cluster" element={<Cluster />} />
            <Route path="/cluster/create" element={<InputCluster />} />
            <Route path="/cluster/edit/:id" element={<EditCluster />} />
            <Route path="/cluster/:id" element={<ClusterDetail />} />
            
            <Route path="/clusterstock" element={<ClusterStock />} />
            <Route path="/clusterstock/create" element={<InputClusterStock />} />
            <Route path="/clusterstock/edit/:id" element={<EditClusterStock />} />
            <Route path="/clusterstocklogs" element={<ClusterStockLogs />} />
            
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
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="/SuccesTambah" element={<SuccesTambah />} />  
            <Route path="/DetailBarang" element={<DetailBarang />} />
            <Route path="/Barcode" element={<Barcode />} />
            <Route path="/DashboardOM" element={<DashboardOM />} />
            <Route path="/ItemdataOM" element={<ItemdataOM />} />
            <Route path="/HistoryOM" element={<HistoryOM />} />
            <Route path="/DetailOM" element={<DetailOM />} />
            <Route path="/TambahOM" element={<TambahOM />} />
            <Route path="/SuccesOM" element={<SuccesOM />} />
            <Route path="/BarcodeOM" element={<BarcodeOM />} />
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

export default App;