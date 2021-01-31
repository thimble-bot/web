import Meta from '@/components/Meta';

import { CommandListServerResponse } from '@/lib/commands';
import CommandsPageContent from '@/components/commands/commands-page-content/CommandsPageContent';

const CommandsPage = ({ serverData }: { serverData: CommandListServerResponse }) => {
  return (
    <>
      <Meta
        title="Commands"
        description="View the list of Thimble Bot's commands."
        url="/commands"
      />

      <h1>Commands</h1>
      <CommandsPageContent serverData={serverData} />
    </>
  );
};

export default CommandsPage;
