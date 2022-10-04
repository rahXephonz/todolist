import { useMutation, useQueryClient } from "react-query";
import { Activities, Todos } from "types/data";
import activitiesService from "services/activities";
import todosService from "services/todos";

export const useCreateActivities = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (json: Activities) => activitiesService.createActivities({ ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listActivities"),
    },
  );
};
export const useUpdateActivities = () => {
  return;
};

export const useDeleteActivities = () =>
  useMutation((id: number) => activitiesService.deleteActivities(id));

export const useCreateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation((json: Todos) => todosService.createTodos({ ...json }), {
    onSuccess: () => queryClient.invalidateQueries("listTodos"),
  });
};

export const useUpdateTodos = () => {
  return;
};
