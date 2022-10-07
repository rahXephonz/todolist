import { useProvideTodos } from "hooks/useProvide";
import { orderBy } from "lodash";
import lib from "libs/transforms";

const useSorter = () => {
  const { state, setState } = useProvideTodos();
  const { todosItem } = state;

  const sortedOlder = () => {
    const sorted = orderBy(todosItem, ["id"], "asc");

    setState({ todosItem: sorted });
  };

  const sortedNewer = () => {
    const sorted = orderBy(todosItem, ["id"], "desc");

    setState({ todosItem: sorted });
  };

  const sortedAZ = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["asc"],
    );

    setState({ todosItem: sorted });
  };

  const sortedZA = () => {
    const sorted = orderBy(
      todosItem,
      [(item) => item.title.toLowerCase()],
      ["desc"],
    );

    setState({ todosItem: sorted });
  };

  const sortedIncomplete = () => {
    const todos = lib.transformObjectKeysToCamelCase(state.todosItem);

    const sorted = orderBy(todos, ["isActive"], "desc");
    setState({ todosItem: sorted });
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
