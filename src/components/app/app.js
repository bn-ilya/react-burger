import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage, ConstructorPage, RegisterPage, ResetPasswordPage} from '../../pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/reset-password' element={<ResetPasswordPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
