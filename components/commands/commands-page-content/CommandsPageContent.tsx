import LoadingContainer from '@/components/loading-container/LoadingContainer';
import CommandData from '../command-data/CommandData';

import { CommandListServerResponse, fetchCommands } from '@/lib/commands';
import React from 'react';

import { useQuery } from 'react-query';

const CommandsPageContent = ({ serverData }: { serverData: CommandListServerResponse }) => {
  const { isLoading, error, data } = useQuery('commands', fetchCommands, {
    initialData: serverData
  });

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <CommandData data={data} />;
};

export default CommandsPageContent;
