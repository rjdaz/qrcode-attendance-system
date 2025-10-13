import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Scanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const containerId = "qr-reader";

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(containerId);
    }

    const startScanner = async () => {
      try {
        if (isRunningRef.current) return; // already running
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 400, height: 400 } },
          (decodedText) => {
            onScanSuccess(decodedText);
          }
        );
        isRunningRef.current = true;
      } catch (err) {
        //console.error("Failed to start scanner:", err);
      }
    };

    startScanner();

    return () => {
      const stopScanner = async () => {
        if (scannerRef.current && isRunningRef.current) {
          try {
            await scannerRef.current.stop();
            isRunningRef.current = false;
            scannerRef.current.clear();
          } catch (err) {
            if (
              !err.message.includes("not running") &&
              !err.message.includes("under transition")
            ) {
              console.warn("Error stopping scanner:", err);
            }
          }
        }
      };
      stopScanner();
    };
  }, [onScanSuccess]);

  return (
    <div id="qr-reader" style={{ width: "40%", height: "40%", margin: "auto" }} />
  );
};

export default Scanner;
