import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';

function Navbar({name}) {

  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    navigate("/");
  }

  const excludeLogOutRoutes = [ 
                                '/',
                                '/signup', 
                                '/tasks/:name', 
                                '/forgot-password',
                                '/otp-verify/:email',
                                '/reset-password/:email',
                              ];
  const shouldRenderLogOut = !excludeLogOutRoutes.some((route) => (location.pathname === route));


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" sx={{backgroundColor:'black', height:'70px'}}>
        <Toolbar >
          <Typography variant="h4" align='center' component="div" sx={{ flexGrow: 1, mt:1, ml:10 }}>
            <b>FOCUS FLOW</b>
          </Typography>
          {shouldRenderLogOut && (
            <div>
          <Tooltip title={name}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, mt:1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
            <Avatar  sx={{color:'white'}}/> </IconButton>
        </Tooltip>
        
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          
          <div>
            {/* <Divider /> */}
            <MenuItem sx={{}} onClick={handleLogOut} title='Log Out'>
              <ListItemIcon >
                <Logout fontSize='medium'/>
              </ListItemIcon>
              LogOut
            </MenuItem>
          </div>
        
        </Menu>
        </div>
        )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;