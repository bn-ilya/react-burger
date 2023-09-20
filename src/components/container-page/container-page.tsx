import { FC } from 'react';

import styles from './container-page.module.css';

import type ContainerPageType from './container-page-type';

const ContainerPage: FC<ContainerPageType> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContainerPage;
