import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage, ConstructorPage, RegisterPage, ResetPasswordPage, NotFoundPage} from '../../pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/reset-password' element={<ResetPasswordPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
