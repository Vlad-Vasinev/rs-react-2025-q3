import React from 'react';

const ErrorBoundaryMsg = () => {
  return (
    <div data-testid="error-message" className='errorBoundaryMsg'>
      <div className='errorBoundaryMsg__message'>
        <h1>We got an error, something went wrong...</h1>
      </div>
    </div>
  );
};

export default ErrorBoundaryMsg;