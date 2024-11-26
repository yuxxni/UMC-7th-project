import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    complete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.complete = !todo.complete;
      }
    },
  },
});

export const { add, remove, complete } = todoSlice.actions;
export default todoSlice.reducer;
