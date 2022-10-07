import { useContext } from "react";
import { TodoStateContext } from "./context/TodosContext";
import { ActionStateContext } from "./context/ActionContext";

export const useProvideTodos = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error("useProvideTodos must be used within a ActionStateContext");
  }
  return context;
};

export const useProvideAction = () => {
  const context = useContext(ActionStateContext);

  if (!context) {
    throw new Error(
      "useProvideAction must be used within a ActionStateContext",
    );
  }
  return context;
};

export default useProvideAction;
