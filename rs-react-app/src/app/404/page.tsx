import Link from 'next/link';
import errorImg from '../../assets/general/404.jpg';

const ErrorPage = () => {
  return (
    <div data-testid='404-test' className='error-page'>
      <img src={errorImg} alt="404 error"/>
      <Link href="/">Go back to main page</Link>
    </div>
  );
};

export default ErrorPage