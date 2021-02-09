import { GuildConfig } from '@/models/GuildData';
import buildUrl from './buildUrl';

const GUILDS_URL = '/api/discord/guilds';
const USER_URL = '/api/discord/user';

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  features: string[];
};

export interface FetchGuildsResponse {
  ok: boolean;
  servers?: Guild[];
  error?: string;
};

export interface PartialGuildConfigResponse {
  guild?: Guild;
  config?: GuildConfig;
};

export interface FetchGuildConfigResponse extends PartialGuildConfigResponse {
  ok: boolean;
  error?: string;
};

export interface PrivilegedUserData {
  id: string;
  username: string;
  avatar?: string;
  discriminator?: string;
};

export interface PrivilegedUserDataResponse {
  ok: boolean;
  user?: PrivilegedUserData;
  error?: string;
};

export const fetchGuilds = (): Promise<Guild[]> => new Promise((resolve, reject) => {
  return fetch(GUILDS_URL)
    .then(res => res.json())
    .then((json: FetchGuildsResponse) => {
      if (!json.ok) {
        if (json.error?.length) {
          return reject(json.error);
        }

        return reject('Internal Server Error');
      }

      return resolve(json.servers);
    })
    .catch(reject);
});

export const fetchGuildConfig = (id: string): Promise<PartialGuildConfigResponse> =>
  new Promise((resolve, reject) => {
    return fetch(`${GUILDS_URL}/${id}`)
      .then(res => res.json())
      .then((json: FetchGuildConfigResponse) => {
        if (!json.ok) {
          if (json.error?.length) {
            return reject(json.error);
          }

          return reject('Internal Server Error');
        }

        return resolve({
          guild: json.guild,
          config: json.config
        });
      })
      .catch(reject);
  });

export const fetchDiscordUser = (kind: 'owner' | 'bot'): Promise<PrivilegedUserData> =>
  new Promise((resolve, reject) => {
    return fetch(buildUrl(`${USER_URL}/${kind}`))
      .then(res => res.json())
      .then((json: PrivilegedUserDataResponse) => {
        if (!json.ok) {
          if (json.error?.length) {
            return reject(json.error);
          }

          return reject('Internal Server Error');
        }

        return resolve(json.user);
      })
      .catch(reject);
  });
