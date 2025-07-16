import { AppBar, Box, Button, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    const {logout}=useAuth();
    const out=()=>{
        logout();
        navigate('/signin');
        
        
    }
  return (
    <AppBar position='static' color='default' elevation={1}>
       <Toolbar sx={{display:'flex' ,justifyContent:'space-between'}}>
        <Box sx={{display:'flex', alignItems:'center', gap:1}}>
            <IconButton edge='start' color='inherit'>
                <MenuIcon/>
            </IconButton>
            <Typography variant='h6' component='div'> Friction</Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center',gap:2}}>
           
           <InputBase placeholder='Search..' color='inherit' sx={{border:'1px solid',borderRadius:1,color:'inherit'}}/>
           <Button color='inherit' onClick={out}>Logout</Button>
           <IconButton color='error' ><AccountCircleIcon/></IconButton>
        </Box>
       </Toolbar>
    </AppBar>
  )
}

export default Navbar