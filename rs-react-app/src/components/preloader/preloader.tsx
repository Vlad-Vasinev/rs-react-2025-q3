"use client"
import loaderIcon from '../../assets/general/loadingIcon.svg';
import Image from 'next/image';

interface PreloaderInterface {
  testId: string
}

const Preloader = (props: PreloaderInterface) => {
  return (
    <div className='loadingIcon'>
      <Image src={loaderIcon} data-testid={props.testId} alt="preloader" width={1200} height={600}></Image>
    </div>
  );
};

export default Preloader;