import css from './Group.module.scss';

import { CommandGroup } from '@/lib/commands';
import CommandInfo from '../command-info/CommandInfo';

export interface GroupProps {
  id: string;
  group: CommandGroup;
}

const Group = ({ id, group }: GroupProps) => {
  return (
    <div className={css.group}>
      <div className={css.meta}>
        <div className={css.name} id={`group-${id}`}>{group.meta.name}</div>

        {group.meta.description && <div>{group.meta.description}</div>}
      </div>

      <div className={css.commands}>
        {group.commands.map(command => <CommandInfo command={command} key={command.name} />)}
      </div>
    </div>
  );
};

export default Group;
