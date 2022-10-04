import { useMutation, useQueryClient } from "react-query";
import { Activites } from "types/data";
import activitiesService from "services/activities";

export const useCreateActivities = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (json: Partial<Activites>) =>
      activitiesService.createActivities({ ...json }),
    {
      onSuccess: () => queryClient.invalidateQueries("listActivities"),
    },
  );
};
export const useUpdateActivities = () => {
  return;
};

export const useDeleteActivities = () =>
  useMutation((no: number) => activitiesService.deleteActivities(no));

export const useCreateTodos = () => {
  return;
};

export const useUpdateTodos = () => {
  return;
};
