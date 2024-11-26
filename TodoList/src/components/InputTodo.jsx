import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/todoSlice';
import s from '../styles/InputTodo.module.css';

export default function InputTodo() {
  const dispatch = useDispatch();

  // 초기 상태에 id도 포함
  const [todolist, setTodolist] = useState({
    id: 0,  // id는 고유값으로 관리되어야 합니다.
    text: '',
  });

  // 텍스트 변경 시 상태 업데이트
  function handleText(e) {
    setTodolist(prevState => ({ ...prevState, text: e.target.value }));
  }

  // 입력 후 초기화 함수
  function onReset() {
    setTodolist({ id: todolist.id + 1, text: '' }); // id 값을 증가시켜야 새로운 id가 부여됨
  }

  return (
    <div className={s.InputTodo}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (todolist.text !== '') {
            dispatch(add(todolist));  // 전체 todo 객체를 전달
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
