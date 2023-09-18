import styles from './header.module.css';
import type HeaderProps from './header-props';
import type { FC } from 'react';

const Header: FC<HeaderProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
}

export default Header;