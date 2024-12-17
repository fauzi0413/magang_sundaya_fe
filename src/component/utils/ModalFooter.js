import React from "react";

function ModalFooter({ onSave, textButton }) {
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>
      <button type="button" className="btn btn-primary" onClick={onSave}>
        {textButton}
      </button>
    </>
  );
}

export default ModalFooter;
