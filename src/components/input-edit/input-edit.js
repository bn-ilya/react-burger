import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

export default function InputEdit(props) {
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef();

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleBlurInput = () => {
    setDisabled(true);
  };

  return (
    <Input
      {...props}
      ref={inputRef}
      disabled={disabled}
      onIconClick={handleIconClick}
      onBlur={handleBlurInput}
    />
  );
}
