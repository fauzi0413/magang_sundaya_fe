import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa'; // Importing search icon

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for the table
  const data = [
    { sapCode: 'SAP001', itemName: 'Item 1', totalItems: 10, status: 'Masuk', date: '01/01/2023', description: 'Description 1' },
    { sapCode: 'SAP002', itemName: 'Item 2', totalItems: 20, status: 'Keluar', date: '02/01/2023', description: 'Description 2' },
    // Add more sample data as needed
  ];

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
   
    <div class="container">
        <div class="search-container">
            <input type="text" class="form-control search-bar" placeholder="find the items you need"/>
            <button class="btn btn-info"><i class="fas fa-search"></i>🔎Search</button>
        </div>
        <div class="d-flex justify-content-center mb-3">
            <button class="btn btn-primary">Masuk</button>
            <button class="btn btn-secondary">Keluar</button>
            <button class="btn btn-secondary">All</button>
        </div>
        <div class="table-container">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>SAB-CODE</th>
                        <th>Nama Barang</th>
                        <th>Total Barang</th>
                        <th>Status</th>
                        <th>Dd/Mm/Yy</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                        <td>Text</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default History;