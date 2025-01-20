import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalMaster from "./utils/ModalMaster";
import ModalBodyuptick from "./utils/ModalBodyuptick";
import ModalFooter from "./utils/ModalFooter";

function TroubleTicket() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    siteName: "",
    ticketCode: "",
    statusSite: "",
    problem: "",
    pic: "",
    file: null,
    response: "",
  });

  const searchParams = new URLSearchParams(location.search);
  const site_id = searchParams.get("id");

  // Handler untuk semua input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value, // Handle file input
    }));
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
    alert(`
      Site Name: ${formData.siteName}
      Ticket Code: ${formData.ticketCode}
      Status Site: ${formData.statusSite}
      Problem: ${formData.problem}
      PIC: ${formData.pic}
      File: ${formData.file ? formData.file.name : "No file selected"}
      Response: ${formData.response}
    `);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/mock/trouble${site_id}.json`);
        console.log(response);
        const jsonData = await response.json();
        setData(jsonData);
        // Set nilai default untuk form berdasarkan data API
        setFormData({
          siteName: jsonData.sitename || "",
          ticketCode: jsonData.ticket_id || "",
          statusSite: "",
          problem: "",
          pic: "",
          file: null,
          response: "",
        });
      } catch (error) {
        console.error("Ada kesalahan dalam mengambil data:", error);
      }
    };

    fetchData();
  }, [site_id]);
  return (
    <div className="p-3 bg-light">
      <div class="container">
        <div className="row">
          {/* <!-- Modal --> */}
          <ModalMaster
            id={"updateTicketModal"}
            title={"Update Trouble Ticket"}
            body={
              <ModalBodyuptick
                formData={formData}
                handleChange={handleChange}
              />
            }
            footer={
              <ModalFooter textButton={"Update"} onSave={handleSave} />
            }
          ></ModalMaster>

          <div className="col-12 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              {/* <!-- Header --> */}
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>
                  {data.ticket_id} - {data.sitename}{" "}
                </h1>
                <h1>001 - Dorolamo</h1>
              </div>
              <button class="btn btn-warning">Create Ticket</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div class="justify-content-between align-items-center bg-dark text-white p-4">
              <div>
                <h1>Trouble Ticket</h1>
              </div>
            </div>
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              {/* <!-- Tabs --> */}
              <ul class="nav  nav-tabs fs-4" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="ticket-logs-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ticket-logs"
                    type="button"
                    role="tab"
                    aria-controls="ticket-logs"
                    aria-selected="true"
                  >
                    Ticket Logs
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="ticket-history-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ticket-history"
                    type="button"
                    role="tab"
                    aria-controls="ticket-history"
                    aria-selected="false"
                  >
                    Ticket History
                  </button>
                </li>
              </ul>

              {/* <!-- Tab Content --> */}
              <div class="tab-content mt-4" id="myTabContent">
                {/* Ticket Logs */}
                <div
                  class="tab-pane fade show active"
                  id="ticket-logs"
                  role="tabpanel"
                  aria-labelledby="ticket-logs-tab"
                >
                  <div class="container-fluid">
                    <div class="container mt-5">
                      {/* <!-- First Ticket --> */}
                      <div class="p-3 mb-3 bg-secondary bg-opacity-10 border rounded shadow-sm">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="mb-1">
                              <strong>Ticket Log Number :</strong> XXX
                            </p>
                            <p class="mb-1">
                              <strong>Ticket Code :</strong> XXX
                            </p>
                            <p class="mb-1">
                              <strong>Ticket Status :</strong> Open
                            </p>
                            <p class="mb-1">
                              <strong>Note :</strong> xxxxx
                            </p>
                            <p class="mb-1">
                              <strong>File :</strong>{" "}
                              <a href="#">download file</a>
                            </p>
                          </div>
                          <div class="col-md-6 text-end">
                            <p class="mb-1">
                              <strong>Date Created :</strong> 2024-11-24
                            </p>
                            <p class="mb-1">
                              <strong>PIC :</strong> NOC
                            </p>
                            <p class="mb-1">
                              <strong>Problem Category :</strong> SNMP Down
                            </p>
                            <button
                              class="btn btn-primary px-4 mt-2"
                              data-bs-toggle="modal"
                              data-bs-target="#updateTicketModal"
                            >
                              REPLY
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Second Ticket --> */}
                      <div class="p-3 mb-3 bg-secondary bg-opacity-10 border rounded shadow-sm">
                        <div class="row">
                          <div class="col-md-6">
                            <p class="mb-1">
                              <a
                                href="#"
                                class="text-decoration-none text-black"
                              >
                                <strong>Ticket Log Number :</strong> XXX
                              </a>
                            </p>
                            <p class="mb-1">
                              <strong>Ticket Code :</strong> XXX
                            </p>
                            <p class="mb-1">
                              <strong>Ticket Status :</strong> Closed
                            </p>
                            <p class="mb-1">
                              <strong>Note :</strong> xxxxx
                            </p>
                            <p class="mb-1">
                              <strong>File :</strong>{" "}
                              <a href="#">download file</a>
                            </p>
                          </div>
                          <div class="col-md-6 text-end">
                            <p class="mb-1">
                              <strong>Date Created :</strong> 2024-11-24
                            </p>
                            <p class="mb-1">
                              <strong>PIC :</strong> NOC
                            </p>
                            <p class="mb-1">
                              <strong>Problem Category :</strong> SNMP Down
                            </p>
                            <button
                              class="btn btn-light text-secondary px-4 mt-2"
                              disabled
                            >
                              REPLIED
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket History */}
                <div
                  class="tab-pane fade"
                  id="ticket-history"
                  role="tabpanel"
                  aria-labelledby="ticket-history-tab"
                >
                  <div class="container-fluid">
                    {/* <!--Information --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table border">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">No. Ticket</th>
                              <th scope="col">Site ID</th>
                              <th scope="col">Site Name</th>
                              <th scope="col">Status</th>
                              <th scope="col">Date Closed</th>
                              <th scope="col">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>001</td>
                              <td>001</td>
                              <td>Dorolamo</td>
                              <td>On Going</td>
                              <td>10/2/2022</td>
                              <td>
                                {" "}
                                <a href="/troubleinfo" class="text-dark">
                                  <i class="bi bi-eye fs-5"></i>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>001</td>
                              <td>001</td>
                              <td>Dorolamo</td>
                              <td>On Going</td>
                              <td>10/2/2022</td>
                              <td>
                                {" "}
                                <a href="/troubleinfo" class="text-dark">
                                  <i class="bi bi-eye fs-5"></i>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>001</td>
                              <td>001</td>
                              <td>Dorolamo</td>
                              <td>On Going</td>
                              <td>10/2/2022</td>
                              <td>
                                {" "}
                                <a href="/troubleinfo" class="text-dark">
                                  <i class="bi bi-eye fs-5"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TroubleTicket;
