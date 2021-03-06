import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ReactNode } from 'react';
import css from './Button.module.scss';

export interface ButtonOpts {
  primary?: boolean;
  blurple?: boolean;
  danger?: boolean;
  small?: boolean;
  href?: string;
  newTab?: boolean;
  nofollow?: boolean;
  icon?: IconProp;
  disabled?: boolean;
  children: ReactNode;
  onClick?(e?: any): void;
};

const Button = ({
  primary,
  blurple,
  danger,
  small,
  href,
  newTab,
  nofollow,
  icon,
  children,
  onClick
}: ButtonOpts) => {
  const classes = clsx(
    css.button,
    {
      [css.primary]: primary,
      [css.blurple]: blurple,
      [css.danger]: danger,
      [css.small]: small
    }
  );

  if (href && href.length) {
    return (
      <a
        className={classes}
        href={href}
        target={newTab ? '_blank' : '_self'}
        rel={nofollow ? 'noreferrer noopener' : undefined}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
