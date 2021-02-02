import css from './ZeroDataState.module.scss';

import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ZeroDataState = ({ message }: { message?: string }) => (
  <div className={css.zds}>
    <div className={css.icon}>
      <FontAwesomeIcon icon={faFrown} />
    </div>

    <div>{message || 'Cannot display any data.'}</div>
  </div>
);

export default ZeroDataState;
