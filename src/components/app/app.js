import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor-page/constructor-page';
import LoginPage from '../../pages/login-page/login-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
