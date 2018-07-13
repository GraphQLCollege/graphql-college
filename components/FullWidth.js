import React from "react";

const FullWidth = ({ children }) => (
  <div
    style={{
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw"
    }}
  >
    {children}
  </div>
);

export default FullWidth;
