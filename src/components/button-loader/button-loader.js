import styles from './button-loader.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerSpinLoader from '../ui/loaders/burger-spin-loader';
import {PropTypes} from 'prop-types';

export default function ButtonLoader({load, children, disabled = null, ...props}) {
    return (
        <Button disabled={load || disabled} extraClass={styles.loaderBtn} {...props}>
            {load && <BurgerSpinLoader type='secondary' />}
            {children}
        </Button>
    )
}

ButtonLoader.propTypes = {
    load: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.string
    ]),
    disabled: PropTypes.bool
}