import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';
import { useDispatch, useSelector } from "react-redux";
import { setFieldValue } from "../../../../services/reducers/forgot-password";
import { resetPassword } from "../../../../services/reducers/forgot-password";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
    const {email} = useSelector(state => state.forgotPassword)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleInputs = e => {
        const [value, field] = [e.target.value, e.target.name];
        dispatch(setFieldValue({ field, value }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword())
        .then(()=>{
            navigate('/reset-password', {replace: true})
        })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <Button htmlType="submit" type="primary" size="medium">
                Восстановить
            </Button>
        </form>
    )
}