import { useSelector } from 'react-redux';
import { useState, useEffect } from "react"
import { selectUserData } from "../../../../../services/selectors";
import { Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";


export default function Inputs() {
    const { name, email } = useSelector(selectUserData);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleInputs = e => {
        e.preventDefault()
        e.stopPropagation()
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        setFormData({ ...formData, name: name, email: email })
    }, [name, email])

    const handleInputClick = e => {
        console.log(e.target)
        e.target.disabled = !e.target.disabled;
    }

    return (
        <>
            <Input
                placeholder={'Имя'}
                onChange={handleInputs}
                name={'name'}
                value={formData.name}
                error={false}
                isIcon={true}
                icon={'EditIcon'}
                errorText={'Ошибка'}
                size={'default'}
                disabled={true}
                onIconClick={handleInputClick}
            />
            <EmailInput
                placeholder={'Логин'}
                onChange={handleInputs}
                name={'email'}
                value={formData.email}
                error={false}
                isIcon={true}
                icon={'EditIcon'}
                errorText={'Ошибка'}
                size={'default'}
            />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={handleInputs}
                icon={'EditIcon'}
                name={'password'}
                value={formData.password}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
        </>
    )
}