import css from './ThemeSwitcher.module.scss';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';

const ThemeSwitcher = () => {
  const [ theme, setTheme ] = useState('theme-light');

  useEffect(() => {
    const actualTheme = localStorage.getItem('theme');

    if (actualTheme) {
      setTheme(actualTheme);
    }
  }, []);

  const updateTheme = () => {
    const newTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className={css.themeSwitcher} onClick={updateTheme}>
      <FontAwesomeIcon icon={theme === 'theme-light' ? faMoon : faSun} />
      <span>{theme === 'theme-light' ? 'Dark mode' : 'Light mode'}</span>
    </div>
  );
};

export default ThemeSwitcher;
