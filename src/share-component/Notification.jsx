import React from "react";
import "./Notification.css";

const Notification = () => {
  return (
    <div
      id="toast"
      style={{
        position: "fixed",
        width: "200px",
        right: "-200px",
      }}
    >
      Notification
    </div>
  );
};

export default Notification;
