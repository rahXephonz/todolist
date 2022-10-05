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
  const queryClient = useQueryClient();

  return useMutation(
    ({ json, id }: { json: Todos; id: number }) =>
      activitiesService.updateActivities(id, { ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listDetailActivity"),
    },
  );
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
  const queryClient = useQueryClient();

  return useMutation(
    ({ json, id }: { json: Todos; id: number }) =>
      todosService.updateTodos(id, { ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listTodos"),
    },
  );
};

export const useDeleteTodos = () =>
  useMutation((id: number) => todosService.deleteTodos(id));
