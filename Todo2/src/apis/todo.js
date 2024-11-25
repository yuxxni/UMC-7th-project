//Mission2
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/todo';

// Todo 목록 조회하기
export const useTodos = (title = '') => {
  return useQuery(
    ['todos', title],
    async () => {
      const response = await axios.get(BASE_URL, { params: { title } });
      return response.data;
    },
    {
      enabled: !!title, // title이 있을 때만 쿼리 실행
    }
  );
};

// Todo 생성하기
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (todo) => {
      const response = await axios.post(BASE_URL, todo);
      return response.data;
    },
    {
      // 생성 후 Todo 목록을 재조회하여 최신 상태로 유지
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Todo 작성 에러:', error.message);
      }
    }
  );
};

// Todo 수정하기
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data }) => {
      const response = await axios.patch(`${BASE_URL}/${id}`, data);
      return response.data;
    },
    {
      // 수정 후 Todo 목록을 재조회하여 최신 상태로 유지
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Todo 수정 에러:', error.message);
      }
    }
  );
};

// Todo 삭제하기
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (id) => {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    },
    {
      // 삭제 후 Todo 목록을 재조회하여 최신 상태로 유지
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
      onError: (error) => {
        console.error('Todo 삭제 에러:', error.message);
      }
    }
  );
};






//Mission1
/* import axios from 'axios';

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




 */



































































































