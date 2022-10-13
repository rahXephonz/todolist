import { orderBy } from "lodash";
import lib from "libs/transforms";
import { useAppDispatch, useAppSelector } from "state/store";
import { updateTodosItem } from "state/slices/todoSlices";

const useSorter = () => {
  const dispatch = useAppDispatch();
  const { todosItem } = useAppSelector((state) => state.todos);

  const sortedOlder = () => {
    const sorted = orderBy(todosItem, ["id"], "asc");

    // setState({ todosItem: sorted });
    dispatch(updateTodosItem(sorted));
  };

  const sortedNewer = () => {
    const sorted = orderBy(todosItem, ["id"], "desc");

    // setState({ todosItem: sorted });
  };

  const sortedAZ = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["asc"],
    );

    // setState({ todosItem: sorted });
  };

  const sortedZA = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["desc"],
    );

    // setState({ todosItem: sorted });
  };

  const sortedIncomplete = () => {
    // const todos = lib.transformObjectKeysToCamelCase(state.todosItem);
    // const sorted = orderBy(todos, ["isActive"], "desc");
    // setState({ todosItem: sorted });
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
