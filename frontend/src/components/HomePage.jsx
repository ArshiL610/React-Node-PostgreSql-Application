import React, {useState} from 'react'
import Navbar from './Navbar'
import './HomePage.css';
import { Button, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';


function HomePage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleLogin = async () => {
        setLoading(true);
        await axios.post(`http://localhost:5000/users/login`,{email, password})
        .then(response => {
            setEmail('');
            setPassword('');
            setTimeout(() => {
                setLoading(false);
                toast.success('Login Successful!');
                navigate(`/tasks/${response.data.user.name}`);
            }, 4000)
        })
        .catch(error => {
            setLoading(false);
            setEmail('');
            setPassword('');
            toast.error('Login Failed')
        })
    }

  return (
    <div className='container'>
        <div className='background-image'></div>
        <div className='content'>
        <Navbar />
        <form autoComplete='off'>
        <TextField 
            onChange={e => setEmail(e.target.value)}
            required
            variant="outlined"
            // disabled={loading}
            color='info'
            type="email"
            sx={{ml:'58%', mt: '100px',width: 400, color:'white',
            borderColor: 'white', 
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white', 
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },},
            }}
            inputProps={{
                style:{color:"white"}
            }}
            value={email}
        /><br/>
        <small style={{color:'white', marginLeft:'58%'}}>Enter Email*</small>
        <TextField
            onChange={e => setPassword(e.target.value)}
            required
            variant='outlined'
            color='info'
            type='password'
            value={password}
            // disabled={loading}
            sx={{ml:'58%', mt: '20px',width: 400, color:'white',
            borderColor: 'white', 
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white', 
                },
                '&:hover fieldset': {
                    borderColor: 'white', 
                },},
            }}
            inputProps={{
                style:{color:"white"}
            }}
            
        /><br/>
        <small style={{color:'white', marginLeft:'58%'}}>Enter Password*</small>
        <Button size='large' variant='contained' color='inherit' type='button' onClick={handleLogin} sx={{fontSize:'20px', ml:'70%', mt:'50px', backgroundColor:'white',}}  
            disabled={loading }
            >
            {loading ? <CircularProgress color='inherit' sx={{color:'white'}} size={32} /> : 'Login'}
        </Button>
        </form>
        <br/><br/>
        <small style={{marginLeft:'66.5%', color:'white', position:'absolute'}}>Don't have an account? <Link to='/signup' style={{ cursor: 'pointer', color:'orange' }}>
            Sign Up</Link>
        </small>
        <br/>
        <small style={{marginLeft:'66.5%', color:'white', position:'absolute'}}>Forgot password? <Link to='/forgot-password' style={{ cursor: 'pointer', color:'orange' }}>
            Reset</Link>
        </small>
        </div>
    </div>
  )
}

export default HomePage