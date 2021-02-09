import { NextApiRequest, NextApiResponse } from 'next';

const userIDs = {
  owner: process.env.MAINTAINER_ID,
  bot: process.env.BOT_ID
};

export default async function getPrivilegedUser(req: NextApiRequest, res: NextApiResponse) {
  const kind = Array.isArray(req.query.kind)
    ? req.query.kind.join('')
    : req.query.kind;

  if (kind !== 'owner' && kind !== 'bot') {
    return res.status(403).json({
      ok: false,
      error: 'The only acceptable routes are "owner" and "bot".'
    });
  }

  if (!process.env.DISCORD_BOT_SECRET) {
    return res.status(403).json({
      ok: false,
      error: 'This route needs a Discord bot token to be set up.'
    });
  }

  const id = userIDs[kind];
  if (!id) {
    return res.status(500).json({
      ok: false,
      error: 'User ID for this user kind has not been set.'
    });
  }

  try {
    const discordResponse = await fetch(`https://discord.com/api/users/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bot ${process.env.DISCORD_BOT_SECRET}`
      }
    });

    const data = await discordResponse.json();

    if (discordResponse.status !== 200) {
      throw new Error(data.error ?? 'Failed to retrieve user data.');
    }

    return res.json({
      ok: true,
      user: data
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err
    });
  }
}
