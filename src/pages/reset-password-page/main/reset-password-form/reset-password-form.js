import { PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../services/reducers/modal";
import { resetPassword } from "../../../../services/reducers/reset-password";
import useFormAndValidation from "../../../../hooks/use-form-and-validation";
import { selectResetPasswordRequest } from "../../../../services/selectors";
import ButtonLoader from "../../../../components/button-loader/button-loader";

export default function ResetPasswordForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordRequest = useSelector(selectResetPasswordRequest);
    const { values, errors, isValid, handleChange } = useFormAndValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(resetPassword(values)).unwrap();
            navigate('/login', { replace: true });
        } catch (error) {
            dispatch(openModal({ content: error.message, type: 'error' }))
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={'text text_type_main-medium ' + styles.title}>Восстановление пароля</h1>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                value={values.password ?? ""}
                onChange={handleChange}
                name={'password'}
                icon={'ShowIcon'}
                error={!!errors.password}
                errorText={errors.password}
                size={'default'}
                required={true}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                value={values.token ?? ""}
                onChange={handleChange}
                name={'token'}
                error={!!errors.token}
                errorText={errors.token}
                size={'default'}
                required={true}
            />
            <ButtonLoader disabled={!isValid} load={resetPasswordRequest} loop={true} htmlType="submit" type="primary" size="medium">
                Сохранить
            </ButtonLoader>
        </form>
    )
}