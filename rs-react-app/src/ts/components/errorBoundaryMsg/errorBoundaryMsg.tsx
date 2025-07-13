import { Component } from 'react';
import './ErrorBoundaryMsg.sass'

class ErrorBoundaryMsg extends Component {

  render() {
    return (
      <div className='errorBoundaryMsg'>
        <div className='errorBoundaryMsg__message'>
          <h1>We got an error, something went wrong...</h1>
        </div>
      </div>
    );
  }
}

export default ErrorBoundaryMsg;