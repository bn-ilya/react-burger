import { FC } from 'react';
import { Routes, Route, useLocation, type Location } from 'react-router-dom';

import {
  LoginPage,
  ConstructorPage,
  RegisterPage,
  ResetPasswordPage,
  NotFoundPage,
  ForgotPasswordPage,
  ProfilePage,
  IngredientViewPage,
  FeedPage,
  FeedInfoPage,
} from '../../pages';
import IngredientModal from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-modal/ingredient-modal';
import { ERoutes } from '../../utils/types';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProtectedRouteResetPassword from '../protected-route-reset-password/protected-route-reset-password';

type TBackground = undefined | Location;

const RoutesApp: FC = () => {
  const location: Location = useLocation();
  const background: TBackground = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={ERoutes.home} element={<ConstructorPage />} />
        <Route
          path={ERoutes.login}
          element={<ProtectedRouteElement element={<LoginPage />} accessAuth={false} />}
        />
        <Route
          path={ERoutes.register}
          element={<ProtectedRouteElement element={<RegisterPage />} accessAuth={false} />}
        />
        <Route
          path={ERoutes.resetPassword}
          element={
            <ProtectedRouteResetPassword element={<ResetPasswordPage />} accessAuth={false} />
          }
        />
        <Route
          path={ERoutes.forgotPassword}
          element={<ProtectedRouteElement element={<ForgotPasswordPage />} accessAuth={false} />}
        />
        <Route
          path={ERoutes.profile}
          element={<ProtectedRouteElement element={<ProfilePage />} accessAuth={true} />}
        />
        <Route path={ERoutes.ingredientId} element={<IngredientViewPage />} />
        <Route path={ERoutes.feed} element={<FeedPage />} />
        <Route path={ERoutes.feedId} element={<FeedInfoPage />} />
        <Route path={ERoutes.all} element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={ERoutes.ingredientId}
            element={
              <>
                <IngredientModal />
              </>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default RoutesApp;
