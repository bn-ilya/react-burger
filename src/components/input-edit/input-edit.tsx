import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef, useState } from 'react';

const InputEdit: FC<typeof Input> = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    setDisabled(false);
    if (inputRef.current) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleBlurInput = () => {
    setDisabled(true);
  };

  return (
    <Input
      ref={inputRef}
      disabled={disabled}
      onIconClick={handleIconClick}
      onBlur={handleBlurInput}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export default InputEdit;
