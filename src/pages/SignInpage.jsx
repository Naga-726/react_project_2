import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signinApi } from '../services/authService';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';


const SignInpage = () => {
     const navigate=useNavigate();
     const {signin}=useAuth
    

   

    const mutation=useMutation({
        
        mutationFn:signinApi,
        onSuccess:(data)=>{
            signin(data.token);
            navigate('/Dashboard');
           
        },
        
    })
    const formik=useFormik({
        initialValues:{email:'',password:''},
        validationSchema:Yup.object({
             
             email:Yup.string().email('Enter a Valid Email').required('Email is required'),
             password:Yup.string().min(8,'password should be min * characters').required('password is required'),
            
        }),
        onSubmit:(formData)=>{
        
            mutation.mutate(formData)}
    })

  return (
    <div>
        <Box sx={{maxWidth:'auto',maxHeight:'auto',border:1}}>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{maxWidth:400,mt:3,mx:'auto',display:'flex',flexDirection:'column',gap:1,border:1,borderRadius:1,paddingX:2,paddingBottom:1}}>
                <Typography variant='h4' color='primary' paddingLeft={2} mt={2}>SignIn</Typography>
               
                <TextField 
                label='Email'
                name='email'
                type='email'
                value={formik.values.email }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                />
                <TextField 
                label='Password'
                name='password'
                type='password'
                value={formik.values.password }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth

                />
               
                <Button variant='contained' color='primary' size='small' type='submit' fullWidth disabled={mutation.isLoading} >{
                    mutation.isLoading? 'Signing in...':'SignIn'}</Button>
                   {mutation.isError ? mutation.response?.data?.message || 'Signing failed':''}

                    
            </Box>
            <Box sx={{justifyItems:'center'}}><Typography>Dont you have an account?<Button variant='outlined' color='primary' size='small' onClick={()=>{navigate('/')}}>SignUp</Button></Typography></Box>
          
            
        </Box>
    </div>
  )
}

export default SignInpage