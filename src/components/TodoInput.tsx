import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './style/TodoInput.css'

import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import LoadingButton from '@mui/lab/LoadingButton';
import {showMessage,closeMessage} from '../redux/action/messageAction'
import {useSelector,useDispatch} from 'react-redux'

interface Props {
    requestTodos: any
  }

const TodoInput: React.FC<Props> = ({requestTodos}) => {

    interface Values {
        todo: string;
        description : string;
        deadline: Date | null;
    }

    const initialValue: Values = {
        todo: '',
        description : '',
        deadline: null
    }

    const dispatch = useDispatch()
    const [values, setValues] = useState(initialValue);
    const [savingTodo, setSavingTodo] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const handleChange = (type: string, newValue: (string | Date | null)) => {
        console.log(newValue)
        setValues({...values, [type] : newValue});
    };

    const submitTodo = () => {

        if(!values.todo) return setMessage('Todo cannot be empty')
        setMessage('')
        setSavingTodo(true)

        axios.post('/api/todos/add', {todo: values.todo, description: values.description, deadline: values.deadline})
        .then(res => {
            setSavingTodo(false)
            if(res.data.success){
                requestTodos()
                setValues(initialValue)
                dispatch(showMessage('success', "Todo Added successfully"))
            }else{
                setMessage('Unable to add todo')
            }
        })
        .catch(err => {
            console.log(err)
            setMessage('Something went wrong')
        })

    }

    return (
    <div className='todo-add-container'>
        <form>
            <div className="input-container">
            <TextField type='text' id="filled-basic" label="Task" variant="filled" value={values.todo}
                onChange={(e) => handleChange('todo', e.target.value) } fullWidth
            />
            </div>

            <div className="input-container">
            <TextField type='text' multiline rows='3' id="filled-basic" label="Task Description" variant="filled" value={values.description}
             onChange={(e) => handleChange('description', e.target.value) } fullWidth/>
            </div>
            <div className="input-container">
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                        label="Deadline "
                        value={values.deadline}
                        onChange={(e) => handleChange('deadline', e )}
                        className='date-picker'
                        // id="date-picker"
                        // minDateTime={currentDateTime()}
                        renderInput={(params: any) => <TextField {...params} variant="filled"/>}
                    />
                </LocalizationProvider>
            </div>

            <div className='submit-btn'>
                <LoadingButton loading={savingTodo} variant="contained" onClick={submitTodo}>
                    Add Todo
                </LoadingButton>
                <div className="input-message">{message}</div>
            </div>
        </form>
    </div>
    )
}

export default TodoInput