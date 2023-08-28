import React, {useState} from 'react'
import Navbar from './Navbar'
import './HomePage.css';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  return (
    <div className='bg'>
        <Navbar />
        <form autoComplete='off' >
        <TextField 
            onChange={e => setEmail(e.target.value)}
            required
            variant="outlined"
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
        <Button size='large' variant='outlined' color='inherit'  sx={{fontSize:'22px', ml:'69%', mt:'50px', backgroundColor:'white',color: 'black',
            '&:hover': {
                backgroundColor: 'transparent', 
                color: 'white', 
            },}}>
            Login
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