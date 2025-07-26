import React from 'react';

import loaderIcon from '../../assets/general/loadingIcon.svg';

const Preloader = () => {
  return (
    <div className='loadingIcon'>
      <img data-testid="loader-icon" src={loaderIcon} alt='loading icon'></img>
    </div>
  );
};

export default Preloader;