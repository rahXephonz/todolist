import { omit } from "lodash";
import { useQuery } from "react-query";
import activity from "services/activities";
import todo from "services/todos";
import lib from "libs/transforms";

const useFetchAllTodos = (id?: number) => {
  const result = useQuery(["listTodos"], () => todo.getAllTodos(id), {
    keepPreviousData: true,
  });

  const options = omit(result, "data");
  const data = lib.transformObjectKeysToCamelCase(result.data);

  return {
    data,
    ...options,
  };
};

const useFetchAllActivities = () => {
  const result = useQuery(
    ["listActivities"],
    () => activity.getAllActivities(),
    {
      keepPreviousData: true,
    },
  );

  const options = omit(result, "data");
  const data = lib.transformObjectKeysToCamelCase(result.data);

  return {
    data,
    ...options,
  };
};

const useFetchDetailActivities = (id: number) => {
  return useQuery(["listDetailActivity"], () =>
    activity.getDetailActivities(id),
  );
};

export { useFetchAllActivities, useFetchDetailActivities, useFetchAllTodos };
