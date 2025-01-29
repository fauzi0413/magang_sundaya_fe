import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";
import favicon from "../img/favicon.ico";
import { Search, User, LogOut } from "lucide-react"; // Keeping the icons for simplicity
import { useNavigate } from "react-router-dom";

function Navbar({ Toggle }) {
  const [visible, setVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let timeoutId;

  useEffect(() => {
    // Periksa autentikasi dari localStorage
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData); // Jika ada authData, berarti user terautentikasi
}, []);

const logout = () => {
    localStorage.removeItem("auth"); // Clear user data
    setIsAuthenticated(false); // Update state autentikasi
    setTimeout(() => {
      window.location.reload();
    });
    navigate("/login"); // Redirect ke login
    };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString(); // Simplified time formatting
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMouseMove = () => {
    setVisible(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setVisible(false), 3000);
  };

  useEffect(() => {
    // window.addEventListener("mousemove", handleMouseMove);
    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    // };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-bg navbar-dark fixed-top" style={{ height: "80px" }}>
      <span className="text-white text-decoration-none">
        <img
          src={`${process.env.PUBLIC_URL}/white.png`}
          alt="ECC Dashboard Icon"
          className="me-4 ms-4"
          width={210}
          height={40}
        />
        {/* <span className="fs-3"></span> */}
      </span>

      {isAuthenticated && (
      <a
        className={`navbar-brand ms-2 ${visible ? "d-block" : "d-none"}`}
        onClick={Toggle}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-justify justify-icon fs-1"></i>
      </a>
      )}

      <div className="ms-auto text-white me-3">
        <strong>{currentTime}</strong>
      </div>
      
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {isAuthenticated && (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button className="btn text-white" style={{ background: 'none', border: 'none' }}>
              <Search size={23} /> 
            </button>
          </li>
          <li className="nav-item">
            <button className="btn text-white" style={{ background: 'none', border: 'none' }}>
              <User size={23} /> 
            </button>
          </li>
          <li className="nav-item">
            <button className="btn text-white" style={{ background: 'none', border: 'none' }} onClick={logout}>
              <LogOut size={23} /> Logout
            </button>
          </li>
        </ul>
      </div>  
      )}
    </nav>
  );
}

export default Navbar;
