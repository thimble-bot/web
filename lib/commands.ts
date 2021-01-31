const COMMANDS_URL = 'https://raw.githubusercontent.com/thimble-bot/thimble-bot/master/assets/commands.json';

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  examples?: string[];
};

export interface CommandGroupMetadata {
  name: string;
  description?: string;
};

export interface CommandGroup {
  meta: CommandGroupMetadata;
  commands: Command[];
};

export interface CommandListServerResponse {
  [group: string]: CommandGroup;
};

export const fetchCommands = (): Promise<CommandListServerResponse> =>
  fetch(COMMANDS_URL).then(res => res.json());
