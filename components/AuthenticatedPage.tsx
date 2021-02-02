import Button from '@/components/button/Button';

import Link from 'next/link';
import { ReactNode } from 'react';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { SessionBase } from 'next-auth/_utils';
import LoadingContainer from './loading-container/LoadingContainer';
import DashboardHeader, { DashboardHeaderNavigation } from './dashboard/dashboard-header/DashboardHeader';
import Meta from './Meta';

import { signIn } from 'next-auth/client';

export interface AuthenticatedPageProps {
  children: ReactNode;
  session: SessionBase;
  loading: boolean;
  navigation?: DashboardHeaderNavigation[];
}

const AuthenticatedPage = ({ children, loading, session, navigation }: AuthenticatedPageProps) => {
  if (loading) {
    return <LoadingContainer />;
  }

  if (!session) {
    return (
      <>
        <Meta
          title="Authentication Required"
          description="You need to log in using Discord to access this page."
          url="/dashboard"
        />

        <h1>Authentication Required</h1>
        <p>
          In order to access this page, you must log in using Discord. By
          logging in, you agree to our <Link href="/privacy">privacy
          policy</Link>.
        </p>
        <p>
          <Button
            onClick={() => signIn('discord')}
            icon={faDiscord}
            blurple
          >Log in via Discord</Button>
        </p>
      </>
    );
  }

  return (
    <>
      <DashboardHeader session={session} items={navigation ?? []} />
      {children}
    </>
  );
};

export default AuthenticatedPage;
