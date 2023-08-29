import { useState } from "react"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputs = e => {
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form style={{ color: 'white' }}>
            <Input
                type={'text'}
                placeholder={'placeholder'}
                onChange={handleInputs}
                icon={'CurrencyIcon'}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            <Input
                type={'text'}
                placeholder={'placeholder'}
                onChange={handleInputs}
                icon={'CurrencyIcon'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
            {formData.email}
            {formData.password}
        </form>
    )
}