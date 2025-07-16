import React, { useState } from 'react';
import {Box,Button,TextField,Typography} from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { signupApi } from '../services/authService';
import SnackbarComponent from '../components/SnackbarComponent';
import { useNavigate } from 'react-router-dom';

const SingUpPage = () => {
    const navigate=useNavigate();

    const [snackbar,setSnackbar]=useState({open:false,message:'',severity:'info'});

    const mutation=useMutation({
        mutationFn:signupApi,
        onSuccess:(data)=>{
            setSnackbar({open:true,message:'Signup successful',severity:'success'});
            setTimeout(()=>{
                mutation.reset();
            },4000)
        },
        onError:(error)=>{
            setSnackbar({open:true,message:error?.response?.data?.message || 'Registration failed',severity:'error'});
            setTimeout(()=>{
                mutation.reset();
            },4000)
            console.error('signup error')
        }
    })
    const formik=useFormik({
        initialValues:{name:'',email:'',password:'',confirmpassword:''},
        validationSchema:Yup.object({
             name:Yup.string().min(4,'Name should be min 4 characters').required('Enter your Name'),
             email:Yup.string().email('Enter a Valid Email').required('Email is required'),
             password:Yup.string().min(8,'password should be min * characters').required('password is required'),
            confirmpassword:Yup.string().oneOf([Yup.ref('password'),null],'passwords must match').required('confirm password is required')
        }),
        onSubmit:(values)=>{mutation.mutate(values)}


    })
  return (
    <div>
        <Box sx={{maxWidth:'auto',maxHeight:'auto',border:1}}>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{maxWidth:400,mt:3,mx:'auto',display:'flex',flexDirection:'column',gap:1,border:1,borderRadius:1,paddingX:2,paddingBottom:1}}>
                <Typography variant='h4' color='primary' paddingLeft={2} mt={2}>SignUp</Typography>
                <TextField 
                label='Name'
                name='name'
                value={formik.values.name }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth

                />
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
                <TextField 
                label='Confirm password'
                name='confirmpassword'
                type='password'
                value={formik.values.confirmpassword }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
                fullWidth/>

                <Button variant='contained' color='primary' size='small' type='submit' fullWidth disabled={mutation.isLoading} >{
                    mutation.isLoading? 'Signing up...':'SignUp'}</Button>
                    {mutation.isError && mutation.error?.res}
            </Box>
            <Box sx={{justifyItems:'center'}}><Typography>Already have an account?<Button variant='outlined' color='primary' size='small' onClick={()=>{navigate('/signin')}}>Signin</Button></Typography></Box>
            <SnackbarComponent
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={()=>{setSnackbar({...snackbar,open:false})}}
            />
            
        </Box>
    </div>
  )
}

export default SingUpPage