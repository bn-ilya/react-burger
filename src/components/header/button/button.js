import styles from './button.module.css';
import PropTypes from 'prop-types';

export default function Button(props) {
    return (
        <a href='https://example.com' className={styles.button + ' pl-5 pr-5 pt-4 pb-4'} aria-label={props.label}>
            <span className={styles.buttonIcon + ' mr-2'}>{props.icon}</span>
            <span className='text text_type_main-default'>{props.children}</span>
        </a>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    icon: PropTypes.element 
}
