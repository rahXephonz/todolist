import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Todos } from "types/data";

interface ITodoState {
  todosItem: Array<Todos>;
}

const TodoStateContext = createContext({
  state: {} as Partial<ITodoState>,
  setState: {} as Dispatch<SetStateAction<Partial<ITodoState>>>,
});

const TodoStateProvider = ({
  children,
  value = {
    todosItem: [],
  } as ITodoState,
}: {
  children: React.ReactNode;
  value?: Partial<ITodoState>;
}) => {
  const [state, setState] = useState(value);

  return (
    <TodoStateContext.Provider value={{ state, setState }}>
      {children}
    </TodoStateContext.Provider>
  );
};

export { TodoStateContext, TodoStateProvider };
