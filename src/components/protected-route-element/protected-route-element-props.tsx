import { ReactElement } from 'react';

export interface IProtectedRouteElement {
  element: ReactElement;
  accessAuth: boolean;
}
