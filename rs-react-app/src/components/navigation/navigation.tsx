
import { Link } from 'react-router';

import ThemeChange from '../themeChange/themeChange';

const Navigation = () => {
  return (
    <div data-testid='navigation-test' className='navigation'>
      <h2>Navigation</h2>
      <Link to="/">Go to main</Link>
      <Link to="/about">Go to about</Link>
      <Link to="/404">Go to 404</Link>
      <ThemeChange></ThemeChange>
    </div>
  );
};

export default Navigation;