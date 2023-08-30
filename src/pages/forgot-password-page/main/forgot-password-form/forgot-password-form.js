import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setFieldValue } from "../../../../services/reducers/forgot-password";

export default function ForgotPasswordForm() {
    const {email} = useSelector(state => state.forgotPassword)
    const dispatch = useDispatch();

    const handleInputs = e => {
        const [value, field] = [e.target.value, e.target.name];
        dispatch(setFieldValue({ field, value }))
    }

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                value={email}
                onChange={handleInputs}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="button" type="primary" size="medium">
                Восстановить
            </Button>
        </form>
    )
}