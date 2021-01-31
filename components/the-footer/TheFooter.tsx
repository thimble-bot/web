import css from './TheFooter.module.scss';

import Link from 'next/link';
import clsx from 'clsx';

const TheFooter = () => (
  <footer className={clsx('wrapper', css.footer)}>
    <div className={css.copy}>
      Made with 💖 by <a href="https://sallai.me" target="_blank" rel="noopener noreferrer">@jozsefsallai</a>.
      Bot and website licensed under MIT. Thimble (character and design) is the
      property of József Sallai. You may NOT use the character or its name
      without the owner's written approval. Discord is the property of Discord,
      Inc. <Link href="/privacy"><a>Privacy Policy</a></Link>
    </div>
  </footer>
);

export default TheFooter;
