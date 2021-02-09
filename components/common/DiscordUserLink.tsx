import { PrivilegedUserData } from '@/lib/discord';

const DiscordUserLink = ({ user }: { user: PrivilegedUserData }) => {
  const tag = user.discriminator
    ? `${user.username}#${user.discriminator}`
    : `${user.username}`;

  return <a href={`discord://open/users/${user.id}`}>{tag}</a>;
};

export default DiscordUserLink;
