import GroupMenu from '../group-menu/GroupMenu';
import Group from '../group/Group';

import { CommandListServerResponse } from '@/lib/commands';

import { useEffect, useState } from 'react';

const CommandData = ({ data }: { data: CommandListServerResponse }) => {
  const [ activeGroup, setActiveGroup ] = useState<null | string>(null);
  const [ groups, setGroups ] = useState(Object.keys(data));

  useEffect(() => {
    if (!activeGroup) {
      setGroups(Object.keys(data));
      return;
    }

    setGroups([ activeGroup ]);
  }, [ activeGroup ]);

  return (
    <>
      <GroupMenu
        data={data}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
      />

      {groups.map(id => (
        <Group
          id={id}
          key={id}
          group={data[id]}
        />
      ))}
    </>
  );
};

export default CommandData;
