import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"

export default function InputEdit(props) {

    const [disabled, setDisabled] = useState(true);    
    const inputRef = useRef()

    const handleIconClick = e => {
        setDisabled(!inputRef.current.disabled)
        setTimeout(() => inputRef.current.focus(), 0)
    }

    return (
        <Input
            ref={inputRef}
            placeholder={props.name}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
            error={false}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
            disabled={disabled}
            onIconClick={handleIconClick}
        />
    )
}