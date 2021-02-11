import AuthenticatedPage from '@/components/AuthenticatedPage';
import { DashboardHeaderNavigation } from '@/components/dashboard/dashboard-header/DashboardHeader';
import EXPServerSettingsPageContent from '@/components/dashboard/server-settings/exp/EXPServerSettingsPageContent';

import Meta from '@/components/Meta';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

const EXPServerSettingsPage = () => {
  const [ session, loading ] = useSession();
  const router = useRouter();

  const { id } = router.query;

  const navigation: DashboardHeaderNavigation[] = [
    {
      url: '/[id]/general',
      as: `/${id}/general`,
      label: 'General'
    },
    {
      url: '/[id]/exp',
      as: `/${id}/exp`,
      label: 'Experience'
    }
  ];

  const [ title, setTitle ] = useState('Experience');

  return (
    <AuthenticatedPage
      session={session}
      loading={loading}
      navigation={navigation}
    >
      <Meta
        title={title}
        description={"Create an experience system for your server."}
        url={`/dashboard/${id}/exp`}
      />

      {session && <EXPServerSettingsPageContent id={id as string} setTitle={setTitle} />}
    </AuthenticatedPage>
  );
};

export default EXPServerSettingsPage;
