import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ComponentProps, FC, useRef, useState } from 'react';

type TInputEdit = ComponentProps<typeof Input>;

const InputEdit: FC<TInputEdit> = ({ value, onChange, ...props }) => {
  const [disabled, setDisabled] = useState(true);
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
      onChange={onChange}
      {...props}
    />
  );
};

export default InputEdit;
