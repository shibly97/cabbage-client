import React,{useState, useEffect} from 'react'
import './style/Todo.css'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import CurrentTodos from '../../components/CurrentTodos';
import TodoInput from '../../components/TodoInput';
import CompletedTodos from '../../components/CompletedTodos';

import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios'

export const Todo: React.FC = () => {

  
    const [tabValue, setTabValue] = React.useState('1');
    const [todoList, setTodoList] = useState<any[]>([])
    const [completeTodoList, setCompleteTodoList] = useState<any[]>([])
    const [currentTodoList, setCurrentTodoList] = useState<any[]>([])
    const [message, setMessage] = useState<any>('')

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    };

    const handleLists = (list: any[]) => {
        console.log(list)
        let coList: any[] = []
        let cuList: any[] = []

        list.map((todo:any) => {
            if(todo.completed){
                return coList.push(todo)
            }else{
                return cuList.push(todo)
            }

        })
        setCompleteTodoList(coList)
        setCurrentTodoList(cuList)
    }

    // const currentDateTime = (): Date => {
    //     const todate = new Date()
    //     return todate
    // } 
    const requestTodos = () => { 
        setMessage(<CircularProgress size={30}/>)
        axios.get('/api/todos')
        .then(res => {
            setMessage('')
            if(res.data.success){
                setTodoList(res.data.todoList)
                handleLists(res.data.todoList)
            }else{
                setMessage(res.data.message)
            }
        })
        .catch(err => {
            console.log(err)
            setMessage('Something went wrong')
        })
    }

    useEffect(() => {
        requestTodos() 
    },[])

    return (
        <div className='todo-container'>
            <div className="todo-container-left">

                <h1>Todo App</h1>
                <TodoInput requestTodos={requestTodos}/>

            </div>
            <div className="todo-container-right">

                    <div className='todo-view-container'>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>

                                <Box sx={{ borderBottom: 1, borderColor: 'divider' , display:'flex', justifyContent:'center'}}>
                                    <TabList onChange={handleTabChange}>
                                        <Tab label="Current TODO List" value="1" />
                                        <Tab label="Completed Todos" value="2" />
                                    </TabList>
                                </Box>

                                {todoList[0]?
                                    <>
                                        <TabPanel value="1">
                                            <CurrentTodos todoList={currentTodoList} requestTodos={requestTodos}/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <CompletedTodos todoList={completeTodoList} requestTodos={requestTodos}/>
                                        </TabPanel>
                                    </>
                                :message? 
                                    <div className='data-message'>{message}</div>
                                :null}

                            </TabContext>
                        </Box>
                    </div>

            </div>


        </div>
    )
}
