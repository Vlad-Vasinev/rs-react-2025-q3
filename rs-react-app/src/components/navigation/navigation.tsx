import React from 'react';

import { Link } from 'react-router';

const Navigation = () => {
  return (
    <div className='navigation'>
      <h2>Navigation</h2>
      <Link to="/">Go to main</Link>
      <Link to="/about">Go to about</Link>
      <Link to="/404">Go to 404</Link>
    </div>
  );
};

export default Navigation;