import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./controls.module.css";
import ButtonLoader from "../../../../../components/button-loader/button-loader";
import { useSelector } from "react-redux";
import { selectUpdateUserDataRequest } from "../../../../../services/selectors";
import {memo} from 'react';

const Controls = memo(({ cancel }) => {
    console.log('render controls');
    const updateUserDataRequest = useSelector(selectUpdateUserDataRequest);

    return (
        <div className={styles.content}>
            <Button htmlType="button" type="secondary" size="medium" onClick={() => cancel()}>
                Отмена
            </Button>
            <ButtonLoader load={updateUserDataRequest} loop={true} htmlType="submit" type="primary" size="large">
                Сохранить
            </ButtonLoader>
        </div >
    )
})

export default Controls;