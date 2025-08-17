import React from 'react';

interface PageWrapperProps {
  children?: React.ReactNode
}

const PageWrapper = (props: PageWrapperProps) => {
  return (
    <div className='page'>
      <div className='page__container'>
        {props.children}
      </div>
    </div>
  );
};

export default PageWrapper;