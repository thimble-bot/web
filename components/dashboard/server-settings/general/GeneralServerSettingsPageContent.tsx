import LoadingContainer from '@/components/loading-container/LoadingContainer';
import { fetchGuildConfig } from '@/lib/discord';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import GeneralServerSettingsForm from './GeneralServerSettingsForm';

export interface GeneralServerSettingsPageContentProps {
  id: string;
  setTitle(title: string): any;
};

const GeneralServerSettingsPageContent = ({ id, setTitle }: GeneralServerSettingsPageContentProps) => {
  const { isLoading, error, data } = useQuery([ 'config', id ], () => fetchGuildConfig(id));
  useEffect(() => {
    if (data) {
      setTitle(`General - ${data.guild.name}`);
    }
  }, [ data ]);

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <h1>{data.guild.name}</h1>
      <h2>General Settings</h2>

      <GeneralServerSettingsForm
        id={id}
        config={data.config}
      />
    </>
  );
};

export default GeneralServerSettingsPageContent;
