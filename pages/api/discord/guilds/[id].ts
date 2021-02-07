import bar from 'next-bar';

import ensureGuildAccess from '@/middleware/ensureGuildAccess';

import methodNotAllowed from '@/domain/common/methodNotAllowed';
import getGuildConfig from '@/domain/guild-config/getGuildConfig';
import updateGuildConfig from '@/domain/guild-config/updateGuildConfig';

export default bar({
  get: ensureGuildAccess(getGuildConfig),
  post: ensureGuildAccess(updateGuildConfig),

  fallback: methodNotAllowed
});
