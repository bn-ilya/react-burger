import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConstructorPage from '../../pages/constructor-page/constructor-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
