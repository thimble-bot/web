import css from './ServerEntry.module.scss';

import { Guild } from '@/lib/discord';
import Link from 'next/link';

const ServerEntry = ({ guild }: { guild: Guild }) => {
  const serverInitials = guild.name
    .split(' ')
    .map(component => component[0])
    .join('')
    .slice(0, 3);

  const guildIcon: string | null = guild.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
    : null;

  return (
    <Link href="/dashboard/:guild/general" as={`/dashboard/${guild.id}/general`}>
      <div className={css.server}>
        <div className={css.icon}>
          {guildIcon && <img src={guildIcon} alt={guild.name} title={guild.name} />}
          {!guildIcon && <span>{serverInitials}</span>}
        </div>

        <div className={css.meta}>
          <strong>{guild.name}</strong>
        </div>
      </div>
    </Link>
  );
};

export default ServerEntry;
