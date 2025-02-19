import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";
<<<<<<< HEAD
import favicon from "../img/favicon.ico";
import { Search, User, LogOut } from "lucide-react"; // Keeping the icons for simplicity
=======
import { Search, User, LogOut } from "lucide-react";
>>>>>>> 45558cc (initial commit)
import { useNavigate } from "react-router-dom";
import { loginLogs } from "../api/axios";

function Navbar({ Toggle }) {
<<<<<<< HEAD
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

const logout = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const user = auth.username
  
  const payload = {
      username: user,
      action: "logout"
  };
  const logResponse = await loginLogs(payload); // Pastikan API dipanggil dengan await
  if (logResponse) {
      console.log("Login log berhasil disimpan:", logResponse);
      // Force page reload setelah login
      setTimeout(() => {
          window.location.reload();
      }, 0);
  } else {
      console.error("Gagal menyimpan login log.");
  }
  
  // Hapus auth dari localStorage setelah logout log dicatat
  localStorage.removeItem("auth");
  
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

      <div className="text-white ms-auto me-3">
        <strong>{currentTime}</strong>
      </div>
      
      {/* <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}
      
      {isAuthenticated && (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="mb-2 navbar-nav ms-auto mb-lg-0">
          <li className="nav-item">
            <button className="text-white btn" style={{ background: 'none', border: 'none' }}>
              <Search size={23} /> 
            </button>
          </li>
          <li className="nav-item">
            <button className="text-white btn" style={{ background: 'none', border: 'none' }}>
              <User size={23} /> 
            </button>
          </li>
          <li className="nav-item">
            <button className="text-white btn" style={{ background: 'none', border: 'none' }} onClick={logout}>
              <LogOut size={23} /> Logout
            </button>
          </li>
        </ul>
      </div>  
=======
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    setIsAuthenticated(!!authData);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isMobile]);

  const logout = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const user = auth?.username;

    if (user) {
      await loginLogs({ username: user, action: "logout" });
    }
    localStorage.removeItem("auth");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg custom-bg navbar-dark fixed-top px-3" style={{ height: "80px" }}>
      {isAuthenticated && (
        <div className="d-flex align-items-center">
             <button className="btn text-white me-2" onClick={Toggle} style={{ background: "none", border: "none" }}>
              <i className="bi bi-justify fs-3 animate-icon"></i>
            </button>
          <img
            src={`${process.env.PUBLIC_URL}/${isMobile ? "white.png" : "white.png"}`}
            alt="Sundaya Logo"
            width={isMobile ? 150 : 210}
            height={isMobile ? 30 : 40}
          />
          {!isMobile && <strong className="text-white ms-3">{currentTime}</strong>}
        </div>
      )}
 
      {isAuthenticated && (
        <div className="ms-auto">
          <button className="text-white btn" style={{ background: "none", border: "none" }} onClick={logout}>
            <LogOut size={23} /> {!isMobile && "Logout"}
          </button>
        </div>
>>>>>>> 45558cc (initial commit)
      )}
    </nav>
  );
}

export default Navbar;
