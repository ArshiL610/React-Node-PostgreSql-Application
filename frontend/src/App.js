import './App.css';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
// import RenderTable from './components/RenderTable';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        {/* <HomePage /> */}
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
