import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-spin-loader.module.css';
import PropTypes from 'prop-types';

export default function BurgerSpinLoader({type}) {
    return (
        <div className={styles.loader}><BurgerIcon type={type} /></div>
    )
}

BurgerSpinLoader.propTypes = {
    type: PropTypes.string.isRequired
}