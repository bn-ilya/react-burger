import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Button from './button/button';

export default function AppHeader() {
    return (
        <header className={styles.header + ' pt-4 pb-4'}>
            <div className={styles.content}>
                <nav className={styles.navigation}>
                    <ul className={styles.navigationList}>
                        <li>
                            <Button icon={<BurgerIcon />} label={'Конструктор'}>
                                Конструктор
                            </Button>
                        </li>
                        <li>
                            <Button icon={<ListIcon />} label={'Лента заказов'}>
                                Лента заказов
                            </Button>
                        </li>
                    </ul>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <Button icon={<ProfileIcon />} label={'Личный кабинет'}>
                        Личный кабинет
                    </Button>
                </div>
            </div>
        </header>
    )
}