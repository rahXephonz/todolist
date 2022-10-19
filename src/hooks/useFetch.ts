import { omit } from "lodash";
import { transformToCamelCase } from "transform-obj";
import { useQuery } from "react-query";
import activity from "services/activities";
import todo from "services/todos";

const useFetchAllTodos = (id?: number) => {
  return useQuery(["listTodos"], () => todo.getAllTodos(id), {
    keepPreviousData: true,
  });
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
  const data = transformToCamelCase(result.data);

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
