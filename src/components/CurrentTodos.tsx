import React from 'react'
import './style/CurrentTodos.css'
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FcOk } from "react-icons/fc";
import axios from 'axios'
import {showMessage} from '../redux/action/messageAction'
import {useDispatch} from 'react-redux'

interface Props {
  todoList: any[],
  requestTodos: any
}
 
const CurrentTodos: React.FC<Props> = ({todoList, requestTodos}) =>  {

  const dispatch = useDispatch()

  const deleteTodo = (id: number) => {
    axios.delete(`/api/todos/delete/${id}`)
    .then(res => {
      if(res.data.success){
        requestTodos()
        dispatch(showMessage('success', "Todo deleted successfully"))
      }else{
        dispatch(showMessage('error', res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
      dispatch(showMessage('error', 'Something went wrong'))
    })
  }

  const completeTodo= (id: number) => {
    axios.put(`/api/todos/update`, {id})
    .then(res => {
      if(res.data.success){
        requestTodos()
        dispatch(showMessage('success', "Marked as completed."))
      }else{
        dispatch(showMessage('error', res.data.message))
      }
    })
    .catch(err => {
      console.log(err)
      dispatch(showMessage('error', 'Something went wrong'))
    })
  }

  const dateTime = (value: any) => {
    if(!value) return
    const newD = new Date(value)
    return newD.toLocaleString()
  }

  const columns = [
    // { field: 'university_id', headerName: 'ID', width: 300,  sortable: true, },
    { field: 'todo', headerName: 'Todo',width: 200,  sortable: true,
      renderCell: (params: any) => <div style={{ marginLeft: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>{params.row.todo}</div>, 
    },
    { field: 'description', headerName: 'Description', width: 250,  sortable: true, 
      renderCell: (params: any) => <div style={{ marginLeft: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>{params.row.description}</div>, 
    },
    { field: 'deadline', headerName: 'Deadline', width: 200,  sortable: true,
      renderCell: (params: any) => <div style={{ marginLeft: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>{params.row.deadline}</div>, 
    },
    { field: 'deadline', headerName: 'Deadline', width: 200,  sortable: true,
      renderCell: (params: any) => <div style={{ marginLeft: 16, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow:'hidden'}}>{dateTime(params.row.deadline)}</div>, 
    },
    {
      field: 'delete',
      headerName: 'Delete',
      description: 'Delete Todo',
      sortable: false,
      
      width: 100,
      renderCell: (params : any) => (
        <div className="table-button" onClick={() => deleteTodo(params.row._id)}><DeleteOutlineIcon/></div>
      )
    },
    {
      field: 'Done',
      headerName: 'Done',
      description: 'Done Todo',
      sortable: false,
      
      width:80,
      renderCell: (params : any) => (
        <div className="table-button" onClick={() => completeTodo(params.row._id)}><FcOk size={30}/></div>
      )
    }
  ];

  return (
    <div className="todo-table-container">
        <div style={{height: '550px', width: '97%'}}>
          <DataGrid
            getRowId={(row) => row._id}
              rows={todoList}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[20]}
              rowHeight={50}
              // loading={true}
              // checkboxSelection
          />
        </div>

    </div>
  )
}

export default CurrentTodos