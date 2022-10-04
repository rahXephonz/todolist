import apiClient from "libs/apiClient";
import { transformObjectKeysToCamelCase } from "libs/transforms";
import { Activites } from "types/data";

const getDetailActivitiesData = async (no: number) => {
  const response = await apiClient.get<{ data: Activites }>(`/todos/${no}`);

  return transformObjectKeysToCamelCase(response.data);
};

// only get my activites data with filter
const getAllActivitiesData = async () => {
  const response = await apiClient.get<{ data: Activites[] }>(
    "/activity-groups?email=mrizkyy027@gmail.com",
  );

  return transformObjectKeysToCamelCase(response.data);
};

const createActivities = async ({ email, title }: Activites) => {
  const response = await apiClient.post<Activites>("/activity-groups", {
    email,
    title,
  });

  return response.data;
};

const deleteActivities = async (no: number) => {
  const response = await apiClient.delete(`/activity-groups/${no}`);

  return response.data;
};

const activitiesService = {
  getDetailActivitiesData,
  getAllActivitiesData,
  createActivities,
  deleteActivities,
};

export default activitiesService;
