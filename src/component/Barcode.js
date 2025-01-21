import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Barcode = () => {
  return (
    <div className="container">
      <img 
        alt="QR code image" 
        className="qr-code" 
        height="400" 
        src="https://storage.googleapis.com/a1aa/image/XWxmq1xruD6iLVxpPjEBjrljfio2uAiBRxVzaFL6qAyRlgDKA.jpg" 
        width="400" 
      />
      <img 
        alt="Barcode image" 
        className="barcode" 
        height="100" 
        src="https://storage.googleapis.com/a1aa/image/DaPUiy3uHEq0BFTGewu0QZwWsScpS9QSj5ODRjhX4yMSlgDKA.jpg" 
        width="400" 
      />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          border: 1px solid #000;
          padding: 20px;
        }
        .qr-code, .barcode {
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default Barcode;