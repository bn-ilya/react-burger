import styles from './burger-constructor.module.css';
import Constructor from './constructor/constructor';
import Info from './info/info';

export default function BurgerConstructor({ingredientsData}) {
    return (
        <section className={styles.content}>
            <div className={styles.main}>
                <Constructor ingredientsData={ingredientsData} />
            </div>
            <div className={styles.footer}>
                <Info />
            </div>
        </section>
    )
}