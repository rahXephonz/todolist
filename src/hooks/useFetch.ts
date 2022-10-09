import { omit } from "lodash";
import { useQuery } from "react-query";
// import todosService from "services/todos";
import { activity } from "services/activities";
import lib from "libs/transforms";

// const useFetchAllTodos = (id: number) => {
//   return useQuery(["listTodos"], () => todosService.getAllTodosData(id), {
//     keepPreviousData: true,
//   });
// };

// const useFetchDetailActivities = (id: number) => {
//   return useQuery(["listDetailActivity"], () =>
//     activitiesService.getDetailActivitiesData(id),
//   );
// };

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

export { useFetchAllActivities };
