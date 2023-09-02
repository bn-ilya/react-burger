import { useState } from "react"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login-form.module.css';
import { useDispatch } from "react-redux";
import { login } from "../../../../services/reducers/profile";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../services/reducers/modal";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputs = e => {
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await dispatch(login(formData)).unwrap();
            if (res.success) navigate('/', { replace: true })
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Вход</h1>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={handleInputs}
                name={'email'}
                value={formData.email}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={handleInputs}
                icon={'ShowIcon'}
                name={'password'}
                value={formData.password}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Button htmlType="submit" type="primary" size="medium">
                Войти
            </Button>
        </form>
    )
}