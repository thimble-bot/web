import LoadingContainer from '@/components/loading-container/LoadingContainer';
import { fetchGuilds } from '@/lib/discord';
import { useQuery } from 'react-query';
import ServerList from './ServerList';

const ServerListPageContent = () => {
  const { isLoading, error, data } = useQuery('guilds', fetchGuilds);

  if (isLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <h1>Your Servers</h1>
      <ServerList guilds={data} />
    </>
  );
};

export default ServerListPageContent;
