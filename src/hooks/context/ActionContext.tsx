import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Priority } from "types/data";

export interface IGlobalState {
  typeAction: "update" | "create";
  priority: Priority;
}

const GlobalStateContext = createContext({
  state: {} as Partial<IGlobalState>,
  setState: {} as Dispatch<SetStateAction<Partial<IGlobalState>>>,
});

const GlobalStateProvider = ({
  children,
  value = {
    typeAction: null,
    priority: "normal",
  } as IGlobalState,
}: {
  children: React.ReactNode;
  value?: Partial<IGlobalState>;
}) => {
  const [state, setState] = useState(value);

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
