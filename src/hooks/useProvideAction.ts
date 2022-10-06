import { useContext } from "react";
import { ActionStateContext } from "./context/ActionContext";

const useProvideAction = () => {
  const context = useContext(ActionStateContext);

  if (!context) {
    throw new Error(
      "useProvideAction must be used within a ActionStateContext",
    );
  }
  return context;
};

export default useProvideAction;
