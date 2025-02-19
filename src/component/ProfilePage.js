import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD

const ProfilePage = () => {
  return (
    <div className="container-fluid bg-light vh-100">

      {/* Main Content */}
      <div className="row mt-4 justify-content-center">
        {/* Profile Sidebar */}
        <div className="col-md-3 p-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              {/* Profile Icon */}
              <div
                className="bg-secondary rounded-circle mx-auto mb-3"
                style={{ width: "100px", height: "100px" }}
              >
                <i className="bi bi-person fs-1 text-white d-flex align-items-center justify-content-center h-100"></i>
              </div>
              {/* User Info */}
              <div className="mb-3">
                <label className="form-label fw-bold">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value="JohnDoe"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value="johndoe@example.com"
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Role:</label>
                <input
                  type="text"
                  className="form-control"
                  value="Admin"
                  readOnly
                />
              </div>
              {/* Logout Button */}
              <button className="btn btn-danger w-100">Log Out</button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="col-md-7 p-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Additional Information</h5>
              <div
                className="border rounded p-4"
                style={{ height: "300px", overflowY: "auto" }}
              >
                {/* Content Placeholder */}
                <p>
                  This section can be used to display additional details about
                  the user, such as recent activities, preferences, or other
                  relevant information.
                </p>
=======
import HeaderContent from './utils/HeaderContent';

const ProfilePage = () => {
  return (
    <div className="bg-light py-5">
      <div className="container bg-light">
        {/* Header for Login Logs */}
        <HeaderContent title="Profile" icon="bi-file-earmark-text" />

        {/* Main Content */}
        <div className="row mt-4 justify-content-center">
          {/* Profile Sidebar */}
          <div className="col-md-3 p-3">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                {/* Profile Icon */}
                <div
                  className="bg-secondary rounded-circle mx-auto mb-3"
                  style={{ width: "100px", height: "100px" }}
                >
                  <i className="bi bi-person fs-1 text-white d-flex align-items-center justify-content-center h-100"></i>
                </div>
                {/* User Info */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    value="JohnDoe"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value="johndoe@example.com"
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Role:</label>
                  <input
                    type="text"
                    className="form-control"
                    value="Admin"
                    readOnly
                  />
                </div>
                {/* Logout Button */}
                <button className="btn btn-danger w-100">Log Out</button>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="col-md-7 p-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Additional Information</h5>
                <div
                  className="border rounded p-4"
                  style={{ height: "300px", overflowY: "auto" }}
                >
                  {/* Content Placeholder */}
                  <p>
                    This section can be used to display additional details about
                    the user, such as recent activities, preferences, or other
                    relevant information.
                  </p>
                </div>
>>>>>>> 45558cc (initial commit)
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>
=======
        </div>
>>>>>>> 45558cc (initial commit)
    </div>
  );
};

export default ProfilePage;
