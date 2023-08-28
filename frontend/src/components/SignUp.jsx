import React,{useState} from 'react'
import './SignUp.css';
import Navbar from './Navbar';
import { Box, Button, IconButton, TextField, Typography, CircularProgress } from '@mui/material';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import {useNavigate} from 'react-router-dom';
import { toast} from 'react-toastify';

function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBackwardNavigation = () => {
        navigate(-1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        // Create an object with user data
        const userData = {
            name,
            email,
            password,
        };
    
        try {
            // Send a POST request to the backend
            setLoading(false);
            const response = await fetch('http://localhost:5000/post/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                // Registration successful, you can redirect the user or show a success message
                toast.success('Registration Successful');
                setName('');
                setEmail('');
                setPassword('');
                setPassword1('');
                navigate('/'); // Redirect to the login page

            } else {
                // Registration failed, handle errors here
                // You can display an error message to the user
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

  return (
    <div className='bg-signup'>
        <Navbar/>
        <form autoComplete='off' >
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            maxWidth: '400px',
            margin: '0 auto',
            ml:18,
            mt:-4
            }}
        >
        <IconButton variant='contained' size='large' sx={{color:'white', mt:3, ml:-72}} onClick={handleBackwardNavigation}>
          <ForwardRoundedIcon style={{fontSize:'40px', transform: 'rotate(-180deg)'}} />
        </IconButton>
        <Typography sx={{mt:-11, color:'white'}} variant="h5" align="center" gutterBottom><br/>
          Sign Up
        </Typography>
        <TextField
          required
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          sx={{color:'white',
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
        />
        <small style={{color:'white'}}>Enter Name*</small>
        <TextField
          required
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          sx={{color:'white',
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
        />
        <small style={{color:'white'}}>Enter Email*</small>
        <TextField
          required
          type='password'
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          sx={{color:'white',
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
        />
        <small style={{color:'white'}}>Enter Password*</small>
        <TextField
                required
                type='password'
                fullWidth
                value={password1}
                onChange={e => setPassword1(e.target.value)}
                margin="normal"
                sx={{color:'white',
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
        />
        <small style={{color:'white'}}>Re-enter Password*</small>
        <Button size='medium' variant='outlined' color='info' sx={{width:'100px', ml:18, mt:3}} onClick={handleSubmit}>
            {loading ? <CircularProgress color='inherit' size={24} /> : 'Sign Up'}
        </Button>
        </Box>
        </form>
    </div>
  )
}

export default SignUp