import { useContext } from "react";
import { GlobalStateContext } from "./context/ActionContext";

const useProvideAction = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export default useProvideAction;
