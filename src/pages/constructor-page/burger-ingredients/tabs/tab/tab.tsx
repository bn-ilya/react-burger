import { Tab as TabYa } from '@ya.praktikum/react-developer-burger-ui-components';
import { ComponentProps, FC } from 'react';

import type { EIngredients } from '../../../../../utils/types';

interface ITabProps extends Omit<ComponentProps<typeof TabYa>, 'onClick'> {
  value: EIngredients;
  onClick: (value: EIngredients) => void;
}

const Tab: FC<ITabProps> = ({ children, onClick, ...props }) => {
  return (
    <TabYa {...props} onClick={(value: string) => onClick(value as EIngredients)}>
      {children}
    </TabYa>
  );
};

export default Tab;
