import React from "react";
import { Form } from 'react-router-dom';
// import { Formik, Field, ErrorMessage } from 'formik';
import './login.css';
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }
        // Handle login logic here
        console.log('Logging in with:', { email, password });
        setError('');
    };
  return(
     
    <div className="bg-primary">
      <div className="container rounded">
        <div className="login-form">
        {/* <h1><span className="logo-circle"></span> sundaya</h1> */}
        <img src="Asset 1.png"alt="My Image" style={{width:"450px"}}></img>
        <form>
          <div className="form-group">
            <label htmlFor="username"></label>
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <button className="btn btn-primary rounded" type="submit" >Login</button>
        </form>
      </div>
      </div>
    </div>


                      // <div classname="h-screen grid place-items-center"> 
                      //          {/* <Form method="post" classname="card 2-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"> */}
                      //         <h4 classname="text-center text -3xl font-bold">Login</h4>
                      //         {/* <LoginPage type="email" name="email" label="email"/>
                      //         <LoginPage type="password" name="password" label="password"/> */}
                      //     {/* <div ClassName="mt-4"> */}
                      //     {/* <button type="submit" classname="btn-primary">Login</button> */}
                      //     {/* </div>  */}
                      //         {/* </Form> */}
        
  ); 
};
export default LoginPage;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Dummy validation for example
//     if (formData.username === "admin" && formData.password === "password") {
//       alert("Login successful!");
//       // Redirect or perform actions here
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
//       <div className="card shadow-sm p-4" style={{ width: "400px" }}>
//         <h3 className="text-center mb-4">Login</h3>
//         {error && <div className="alert alert-danger text-center">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>
//         <div className="text-center mt-3">
//           <small>
//             Don't have an account? <a href="/register">Register</a>
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
