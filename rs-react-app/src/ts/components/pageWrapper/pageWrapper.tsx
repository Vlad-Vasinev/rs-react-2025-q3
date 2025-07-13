import React, { Component } from 'react';
import './pageWrapper.sass'

interface PageWrapperProps {
  children?: React.ReactNode
}

class PageWrapper extends Component<PageWrapperProps> {

  render() {
    return (
      <div className='page'>
        <div className='page__container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageWrapper;