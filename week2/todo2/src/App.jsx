import { useContext, useState} from 'react';
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    todos,
    text,
    setText,
    editingId,
    setEditingId,
    editText,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useContext(TodoContext);

  const handleTextChange = (e) => setText(e.target.value);
  const handleEditTextChange = (e) => setEditText(e.target.value);

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <Input value={text} onChange={handleTextChange} />
        <Button onClick={addTodo} label="할 일 등록" />
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className='todoItem'>
            {editingId !== todo.id ? (
              <div className='content'>
                <p>{todo.id}. </p>
                <p>{todo.task}</p>
              </div>
            ) : (
              <div className='content'>
                <p>{todo.id}. </p>
                <Input value={editText} onChange={handleEditTextChange} />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)} label="삭제하기" />
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)} label="수정 완료" />
            ) : (
              <Button onClick={() => setEditingId(todo.id)} label="수정 진행" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
