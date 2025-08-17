import errorImg from '../assets/general/404.jpg';
import Image from 'next/image';

const ErrorPage = () => {
  return (
    <div data-testid='404-test' className='error-page'>
      <Image src={errorImg} alt="404 error" width={1200} height={600}></Image>
    </div>
  );
};

export default ErrorPage