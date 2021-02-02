const GUILDS_URL = '/api/discord/guilds';

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
