import apiClient from "libs/apiClient";
import { Activites } from "types/data";

const getDetailActivitiesData = async (no: number) => {
  const response = await apiClient.get<{ data: Activites }>(`/todos/${no}`);

  return response.data;
};

// only get my activites data with filter
const getAllActivitiesData = async () => {
  const response = await apiClient.get<{ data: Activites[] }>(
    `/activity-groups?email=mrizkyy027@gmail.com`,
  );

  return response.data;
};

const activitiesService = { getDetailActivitiesData, getAllActivitiesData };

export default activitiesService;
