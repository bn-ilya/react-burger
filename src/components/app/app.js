import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from '../modal/modal';
import RoutesApp from '../routes-app/routes-app';

function App() {

  return (
    <>
      <Router>
        <RoutesApp />
        <Modal />
      </Router>
    </>
  );
}

export default App;
