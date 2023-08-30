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
        try {
          setLoading(true);
          const response = await axios.post(`http://localhost:5000/login`, { email, password });
          console.log(response.data);
          setEmail('');
          setPassword('');
          setTimeout(() => {
            setLoading(false);
            navigate('/tasks')
            toast.success('Login Successful')
          }, 4000)
        } 
        catch (error) {
          // Handle login failure, e.g., display an error message.
          setLoading(false);
          console.error('Login failed:', error);
          toast.error('Login Failed');
          setEmail('');
          setPassword('');
        }
      };


  return (
    <div className='bg'>
        <Navbar />
        <form autoComplete='off' onSubmit={handleLogin}>
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
        <Button size='large' variant='outlined' color='inherit' type='submit' sx={{fontSize:'22px', ml:'69%', mt:'50px', backgroundColor:'white',color: 'black',
            '&:hover': {
                backgroundColor: 'transparent', 
                color: 'white', 
            },}}  
            // disabled={loading || !email || !password}
            >
            {loading ? <CircularProgress color='inherit' size={24} /> : 'Login'}
        </Button>
        </form>
        <br/><br/>
        <small style={{marginLeft:'66.5%', color:'white', position:'absolute'}}>Don't have an account? <Link to='/signup' style={{ cursor: 'pointer' }}>
            Sign Up</Link>
        </small>
    </div>
  )
}

export default HomePage