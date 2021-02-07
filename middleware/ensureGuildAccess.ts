import { Guild } from '@/lib/discord';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';

export type NextApiRequestWithGuild = NextApiRequest & { guild: Guild };

const ensureGuildAccess = (callback: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(403).json({
        ok: false,
        error: 'You are not authenticated.'
      });
    }

    const id = Array.isArray(req.query.id)
      ? req.query.id.join('')
      : req.query.id;

    const userGuildsReq = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });

    if (userGuildsReq.status !== 200) {
      return res.status(500).json({
        ok: false,
        error: 'Failed to check member status in the provided guild.'
      });
    }

    const userGuilds: Guild[] = await userGuildsReq.json();
    const targetGuild = userGuilds.find(guild => guild.id === id);

    if (!targetGuild) {
      return res.status(401).json({
        ok: false,
        error: 'You are not a member of the provided server or the server does not exist.'
      });
    }

    if ((targetGuild.permissions & 0x8) !== 0x8) {
      return res.status(401).json({
        ok: false,
        error: 'You are not authorized to configure Thimble Bot on this server.'
      });
    }

    (req as NextApiRequestWithGuild).guild = targetGuild;

    try {
      await callback(req, res);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({
          ok: false,
          error: err.message
        });
      }

      console.error(err);

      return res.status(500).json({
        ok: false,
        error: err.message ?? 'Unexpected error.'
      });
    }
  };
};

export default ensureGuildAccess;
