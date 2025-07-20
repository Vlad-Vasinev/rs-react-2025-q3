import { Component } from 'react';

interface ErrorBtnProps {
  onClick: () => void
}

class ErrorBtn extends Component<ErrorBtnProps> {

  render() {
    return (
      <button data-testid="error-btn" className='errorBtn' onClick={this.props.onClick}>Throw an error</button>
    );
  }
}

export default ErrorBtn;