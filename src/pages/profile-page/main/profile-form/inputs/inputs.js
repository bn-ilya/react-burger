
import { Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import InputEdit from '../../../../../components/input-edit/input-edit';

export default function Inputs({formData, setFormData}) {

    const handleInputs = e => {
        e.preventDefault()
        e.stopPropagation()
        const [value, name] = [e.target.value, e.target.name];
        setFormData({ ...formData, [name]: value })
    }

    return (
        <>
            <InputEdit
                placeholder={'Имя'}
                onChange={handleInputs}
                name={'name'}
                value={formData.name}
                error={false}
                icon={'EditIcon'}
                errorText={'Ошибка'}
                size={'default'}
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