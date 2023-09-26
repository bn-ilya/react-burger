import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/rtk-hooks';

import { selectIsForgotPassword } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

const ProtectedRouteResetPassword: FC<IProtectedRouteElement> = (props) => {
  const isForgotPassword = useAppSelector(selectIsForgotPassword);

  return isForgotPassword ? <ProtectedRouteElement {...props} /> : <Navigate to={'/'} replace />;
};

export default ProtectedRouteResetPassword;
