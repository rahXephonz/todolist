import { Activities } from "types/data";
import { CoreService } from "./core";

class Activity extends CoreService {
  getDetailActivitiesData = async (id: number) => {
    return await this.fetch<Activities>(`/activity-groups/${id}`, "GET");
  };

  deleteActivities = async (id: number) => {
    return await this.fetch<Activities>(`/activity-groups/${id}`, "DELETE");
  };

  getAllActivities = async () => {
    return await this.fetch<{ data: Activities[] }>(
      "/activity-groups?email=mynev.id@gmail.com",
      "GET",
    );
  };

  createActivities = async (props: Activities) => {
    return await this.fetch<Activities>("/activity-groups", "POST", {
      json: {
        ...props,
      },
    });
  };

  updateActivities = async (id: number, props: Activities) => {
    return await this.fetch<Activity>(`/activity-groups/${id}`, "PATCH", {
      json: {
        ...props,
      },
    });
  };
}

const activity = new Activity();

export default activity;
