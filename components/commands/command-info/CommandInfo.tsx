import css from './CommandInfo.module.scss';

import { Command } from '@/lib/commands';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CommandName = ({ commandName }: { commandName: string }) => (
  <div className={css.name} id={commandName}>
    <span>{commandName}</span>
    <a
      className={css.hyperlink}
      href={`#${commandName}`}
      title="Copy to Clipboard"
    >#</a>
  </div>
);

const CommandAliases = ({ aliases }: { aliases: string[] }) => (
  <div className={css.aliases}>
    <strong>Aliases:</strong>
    {aliases.map(alias => <span className={css.alias} key={alias}>{alias}</span>)}
  </div>
);

const CommandDescription = ({ description }: { description: string }) => (
  <ReactMarkdown source={description} />
);

const CommandUsage = ({ examples }: { examples: string[] }) => (
  <div className={css.usage}>
    <strong>Usage/examples:</strong>
    {examples.map((example, idx) => (
      <div className={css.example} key={idx}>
        <FontAwesomeIcon icon={faChevronRight} />
        <ReactMarkdown source={example} className={css.exampleMarkdown} />
      </div>
    ))}
  </div>
);

const CommandInfo = ({ command }: { command: Command }) => (
  <div className={css.command}>
    <CommandName commandName={command.name} />
    {!!(command.aliases?.length) && <CommandAliases aliases={command.aliases} />}
    {command.description && <CommandDescription description={command.description} />}
    {!!(command.examples?.length) && <CommandUsage examples={command.examples} />}
  </div>
);

export default CommandInfo;
