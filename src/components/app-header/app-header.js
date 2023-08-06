import styles from './app-header.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";

const Button = (props) => {
    return (
        <a href='' className={styles.button + ' pl-5 pr-5 pt-4 pb-4'} aria-label={props.label}>
            <span className={styles.buttonIcon + ' mr-2'}>{props.icon}</span>
            <span className='text text_type_main-default'>{props.children}</span>
        </a>
    );
}

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