import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, ConstructorPage, RegisterPage, ResetPasswordPage, NotFoundPage, ForgotPasswordPage, ProfilePage } from '../../pages'
import Modal from '../modal/modal';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProtectedRouteResetPassword from '../protected-route-reset-password/protected-route-reset-password';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} accessAuth={false} />} />
          <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} accessAuth={false} />} />
          <Route path='/reset-password' element={<ProtectedRouteResetPassword element={<ResetPasswordPage />} accessAuth={false} />} />
          <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} accessAuth={false} />} />
          <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} accessAuth={true} />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>

      <Modal />
    </>
  );
}

export default App;
