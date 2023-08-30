import { useState } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password-form.module.css';

export default function ForgotPasswordForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputs = e => {
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form className={styles.form}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
            <Input
                type={'text'}
                placeholder={'E-mail'}
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