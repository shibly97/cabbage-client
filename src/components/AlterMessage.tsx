import React from 'react'

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';

import {useSelector,useDispatch} from 'react-redux'
import {showMessage,closeMessage} from '../redux/action/messageAction'
import {MessageState} from '../redux/reducer/messageReducer'
import type { RootState, AppDispatch } from '../redux/store'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



function AlterMessage() {

    const open = useSelector((state: RootState) => state.message.open)
    const message = useSelector((state: RootState) => state.message.message)
    const type = useSelector((state: RootState) => state.message.type)
    const dispatch = useDispatch()
  
    const handleClick = () => {
      dispatch(showMessage('error','this is a error'))
    };
  
   
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }

        dispatch(closeMessage())
    
      };  

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <div style={{zIndex:'10000'}}>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>

        </div>
    )
}

export default AlterMessage