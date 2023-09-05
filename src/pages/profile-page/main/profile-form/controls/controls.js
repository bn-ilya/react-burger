import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./controls.module.css";

export default function Controls({ cancel, save }) {
    return (
        <div className={styles.content}>
            <Button htmlType="button" type="secondary" size="medium" onClick={() => cancel()}>
                Отмена
            </Button>
            <Button htmlType="button" type="primary" size="medium" onClick={() => save()}>
                Сохранить
            </Button>
        </div >
    )
}