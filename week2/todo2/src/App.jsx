import { useState } from 'react';
import './App.css'
import Input from './components/Input';
import Button from './components/Button';

function App() {
  const [todos, setTodos] = useState([
    {id: 1, task: '투두 만들어보기'},
    {id: 2, task: '혜윤 찬민 건 다연'},
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  //랜더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  //1.추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {id: Math.floor(Math.random() * 100) + 2, task: text},
    ])
  };
  //2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id != id))
  };
  //3. 수정하기 
  const updateTodo = (id, text) => {
    setTodos((prev) => 
      prev.map((item) => (item.id === id ? {...item, task: text} : item))
    );
    setEditingId('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <Input value={text} onChange={setText} />
        <Button onClick={addTodo} label="할 일 등록" />
      </form>    
      <div>
        {todos.map((todo, _) => (
          <div key={todo.id} className='todoItem'>
            {editingId !== todo.id && (
              <div key={todo.id} className='content'>
                <p>{todo.id}. </p>
                <p>{todo.task}</p> 
              </div>
            )}
            {editingId === todo.id && (
              <div key={todo.id} className='content'>
                <p>{todo.id}. </p>
                <Input value={todo.task} onChange={setEditText} />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)} label="삭제하기" />
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)} label="수정 완료"/>
            ) : (
              <Button onClick={() => setEditingId(todo.id)} label="수정 진행"/>
            )}         
          </div>
        ))}
      </div>
    </>
  );
}
export default App;