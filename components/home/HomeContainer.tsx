import css from './HomeContainer.module.scss';

import Button from '../button/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';

const HomeContainer = () => (
  <div className={clsx('content', css.home)}>
    <div className={css.avatar}>
      <img src="/assets/thimble.png" alt="Thimble Bot" title="Thimble Bot" />
    </div>

    <h1>
      <span className={css.blue}>Thimble </span>
      <span className={css.green}>Bot</span>
    </h1>

    <div>
      Thimble Bot is a small, fast, extensible, and open-source general-purpose
      Discord bot. It comes packed with many fun, moderation, and useful
      commands and features.
    </div>

    <div className={css.inviteContainer}>
      <h1>The Thimble Bot project has been discontinued.</h1>
    </div>
  </div>
);

export default HomeContainer;
