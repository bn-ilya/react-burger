
import { PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import InputEdit from '../../../../../components/input-edit/input-edit';

export default function Inputs({values, errors, handleChange}) {

    return (
        <>
            <InputEdit
                placeholder={'Имя'}
                onChange={handleChange}
                name={'name'}
                value={values.name ?? ""}
                error={!!errors.name}
                errorText={errors.name}
                icon={'EditIcon'}
                size={'default'}
            />
            <EmailInput
                placeholder={'Логин'}
                onChange={handleChange}
                name={'email'}
                value={values.email ?? ""}
                error={!!errors.email}
                errorText={errors.email}
                isIcon={true}
                icon={'EditIcon'}
                size={'default'}
            />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={handleChange}
                icon={'EditIcon'}
                name={'password'}
                value={values.password ?? ""}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
            />
            
        </>
    )
}