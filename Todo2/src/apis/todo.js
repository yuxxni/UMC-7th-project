import axios from 'axios';

const BASE_URL = 'http://localhost:3000/todo';

// Todo 생성하기
export const createTodo = async (title, content) => {
  try {
    const response = await axios.post(BASE_URL, { title, content });
    return response.data;
  } catch (error) {
    console.error('Todo 작성 에러:', error.message);
    throw new Error('Todo 작성에 실패했습니다.');
  }
};

// Todo 목록 조회하기
export const getTodos = async (title = '') => {
  try {
    const response = await axios.get(BASE_URL, { params: { title } });
    return response.data;
  } catch (error) {
    console.error('Todo 조회 에러:', error.message);
    throw new Error('Todo 조회에 실패했습니다.');
  }
};

// Todo 개별 조회하기
export const getTodoById = async (id) => {
  if (!id) {
    throw new Error('유효하지 않은 ID입니다.');
  }
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Todo 개별 조회 에러:', error.message);
    throw new Error('Todo를 가져오는 데 실패했습니다.');
  }
};

// Todo 삭제하기
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Todo 삭제 에러:', error.message);
    throw new Error('Todo 삭제에 실패했습니다.');
  }
};

// Todo 수정하기
export const updateTodo = async (id, data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Todo 수정 에러:', error.message);
    throw new Error('Todo 수정에 실패했습니다.');
  }
};

// Todo 상태 수정하기 (예: 체크박스 상태 변경)
export const updateTodoStatus = async (id, status) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Todo 상태 수정 에러:', error.message);
    throw new Error('Todo 상태 수정에 실패했습니다.');
  }
};














/* import axiosInstance from "./axios-instance";

const postTodo = async ({ title, content, checked = false }) => {
  const { data } = await axiosInstance.post("/todo", {
    title: title,
    content: content,
    checked: checked,
  });

  return data;
};

const getTodoList = async ({ title }) => {
  let url = "/todo";

  if (title) {
    url += `?title=${title}`;
  }
  const { data } = await axiosInstance.get(url);

  return data; // return 문을 함수 내부로 이동
};

const getTodo = async ({ id }) => {
  console.log(id);  // 여기서 id 값이 잘 출력되는지 확인
  const { data } = await axiosInstance.get(`/todo/${id}`);
  return data;
};



const patchTodo = async ({ id, title, content, checked }) => {
  const { data } = await axiosInstance.patch(`/todo/${id}`, {
    title,
    content,
    checked,
  });

  return data;
};

const deleteTodo = async ({ id }) => {
  const { data } = await axiosInstance.delete(`/todo/${id}`);
  return data;
};

export { postTodo, getTodo, getTodoList, patchTodo, deleteTodo };
 */