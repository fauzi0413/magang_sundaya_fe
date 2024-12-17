import React, { useEffect, useState } from "react";
import EChartsExample from "./EChartsExample ";
import { useLocation } from "react-router-dom";
import ModalMaster from "./utils/ModalMaster";
import ModalBodycrtick from "./utils/ModalBodycrtick";
import ModalFooter from "./utils/ModalFooter";

function SiteDetail() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    siteName: "",
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
        const response = await fetch(`/mock/site${site_id}.json`);
        console.log(response);
        const jsonData = await response.json();
        setData(jsonData);
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
            id={"exampleModal"}
            title={"Create Trouble Ticket"}
            body={
              <ModalBodycrtick
                formData={formData}
                handleChange={handleChange}
              />
            }
            footer={
              <ModalFooter textButton={"Create Button"} onSave={handleSave} />
            }
          ></ModalMaster>

          <div className="col-12 p-3 bg-light">
            <div className="d-flex justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              {/* <!-- Header --> */}
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>
                  {data.id} - {data.sitename}{" "}
                </h1>
              </div>
              <button
                class="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 p-3 bg-light">
            <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm">
              {/* <!-- Tabs --> */}
              <ul class="nav  nav-tabs fs-4" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="overview-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#overview"
                    type="button"
                    role="tab"
                    aria-controls="overview"
                    aria-selected="true"
                  >
                    Overview
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="site-info-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#site-info"
                    type="button"
                    role="tab"
                    aria-controls="site-info"
                    aria-selected="false"
                  >
                    Site Information
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="graphic-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#graphic"
                    type="button"
                    role="tab"
                    aria-controls="graphic"
                    aria-selected="false"
                  >
                    Graphic
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="status-history-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#status-history"
                    type="button"
                    role="tab"
                    aria-controls="status-history"
                    aria-selected="false"
                  >
                    Status History
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="issue-tracking-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#issue-tracking"
                    type="button"
                    role="tab"
                    aria-controls="issue-tracking"
                    aria-selected="false"
                  >
                    Issue Tracking
                  </button>
                </li>
              </ul>

              {/* <!-- Tab Content --> */}

              <div class="tab-content mt-4" id="myTabContent">
                {/* Overview */}
                <div
                  class="tab-pane fade show active"
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <div class="container-fluid">
                    {/* <!-- Site Details --> */}
                    <div class="d-flex justify-content-between align-items-center bg-dark text-white p-3  rounded">
                      <div>
                        <h4 class="mb-0">Nama Site : JEMBATAN BASAH</h4>
                        <p class="mb-0">IP Address : 10.53.13.67</p>
                      </div>
                      <button class="btn btn-primary">Remote Site</button>
                    </div>

                    {/* <!-- Device Information --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 rounded">
                        <h5>Device Information</h5>
                      </div>
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Date </th>
                              <td>: 4/12/2024</td>
                            </tr>
                            <tr>
                              <th>Panel2 Type </th>
                              <td>: new</td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Site Type :</th>
                              <td>: tvd_bakti</td>
                            </tr>
                            <tr>
                              <th>MPPT Type </th>
                              <td>: mppt-srne</td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Mppt Source</th>
                              <td>: Serial</td>
                            </tr>
                            <tr>
                              <th>Disk used</th>
                              <td>: 7.4 GB</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* <!-- Battery Information --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 shadow-sm rounded">
                        <h5>Battery Information</h5>
                      </div>
                      <div class="p-3">
                        <p>Battery level: 90% - Status: Healthy</p>
                      </div>
                    </div>

                    {/* <!-- MPPT Information --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 shadow-sm rounded">
                        <h5>MPPT Information</h5>
                      </div>
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>PV1 Voltage </th>
                              <td>: 70.4 V</td>
                            </tr>
                            <tr>
                              <th>PV1 Current </th>
                              <td>: 0.36 A</td>
                            </tr>
                            <tr>
                              <th>Load1 Voltage </th>
                              <td>: 57.4 V</td>
                            </tr>
                            <tr>
                              <th>Load1 Current </th>
                              <td>: 1.73 A</td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>PV2 Voltage </th>
                              <td>: 70.4 V</td>
                            </tr>
                            <tr>
                              <th>PV2 Current </th>
                              <td>: 0.36 A</td>
                            </tr>
                            <tr>
                              <th>Load2 Voltage </th>
                              <td>: 57.4 V</td>
                            </tr>
                            <tr>
                              <th>Load2 Current </th>
                              <td>: 1.73 A</td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>PV3 Voltage </th>
                              <td>: 70.4 V</td>
                            </tr>
                            <tr>
                              <th>PV3 Current </th>
                              <td>: 0.36 A</td>
                            </tr>
                            <tr>
                              <th>Load3 Voltage </th>
                              <td>: 57.4 V</td>
                            </tr>
                            <tr>
                              <th>Load3 Current </th>
                              <td>: 1.73 A</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* <!-- MPPT Alarm Status --> */}
                    <div class="mt-4">
                      <div className="justify-content-between bg-primary text-white p-2 rounded">
                        <h5>MPPT Alarm Status</h5>
                      </div>
                      <div class="d-flex justify-content-between p-3 rounded shadow-sm">
                        <p>
                          <strong>MPPT 1 Load</strong>: is running
                        </p>
                        <p>
                          <strong>MPPT 2 Load</strong>: is running
                        </p>
                        <p>
                          <strong>MPPT 3 Load</strong>: is running
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Site Info */}
                <div
                  class="tab-pane fade"
                  id="site-info"
                  role="tabpanel"
                  aria-labelledby="site-info-tab"
                >
                  <div class="container-fluid">
                    {/* <!-- Site Details --> */}
                    <div class="d-flex justify-content-between align-items-center bg-dark text-white p-3  rounded">
                      <div>
                        <h4 class="mb-0">Nama Site : JEMBATAN BASAH</h4>
                        <p class="mb-0">IP Address : 10.53.13.67</p>
                      </div>
                    </div>

                    {/* <!--Information --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 rounded">
                        <h5>Detail Information</h5>
                      </div>
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Site ID </th>
                              <td>: JB001</td>
                            </tr>
                            <tr>
                              <th>OBJID </th>
                              <td>: 1149(GS)11435(TOPO)</td>
                            </tr>
                            <tr>
                              <th>Nama Site </th>
                              <td>: Jembatan Basah</td>
                            </tr>
                            <tr>
                              <th>Status </th>
                              <td>: Up</td>
                            </tr>
                            <tr>
                              <th>Total Bandwidth </th>
                              <td>: 8000</td>
                            </tr>
                            <tr>
                              <th>Longtitude </th>
                              <td>: 134.2434234</td>
                            </tr>
                            <tr>
                              <th>Latitude </th>
                              <td>: -1.675675</td>
                            </tr>
                            <tr>
                              <th>Provinsi </th>
                              <td>: Papua</td>
                            </tr>
                            <tr>
                              <th>Kabupaten </th>
                              <td>: Manokwari</td>
                            </tr>
                            <tr>
                              <th>Kecamatan </th>
                              <td>: Momiwaren</td>
                            </tr>
                            <tr>
                              <th>Opsel </th>
                              <td>: Telkomsel</td>
                            </tr>
                            <tr>
                              <th>Vendor Opsel </th>
                              <td>: ZTE</td>
                            </tr>
                            <tr>
                              <th>Spotbeam </th>
                              <td>: TELITI_1</td>
                            </tr>
                            <tr>
                              <th>LC </th>
                              <td>: Telkom</td>
                            </tr>
                            <tr>
                              <th>Site reloc sebelumnya </th>
                              <td>: </td>
                            </tr>
                            <tr>
                              <th>Tahun Pembangunan </th>
                              <td>: 2019</td>
                            </tr>
                            <tr>
                              <th>Tanggal OA </th>
                              <td>: 28 November 2019</td>
                            </tr>
                            <tr>
                              <th>Subnet </th>
                              <td>: 112.12.12.12</td>
                            </tr>
                          </tbody>
                        </table>
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Penyedia TOPO </th>
                              <td>: PT.Aprilia Profesional Teknologi</td>
                            </tr>
                            <tr>
                              <th>Sensor TOPO </th>
                              <td>: LVD 1 VSAT</td>
                            </tr>
                            <tr>
                              <th>Tanggal integrasi Real TOPO </th>
                              <td>: 7 Desember 2019</td>
                            </tr>
                            <tr>
                              <th>TOPO Reason Off </th>
                              <td>: </td>
                            </tr>
                            <tr>
                              <th>TOPO Off Date </th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>Penyedia Vsat </th>
                              <td>: PT. AJN Solusindo (2020-01-06-now)</td>
                            </tr>
                            <tr>
                              <th>Sensor VSAT </th>
                              <td>: ICMP response time</td>
                            </tr>
                            <tr>
                              <th>Tanggal integrasi Real GS</th>
                              <td>: 24 December 2019</td>
                            </tr>
                            <tr>
                              <th>Vsat Reason Off </th>
                              <td>: </td>
                            </tr>
                            <tr>
                              <th>Vsat Off Date </th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>Transmission Type </th>
                              <td>: VSAT</td>
                            </tr>
                            <tr>
                              <th>Battery Type </th>
                              <td>: SUNDAYA - JS Pro Epack10-48V</td>
                            </tr>
                            <tr>
                              <th>Owner Tower </th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>Site Penyiaran</th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>-</th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>- </th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>Operator Seluler </th>
                              <td>: -</td>
                            </tr>
                            <tr>
                              <th>Kontak Seluler </th>
                              <td>: 085231546644</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Cabinet List</th>
                              <td>: 23142421</td>
                            </tr>
                            <tr>
                              <th>Battery List</th>
                              <td>
                                : AO453636, AO3425235, AO23424, AO235252,
                                AO2352352, AO2523523, AO453636, AO3425235,
                                AO23424, AO235252
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="graphic"
                  role="tabpanel"
                  aria-labelledby="graphic-tab"
                >
                  <div class="container-fluid">
                    {/* <!--graphic --> */}
                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 rounded">
                        <h5>Graphic</h5>
                      </div>
                      <div class="table-responsive d-flex p-3 ">
                        <table class="table">
                          <tbody>
                            <tr>
                              <th>Option </th>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select menu
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>Option </th>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select menu
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>Option </th>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select menu
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>Option </th>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>
                                    Open this select menu
                                  </option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="button" class="btn btn-primary">
                          Show Chart
                        </button>
                      </div>
                      <div className="justify-content-between p-4 align-items-center bg-white border border-secondary shadow-sm mt-2">
                        <EChartsExample />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="status-history"
                  role="tabpanel"
                  aria-labelledby="status-history-tab"
                >
                  <div class="container-fluid">
                    {/* <!-- status history --> */}

                    <div class="mt-4 rounded shadow-sm">
                      <div className="justify-content-between bg-primary text-white p-2 rounded">
                        <h5>Status History</h5>
                      </div>
                      <div class="container mt-4">
                        {/* <label for="dateInput" class="form-label">
                          Select Date:
                        </label> */}
                        <div className="justify-content-between d-flex">
                          <input
                            type="date"
                            class="form-control"
                            id="dateInput"
                            name="dateInput"
                            aria-describedby="dateHelp"
                          />
                          <h5>To</h5>
                          <input
                            type="date"
                            class="form-control"
                            id="dateInput"
                            name="dateInput"
                            aria-describedby="dateHelp"
                          />
                          <button class="btn btn-danger">Reset</button>
                          <button class="btn btn-success">Filter</button>
                        </div>
                        <div id="dateHelp" class="form-text">
                          Please select a date.
                        </div>
                      </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="issue-tracking"
                  role="tabpanel"
                  aria-labelledby="issue-tracking-tab"
                >
                  <div class="container p-4">
                    {/* <!-- Timeline --> */}
                    <div class="row">
                      <div class="col-md-4">
                        <ul class="timeline list-unstyled position-relative">
                          <li class="timeline-item mb-4">
                            <div class="d-flex align-items-center">
                              <span class="dot bg-primary"></span>
                              <h6 class="mb-0 ms-3">ECC</h6>
                            </div>
                            <p class="ms-5 text-muted mt-1">Details ..... </p>
                          </li>
                          <li class="timeline-item mb-4">
                            <div class="d-flex align-items-center">
                              <span class="dot bg-primary"></span>
                              <h6 class="mb-0 ms-3">Management</h6>
                            </div>
                            <p class="ms-5 text-muted mt-1">Details ..... </p>
                          </li>
                          <li class="timeline-item mb-4">
                            <div class="d-flex align-items-center">
                              <span class="dot bg-primary"></span>
                              <h6 class="mb-0 ms-3">PM</h6>
                            </div>
                            <p class="ms-5 text-muted mt-1">Details ..... </p>
                          </li>
                          <li class="timeline-item">
                            <div class="d-flex align-items-center">
                              <span class="dot bg-success"></span>
                              <h6 class="mb-0 ms-3 text-muted">
                                Problem solved
                              </h6>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div class="col-md-8">
                        {/* <!-- Details Section --> */}
                        <div class="bg-light border rounded p-4">
                          <div class="container">
                            {/* <!-- Ticket Card --> */}
                            <div class="card shadow-sm">
                              <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                                  <h5 class="mb-0">No. Ticket: 1233333</h5>
                                  <a
                                    href={`/troubleticket?id=${data.id}`}
                                    class="btn btn-sm btn-outline-secondary"
                                  >
                                    Details
                                  </a>
                                </div>
                                <p class="mb-1">
                                  <strong>Status:</strong> TO DO CLOSED
                                </p>
                                <p class="mb-1">
                                  <strong>PIC:</strong> BAKTI
                                </p>
                                <p class="mb-1">
                                  <strong>Problem Category:</strong> POWER
                                </p>
                                <p class="mb-1">
                                  <strong>Problem:</strong> Faulty
                                </p>
                                <p class="mb-0">
                                  <strong>Date Down:</strong> 15 July 2023 09:30
                                </p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteDetail;
