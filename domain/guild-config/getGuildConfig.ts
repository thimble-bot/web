import { NextApiResponse } from 'next';
import { NextApiRequestWithGuild } from '@/middleware/ensureGuildAccess';
import { GuildData, IGuildData } from '@/models/GuildData';

const getGuildConfig = async (req: NextApiRequestWithGuild, res: NextApiResponse) => {
  let config = {};

  const guild = req.guild;
  const id = guild.id;

  const snapshot = await GuildData.findOne({ guild: id });
  if (snapshot) {
    config = snapshot.data();
    delete (config as IGuildData).guild;
  }

  return res.json({ ok: true, config, guild });
};

export default getGuildConfig;
