import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';

export default async function guilds(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).json({
      ok: false,
      error: 'You are not authenticated.'
    });
  }

  const discordResponse = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    }
  });

  if (discordResponse.status !== 200) {
    return res.status(500).json({
      ok: false,
      error: 'Failed to fetch server list from Discord.'
    });
  }

  const servers = (await discordResponse.json())
    .filter(server => (server.permissions & 0x8) === 0x8)
    .reverse();

  return res.json({
    ok: true,
    servers
  });
};
