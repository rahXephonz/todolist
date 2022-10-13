import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todos } from "types/data";

interface ITodos {
  todosItem: Array<Todos>;
}

const initialState: ITodos = {
  todosItem: [],
};

const todoSlice = createSlice({
  name: "todosAction",
  initialState,
  reducers: {
    updateTodosItem(state, action: PayloadAction<Array<Todos>>) {
      state.todosItem = action.payload;
    },
  },
});

export const { updateTodosItem } = todoSlice.actions;

export default todoSlice.reducer;
