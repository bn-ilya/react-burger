import { Routes, Route } from 'react-router-dom';
import { LoginPage, ConstructorPage, RegisterPage, ResetPasswordPage, NotFoundPage, ForgotPasswordPage, ProfilePage } from '../../pages'
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProtectedRouteResetPassword from '../protected-route-reset-password/protected-route-reset-password';
import IngredientModal from '../../pages/constructor-page/burger-ingredients/ingredients/ingredient-modal/ingredient-modal';
import { useLocation } from 'react-router-dom';

export default function RoutesApp() {
    const location = useLocation();
    const background = location?.state?.background;
    
    return (
        <>
            <Routes location={background || location}>
                <Route path='/' element={<ConstructorPage />} />
                <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} accessAuth={false} />} />
                <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} accessAuth={false} />} />
                <Route path='/reset-password' element={<ProtectedRouteResetPassword element={<ResetPasswordPage />} accessAuth={false} />} />
                <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} accessAuth={false} />} />
                <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} accessAuth={true} />} />
                <Route path='/ingredients/:id' element={<ConstructorPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <>
                                <ConstructorPage />
                                <IngredientModal />
                            </>
                        }
                    />
                </Routes>
            )}
        </>
    )
}