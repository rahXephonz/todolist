import { useMutation, useQueryClient } from "react-query";
import { Activities, Todos } from "types/data";
import activity from "services/activities";
import todo from "services/todos";

export const useCreateActivities = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (json: Activities) => activity.createActivities({ ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listActivities"),
    },
  );
};

export const useUpdateActivities = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ json, id }: { json: Activities; id: number }) =>
      activity.updateActivities(id, { ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listDetailActivity"),
    },
  );
};

export const useDeleteActivities = () =>
  useMutation((id: number) => activity.deleteActivities(id));

export const useCreateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation((json: Todos) => todo.createTodos({ ...json }), {
    onSuccess: () => queryClient.invalidateQueries("listTodos"),
  });
};

export const useUpdateTodos = () => {
  return useMutation(({ json, id }: { json: Todos; id: number }) =>
    todo.updateTodos(id, { ...json }),
  );
};

export const useDeleteTodos = () =>
  useMutation((id: number) => todo.deleteTodos(id));
