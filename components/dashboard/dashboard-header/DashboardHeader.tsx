import css from './DashboardHeader.module.scss';

import { signOut } from 'next-auth/client';
import { SessionBase } from 'next-auth/_utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export interface DashboardHeaderNavigation {
  url: string;
  as?: string;
  label: string;
};

export interface DashboardHeaderProps {
  session: SessionBase;
  items: DashboardHeaderNavigation[];
};

const getRealAvatar = (url: string): string => {
  return url.includes('embed/avatars')
    ? url
    : url.split('.').slice(0, -1).join('.');
};

const DashboardHeader = ({ session, items }: DashboardHeaderProps) => {
  const navigation: DashboardHeaderNavigation[] = [
    {
      url: '/',
      label: 'Servers'
    },

    ...items
  ];

  const router = useRouter();
  const isActive = (url: string): boolean => {
    return url === '/'
      ? router.pathname === '/dashboard'
      : router.pathname.startsWith(`/dashboard${url}`);
  };

  return (
    <header className={css.header}>
      <div className={css.left}>
        <nav>
          {navigation.map((item, idx) => (
            <Link
              key={idx}
              href={`/dashboard${item.url}`}
              as={`/dashboard${item.as || item.url}`}
            >
              <a className={clsx({ [css.active]: isActive(item.url) })}>{item.label}</a>
            </Link>
          ))}
        </nav>
      </div>

      <div className={css.right}>
        <div className={css.icon}>
          <img
            src={getRealAvatar(session.user.image)}
            alt={session.user.name}
            title={session.user.name}
          />
        </div>

        <div className={css.name}>
          <strong>{session.user.name}</strong> &middot; <span onClick={() => signOut()}>Log Out</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
