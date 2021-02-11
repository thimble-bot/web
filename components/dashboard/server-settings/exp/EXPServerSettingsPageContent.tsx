import Button from '@/components/button/Button';
import LoadingContainer from '@/components/loading-container/LoadingContainer';
import { fetchGuildConfig } from '@/lib/discord';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import EXPServerSettingsForm from './EXPServerSettingsForm';

export interface EXPServerSettingsPageContentProps {
  id: string;
  setTitle(title: string): any;
};

const EXPServerSettingsPageContent = ({ id, setTitle }: EXPServerSettingsPageContentProps) => {
  const { isLoading, error, data } = useQuery([ 'config', id ], () => fetchGuildConfig(id));
  useEffect(() => {
    if (data) {
      setTitle(`Experience - ${data.guild.name}`);
    }
  }, [ data ]);

  const [ displayEditor, setDisplayEditor ] = useState(false);

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <h1>{data.guild.name}</h1>
      <h2>Experience Settings</h2>

      {(!data.config.exp && !displayEditor) && (
        <>
          <p>
            The experience system has not been enabled for this server yet. Would
            you like to enable and configure it now?
          </p>
          <Button onClick={() => setDisplayEditor(true)} primary>
            Enable EXP System
          </Button>
        </>
      )}

      {(displayEditor || !!data.config.exp) && (
        <EXPServerSettingsForm
          id={id}
          config={data.config}
          setDisplayEditor={setDisplayEditor}
        />
      )}
    </>
  );
};

export default EXPServerSettingsPageContent;
