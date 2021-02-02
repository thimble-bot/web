import { Guild } from '@/lib/discord';
import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';

import { GuildConfig, GuildData, IGuildData } from '@/models/GuildData';
import { validateConfig } from '@/validators';

const getGuildConfig = async (guild: Guild, req: NextApiRequest, res: NextApiResponse) => {
  let config = {};
  const id = guild.id;

  const snapshot = await GuildData.findOne({ guild: id });
  if (snapshot) {
    config = snapshot.data();
    delete (config as IGuildData).guild;
  }

  return res.json({ ok: true, config, guild });
};

const updateGuildConfig = async (guild: Guild, req: NextApiRequest, res: NextApiResponse) => {
  const payload: GuildConfig = req.body;
  const id = guild.id;

  validateConfig(payload);

  const data = new GuildData(id);
  await data.update(payload);

  return res.json({ ok: true });
};

export default async function manageGuild(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      error: 'Only GET and POST requests are allowed to this route.'
    });
  }

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

  const handlers = {
    GET: getGuildConfig,
    POST: updateGuildConfig
  };

  try {
    await handlers[req.method](targetGuild, req, res);
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
