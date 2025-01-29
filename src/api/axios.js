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
  .get("http://localhost:2000/users")
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const loginLogs = (callback) => {
  axios
  .post("http://localhost:2000/login")
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getInventory = (callback) => {
  axios
  .get("http://localhost:2000/inventory")
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const postInventory = (data, callback) => {
  axios
  .post("http://localhost:2000/inventory", data)
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export const getWarehouse = (callback) => {
  axios
  .get("http://localhost:2000/warehouses")
  .then((res) => {
    callback(res.data)
  }).catch((err) => {
    console.log(err)
  })
}