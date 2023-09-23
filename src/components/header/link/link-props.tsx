import { ReactElement } from 'react';

import { TIconTypes } from '../../../utils/types';

export interface ILinkProps {
  iconCb: (arg: TIconTypes) => ReactElement;
  children: string;
  label: string;
  to: string;
}
