import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

//reducer thunk
export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
});
export const addTodo = createAsyncThunk("todos/todosAdded", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  return newTodo;
});

export const deleteTodo = createAsyncThunk(
  "todos/todosDeleted",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.allTodos.unshift({
    //     id: nanoid(),
    //     title: action.payload,
    //     completed: false,
    //   });
    // },
    // addTodo: {
    //   // phải tách ra làm hai vì không muốn có giá trị ngẫu nhiên trong action
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     // chuẩn bị dữ liệu
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    markComplete(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
    // deleteTodo(state, action) {
    //   const todoId = action.payload;
    //   state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    // },
    // todosFetched(state, action) {
    //   state.allTodos = action.payload;
    // },
  },
  extraReducers: {
    // Get all todos
    [getTodos.pending]: (state, action) => {
      console.log("fetching data...");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("done");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("fetching failed");
    },
    // add todo
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },
    // add todo
    [deleteTodo.fulfilled]: (state, action) => {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
  },
});

// Async action creator, action and reducer dispatch
// export const getTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos?_limit=5"
//     );
//     dispatch(todosFetched(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// Reducer
const todosReducer = todosSlice.reducer;

// selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// Action
export const { markComplete } = todosSlice.actions;

export default todosReducer;
