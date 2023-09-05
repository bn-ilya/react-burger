import styles from './button-loader.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerSpinLoader from '../ui/loaders/burger-spin-loader';

export default function ButtonLoader({load, children, ...props}) {
    return (
        <Button disabled={load} extraClass={styles.loaderBtn} {...props}>
            {load && <BurgerSpinLoader type='secondary' />}
            {children}
        </Button>
    )
}