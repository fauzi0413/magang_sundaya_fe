import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";
import favicon from "../img/favicon.ico";

function Navbar({ Toggle }) {
  const [visible, setVisible] = useState(true); // State untuk visibility navbar-brand
  const [currentTime, setCurrentTime] = useState(""); // State untuk waktu
  let timeoutId;

  // Fungsi untuk memformat waktu
  const formatTime = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  };

  // Perbarui waktu setiap detik
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
  }, []);

  const handleMouseMove = () => {
    setVisible(true); // Tampilkan navbar-brand saat ada pergerakan mouse

    // Reset timer untuk menyembunyikan navbar-brand
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // setVisible(false); // Sembunyikan navbar-brand setelah 3 detik
    }, 3000);
  };

  const handleNavbarClick = () => {
    // setVisible(false); // Sembunyikan navbar-brand saat diklik
    Toggle(); // Tetap memanggil fungsi Toggle untuk membuka/menutup sidebar
  };

  useEffect(() => {
    // Tambahkan event listener untuk mousemove
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Hapus event listener saat komponen di-unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top">
      <span className="text-white text-decoration-none">
        <img
          src={favicon}
          alt="ECC Dashboard Icon"
          className=" me-4 ms-4"
          width={32}
          height={32}
        />
        <span className="fs-3">ECC Dashboard</span>
      </span>

      {/* <a className="navbar-brand d-none d-md-block" href="!#">
        Dashboard
      </a> */}

      <a
        className={`navbar-brand ms-2 ${visible ? "d-block" : "d-none"}`}
        onClick={handleNavbarClick}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-justify justify-icon fs-1"></i>
      </a>

      {/* eslint-disable-next-line */}
      <a className="navbar-brand d-block d-md-none" onClick={Toggle}>
        <i className="bi bi-justify justify-icon"></i>
      </a>
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item mx-2 border rounded nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              <i className="bi bi-search"></i> Search
            </a>
          </li>

          <li className="nav-item mx-2 rounded border nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              Account
            </a>
          </li>

          <li className="nav-item mx-2 rounded border nav-margin">
            <a className="nav-link text-white" aria-current="page" href="!#">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

