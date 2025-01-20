import React from 'react'
import './WarehouseTambah.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const WarehouseTambah = () => {
  
  return (
    

    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card/WarehouseTambah.css" style={{ width: '500px' }}>
        <div className="login-form p-4">
            <form>
                <div className="mb-3">
                    <select className="form-select" aria-label="Nama Cluster">
                        <option selected>Nama Cluster</option>
                        <option value="1">Cluster 1</option>
                        <option value="2">Cluster 2</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="number" className="form-control" aria-label="Jumlah barang" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Confirm</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default WarehouseTambah;
