import React from 'react'
import './WarehouseDetail.css';

const warehousedetail = () => {
  
  return (
    <body>
    <div class="card text-center position-relative">
     <div class="status-indicator">
     </div>
     <img alt="Icon of stacked boxes" height="100" src="https://storage.googleapis.com/a1aa/image/Rvw66bYbge1yASYh0ZhffD7UZos5pCXSeqxpJu4QSPE37ZbQB.jpg" width="100"/>
     <form>
      <input class="form-control" placeholder="SAP Code" type="text"/>
      <input class="form-control" placeholder="Nama Barang" type="text"/>
      <input class="form-control" placeholder="Total Barang" type="text"/>
      <input class="form-control" placeholder="Tanggal" type="text"/>
      <input class="form-control" placeholder="Deskripsi" type="text"/>
      <button class="btn btn-primary mt-3" type="submit">
       Send
      </button>
     </form>
    </div>
   </body>
   
  )
}

export default 
warehousedetail;
