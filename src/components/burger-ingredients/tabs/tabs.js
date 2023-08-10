import { useState } from 'react';
import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';

export default function Tabs() {
    const [currentTab, setCurrentTab] = useState('bun');

    const handleClickTab = tab => {
        setCurrentTab(tab)
        const element = document.getElementById(tab);
        element && element.scrollIntoView({behavior: 'smooth'})
    }

    return (
        <div className={styles.tabs}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={handleClickTab}>
                Булки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleClickTab}>
                Соусы
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={handleClickTab}>
                Начинки
            </Tab>
        </div>
    )
}