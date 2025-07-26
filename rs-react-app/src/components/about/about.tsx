import React from 'react';

import { Link } from 'react-router';
import Navigation from '../navigation/navigation';
import PageWrapper from '../pageWrapper/pageWrapper';

const About = () => {
  return (
    <PageWrapper>
      <Navigation></Navigation>
      <div className='about-page'>
        <div className='about-page__block'>
          <h2>Main user information:</h2>
          <p>
            <span>Name: </span>
            <span>Vladislav</span>
          </p>
          <p>
            <span>Age: </span>
            <span>23</span>
          </p>
          <p>
            <span>Occupation: </span>
            <span>Frontend-developer</span>
          </p>
          <p>
            <span>Hobby: </span>
            <span>True crime</span>
          </p>
        </div>
        <div className='about-page__block'>
          <h2>a link to the RS School React course:</h2>
          <p>
            <a href="https://rs.school/courses/reactjs" target='_blank'>https://rs.school/courses/reactjs</a>
          </p>
        </div>
        <div className='about-page__block'>
          <h2>Navigate back to main:</h2>
          <p>
            <span>Link from router:</span>
            <span><Link to="/">Go back to main page</Link></span>
          </p>
        </div>
    </div>
    </PageWrapper>
  );
};

export default About;