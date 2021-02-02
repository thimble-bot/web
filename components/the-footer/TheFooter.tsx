import css from './TheFooter.module.scss';

import Link from 'next/link';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const TheFooter = () => (
  <footer className={clsx('wrapper', css.footer)}>
    <div className={css.copy}>
      Made with 💖 by <a href="https://sallai.me" target="_blank" rel="noopener noreferrer">@jozsefsallai</a>.
      Bot and website licensed under MIT. Thimble (character and design) is the
      property of József Sallai. You may NOT use the character or its name
      without the owner's written approval. Discord is the property of Discord,
      Inc.
    </div>

    <div className={css.links}>
      <Link href="/privacy"><a>Privacy Policy</a></Link>
      <a href="https://github.com/thimble-bot" target="_blank" rel="noreferrer noopener">
        <FontAwesomeIcon icon={faGithub} /> GitHub
      </a>
    </div>
  </footer>
);

export default TheFooter;
