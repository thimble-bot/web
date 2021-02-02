import AuthenticatedPage from '@/components/AuthenticatedPage';
import ServerListPageContent from '@/components/dashboard/server-list/ServerListPageContent';
import Meta from '@/components/Meta';
import { useSession } from 'next-auth/client';

const DashboardPage = () => {
  const [ session, loading ] = useSession();

  return (
    <AuthenticatedPage session={session} loading={loading}>
      <Meta
        title="Dashboard"
        description="Configure Thimble Bot for your servers."
        url="/dashboard"
      />

      {session && <ServerListPageContent />}
    </AuthenticatedPage>
  );
};

export default DashboardPage;
