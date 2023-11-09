import './App.css';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Tasks from './components/Tasks';
import ForgotPasswordEmailInput from './components/ForgotPasswordEmailInput';
import OtpVerify from './components/OtpVerify';
import ResetPassword from './components/ResetPassword';



function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/tasks/:name' element={<Tasks />} />
        <Route path='/forgot-password' element={<ForgotPasswordEmailInput />} />
        <Route path='/otp-verify/:email' element={<OtpVerify />} />
        <Route path='/reset-password/:email' element={<ResetPassword />} />
      </Routes>
      {/* <Tasks /> */}
    </div>
  );
}

export default App;
