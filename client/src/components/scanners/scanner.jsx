import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const config = { fps: 10, qrbox: { width: 300, height: 300 } };

    scanner
      .start({ facingMode: "environment" }, config, (decodedText) => {
        onScanSuccess(decodedText);
        // scanner.stop(); // stop after scan to save memory
      })
      .catch((err) => console.error("Scanner failed to start", err));

    return () => {
      scanner.stop().catch(() => {});
    };
  }, [onScanSuccess]);

  return <div id="reader" style={{ width: "400px", margin: "auto" }}></div>;
};

export default QRScanner;
