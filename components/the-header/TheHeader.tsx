import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import HamburgerIcon from './HamburgerIcon';

const TheHeader = () => {
  const [ hamburgerOpen, setHamburgerOpen ] = useState(false);
  const toggleHamburger = () => setHamburgerOpen(state => !state);

  return (
    <header>
      <div className="wrapper">
        <div className="logo-container">
          <Link href="/">
            <a>
              <div className="icon" />
              <span>Thimble Bot</span>
            </a>
          </Link>
        </div>

        <nav className={ clsx('main-navigation', { 'hamburger-open': hamburgerOpen }) }>
          <Link href="/"><a>Home</a></Link>
          <Link href="/commands"><a>Commands</a></Link>
          <Link href="/customization"><a>Customization</a></Link>
          <Link href="/help"><a>Help</a></Link>
          <a href="https://github.com/thimble-bot/thimble-bot" target="_blank" rel="noreferrer noopener">GitHub</a>
          <a href="/invite" className="invite-button">Invite</a>
        </nav>

        <button onClick={toggleHamburger} className="hamburger-icon">
          <HamburgerIcon open={hamburgerOpen} />
        </button>
      </div>
    </header>
  );
};

export default TheHeader;
