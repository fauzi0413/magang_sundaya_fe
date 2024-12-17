import React, { useState, useEffect } from "react";
import HeaderContent from "./utils/HeaderContent";
import CardSite from "./utils/CardSite";

function SiteDown() {
  const [data, setData] = useState([]); // State untuk data asli
  const [filteredData, setFilteredData] = useState([]); // State untuk data yang difilter
  const [filterType, setFilterType] = useState(""); // State untuk jenis filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mock/snmpdown.json");
        const jsonData = await response.json();
        setData(jsonData.data);
        setFilteredData(jsonData.data); // Default filtered data adalah semua data
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani perubahan filter
  const handleFilter = (event) => {
    const { value } = event.target;
    setFilterType(value);
    console.log("Filter type:", value);

    if (value === "siteName") {
      // Filter berdasarkan Site Name (contoh filter sederhana)
      const filtered = [...data].sort((a, b) => {
        // console.log("Checking item:", item.sitename);
        return a.sitename.localeCompare(b.sitename);
      });
      console.log("Filtered Data (Site Name):", filtered);
      setFilteredData(filtered);
    } else if (value === "downTime") {
      // Filter berdasarkan Down Time lebih dari 10 jam (contoh angka)
      const filtered = data.filter((item) => {
        console.log("Checking downtime:", item.downtime);
        return (
          item.downtime && // Pastikan downtime ada
          parseInt(item.downtime) > 10
        );
      });
      console.log("Filtered Data (Down Time):", filtered);
      setFilteredData(filtered);
    } else {
      // Default, menampilkan semua data
      setFilteredData(data);
    }
  };

  return (
    <div className="p-3 bg-light">
      <div className="container">
        <HeaderContent title={"Site Down"} icon={"bi-building-fill"} />
        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              <div className="d-flex justify-content-end">
                <select
                  className="form-select"
                  style={{ width: "200px" }}
                  value={filterType}
                  onChange={handleFilter}
                >
                  <option value="">Filter By</option>
                  <option value="siteName">Site Name</option>
                  <option value="downTime">Down Time</option>
                </select>
              </div>

              <div className="row">
                {filteredData.map((item, index) => (
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

export default SiteDown;

// import React, { useState, useEffect } from "react";
// import HeaderContent from "./utils/HeaderContent";
// import CardSite from "./utils/CardSite";

// function SiteDown() {
//      const [data, setData] = useState([]);

//      useEffect(() => {
//        const fetchData = async () => {
//          try {
//            const response = await fetch("/mock/snmpdown.json");
//            console.log(response);
//            const jsonData = await response.json();
//            setData(jsonData.data);
//          } catch (error) {
//            console.error("Ada kesalahan dalam mengambil data:", error);
//          }
//        };

//        fetchData();
//      }, []);
//   return (
//     <div className="p-3 bg-light">
//       <div className="container ">
//         <HeaderContent title={"Site Down"} icon={"bi-building-fill"} />
//         <div className="row">
//           <div className="col-12 p-3 bg-light">
//             <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
//               <div className="d-flex justify-content-end">
//                 <select className="form-select" style={{ width: "200px" }}>
//                   <option selected>Filter By</option>
//                   <option value="option1">Site Name</option>
//                   <option value="option2">Down Time </option>
//                 </select>
//               </div>

//               <div className="row">
//                 {data.map((item, index) => (
//                   <CardSite
//                     key={index}
//                     sitename={item.sitename}
//                     ip={item.ip}
//                     sla={item.sla}
//                     downtime={item.downtime}
//                     update={item.update}
//                     pic={item.pic}
//                     gs={item.gs}
//                     lc={item.lc}
//                     id={item.id}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SiteDown;
