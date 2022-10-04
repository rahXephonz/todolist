import { useQuery } from "react-query";
import todosService from "services/todos";
import activitiesService from "services/activities";

const useFetchAllTodos = (id: number) => {
  return useQuery(["listTodos"], () => todosService.getAllTodosData(id), {
    keepPreviousData: true,
    enabled: !!id,
  });
};

const useFetchDetailActivities = (id: number) => {
  return useQuery(
    ["listDetailActivity"],
    () => activitiesService.getDetailActivitiesData(id),
    {
      enabled: !!id,
    },
  );
};

const useFetchAllActivities = () => {
  return useQuery(
    ["listActivities"],
    () => activitiesService.getAllActivitiesData(),
    {
      keepPreviousData: true,
    },
  );
};

export { useFetchAllTodos, useFetchAllActivities, useFetchDetailActivities };
