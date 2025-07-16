import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackbarComponent = ({open,onClose,message,severity='info'}) => {
  return (
   <Snackbar
   open={open}
   autoHideDuration={5000}
   onClose={onClose}
   >
    <Alert onClose={onClose} severity='sevirity' variant='filled'>{message}</Alert>
   </Snackbar>
  );
}
export default SnackbarComponent;
