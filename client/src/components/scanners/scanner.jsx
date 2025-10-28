import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Scanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);
  const lastScanTimeRef = useRef(0); // 🕒 Tracks last scan time
  const scanCooldown = 3000; // 3 seconds delay between scans
  const callbackRef = useRef(onScanSuccess);

  // Keep latest callback without restarting the scanner
  useEffect(() => { 
    callbackRef.current = onScanSuccess;
  }, [onScanSuccess]);

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
          { fps: 10, qrbox: { width: 300, height: 300 } },
          (decodedText) => {
             const now = Date.now();

             // Prevent multiple scans too quickly (spam)
             if (now - lastScanTimeRef.current < scanCooldown) return;

             lastScanTimeRef.current = now;
             // Use latest handler
             callbackRef.current?.(decodedText);
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
      //stopScanner();
    };
  }, []);

  return (
    <div id="qr-reader" style={{
      width: 300, height: 300, margin: "auto", display: "flex"
     }} />
  );
};

export default Scanner;
