import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './link.module.css';

export default function Link({ iconCb, children, label, to }) {
  const classActive = useMemo(() => styles.linkActive + ' pl-5 pr-5 pt-4 pb-4 active', []);
  const classInActive = useMemo(
    () => styles.linkInActive + ' pl-5 pr-5 pt-4 pb-4 text_color_inactive',
    [],
  );

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? classActive : classInActive)}
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          <span className={styles.linkIcon + ' mr-2'}>
            {isActive ? iconCb('primary') : iconCb('secondary')}
          </span>
          <span className='text text_type_main-default'>{children}</span>
        </>
      )}
    </NavLink>
  );
}

Link.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  to: PropTypes.string,
  iconCb: PropTypes.func,
};
