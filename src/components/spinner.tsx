import React, { Component } from "react";
import "../stylesheets/spinner.sass";

const Spinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
      <div className="the-spinner" />
    </div>
  );
};

export default Spinner;
