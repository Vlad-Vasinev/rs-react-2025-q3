import { Component } from 'react';
import './errorBtn.sass'

interface ErrorBtnProps {
  onClick: () => void
}

class ErrorBtn extends Component<ErrorBtnProps> {

  render() {
    return (
      <button className='errorBtn' onClick={this.props.onClick}>Throw an error</button>
    );
  }
}

export default ErrorBtn;