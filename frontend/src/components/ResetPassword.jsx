import React, { useState } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import './ForgotPasswordEmailInput.css';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, CircularProgress} from '@mui/material';




function ResetPassword() {

    const {email} = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleBackwardNavigation = () => {
        navigate(`/otp-verify/:email`);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(password === confirmPassword){
            const request = {
                email: email,
                password: password
            };

            setLoading(true);
            await axios.put(`https://focusflowbackend.netlify.app/reset-password`, request)
            .then(response => {
                setTimeout(() => {
                    setLoading(false);
                    console.log('Response : ', response);
                    toast.success('Password Updated');
                    setPassword('');
                    setConfirmPassword('');
                    navigate('/');
                  }, 3000);
            })
            .catch(error => {
                setLoading(false);
                console.log("Error", error);
                toast.error('Failed to reset');
                setPassword('');
                setConfirmPassword('');
            })
        }
        else{
            setLoading(false);
            toast.warning('Passwords do not match');
        }
    }

  return (
    <div className='bg-otpverify'>
      <Navbar />
      <form autoComplete='off' onSubmit={handleResetPassword}>
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
                <Typography variant="h4"  align="center" gutterBottom sx={{mt:-5, color:'white', ml:-21}}>
                    <br/>
                    <strong>Reset Your Password</strong>
                </Typography>
                <TextField
                    sx={{marginTop:4,
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
                    type='password'
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                      style:{color:"white"}
                  }}
                    // disabled={loading}
                /><br/>
                <small style={{color:'white', marginLeft:-80}}>Enter your password*</small>
                <TextField
                    sx={{marginTop:4,
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
                    type='password'
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                      style:{color:"white"}
                  }}
                    // disabled={loading}
                /><br/>
                <small style={{color:'white', marginLeft:-80}}>Confirm your password*</small>
                {/* Button to reset password */}
                <Button
                    size='large'
                    type="submit"
                    variant="contained"
                    color='inherit'
                    sx={{ marginTop: '50px', width:150, ml:5, backgroundColor:'white' }}
                    disabled={loading}
                    >
                    {loading ? <CircularProgress color='inherit' sx={{color:'white'}} size={26}/> : 'RESET'} 
                </Button>

            </Box>
        </form>
    </div>
  )
}

export default ResetPassword
