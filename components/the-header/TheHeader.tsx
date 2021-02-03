import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HamburgerIcon from './HamburgerIcon';

import { useRouter } from 'next/router';

const TheHeader = () => {
  const [ hamburgerOpen, setHamburgerOpen ] = useState(false);
  const toggleHamburger = () => setHamburgerOpen(state => !state);

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/commands', label: 'Commands' },
    { href: '/customization', label: 'Customization' },
    { href: '/help', label: 'Help' },
    { href: '/dashboard', label: 'Dashboard' }
  ];

  const router = useRouter();

  const isActive = (url: string): boolean => {
    return url === '/'
      ? router.pathname === url
      : router.pathname.startsWith(url);
  };

  useEffect(() => {
    setHamburgerOpen(false);
  }, [ router.pathname ]);

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
          {routes.map(route => (
            <Link key={route.href} href={route.href}>
              <a className={clsx({ active: isActive(route.href) })}>{route.label}</a>
            </Link>
          ))}

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
