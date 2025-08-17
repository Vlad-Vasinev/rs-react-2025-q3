"use client"
import { useContext } from 'react';

import { ThemeContext } from '../context/themeContext';

const ThemeChange = () => {

  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <button data-testid="theme-change-test" onClick={toggleTheme} className='theme-change'>Change to {theme === 'light' ? 'dark' : 'light'} theme-mode</button>
  );
};

export default ThemeChange;