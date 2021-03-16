import logo from './logo.svg';
import './App.css';
import TodoTemplate from './components/TodoTemplate/TodoTemplate';
import TodoInsert from './components/TodoInsert/TodoInsert';
import TodoList from './components/TodoList/TodoList';
import { useCallback, useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },{
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    }
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        text,
        id: nextId.current,
        checked: false
      }
      setTodos(todos.concat(todo));
      nextId.current++;
  },[todos])

  const onRemove = useCallback(id => {
    setTodos(todos.filter(todo => {
      return todo.id !== id;
    }));
  },[todos])

  const onToggle = useCallback(id => {
    const nextTodos =  todos.map(todo => {
      if(todo.id === id)
        return ({
          ...todo,
          checked: !todo.checked
        })
      return todo;
    })
    setTodos(nextTodos);
  },[todos])

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
