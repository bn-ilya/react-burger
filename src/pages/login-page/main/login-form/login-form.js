import { PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import { useDispatch } from "react-redux";
import { login } from "../../../../services/reducers/profile";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../services/reducers/modal";
import useFormAndValidation from "../../../../hooks/use-form-and-validation";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {values, errors, isValid, handleChange} = useFormAndValidation()

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(login(values)).unwrap();
            navigate('/profile', { replace: true })
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <EmailInput
                placeholder={'E-mail'}
                onChange={handleChange}
                name={'email'}
                value={values.email ?? ""}
                error={!!errors.email}
                errorText={errors.email}
                size={'default'}
                required={true}
            />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={handleChange}
                icon={'ShowIcon'}
                name={'password'}
                value={values.password ?? ""}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            <Button disabled={!isValid} htmlType="submit" type="primary" size="medium">
                Войти
            </Button>
        </form>
    )
}