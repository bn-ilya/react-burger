import { Routes, Route } from 'react-router-dom';
import { LoginPage, ConstructorPage, RegisterPage, ResetPasswordPage, NotFoundPage, ForgotPasswordPage, ProfilePage, IngredientViewPage} from '../../pages'
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProtectedRouteResetPassword from '../protected-route-reset-password/protected-route-reset-password';
import IngredientModal from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-modal/ingredient-modal';
import { useLocation } from 'react-router-dom';
import { home, login, register, resetPassword, forgotPassword, profile, profileOrders, ingredientId, all} from '../../utils/routes';

export default function RoutesApp() {
    const location = useLocation();
    const background = location?.state?.background;
    
    return (
        <>
            <Routes location={background || location}>
                <Route path={home} element={<ConstructorPage />} />
                <Route path={login} element={<ProtectedRouteElement element={<LoginPage />} accessAuth={false} />} />
                <Route path={register} element={<ProtectedRouteElement element={<RegisterPage />} accessAuth={false} />} />
                <Route path={resetPassword} element={<ProtectedRouteResetPassword element={<ResetPasswordPage />} accessAuth={false} />} />
                <Route path={forgotPassword} element={<ProtectedRouteElement element={<ForgotPasswordPage />} accessAuth={false} />} />
                <Route path={profile} element={<ProtectedRouteElement element={<ProfilePage />} accessAuth={true} />} />
                <Route path={profileOrders} element={<ProtectedRouteElement element={<ProfilePage />} accessAuth={true} />} />
                <Route path={ingredientId} element={<IngredientViewPage />} />
                <Route path={all} element={<NotFoundPage />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path={ingredientId}
                        element={
                            <>
                                <IngredientModal />
                            </>
                        }
                    />
                </Routes>
            )}
        </>
    )
}