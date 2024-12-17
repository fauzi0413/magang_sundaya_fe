import React from "react";

function ModalMaster({ id, title, body, footer }) {
  return (
    <div
      class="modal fade"
      id={`${id}`}
      tabindex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          {/* Modal Header */}
          <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* <!-- Modal Body --> */}
          <div class="modal-body">{body}</div>

          {/* <!-- Modal Footer --> */}
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalMaster;
