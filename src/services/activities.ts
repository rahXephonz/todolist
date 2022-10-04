import apiClient from "libs/apiClient";
import { transformObjectKeysToCamelCase } from "libs/transforms";
import { Activities } from "types/data";

const getDetailActivitiesData = async (id: number) => {
  const response = await apiClient.get<{ data: Activities }>(
    `/activity-groups/${id}`,
  );

  return transformObjectKeysToCamelCase(response.data);
};

// only get my Activities data with filter
const getAllActivitiesData = async () => {
  const response = await apiClient.get<{ data: Activities[] }>(
    "/activity-groups?email=mrizkyy027@gmail.com",
  );

  return transformObjectKeysToCamelCase(response.data);
};

const createActivities = async ({ email, title }: Activities) => {
  const response = await apiClient.post<Activities>("/activity-groups", {
    email,
    title,
  });

  return response.data;
};

const deleteActivities = async (id: number) => {
  const response = await apiClient.delete(`/activity-groups/${id}`);

  return response.data;
};

const activitiesService = {
  getDetailActivitiesData,
  getAllActivitiesData,
  createActivities,
  deleteActivities,
};

export default activitiesService;
