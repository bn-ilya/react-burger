import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ComponentProps } from 'react';

export interface IButtonLoader extends ComponentProps<typeof Button> {
  load: boolean;
  disabled?: boolean;
  dataCy?: string;
}
