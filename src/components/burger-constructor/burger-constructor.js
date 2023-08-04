import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';

export default function BurgerConstructor() {
    return (
        <section className={styles.content}>
            <Constructor/>
            <Info/>
        </section>
    )
}