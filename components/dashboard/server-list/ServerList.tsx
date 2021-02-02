import ZeroDataState from '@/components/zero-data-state/ZeroDataState';
import { Guild } from '@/lib/discord';
import ServerEntry from './ServerEntry';

export interface ServerListProps {
  guilds: Guild[];
};

const ServerList = ({ guilds }: ServerListProps) => {
  if (!guilds || !guilds.length) {
    return <ZeroDataState message="You're not an admin in any server." />;
  }

  return (
    <div>
      {guilds.map(guild => <ServerEntry key={guild.id} guild={guild} />)}
    </div>
  );
};

export default ServerList;
