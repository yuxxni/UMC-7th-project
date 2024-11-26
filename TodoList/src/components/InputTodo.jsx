import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import s from '../styles/InputTodo.module.css';

export default function InputTodo() {
  const dispatch = useDispatch();


  const [todolist, setTodolist] = useState({
    id: 0,  
    text: '',
  });

 
  function handleText(e) {
    setTodolist(prevState => ({ ...prevState, text: e.target.value }));
  }

  function onReset() {
    setTodolist({ id: todolist.id + 1, text: '' }); 
  }

  return (
    <div className={s.InputTodo}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== '') {
            dispatch(add(todolist));  
            onReset();
          } else {
            alert('할 일을 입력해주세요!');
          }
        }}
      >
        <div className={s.formGroup}>
          <input
            className={s.textbar}
            type="text"
            value={todolist.text}
            onChange={handleText}
            placeholder="할 일을 입력하세요"
          />
          <input
            className={s.submitbutton}
            type="submit"
            value="등록"
          />
        </div>
      </form>
    </div>
  );
}
