import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Priority } from "types/data";

export interface IActionState {
  typeAction: "update" | "create";
  priority: Priority;
}

const ActionStateContext = createContext({
  state: {} as Partial<IActionState>,
  setState: {} as Dispatch<SetStateAction<Partial<IActionState>>>,
});

const ActionStateProvider = ({
  children,
  value = {
    typeAction: null,
    priority: "normal",
  } as IActionState,
}: {
  children: React.ReactNode;
  value?: Partial<IActionState>;
}) => {
  const [state, setState] = useState(value);

  return (
    <ActionStateContext.Provider value={{ state, setState }}>
      {children}
    </ActionStateContext.Provider>
  );
};

export { ActionStateContext, ActionStateProvider };
