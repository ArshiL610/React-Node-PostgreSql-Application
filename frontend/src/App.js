import './App.css';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Tasks from './components/Tasks';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/tasks' element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
