import styles from './header.module.css';

import { modalHeaderType } from '../../../utils/types';

export default function Header({ children }) {
  return <div className={styles.content}>{children}</div>;
}

Header.propTypes = {
  children: modalHeaderType,
};
