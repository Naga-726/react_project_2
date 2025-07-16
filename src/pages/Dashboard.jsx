import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { restaurants } from '../services/authService';


const Dashboard = () => {
    const navigate=useNavigate();
    const {logout,token}=useAuth();
    const {data:fooditems,isLoading,isError}=useQuery({queryKey:['fooditems'],queryFn:restaurants})
    if(isLoading)
      return <p>Loading...</p>

    if(isError)
      return <p>error while fetching</p>

    console.log(fooditems)
    const out=()=>{
        logout();
        navigate('/signin');
    }
  return (
    <div>
      
      <Box><Typography variant='h1' color='primary'>Welcome to new world</Typography>
      <Typography variant='h4' color='inherit'>Restaurants</Typography>
      <Grid container spacing={2}>
        {fooditems?.map((i)=>(
          <Grid item xs={12} sm={6} md={4} key={i.id}>
            <Card>
              <CardContent><Typography variant='h6'>{i.name}</Typography>
              <Typography variant='body2' color='text.secondary'>{i.username}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

    </div>
  )
}

export default Dashboard