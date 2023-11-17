import React, {useState} from 'react'
import Navbar from './Navbar'
import './HomePage.css';
import { Button, TextField, CircularProgress, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import RatingFeature from './RatingFeature';
import ContactUs from './ContactUs';



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
// 58
  return (
    <div className='container'>
        <div className='background-image'></div>
        <div className='content'>
        <Navbar />
        <Box
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                width: '40%',
                height: '60%',
                position: 'absolute',
                top: '22%',
                left: '5%',
                backdropFilter: 'blur(5px)',
                borderRadius: '15px',
                padding: '20px',
            }}
        >
            <form autoComplete='off' style={{flexDirection: 'column'}}>
            <TextField 
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
                // disabled={loading}
                color='info'
                type="email"
                margin='dense'
                sx = {{ 
                        ml:'10%', mt: '30px',width: 400, color:'white',
                        borderColor: 'black', 
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', 
                            },
                            '&:hover fieldset': {
                                borderColor: 'black',
                            },},
                }}
                inputProps={{
                    style:{color:"black", fontWeight:'bold'}
                }}
                value={email}
            /><br/>
            <small style={{color:'black', marginLeft:'10%'}}><b>Enter Email*</b></small>
            <TextField
                onChange={e => setPassword(e.target.value)}
                required
                variant='outlined'
                color='info'
                type='password'
                value={password}
                // disabled={loading}
                sx={{ml:'-78px',mb:'5px', mt: '40px',width: 400, color:'white',
                borderColor: 'black', 
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'black', 
                    },
                    '&:hover fieldset': {
                        borderColor: 'black', 
                    },},
                }}
                inputProps={{
                    style:{color:"black"}
                }}
                
            /><br/>
            <small style={{color:'black', marginLeft:'10%', marginTop:'5px'}}><b>Enter Password*</b></small><br/>
            <Button size='large' variant='contained' color='inherit' type='button' onClick={handleLogin} sx={{fontSize:'20px', ml:'10%', mt:'35px', backgroundColor:'white',}}  
                disabled={loading }
                >
                {loading ? <CircularProgress color='inherit' sx={{color:'white'}} size={32} /> : 'Login'}
            </Button>
            </form>
            <br/><br/>
            <small style={{marginLeft:'10%', color:'black', position:'absolute'}}><b>Don't have an account? </b><Link to='/signup' style={{ cursor: 'pointer', color:'cyan' }}>
                Sign Up</Link>
            </small>
            <br/>
            <small style={{marginLeft:'10%', color:'black', position:'absolute'}}><b>Forgot password? </b><Link to='/forgot-password' style={{ cursor: 'pointer', color:'cyan' }}>
                Reset</Link>
            </small>
            <small style={{marginLeft:'10%', color:'black', position:'absolute', marginTop:'3.5%'}}><b>You can reach us @ <ContactUs /></b></small>
        </Box>
        <div  style={{marginLeft:'850px', marginTop:'520px', color:'white'}}>
            {/* <ContactUs /> */}
            <RatingFeature />
        </div>
        </div>
    </div>
  )
}

export default HomePage