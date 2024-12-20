// import React, { useEffect, useState } from "react";

// function Navbar({ Toggle }) {
//   const [currentTime, setCurrentTime] = useState("");

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const now = new Date();
//       setCurrentTime(
//         now.toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" })
//       );
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <nav className="navbar bg-primary navbar-dark px-3">
//       <div className="d-flex align-items-center">
//         <button className="btn btn-outline-light me-3" onClick={Toggle}>
//           <i className="bi bi-justify fs-4"></i>
//         </button>
//         <span className="navbar-brand ms-2">ECC Dashboard</span>
//       </div>
//       <div className="ms-auto text-white">{currentTime}</div>
//     </nav>
//   );
// }

// export default Navbar;

// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/js/bootstrap.bundle.js";

// function Navbar({ Toggle }) {
//   const [visible, setVisible] = useState(true); // State untuk visibility navbar
//   let timeoutId;

//   const handleMouseMove = () => {
//     setVisible(true); // Tampilkan navbar saat ada pergerakan mouse

//     // Reset timer untuk menyembunyikan navbar
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       setVisible(false); // Sembunyikan navbar setelah 3 detik
//     }, 3000);
//   };

//   useEffect(() => {
//     // Tambahkan event listener untuk mousemove
//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       // Hapus event listener saat komponen di-unmount
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);
//   return (
//     <nav className="navbar bg-primary navbar-dark ">
//       <div className="d-flex align-items-center ms-2">
//         <button className="btn btn-outline-light me-3" onClick={Toggle}>
//           <i className="bi bi-justify fs-4"></i>
//         </button>
//         <span className="navbar-brand ms-2">ECC Dashboard</span>
//       </div>
      // <a
      //   className={`navbar-brand ms-2 ${visible ? "d-block" : "d-none"}`}
      //   onClick={Toggle}
      // >
      //   <i className="bi bi-justify justify-icon fs-1"></i>
      // </a>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";

function Navbar({ Toggle }) {
  const [visible, setVisible] = useState(true); // State untuk visibility navbar-brand
  let timeoutId;

  const handleMouseMove = () => {
    setVisible(true); // Tampilkan navbar-brand saat ada pergerakan mouse

    // Reset timer untuk menyembunyikan navbar-brand
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // setVisible(false); // Sembunyikan navbar-brand setelah 3 detik
    }, 3000);
  };

  const handleNavbarClick = () => {
    setVisible(false); // Sembunyikan navbar-brand saat diklik
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
    <nav className="navbar bg-primary navbar-dark">
      <a
        className={`navbar-brand ms-2 ${visible ? "d-block" : "d-none"}`}
        onClick={handleNavbarClick}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-justify justify-icon fs-1"></i>
      </a>
    </nav>
  );
}

export default Navbar;

