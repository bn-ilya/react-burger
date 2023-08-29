import PropTypes from 'prop-types';
import styles from './container-page.module.css';

export default function ContainerPage({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

ContainerPage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
    ]),
} 