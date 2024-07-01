import React from "react";

// size value can ve sm : small _ md : medium _ lg : large _ xl : extra large

const Loading = ({ size = "lg" }) => {
  return (
    <div className={`spinner-border spinner-border-${size}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
