import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import styles from './constructor.module.css';

export default function Constructor() {
    return (
        <div className={styles.content}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'1'} />
            <div className={styles.elements}>
                <ConstructorElement />
                <ConstructorElement />
                <ConstructorElement />
                <ConstructorElement />
            </div>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={'2'} />
        </div>
    )
}