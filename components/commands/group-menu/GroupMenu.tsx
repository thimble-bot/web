import { CommandListServerResponse } from '@/lib/commands';
import clsx from 'clsx';
import css from './GroupMenu.module.scss';

export interface GroupMenuProps {
  data: CommandListServerResponse;
  activeGroup: string | null;
  setActiveGroup(group: string | null): void;
};

const GroupMenu = ({ data, activeGroup, setActiveGroup }: GroupMenuProps) => {
  return (
    <div className={css.groups}>
      <button
        onClick={() => setActiveGroup(null)}
        className={clsx({ [css.active]: activeGroup === null })}
      >All Commands</button>

      {Object.keys(data).map(groupId => {
        const group = data[groupId];

        return (
          <button
            key={groupId}
            onClick={() => setActiveGroup(groupId)}
            className={clsx({ [css.active]: activeGroup === groupId })}
          >{group.meta.name}</button>
        );
      })}
    </div>
  );
};

export default GroupMenu;
