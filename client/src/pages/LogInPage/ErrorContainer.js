// Necessary Import
import styled from "styled-components";
import React from "react";

// Component and Other Import

const ErrorContainer = ({message}) => {

  return (
    <div className="errorContainer">
      <p>{message}</p>
    </div>
  )
}

export default ErrorContainer