"use client"
import React from "react";

interface ErrorBoundaryMsgInterface {
  onReset: () => void
}

const ErrorBoundaryMsg: React.FC<ErrorBoundaryMsgInterface> = ({ onReset }) => {
  return (
    <div data-testid="error-message" className='errorBoundaryMsg'>
      <div className='errorBoundaryMsg__message'>
        <h1>We got an error, something went wrong...</h1>
        <button className='refresh-btn' onClick={ () => {onReset()} }>Go back to main</button>
      </div>
    </div>
  );
};

export default ErrorBoundaryMsg;