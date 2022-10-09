// import apiClient from "libs/apiClient";
// import lib from "libs/transforms";
// import type { Activities } from "types/data";

// const getDetailActivitiesData = async (id: number) => {
//   const response = await apiClient.get<Activities>(`/activity-groups/${id}`);

//   return lib.transformObjectKeysToCamelCase(response.data);
// };

// // only get my Activities data with filter
// const getAllActivitiesData = async () => {
//   const response = await apiClient.get<{ data: Activities[] }>(
//     "/activity-groups?email=mrizkyy027@gmail.com",
//   );

//   return lib.transformObjectKeysToCamelCase(response.data);
// };

// const createActivities = async ({ email, title }: Activities) => {
//   const response = await apiClient.post<Activities>("/activity-groups", {
//     email,
//     title,
//   });

//   return response.data;
// };

// const deleteActivities = async (id: number) => {
//   const response = await apiClient.delete(`/activity-groups/${id}`);

//   return response.data;
// };

// const updateActivities = async (id: number, { title }: Activities) => {
//   const response = await apiClient.patch<Activities>(`/activity-groups/${id}`, {
//     title,
//   });

//   return response.data;
// };

// const activitiesService = {
//   getDetailActivitiesData,
//   getAllActivitiesData,
//   createActivities,
//   deleteActivities,
//   updateActivities,
// };

// export default activitiesService;

import { Activities } from "types/data";
import { CoreService } from "./core";

class Activity extends CoreService {
  getAllActivities = async () => {
    return await this.fetch<{ data: Activities[] }>(
      "/activity-groups?email=mrizkyy027@gmail.com",
      "GET",
    );
  };

  deleteActivities = async (id: number) => {
    return await this.fetch<Activities>(`/activity-groups/${id}`, "DELETE");
  };

  createActivities = async ({ email, title }: Activities) => {
    return await this.fetch<Activities>("/activity-groups", "POST", {
      json: {
        email,
        title,
      },
    });
  };
}

export const activity = new Activity();
