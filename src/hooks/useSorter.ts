import { orderBy } from "lodash";
import { useAppDispatch, useAppSelector } from "state/store";
import { updateTodosItem } from "state/slices/todoSlices";
import { transformToCamelCase } from "transform-obj";

const useSorter = () => {
  const dispatch = useAppDispatch();
  const { todosItem } = useAppSelector((state) => state.todos);

  const sortedOlder = () => {
    const sorted = orderBy(todosItem, ["id"], "asc");
    dispatch(updateTodosItem(sorted));
  };

  const sortedNewer = () => {
    const sorted = orderBy(todosItem, ["id"], "desc");
    dispatch(updateTodosItem(sorted));
  };

  const sortedAZ = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["asc"],
    );

    dispatch(updateTodosItem(sorted));
  };

  const sortedZA = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["desc"],
    );

    dispatch(updateTodosItem(sorted));
  };

  const sortedIncomplete = () => {
    const todos = transformToCamelCase(todosItem);

    const sorted = orderBy(todos, ["isActive"], "desc");
    dispatch(updateTodosItem(sorted));
  };

  return {
    sortedOlder,
    sortedAZ,
    sortedNewer,
    sortedZA,
    sortedIncomplete,
  };
};

export default useSorter;
