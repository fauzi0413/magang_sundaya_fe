import axios from "axios";

const baseURLBackEnd = process.env.REACT_APP_BASE_URL_BACKEND;
const baseURLMonitoringBackEnd = process.env.REACT_APP_MONITOR_URL_BACKEND;
// console.log("baseURL_BE = " + baseURLBackEnd);

// export const instanceBackEnd = axios.create({
//   baseURL: baseURLBackEnd,
// });

// export const monitoringBackEnd = axios.create({
//   baseURL: baseURLMonitoringBackEnd,
// });

export const getUsers = (callback) => {
  axios
  .get(`${baseURLBackEnd}/users`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

<<<<<<< HEAD
=======
export const getLoginLogs = (callback) => {
  axios
  .get(`${baseURLBackEnd}/login/logs`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

>>>>>>> 45558cc (initial commit)
export const loginLogs = (payload) => {
  return axios.post(`${baseURLBackEnd}/login/logs`, payload)
    .then((res) => {
      console.log("Login log response:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Login log error:", err.response ? err.response.data : err.message);
      return null;
    });
};


export const getUserById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/users/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postUser = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/users`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putUser = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/users/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteUserById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/users/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getInventory = (callback) => {
  axios
  .get(`${baseURLBackEnd}/inventory`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getInventoryById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/inventory/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postInventory = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/inventory`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putInventory = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/inventory/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteInventoryById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/inventory/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

<<<<<<< HEAD
=======
export const getMaterial = (callback) => {
  axios
  .get(`${baseURLBackEnd}/materials`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getMaterialLogs = (callback) => {
  axios
  .get(`${baseURLBackEnd}/materials/logs`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getMaterialById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/materials/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postMaterial = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/materials`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putMaterial = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/materials/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteMaterialById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/materials/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

>>>>>>> 45558cc (initial commit)
export const getWarehouse = (callback) => {
  axios
  .get(`${baseURLBackEnd}/warehouses`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getWarehouseLogs = (callback) => {
  axios
  .get(`${baseURLBackEnd}/warehouses/logs`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getWarehouseById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/warehouses/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postWarehouse = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/warehouses`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putWarehouse = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/warehouses/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteWarehouseById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/warehouses/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getCluster = (callback) => {
  axios
  .get(`${baseURLBackEnd}/clusters`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getClusterById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/clusters/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postCluster = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/clusters`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putCluster = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/clusters/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteClusterById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/clusters/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getClusterStock = (callback) => {
  axios
  .get(`${baseURLBackEnd}/clusterstocks`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getClusterStockById = (id, callback) => {
  axios
  .get(`${baseURLBackEnd}/clusterstocks/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getClusterStockLogs = (callback) => {
  axios
  .get(`${baseURLBackEnd}/clusterstocks/logs`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}


export const postClusterStock = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/clusterstocks`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const putClusterStock = async (id, payload, callback) => {
  try {
      const response = await axios.put(`${baseURLBackEnd}/clusterstocks/${id}`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};

export const deleteClusterStockById = (id, callback) => {
  axios
  .delete(`${baseURLBackEnd}/clusterstocks/${id}`)  
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
<<<<<<< HEAD
}
=======
}

export const getOrder = (callback) => {
  axios
  .get(`${baseURLBackEnd}/order`)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postOrder = async (payload, callback) => {
  try {
      const response = await axios.post(`${baseURLBackEnd}/order`, payload, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      callback(response.data); // Jika sukses, panggil callback
  } catch (error) {
      console.error('Gagal mengirim data:', error);
  }
};
>>>>>>> 45558cc (initial commit)
