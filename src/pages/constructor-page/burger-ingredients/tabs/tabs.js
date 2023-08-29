import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../../../services/reducers/tabs';

export default function Tabs() {
    const activeTab = useSelector(state => state.tabs.activeTab);
    const dispatch = useDispatch()

    const handleClickTab = tab => {
        dispatch(setActiveTab)
        const element = document.getElementById(tab);
        element && element.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.tabs}>
            <Tab value="bun" active={activeTab === 'bun'} onClick={handleClickTab}>
                Булки
            </Tab>
            <Tab value="sauce" active={activeTab === 'sauce'} onClick={handleClickTab}>
                Соусы
            </Tab>
            <Tab value="main" active={activeTab === 'main'} onClick={handleClickTab}>
                Начинки
            </Tab>
        </div>
    )
}