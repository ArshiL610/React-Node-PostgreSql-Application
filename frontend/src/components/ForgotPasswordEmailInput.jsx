import React, { useState } from 'react'
import Navbar from './Navbar';
import { Box, Button, TextField, Typography, IconButton, CircularProgress} from '@mui/material';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './ForgotPasswordEmailInput.css';

function ForgotPasswordEmailInput() {

    const [email, setEmail] = useState('');

    //for loading and redirecting to login page
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleClick = async (event) => {
        event.preventDefault();
        
        setLoading(true);

        await axios.post(`https://focusflowbackend.netlify.app/send-otp`, {email})
        .then(response => {
            setTimeout(() => {
                setLoading(false);
                toast.success('OTP sent');
                setEmail('');
                navigate(`/otp-verify/${email}`);
            }, 3000)
        })
        .catch(error => {
            setLoading(false);
            toast.error('Failed to send OTP');
        })
    };

    const handleBackwardNavigation = () => {
      navigate(`/`);
    }

  return (
    <div className='bg-forgotpassword'>
      <Navbar />
      <form autoComplete='off' onSubmit={handleClick}>
            <IconButton variant='contained' size='large' sx={{color:'white', mt:0, ml:80}} onClick={handleBackwardNavigation}>
                <ForwardRoundedIcon style={{fontSize:'40px', transform: 'rotate(-180deg)'}} />
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'right',
                    maxWidth: '400px',
                    margin: '0 auto',
                    mr:0
                    }}
            >
                <Typography variant="h4"  align="center" gutterBottom sx={{mt:1, color:'white', ml:-21}}>
                    <br/>
                    <strong>Password Reset</strong>
                </Typography>
                <TextField
                    sx={{marginTop:6,
                      ml:-10,
                      borderColor: 'white', 
                      '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                              borderColor: 'white', 
                          },
                          '&:hover fieldset': {
                              borderColor: 'white', 
                          },},
                      color:'white',
                    }}
                    required
                    type='email'
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                      style:{color:"white"}
                  }}
                    // disabled={loading}
                /><br/>
                <small style={{color:'white', marginLeft:-80}}>Enter Email*</small>
                {/* Button to send otp */}
                <Button
                    size='large'
                    type="submit"
                    variant="contained"
                    color='inherit'
                    sx={{ marginTop: '50px', width:150, ml:5, backgroundColor:'white' }}
                    disabled={loading}
                    >
                    {loading ? <CircularProgress color='inherit' sx={{color:'white'}} size={26}/> : 'Send OTP'} 
                </Button>

            </Box>
        </form>
    </div>
  )
}

export default ForgotPasswordEmailInput
