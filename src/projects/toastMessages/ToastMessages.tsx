import React, { useState } from "react";

type ToastType = "alert" | "success" | "error";
type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Toast {
  show: boolean;
  type: ToastType;
  message: string;
  position: ToastPosition;
}

export default function ToastMessages() {
  const [toast, setToast] = useState<Toast>({
    show: false,
    type: "alert",
    message: "",
    position: "bottom-right",
  });

  const showToast = (type: ToastType, message: string) => {
    setToast({ show: true, type, message, position: toast.position });
    setTimeout(() => {
      setToast({
        show: false,
        type: "alert",
        message: "",
        position: toast.position,
      });
    }, 3000);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToast({ ...toast, position: e.target.value as ToastPosition });
  };

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  const toastStyles = {
    visibility: toast.show ? "visible" : "hidden",
    minWidth: "12px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    borderRadius: "1px",
    padding: "16px",
    position: "fixed",
    zIndex: 1,
    fontSize: "17px",
    transition: "visibility 0s, opacity 0.5s ease-in-out",
    opacity: toast.show ? 1 : 0,
  };

  const positions = {
    "top-left": { top: "30px", left: "30px" },
    "top-right": { top: "30px", right: "30px" },
    "bottom-left": { bottom: "30px", left: "30px" },
    "bottom-right": { bottom: "30px", right: "30px" },
  };

  const colors = {
    alert: "#f44336",
    success: "#4CAF50",
    error: "#ff5722",
  };

  return (
    <div className="App">
      <div
        style={{ textAlign: "center", fontSize: "30px", color: "greenyellow" }}
      >
        this it the toast messages
      </div>
      <div className="controls">
        <select onChange={handlePositionChange} value={toast.position}>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
        <button
          onClick={() => showToast("alert", "  ⚠️This is an alert message!")}
        >
          Alert
        </button>
        <button
          onClick={() => showToast("success", "🎉This is a success message!")}
        >
          Success
        </button>
        <button
          onClick={() => showToast("error", "❗This is an error message!")}
        >
          Error
        </button>
      </div>
      {toast.show && (
        <div
          style={{
            ...toastStyles,
            ...positions[toast.position],
            backgroundColor: colors[toast.type],
          }}
        >
          {toast.message}
          <button
            onClick={closeToast}
            style={{
              marginLeft: "10px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            X
          </button>
        </div>
      )}

      <style>{`
        body {
          font-family: Arial, sans-serif;
        }

        .ToastMessages {
          text-align: center;
          margin-top: 5px;
        }

        .controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        select {
          margin-bottom: 10px;
          padding: 10px;
          font-size: 19px;
          border-radius: 2px;
        }

        button {
          margin: 5px;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 19px;
          border-radius: 2px;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
