import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setFieldValue } from "../../../../services/reducers/forgot-password";
import { resetPassword } from "../../../../services/reducers/forgot-password";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../services/reducers/modal";
import { useState } from "react";

export default function ForgotPasswordForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const handleInput = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword(email))
            .unwrap()
            .then((response) => {
                if (response.success)
                    navigate('/reset-password', { replace: true })
                else
                    throw new Error(response.message)
            })
            .catch(error => {
                dispatch(openModal({ content: error.message, type: 'error' }))
            })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                value={email}
                onChange={handleInput}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="submit" type="primary" size="medium">
                Восстановить
            </Button>
        </form>
    )
}