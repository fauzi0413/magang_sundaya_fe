import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaPlus, FaTrash, FaEdit, FaEye } from 'react-icons/fa'; // Importing icons
import { deleteUserById, getUserById, getUsers } from '../api/axios';
import Swal from 'sweetalert2';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers((data) => {
      setUsers(data);
    });
  }, []);
    
  // Fungsi pencarian berdasarkan username
  const filteredData = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle edit item with specific ID
  const handleEditUser = (id) => {
    navigate(`/user/edit/${id}`); // Navigasi ke halaman edit dengan ID
  };
  
  // Handle detail item with specific ID
  const handleDetailUser = (id) => {
    navigate(`/user/${id}`); // Navigasi ke halaman edit dengan ID
  };

  // Handle deelete item with specific ID
  const handleDeleteUser = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this item!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUserById(id, (response) => {
                console.log('Item deleted:', response);
                setUsers(users.filter((user) => user.id !== id));

                Swal.fire({
                    title: "Deleted!",
                    text: "The item has been deleted successfully.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            });
        }
    });
  };

  const confirmPassword = (callback) => {
    Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            const auth = JSON.parse(localStorage.getItem('auth'));
            
            // Cari user yang sedang login dari array users
            const currentUser = users.find(user => user.username === auth.username);

            if (!currentUser) {
                Swal.showValidationMessage('User not found!');
                return false;
            }

            // Bandingkan password (jika tidak dienkripsi)
            if (password === currentUser.password) {
                return true;
            } else {
                Swal.showValidationMessage('Incorrect password!');
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            callback(); // Panggil fungsi yang sesuai
        }
    });
};

  return (
    <div className="container my-5">
      {/* Search Bar & Add Button */}
    <div className="mt-4 d-flex justify-content-center">
        <div className="gap-2 mb-4 d-flex align-items-center" style={{ maxWidth: '900px', width: '100%' }}>
          <div className="shadow-sm input-group rounded-pill" style={{ backgroundColor: '#f8f9fa', padding: '5px' }}>
            <input 
                type="text" 
                className="px-3 bg-transparent border-0 form-control" 
                placeholder="Find the user you need" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="px-3 text-white btn rounded-pill" style={{ backgroundColor: '#007BFF' }}>
                <FaSearch /> 
              </button>
          </div>
        </div>
        <button 
          className="shadow-sm btn rounded-circle d-flex align-items-center justify-content-center" 
          style={{ backgroundColor: 'white', width: '40px', height: '40px', border: '1px solid #C42B2B' }}
          onMouseDown={(e) => e.target.style.backgroundColor = '#C42B2B'}
          onMouseUp={(e) => e.target.style.backgroundColor = 'white'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          onClick={() => navigate('/user/create')}
        >
          <FaPlus style={{ color: '#C42B2B' }} />
        </button>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge bg-success">admin</span>
                    ) : user.role === "management" ? (
                      <span className="badge bg-warning">management</span>
                    ) : (
                      <span className="badge bg-secondary">Unknown</span> // Jika status tidak "show" atau "hide"
                    )}
                  </td>
                  <td className='text-center'>
                    <button className='btn' onClick={() => confirmPassword(() => handleDetailUser(user.id))}>
                        <FaEye />
                    </button>
                    <button className='btn text-primary' onClick={() => confirmPassword(() => handleEditUser(user.id))}>
                        <FaEdit />
                    </button>
                    <button className='btn text-danger' onClick={() => confirmPassword(() => handleDeleteUser(user.id))}>
                        <FaTrash />
                    </button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;