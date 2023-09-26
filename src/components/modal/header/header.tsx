import styles from './header.module.css';

import type IHeaderProps from './header-props';

import type { FC } from 'react';

const Header: FC<IHeaderProps> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export default Header;
