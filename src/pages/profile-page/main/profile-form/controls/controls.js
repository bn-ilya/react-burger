import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./controls.module.css";
import ButtonLoader from "../../../../../components/button-loader/button-loader";
import { useSelector } from "react-redux";
import { selectUpdateUserDataRequest } from "../../../../../services/selectors";
import { memo } from 'react';
import {PropTypes} from 'prop-types';

const Controls = memo(({ isValid, cancel }) => {
    const updateUserDataRequest = useSelector(selectUpdateUserDataRequest);

    return (
        <div className={styles.content}>
            <Button htmlType="button" type="secondary" size="medium" onClick={() => cancel()}>
                Отмена
            </Button>
            <ButtonLoader disabled={!isValid} load={updateUserDataRequest} loop={true} htmlType="submit" type="primary" size="large">
                Сохранить
            </ButtonLoader>
        </div >
    )
})

export default Controls;

Controls.propTypes = {
    isValid: PropTypes.bool.isRequired,
    cancel: PropTypes.func
}