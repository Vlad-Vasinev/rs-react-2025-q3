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
            <h4>Name: </h4>
            <span>Vladislav</span>
          </p>
          <p>
            <h4>Age: </h4>
            <span>23</span>
          </p>
          <p>
            <h4>Occupation: </h4>
            <span>Frontend-developer</span>
          </p>
          <p>
            <h4>Hobby: </h4>
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
            <h4>Link from router:</h4>
            <span><Link to="/">Go back to main page</Link></span>
          </p>
        </div>
    </div>
    </PageWrapper>
  );
};

export default About;