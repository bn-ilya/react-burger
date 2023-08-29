import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LoginPage, ConstructorPage} from '../../pages'

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
