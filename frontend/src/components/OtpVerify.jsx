import React,{ useState } from 'react'
import { Box, Button, TextField, Typography, IconButton, CircularProgress} from '@mui/material';
import Navbar from './Navbar';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import './ForgotPasswordEmailInput.css';

function OtpVerify() {


  const [otp, setOtp] = useState('');
  const {email} = useParams();
  //for loading and redirecting to login page
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // to verify otp
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://focusflowbackend.netlify.app/verify-otp', {
        email: email,
        otp: otp,
      });

      

      if (response.status === 200) {
        // OTP is verified
        setTimeout(() => {
          setLoading(false);
          setOtp('');
          toast.success('OTP verified!'); 
          navigate(`/reset-password/${email}`);
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        // Invalid OTP
        toast.warning('Invalid OTP');
        setOtp('');
      } else {
        // Internal server error
        toast.error('Failed to verify OTP. Please try again.');
        setOtp('');
      }
    }
  };

  const handleBackwardNavigation = () => {
    navigate(`/forgot-password`);
  }


  return (
    <div className='bg-otpverify'>
      <Navbar />
      <form autoComplete='off' onSubmit={handleVerifyOtp}>
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
                    <strong>OTP Verification</strong>
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
                    type='password'
                    fullWidth
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    margin='normal'
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                      style:{color:"white"}
                  }}
                    // disabled={loading}
                /><br/>
                <small style={{color:'white', marginLeft:-80}}>Enter the 6 digit number*</small>
                {/* Button to verify otp */}
                <Button
                    size='large'
                    type="submit"
                    variant="contained"
                    color='inherit'
                    sx={{ marginTop: '50px', width:150, ml:5, backgroundColor:'white' }}
                    disabled={loading}
                    >
                    {loading ? <CircularProgress color='inherit' sx={{color:'info'}} size={26}/> : 'Verify OTP'} 
                </Button>

            </Box>
        </form>
    </div>
  )
}

export default OtpVerify
