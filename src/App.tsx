// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Todo } from './pages/todoPage/Todo';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import AlterMessage from './components/AlterMessage';


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Todo/>
        <AlterMessage/>
      </Provider>
    </div>
  );
}

export default App;
