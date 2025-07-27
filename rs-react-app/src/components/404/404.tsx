import React from 'react';

import { Link } from 'react-router';
import PageWrapper from '../pageWrapper/pageWrapper';
import errorImg from '../../assets/general/404.jpg';

const ErrorPage = () => {
  return (
    <PageWrapper>
      <div data-testid='404-test' className='error-page'>
        <img src={errorImg} alt="404 error"/>
        <Link to="/">Go back to main page</Link>
      </div>
    </PageWrapper>

  );
};

export default ErrorPage;