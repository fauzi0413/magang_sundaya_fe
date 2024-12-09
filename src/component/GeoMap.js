import React, { useEffect } from "react";
import L from "leaflet";

function GeoMap() {
  useEffect(() => {
    const mapContainer = document.getElementById("map");

    // Cek apakah peta sudah diinisialisasi
    if (mapContainer._leaflet_id) {
      return; // Jangan inisialisasi ulang
    }

    // Inisialisasi peta dengan koordinat Indonesia
    const map = L.map("map").setView([-6.2, 106.816666], 10); // Koordinat Indonesia (Jakarta)

    // Tambahkan tile layer dari OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Tambahkan marker untuk Jakarta
    L.marker([-6.2, 106.816666]).addTo(map).bindPopup("Jakarta").openPopup();

    // Tambahkan marker untuk Bogor
    L.marker([-6.595038, 106.816635]).addTo(map).bindPopup("Bogor");

    // Cleanup saat komponen di-*unmount*
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
}

export default GeoMap;
