import AuthenticatedPage from '@/components/AuthenticatedPage';
import { DashboardHeaderNavigation } from '@/components/dashboard/dashboard-header/DashboardHeader';
import GeneralServerSettingsPageContent from '@/components/dashboard/server-settings/general/GeneralServerSettingsPageContent';

import Meta from '@/components/Meta';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GeneralServerSettingsPage = () => {
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

  const [ title, setTitle ] = useState('General');

  return (
    <AuthenticatedPage
      session={session}
      loading={loading}
      navigation={navigation}
    >
      <Meta
        title={title}
        description={"Change the prefix and the DJ role of this server."}
        url={`/dashboard/${id}/general`}
      />

      {session && <GeneralServerSettingsPageContent id={id as string} setTitle={setTitle} />}
    </AuthenticatedPage>
  );
};

export default GeneralServerSettingsPage;
