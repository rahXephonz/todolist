import { useQuery } from "react-query";
import todosService from "services/todos";
import activitiesService from "services/activities";

const useFetchTodos = (no?: number) => {
  return useQuery(["listTodos"], () => todosService.getAllTodosData(no), {
    keepPreviousData: true,
  });
};

const useFetchActivities = () => {
  return useQuery(
    ["listActivities"],
    () => activitiesService.getAllActivitiesData(),
    {
      keepPreviousData: true,
    },
  );
};

export { useFetchTodos, useFetchActivities };
