import { useContext } from "react";
import { TodoStateContext } from "./context/TodosContext";

const useProvideTodos = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a ActionStateContext");
  }
  return context;
};

export default useProvideTodos;