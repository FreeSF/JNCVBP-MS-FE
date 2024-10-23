import React, { Component } from "react";
import "../stylesheets/spinner.sass";

/**
 * Spinner component description
 *
 * Simple spinner component that will be displayed until the data is loaded from GraphQL API
 */
const Spinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
      <div className="the-spinner" />
    </div>
  );
};

export default Spinner;
