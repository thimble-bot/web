import firebase from '@/lib/firebase';
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore';

export interface EXPConfig {
  range: [ from: number, to: number ];

  levels: {
    [exp: string]: string;
  };

  ignoreChannels?: string[];
};

export interface GuildConfig {
  prefix?: string;
  djRole?: string;
  exp?: EXPConfig;
};

export interface IGuildData extends GuildConfig {
  guild: string;
};

export interface GuildDataSnapshot extends DocumentSnapshot {
  data(): IGuildData;
};

export interface GuildDataSearchOpts {
  guild: string;
};

export class GuildData {
  private guild: string;
  private config: IGuildData | null = null;

  private static collection = firebase.db.collection('guilds');

  constructor(guild: string, config?: GuildConfig) {
    this.guild = guild;

    if (config) {
      this.config = {
        ...config,
        guild
      };
    }
  }

  create(): Promise<DocumentReference> {
    if (!this.config) {
      throw new Error('Config not initialized.');
    }

    return GuildData.collection.add(this.config);
  }

  static findOne(opts: GuildDataSearchOpts): Promise<GuildDataSnapshot | null> {
    return new Promise((resolve, reject) => {
      return GuildData.collection
        .where('guild', '==', opts.guild)
        .get()
        .then(snapshot => {
          if (snapshot.size === 0) {
            return resolve(null);
          }

          return resolve(snapshot.docs[0] as GuildDataSnapshot);
        })
        .catch(reject);
    });
  }

  async update(config: GuildConfig) {
    this.config = {
      ...config,
      guild: this.guild
    };

    const doc = await GuildData.findOne({ guild: this.guild });
    if (!doc) {
      return this.create();
    }

    return doc.ref.update(this.config);
  }
};
