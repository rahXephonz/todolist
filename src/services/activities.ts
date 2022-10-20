import { CoreAPI } from "./core";
import { Activities } from "types/data";

class Activity extends CoreAPI {
  getDetailActivities = async (id: number) => {
    return await this.fetchjson<Activities>(`/activity-groups/${id}`, "GET");
  };

  deleteActivities = async (id: number) => {
    return await this.fetchjson(`/activity-groups/${id}`, "DELETE");
  };

  getAllActivities = async () => {
    return await this.fetchjson<{ data: Activities[] }>(
      "/activity-groups?email=mynev.id@gmail.com",
      "GET",
    );
  };

  createActivities = async (props: Activities) => {
    return await this.fetchjson("/activity-groups", "POST", {
      json: {
        ...props,
      },
    });
  };

  updateActivities = async (id: number, props: Activities) => {
    return await this.fetchjson(`/activity-groups/${id}`, "PATCH", {
      json: {
        ...props,
      },
    });
  };
}

const activity = new Activity();

export default activity;
