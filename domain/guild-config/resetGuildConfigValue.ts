import { NextApiResponse } from 'next';
import { NextApiRequestWithGuild } from '@/middleware/ensureGuildAccess';
import { GuildData, IGuildData } from '@/models/GuildData';

import firebase from 'firebase-admin';

const resetGuildConfigValue = async (req: NextApiRequestWithGuild, res: NextApiResponse) => {
  if (!req.query.key) {
    return res.status(400).json({
      ok: false,
      error: 'You have not provided the setting that needs to be reset.'
    });
  }

  let config = {};

  const allowedAttributes = [ 'prefix', 'djRole', 'exp' ];
  const key = typeof req.query.key === 'string'
    ? req.query.key
    : req.query.key.join('');

  if (!allowedAttributes.includes(key)) {
    return res.status(400).json({
      ok: false,
      error: `Invalid config key: ${key}.`
    });
  }

  const guild = req.guild;
  const id = guild.id;

  const snapshot = await GuildData.findOne({ guild: id });
  if (snapshot) {
    config = snapshot.data();
    delete (config as IGuildData).guild;
    delete config[key];

    try {
      await snapshot.ref.update({
        [key]: firebase.firestore.FieldValue.delete()
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        ok: false,
        error: 'Unexpected error.'
      });
    }
  }

  return res.json({ ok: true, config, guild });
};

export default resetGuildConfigValue;
