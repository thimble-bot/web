import { NextApiResponse } from 'next';
import { NextApiRequestWithGuild } from '@/middleware/ensureGuildAccess';
import { GuildConfig, GuildData } from '@/models/GuildData';
import { validateConfig } from '@/validators';

const updateGuildConfig = async (req: NextApiRequestWithGuild, res: NextApiResponse) => {
  const payload: GuildConfig = req.body;
  const id = req.guild.id;

  validateConfig(payload);

  const data = new GuildData(id);
  await data.update(payload);

  return res.json({ ok: true });
};

export default updateGuildConfig;
