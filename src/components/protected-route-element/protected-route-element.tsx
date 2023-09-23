import { useState, useEffect, FC } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { getUserData } from '../../services/reducers/profile';
import { selectIsAuth } from '../../services/selectors';
import { IProtectedRouteElement } from '../../utils/types';

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element, accessAuth }) => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location = useLocation();
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(getUserData());
      setIsUserLoaded(true);
    };
    init();
  }, [dispatch]);

  if (!isUserLoaded) return null;

  if (accessAuth) {
    return isAuth ? element : <Navigate to={'/login'} state={{ goBack: location }} replace />;
  } else {
    return isAuth ? <Navigate to={'/'} replace /> : element;
  }
};

export default ProtectedRouteElement;
