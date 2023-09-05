import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./controls.module.css";

export default function Controls({ cancel }) {
    return (
        <div className={styles.content}>
            <Button htmlType="button" type="secondary" size="medium" onClick={e => cancel()}>
                Отмена
            </Button>
            <Button htmlType="button" type="primary" size="medium">
                Сохранить
            </Button>
        </div >
    )
}