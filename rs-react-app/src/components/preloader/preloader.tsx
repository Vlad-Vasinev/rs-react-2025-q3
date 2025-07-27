import React from 'react';

import loaderIcon from '../../assets/general/loadingIcon.svg';

interface PreloaderInterface {
  testId: string
}

const Preloader = (props: PreloaderInterface) => {
  return (
    <div className='loadingIcon'>
      <img data-testid={props.testId} src={loaderIcon} alt='loading icon'></img>
    </div>
  );
};

export default Preloader;