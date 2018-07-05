import React from "react";

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginBottom: "4.375rem",
          alignItems: "flex-end",
          justifyContent: "flex-end"
        }}
      >
        <img
          src="/static/profile-pic.png"
          alt={`Julian Mayorga`}
          style={{
            marginRight: "0.875rem",
            marginBottom: 0,
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            padding: 0,
            boxShadow: "none"
          }}
        />
        <p style={{ marginBottom: 0 }}>
          Written by{" "}
          <a
            href="https://twitter.com/juli_mayorga"
            style={{
              boxShadow: "none",
              textDecoration: "underline",
              color: "#e535ab"
            }}
          >
            Julian
          </a>
        </p>
      </div>
    );
  }
}

export default Bio;
