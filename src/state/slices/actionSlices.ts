import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Priority } from "types/data";

type Action = "update" | "create";

interface IAction {
  typeAction: Action;
  priority: Priority;
}

const initialState: IAction = {
  typeAction: null,
  priority: "normal",
};

const actionSlice = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    updateTypeAction(state, action: PayloadAction<Action>) {
      state.typeAction = action.payload;
    },

    updatePriorityAction(state, action: PayloadAction<Priority>) {
      state.priority = action.payload;
    },
  },
});

export const { updateTypeAction, updatePriorityAction } = actionSlice.actions;

export default actionSlice.reducer;
